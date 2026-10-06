/**
 * Centralized deterministic Labelicious scoring engine.
 *
 * Responsibilities:
 * 1. Calculate the overall Labelicious score.
 * 2. Explain the score breakdown.
 * 3. Generate simple, understandable nutrition labels.
 * 4. Generate a concise "What should I pay attention to?" takeaway.
 *
 * Important:
 * - The AI extracts the label.
 * - This file interprets the extracted numbers.
 * - Missing values remain "Not available" and are never treated
 *   as zero for user-facing nutrition judgments.
 */

export function calculateFoodScore(
  nutrition = {},
  ingredients = [],
  profile = { id: 'general' }
) {
  let score = 65;
  const breakdown = [];

  const protein = Number(nutrition.protein) || 0;
  const fiber = Number(nutrition.fiber) || 0;

  const addedSugar =
    nutrition.addedSugar != null
      ? Number(nutrition.addedSugar) || 0
      : nutrition.totalSugar != null
        ? Math.max(0, (Number(nutrition.totalSugar) || 0) - 2)
        : 0;

  const saturatedFat =
    nutrition.saturatedFat != null
      ? Number(nutrition.saturatedFat) || 0
      : nutrition.totalFat != null
        ? (Number(nutrition.totalFat) || 0) * 0.4
        : 0;

  const sodium = Number(nutrition.sodium) || 0;

  // Profile-specific adjustments
  const isFitness = profile?.id === 'fitness';
  const isChild = profile?.id === 'child';
  const isLowSodium = profile?.id === 'low_sodium';

  // ------------------------------------------------------------
  // 1. Dietary Fiber
  // ------------------------------------------------------------

  if (fiber > 0) {
    const fiberBonus = Math.min(
      15,
      fiber * (isFitness ? 3.0 : 2.5)
    );

    score += fiberBonus;

    breakdown.push({
      label: 'Dietary Fiber',
      points: +Math.round(fiberBonus),
      positive: true
    });
  }

  // ------------------------------------------------------------
  // 2. Protein
  // ------------------------------------------------------------

  if (protein > 0) {
    const proteinBonus = Math.min(
      15,
      protein * (isFitness ? 2.5 : 1.5)
    );

    score += proteinBonus;

    breakdown.push({
      label: 'Dietary Protein',
      points: +Math.round(proteinBonus),
      positive: true
    });
  }

  // ------------------------------------------------------------
  // 3. Whole Food Ingredients
  // ------------------------------------------------------------

  const wholeFoodsCount = ingredients.filter(i =>
    i.status === 'Whole food' ||
    i.category === 'Whole grain' ||
    [
      'oats',
      'almonds',
      'chia',
      'milk',
      'fruit',
      'berries',
      'seeds'
    ].some(k =>
      String(i.name || '').toLowerCase().includes(k)
    )
  ).length;

  if (wholeFoodsCount > 0) {
    const wholeFoodBonus = Math.min(
      10,
      wholeFoodsCount * 2
    );

    score += wholeFoodBonus;

    breakdown.push({
      label: 'Whole Food Ingredients',
      points: +Math.round(wholeFoodBonus),
      positive: true
    });
  }

  // ------------------------------------------------------------
  // 4. Added Sugar
  // ------------------------------------------------------------

  if (addedSugar > 0) {
    const sugarPenaltyRate = isChild ? 2.8 : 2.0;

    const sugarDeduction = Math.min(
      30,
      addedSugar * sugarPenaltyRate
    );

    score -= sugarDeduction;

    breakdown.push({
      label: 'Added Sugars',
      points: -Math.round(sugarDeduction),
      positive: false
    });
  }

  // ------------------------------------------------------------
  // 5. Sodium
  // ------------------------------------------------------------

  if (sodium > 140) {
    const sodiumRate = isLowSodium ? 1.5 : 1.0;

    const sodiumDeduction = Math.min(
      22,
      ((sodium - 140) / 50) * sodiumRate
    );

    score -= sodiumDeduction;

    breakdown.push({
      label: 'Sodium (>140mg)',
      points: -Math.round(sodiumDeduction),
      positive: false
    });
  }

  // ------------------------------------------------------------
  // 6. Saturated Fat
  // ------------------------------------------------------------

  if (saturatedFat > 2) {
    const satFatDeduction = Math.min(
      16,
      (saturatedFat - 2) * 2.5
    );

    score -= satFatDeduction;

    breakdown.push({
      label: 'Saturated Fat',
      points: -Math.round(satFatDeduction),
      positive: false
    });
  }

  // ------------------------------------------------------------
  // 7. Functional Additives
  // ------------------------------------------------------------

  const additivesCount = ingredients.filter(i =>
    i.code ||
    [
      'Emulsifier',
      'Preservative',
      'Acidity regulator',
      'Flavour enhancer',
      'Colour',
      'Thickener'
    ].includes(i.category)
  ).length;

  if (additivesCount > 0) {
    const additivePenalty = isChild ? 4.5 : 3.5;

    const additiveDeduction = Math.min(
      18,
      additivesCount * additivePenalty
    );

    score -= additiveDeduction;

    breakdown.push({
      label: 'Functional Additives',
      points: -Math.round(additiveDeduction),
      positive: false
    });
  }

  // ------------------------------------------------------------
  // Final Score
  // ------------------------------------------------------------

  const finalScore = Math.max(
    15,
    Math.min(96, Math.round(score))
  );

  let scoreLabel = 'Eat in Moderation';
  let scoreColor = 'amber';

  let verdict =
    'Eat in Moderation — Contains nutritional or ingredient factors worth considering.';

  if (finalScore >= 75) {
    scoreLabel = 'Great Choice';
    scoreColor = 'emerald';

    verdict =
      'Great Choice — Strong overall nutritional balance based on the information available.';
  } else if (finalScore >= 58) {
    scoreLabel = 'Good Choice';
    scoreColor = 'emerald';

    verdict =
      'Good Choice — A reasonably balanced nutritional and ingredient profile.';
  }

   // ------------------------------------------------------------
  // Nutrition interpretation
  // ------------------------------------------------------------

  const nutritionInsights = buildNutritionInsights(
    nutrition,
    profile
  );

  return {
    score: finalScore,
    scoreLabel,
    scoreColor,
    verdict,
    breakdown,
    nutritionInsights,

    disclaimer:
      'An informational score based on the nutrition and ingredient information available from this label.'
  };
}


/**
 * Creates user-facing nutrition context.
 *
 * Important:
 * These are reference-based interpretations, not medical
 * recommendations or universal "good/bad" judgments.
 *
 * Labelicious separates:
 * 1. The amount actually present in the serving.
 * 2. Reference context.
 * 3. Personal context where appropriate.
 */
function buildNutritionInsights(
  nutrition = {},
  profile = { id: 'general' }
) {
  return {
    fiber: describeFiber(nutrition.fiber),
    protein: describeProtein(nutrition.protein, profile),
    addedSugar: describeAddedSugar(nutrition.addedSugar),
    sodium: describeSodium(nutrition.sodium, profile),
    saturatedFat: describeSaturatedFat(nutrition.saturatedFat),
    totalFat: describeTotalFat(
      nutrition.totalFat,
      nutrition.calories
    ),
    carbohydrates: describeCarbohydrates(
      nutrition.carbohydrates,
      nutrition.calories
    )
  };
}


// ------------------------------------------------------------
// Fiber
// ------------------------------------------------------------

function describeFiber(value) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  const grams = Number(value);

  if (!Number.isFinite(grams)) {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  // WHO/FAO adult reference:
  // at least 25 g/day of naturally occurring dietary fibre.
  const referencePercent = Math.round(
    (grams / 25) * 100
  );

  return {
    label:
      referencePercent < 5
        ? 'Small contribution'
        : referencePercent < 20
          ? 'Meaningful contribution'
          : 'Substantial contribution',

    level:
      referencePercent < 5
        ? 'neutral'
        : 'positive',

    reference: `≈${referencePercent}% of the 25g/day adult reference`
  };
}


// ------------------------------------------------------------
// Protein
// ------------------------------------------------------------

function describeProtein(
  value,
  profile = { id: 'general' }
) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  const grams = Number(value);

  if (!Number.isFinite(grams)) {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  /*
   * FDA Daily Value reference:
   * 50 g protein/day.
   *
   * This is a general label reference, not a personalized
   * protein requirement.
   */
  const dailyValuePercent = Math.round(
    (grams / 50) * 100
  );

  let label = 'Moderate contribution';
  let level = 'neutral';

  if (dailyValuePercent < 5) {
    label = 'Small contribution';
    level = 'neutral';
  } else if (dailyValuePercent >= 20) {
    label = 'High contribution';
    level = 'positive';
  }

  let context = null;

  if (
    profile?.id === 'fitness' ||
    profile?.id === 'muscle_building'
  ) {
    context =
      'Active individuals generally have higher protein needs than sedentary adults.';
  }

  return {
    label,
    level,
    reference: `≈${dailyValuePercent}% of the 50g/day protein Daily Value`,
    context
  };
}


// ------------------------------------------------------------
// Added Sugar
// ------------------------------------------------------------

function describeAddedSugar(value) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  const grams = Number(value);

  if (!Number.isFinite(grams)) {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  /*
   * FDA Daily Value:
   * 50 g added sugar/day.
   */
  const dailyValuePercent = Math.round(
    (grams / 50) * 100
  );

  let label = 'Moderate contribution';
  let level = 'neutral';

  if (dailyValuePercent <= 5) {
    label = 'Low contribution';
    level = 'positive';
  } else if (dailyValuePercent >= 20) {
    label = 'High contribution';
    level = 'attention';
  }

  return {
    label,
    level,
    reference: `≈${dailyValuePercent}% of the 50g/day added-sugar Daily Value`
  };
}


// ------------------------------------------------------------
// Sodium
// ------------------------------------------------------------

function describeSodium(
  value,
  profile = { id: 'general' }
) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  const mg = Number(value);

  if (!Number.isFinite(mg)) {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  /*
   * WHO adult recommendation:
   * less than 2,000 mg sodium/day.
   *
   * This is a population-level reference, not a personalized
   * medical sodium prescription.
   */
  const referencePercent = Math.round(
    (mg / 2000) * 100
  );

  let label = 'Small contribution';
  let level = 'neutral';

  if (referencePercent >= 20) {
    label = 'Substantial contribution';
    level = 'attention';
  } else if (referencePercent >= 5) {
    label = 'Meaningful contribution';
    level = 'neutral';
  }

  let context = null;

  if (profile?.id === 'low_sodium') {
    context =
      'Your selected profile places greater emphasis on sodium intake.';
  } else if (profile?.id === 'fitness') {
    context =
      'Heavy exercise and substantial sweating can affect individual sodium needs.';
  }

  return {
    label,
    level,
    reference: `≈${referencePercent}% of the 2,000mg/day WHO adult reference`,
    context
  };
}


// ------------------------------------------------------------
// Saturated Fat
// ------------------------------------------------------------

function describeSaturatedFat(value) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  const grams = Number(value);

  if (!Number.isFinite(grams)) {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  /*
   * FDA Daily Value:
   * 20 g saturated fat/day.
   */
  const dailyValuePercent = Math.round(
    (grams / 20) * 100
  );

  let label = 'Moderate contribution';
  let level = 'neutral';

  if (dailyValuePercent <= 5) {
    label = 'Low contribution';
    level = 'positive';
  } else if (dailyValuePercent >= 20) {
    label = 'High contribution';
    level = 'attention';
  }

  return {
    label,
    level,
    reference: `≈${dailyValuePercent}% of the 20g/day saturated-fat Daily Value`
  };
}


// ------------------------------------------------------------
// Total Fat
// ------------------------------------------------------------

function describeTotalFat(
  value,
  calories
) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  const grams = Number(value);

  if (!Number.isFinite(grams)) {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  const result = {
    label: 'Present',
    level: 'neutral',
    reference: null
  };

  /*
   * Fat provides approximately 9 kcal per gram.
   *
   * When calories are available, show the proportion of the
   * serving's calories coming from fat.
   */
  const kcal = Number(calories);

  if (Number.isFinite(kcal) && kcal > 0) {
    const percentCalories = Math.round(
      ((grams * 9) / kcal) * 100
    );

    result.reference =
      `≈${percentCalories}% of this serving's calories from fat`;
  }

  return result;
}


// ------------------------------------------------------------
// Carbohydrates
// ------------------------------------------------------------

function describeCarbohydrates(
  value,
  calories
) {
  if (value == null || value === '') {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  const grams = Number(value);

  if (!Number.isFinite(grams)) {
    return {
      label: 'Not available',
      level: 'neutral',
      reference: null
    };
  }

  const result = {
    label: 'Present',
    level: 'neutral',
    reference: null
  };

  /*
   * Carbohydrate provides approximately 4 kcal per gram.
   *
   * We show its contribution to the serving's energy rather
   * than calling an arbitrary number of grams "high".
   */
  const kcal = Number(calories);

  if (Number.isFinite(kcal) && kcal > 0) {
    const percentCalories = Math.round(
      ((grams * 4) / kcal) * 100
    );

    result.reference =
      `≈${percentCalories}% of this serving's calories from carbohydrates`;
  }

  return result;
}