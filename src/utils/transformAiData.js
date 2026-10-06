import { calculateFoodScore } from './scoringEngine.js';

/**
 * Transforms validated AI extraction data into the unified internal FoodLens product schema.
 *
 * The AI extracts the label.
 * FoodLens deterministically interprets the nutrition values.
 */
export function transformAiDataToProduct(
  aiData,
  activeProfile = { id: 'general' }
) {
  const {
    product = {},
    nutrition = {},
    ingredients = [],
    analysis = {},
    ingredientSummary = {}
  } = aiData;

  // ------------------------------------------------------------
  // Deterministic FoodLens score
  // ------------------------------------------------------------

  const scoreResult = calculateFoodScore(
    nutrition,
    ingredients,
    activeProfile
  );

  // ------------------------------------------------------------
  // Preserve missing values as "Not available"
  // ------------------------------------------------------------

  const fiberVal = nutrition.fiber;
  const proteinVal = nutrition.protein;
  const sugarVal =
    nutrition.addedSugar ?? nutrition.totalSugar;
  const sodiumVal = nutrition.sodium;

  // ------------------------------------------------------------
  // Nutrition interpretation
  //
  // IMPORTANT:
  // These labels are intentionally simple and descriptive.
  // We do NOT use "Optimal".
  // ------------------------------------------------------------

  const fiberInsight = getFiberInsight(fiberVal);
  const proteinInsight = getProteinInsight(proteinVal);
  const sugarInsight = getSugarInsight(sugarVal);
  const sodiumInsight = getSodiumInsight(sodiumVal);

  // ------------------------------------------------------------
  // Build the 4 key nutrition metrics
  // ------------------------------------------------------------

  const keyMetrics = [
    {
      label: 'Fiber',
      value:
        fiberVal == null
          ? 'Not available'
          : `${fiberVal}g`,
      status: fiberInsight.status,
      statusLabel: fiberInsight.label
    },

    {
      label: 'Protein',
      value:
        proteinVal == null
          ? 'Not available'
          : `${proteinVal}g`,
      status: proteinInsight.status,
      statusLabel: proteinInsight.label
    },

    {
      label: 'Added Sugar',
      value:
        sugarVal == null
          ? 'Not available'
          : `${sugarVal}g`,
      status: sugarInsight.status,
      statusLabel: sugarInsight.label
    },

    {
      label: 'Sodium',
      value:
        sodiumVal == null
          ? 'Not available'
          : `${sodiumVal}mg`,
      status: sodiumInsight.status,
      statusLabel: sodiumInsight.label
    }
  ];

  // ------------------------------------------------------------
  // Highlights
  // ------------------------------------------------------------

  const highlights =
    analysis.positives?.length > 0
      ? analysis.positives
      : [
          fiberVal != null && Number(fiberVal) >= 3
            ? `Contains ${fiberVal}g dietary fiber per serving`
            : null,

          proteinVal != null && Number(proteinVal) >= 5
            ? `Provides ${proteinVal}g protein`
            : null,

          ingredientSummary.additivesCount === 0
            ? 'No identified functional additives'
            : null
        ].filter(Boolean);

  if (highlights.length === 0) {
    highlights.push(
      'Nutrition and ingredient facts successfully extracted from the label'
    );
  }

  // ------------------------------------------------------------
  // Concerns
  // ------------------------------------------------------------

  const concerns =
    analysis.concerns?.length > 0
      ? analysis.concerns
      : [
          sugarVal != null && Number(sugarVal) > 10
            ? `Added sugar is relatively high at ${sugarVal}g per serving`
            : null,

          nutrition.saturatedFat != null &&
          Number(nutrition.saturatedFat) > 3
            ? `Contains ${nutrition.saturatedFat}g saturated fat`
            : null,

          sodiumVal != null && Number(sodiumVal) > 400
            ? `Sodium is high at ${sodiumVal}mg per serving`
            : null,

          ingredientSummary.additivesCount > 2
            ? `Contains ${ingredientSummary.additivesCount} identified functional additives`
            : null
        ].filter(Boolean);

  // ------------------------------------------------------------
  // What should I pay attention to?
  //
  // Generate a useful summary from the actual numbers instead
  // of relying entirely on AI wording.
  // ------------------------------------------------------------

  const attentionPoints = buildAttentionPoints({
    fiberVal,
    proteinVal,
    sugarVal,
    sodiumVal,
    ingredientSummary
  });

  // ------------------------------------------------------------
  // Overall summary
  // ------------------------------------------------------------

  const summary = scoreResult.verdict;

  // ------------------------------------------------------------
  // Final FoodLens product object
  // ------------------------------------------------------------

  return {
    id: `ai-scan-${Date.now()}`,

    name:
      product.name ||
      'Analyzed Food Label',

    brand:
      product.brand ||
      'Brand Detected',

    category:
      product.category ||
      'Packaged Grocery',

    scannedAt:
      'Just now (Real AI)',

    score:
      scoreResult.score,

    scoreLabel:
      scoreResult.scoreLabel,

    scoreColor:
      scoreResult.scoreColor,

    verdict:
      scoreResult.verdict,

    summary,

    servingSize:
      product.servingSize ||
      '1 serving',

    calories:
      nutrition.calories,

    nutritionTable: {
      calories: nutrition.calories,
      protein: proteinVal,
      carbs: nutrition.carbohydrates,
      addedSugar: sugarVal,
      totalFat: nutrition.totalFat,
      saturatedFat: nutrition.saturatedFat,
      sodium: sodiumVal,
      fiber: fiberVal
    },

    keyMetrics,

    // Also preserve the detailed deterministic interpretation
    nutritionInsights:
      scoreResult.nutritionInsights,

    highlights,
    concerns,
    ingredientSummary,
    ingredients,
    attentionPoints,

    isRealAi: true
  };
}


// ============================================================
// NUTRITION INTERPRETATION
// ============================================================

function getFiberInsight(value) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      status: 'neutral'
    };
  }

  const grams = Number(value);

  if (!Number.isFinite(grams)) {
    return {
      label: 'Not available',
      status: 'neutral'
    };
  }

  if (grams < 2) {
    return {
      label: 'Modest',
      status: 'neutral'
    };
  }

  if (grams < 5) {
    return {
      label: 'Good amount',
      status: 'positive'
    };
  }

  return {
    label: 'High',
    status: 'positive'
  };
}


function getProteinInsight(value) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      status: 'neutral'
    };
  }

  const grams = Number(value);

  if (!Number.isFinite(grams)) {
    return {
      label: 'Not available',
      status: 'neutral'
    };
  }

  if (grams < 3) {
    return {
      label: 'Low',
      status: 'neutral'
    };
  }

  if (grams < 7) {
    return {
      label: 'Notable amount',
      status: 'positive'
    };
  }

  return {
    label: 'Good amount',
    status: 'positive'
  };
}


function getSugarInsight(value) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      status: 'neutral'
    };
  }

  const grams = Number(value);

  if (!Number.isFinite(grams)) {
    return {
      label: 'Not available',
      status: 'neutral'
    };
  }

  if (grams <= 1) {
    return {
      label: 'Very low',
      status: 'positive'
    };
  }

  if (grams <= 5) {
    return {
      label: 'Moderate',
      status: 'neutral'
    };
  }

  return {
    label: 'Higher',
    status: 'negative'
  };
}


function getSodiumInsight(value) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      status: 'neutral'
    };
  }

  const mg = Number(value);

  if (!Number.isFinite(mg)) {
    return {
      label: 'Not available',
      status: 'neutral'
    };
  }

  if (mg < 140) {
    return {
      label: 'Lower',
      status: 'positive'
    };
  }

  if (mg < 400) {
    return {
      label: 'Moderate',
      status: 'neutral'
    };
  }

  return {
    label: 'High',
    status: 'negative'
  };
}


// ============================================================
// "WHAT SHOULD I PAY ATTENTION TO?"
// ============================================================

function buildAttentionPoints({
  fiberVal,
  proteinVal,
  sugarVal,
  sodiumVal,
  ingredientSummary
}) {
  const points = [];

  const sodium =
    sodiumVal == null
      ? null
      : Number(sodiumVal);

  const sugar =
    sugarVal == null
      ? null
      : Number(sugarVal);

  const fiber =
    fiberVal == null
      ? null
      : Number(fiberVal);

  const protein =
    proteinVal == null
      ? null
      : Number(proteinVal);

  // Most important attention point first.
  if (sodium != null && sodium >= 400) {
    points.push(
      `Sodium is the main thing to notice at ${sodiumVal}mg per serving.`
    );
  }

  if (sugar != null && sugar > 10) {
    points.push(
      `Added sugar is relatively high at ${sugarVal}g per serving.`
    );
  }

  if (fiber != null && fiber < 2) {
    points.push(
      `Fiber is modest at ${fiberVal}g per serving.`
    );
  }

  if (protein != null && protein >= 5) {
    points.push(
      `Protein provides a notable ${proteinVal}g per serving.`
    );
  }

  if (
    ingredientSummary?.additivesCount != null &&
    ingredientSummary.additivesCount > 2
  ) {
    points.push(
      `${ingredientSummary.additivesCount} functional additives were identified in the ingredient list.`
    );
  }

  // If nothing particularly stands out.
  if (points.length === 0) {
    points.push(
      'No single nutrition value stands out strongly from the available label data.'
    );
  }

  // Keep the UI concise.
  return points.slice(0, 3);
}