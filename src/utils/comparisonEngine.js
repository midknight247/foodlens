/**
 * Reusable Labelicious Product Comparison Engine.
 *
 * Comparison philosophy:
 * - Per serving answers: "What am I actually consuming?"
 * - Per 100g answers: "Which product is more concentrated/dense?"
 * - Never convert missing values into zero.
 * - Never compare incompatible nutrition bases.
 * - Use the Labelicious score as one signal, not the sole explanation.
 */

export function compareProducts(
  productA,
  productB,
  profile = { id: 'general', name: 'General' }
) {
  if (!productA || !productB) return null;

  const scoreA = Number.isFinite(productA.score) ? productA.score : null;
  const scoreB = Number.isFinite(productB.score) ? productB.score : null;

  const scoreDiff =
    scoreA != null && scoreB != null
      ? scoreA - scoreB
      : 0;

  const isWinnerA = scoreDiff > 0;
  const isWinnerB = scoreDiff < 0;
  const isTie = scoreDiff === 0;

  const winner = isWinnerA ? 'A' : isWinnerB ? 'B' : 'TIE';
  const winnerProduct = isWinnerA ? productA : isWinnerB ? productB : null;
  const loserProduct = isWinnerA ? productB : isWinnerB ? productA : null;

  /*
   * ---------------------------------------------------------
   * Nutrition sources
   * ---------------------------------------------------------
   *
   * New Labelicious products contain:
   *
   * nutritionPerServing
   * nutritionPer100g
   *
   * Older products may only contain nutritionTable.
   *
   * nutritionTable is treated as per-serving data for
   * backwards compatibility.
   */

  const nutritionPerServingA =
    productA.nutritionPerServing ||
    productA.nutritionTable ||
    {};

  const nutritionPerServingB =
    productB.nutritionPerServing ||
    productB.nutritionTable ||
    {};

  const nutritionPer100gA =
    productA.nutritionPer100g ||
    {};

  const nutritionPer100gB =
    productB.nutritionPer100g ||
    {};

  /*
   * ---------------------------------------------------------
   * Core nutrient definitions
   * ---------------------------------------------------------
   */

  const nutrientRules = [
    {
      key: 'calories',
      label: 'Calories',
      unit: 'kcal',
      rule: 'lower_better'
    },
    {
      key: 'protein',
      label: 'Protein',
      unit: 'g',
      rule: 'higher_better'
    },
    {
      key: 'fiber',
      label: 'Dietary Fiber',
      unit: 'g',
      rule: 'higher_better'
    },
    {
      key: 'addedSugar',
      label: 'Added Sugar',
      unit: 'g',
      rule: 'lower_better'
    },
    {
      key: 'totalFat',
      label: 'Total Fat',
      unit: 'g',
      rule: 'context'
    },
    {
      key: 'saturatedFat',
      label: 'Saturated Fat',
      unit: 'g',
      rule: 'lower_better'
    },
    {
      key: 'sodium',
      label: 'Sodium',
      unit: 'mg',
      rule: 'lower_better'
    },
    {
      key: 'carbs',
      label: 'Total Carbohydrates',
      unit: 'g',
      rule: 'context'
    }
  ];

  /*
   * ---------------------------------------------------------
   * Comparison helper
   * ---------------------------------------------------------
   */

  function compareNutritionValues(
    nutritionA,
    nutritionB,
    basis
  ) {
    return nutrientRules.map(rule => {
      const valA = getNutrientValue(nutritionA, rule.key);
      const valB = getNutrientValue(nutritionB, rule.key);

      const advantage = determineAdvantage(
        valA,
        valB,
        rule.rule
      );

      return {
        key: rule.key,
        label: rule.label,
        unit: rule.unit,
        basis,
        valA,
        valB,
        advantage,
        diff:
          valA != null && valB != null
            ? Math.abs(valA - valB)
            : null
      };
    });
  }

  /*
   * Primary comparison:
   * What does the person actually consume in one serving?
   */

  const perServingComparison = compareNutritionValues(
    nutritionPerServingA,
    nutritionPerServingB,
    'perServing'
  );

  /*
   * Normalized comparison:
   * Which product is more concentrated per 100g?
   */

  const per100gComparison = compareNutritionValues(
    nutritionPer100gA,
    nutritionPer100gB,
    'per100g'
  );

  /*
   * Keep the existing property name for Compatibility with
   * ComparisonPage.jsx.
   *
   * Per-serving remains the primary comparison because that
   * represents actual consumption.
   */

  const nutritionComparison = perServingComparison;

  /*
   * ---------------------------------------------------------
   * Ingredient differences
   * ---------------------------------------------------------
   */

  const ingSummaryA = productA.ingredientSummary || {
    totalCount: null,
    additivesCount: null,
    attentionCount: null
  };

  const ingSummaryB = productB.ingredientSummary || {
    totalCount: null,
    additivesCount: null,
    attentionCount: null
  };

  const ingredientDifferences = [
    buildIngredientComparison(
      'Total Ingredients',
      ingSummaryA.totalCount,
      ingSummaryB.totalCount,
      'Similar ingredient-list length'
    ),

    buildIngredientComparison(
      'Identified Additives',
      ingSummaryA.additivesCount,
      ingSummaryB.additivesCount,
      'Similar identified additive count'
    ),

    buildIngredientComparison(
      'Ingredients to Understand',
      ingSummaryA.attentionCount,
      ingSummaryB.attentionCount,
      'Similar number of ingredients worth understanding'
    )
  ];

  /*
   * ---------------------------------------------------------
   * Recommendation reasons
   * ---------------------------------------------------------
   *
   * Use per-serving nutrition first.
   */

  const reasons = [];

  const sugarServing = findComparison(
    perServingComparison,
    'addedSugar'
  );

  const sugar100g = findComparison(
    per100gComparison,
    'addedSugar'
  );

  const proteinServing = findComparison(
    perServingComparison,
    'protein'
  );

  const fiberServing = findComparison(
    perServingComparison,
    'fiber'
  );

  const sodiumServing = findComparison(
    perServingComparison,
    'sodium'
  );

  const caloriesServing = findComparison(
    perServingComparison,
    'calories'
  );

  if (winner !== 'TIE' && winnerProduct) {
    /*
     * Added sugar
     */

    if (
      sugarServing &&
      sugarServing.advantage === winner
    ) {
      reasons.push({
        type: 'positive',
        text: buildLowerBetterReason(
          'Lower added sugar per serving',
          sugarServing,
          winner
        )
      });
    }

    /*
     * Fiber
     */

    if (
      fiberServing &&
      fiberServing.advantage === winner
    ) {
      reasons.push({
        type: 'positive',
        text: buildHigherBetterReason(
          'Higher dietary fiber per serving',
          fiberServing,
          winner
        )
      });
    }

    /*
     * Protein
     */

    if (
      proteinServing &&
      proteinServing.advantage === winner
    ) {
      reasons.push({
        type: 'positive',
        text: buildHigherBetterReason(
          'Higher protein per serving',
          proteinServing,
          winner
        )
      });
    }

    /*
     * Sodium
     */

    if (
      sodiumServing &&
      sodiumServing.advantage === winner
    ) {
      reasons.push({
        type: 'positive',
        text: buildLowerBetterReason(
          'Lower sodium per serving',
          sodiumServing,
          winner
        )
      });
    }

    /*
     * Ingredient additives
     */

    const addAdv = ingredientDifferences.find(
      item => item.label === 'Identified Additives'
    );

    if (
      addAdv &&
      addAdv.advantage === winner
    ) {
      const winnerAdditives =
        winner === 'A'
          ? ingSummaryA.additivesCount
          : ingSummaryB.additivesCount;

      const loserAdditives =
        winner === 'A'
          ? ingSummaryB.additivesCount
          : ingSummaryA.additivesCount;

      if (
        winnerAdditives != null &&
        loserAdditives != null
      ) {
        reasons.push({
          type: 'positive',
          text: `Fewer identified functional additives (${winnerAdditives} vs ${loserAdditives})`
        });
      }
    }

    /*
     * Per-100g added-sugar density.
     *
     * This is intentionally a secondary reason because
     * per-serving consumption is the primary context.
     */

    if (
      sugar100g &&
      sugar100g.advantage === winner &&
      sugar100g.valA != null &&
      sugar100g.valB != null
    ) {
      const winnerSugar =
        winner === 'A'
          ? sugar100g.valA
          : sugar100g.valB;

      const loserSugar =
        winner === 'A'
          ? sugar100g.valB
          : sugar100g.valA;

      reasons.push({
        type: 'positive',
        text: `Also lower in added sugar per 100g (${formatValue(winnerSugar, 1)}g vs ${formatValue(loserSugar, 1)}g)`
      });
    }

    /*
     * If the winner has no obvious nutrient advantage but the
     * score is higher, explain that the score reflects multiple
     * extracted factors.
     */

    if (reasons.length === 0) {
      reasons.push({
        type: 'positive',
        text: `${winnerProduct.name} has the higher overall Labelicious score (${winnerProduct.score}/100), based on the extracted nutrition and ingredient information.`
      });
    }

    /*
     * Balanced observation:
     * show an individual advantage held by the other product.
     */

    if (
      caloriesServing &&
      caloriesServing.advantage !== 'TIE' &&
      caloriesServing.advantage !== winner
    ) {
      const loserCalories =
        caloriesServing.advantage === 'A'
          ? caloriesServing.valA
          : caloriesServing.valB;

      if (loserCalories != null) {
        reasons.push({
          type: 'caution',
          text: `${loserProduct.name} has fewer calories per serving (${formatValue(loserCalories, 1)} kcal).`
        });
      }
    }
  }

  /*
   * If products are tied or there is not enough information,
   * do not manufacture an advantage.
   */

  if (reasons.length === 0) {
    reasons.push({
      type: 'positive',
      text:
        'The available nutrition and ingredient information does not show a clear advantage between the two products.'
    });
  }

  /*
   * ---------------------------------------------------------
   * Lead explanation
   * ---------------------------------------------------------
   */

  let leadExplanation = '';

  if (winner !== 'TIE' && winnerProduct) {
    const primaryReason =
      reasons.find(reason => reason.type === 'positive')?.text ||
      'a stronger overall nutritional profile';

    leadExplanation =
      `${winnerProduct.name} has the stronger overall Labelicious result. ${primaryReason}`;
  } else {
    leadExplanation =
      'Both products have different nutritional tradeoffs, and the available information does not show a clear overall winner.';
  }

  /*
   * ---------------------------------------------------------
   * Recommendation
   * ---------------------------------------------------------
   */

  let recommendation = '';

  if (winner !== 'TIE' && winnerProduct) {
    recommendation =
      `Based on the available label information, Labelicious recommends ${winnerProduct.name}.`;
  } else {
    recommendation =
      'Based on the available label information, neither product has a clear overall advantage.';
  }

  /*
   * ---------------------------------------------------------
   * Profile-specific interpretation
   * ---------------------------------------------------------
   *
   * These are contextual observations, not medical claims.
   */

  const currentProfileId = profile?.id || 'general';

  let profileInsight = '';

  if (currentProfileId === 'fitness') {
    const proteinAdvantage =
      proteinServing?.advantage;

    if (proteinAdvantage === 'A') {
      profileInsight =
        `${productA.name} provides more protein per serving, which may be relevant when comparing products for higher-protein eating patterns.`;
    } else if (proteinAdvantage === 'B') {
      profileInsight =
        `${productB.name} provides more protein per serving, which may be relevant when comparing products for higher-protein eating patterns.`;
    } else {
      profileInsight =
        'The products provide similar protein per serving based on the available label data.';
    }
  } else if (currentProfileId === 'child') {
    const sugarAdvantage =
      sugarServing?.advantage;

    if (sugarAdvantage === 'A') {
      profileInsight =
        `${productA.name} has less added sugar per serving.`;
    } else if (sugarAdvantage === 'B') {
      profileInsight =
        `${productB.name} has less added sugar per serving.`;
    } else {
      profileInsight =
        'The products have similar added sugar per serving based on the available label data.';
    }
  } else if (currentProfileId === 'low_sodium') {
    const sodiumAdvantage =
      sodiumServing?.advantage;

    if (sodiumAdvantage === 'A') {
      profileInsight =
        `${productA.name} has less sodium per serving.`;
    } else if (sodiumAdvantage === 'B') {
      profileInsight =
        `${productB.name} has less sodium per serving.`;
    } else {
      profileInsight =
        'The products have similar sodium per serving based on the available label data.';
    }
  } else {
    profileInsight =
      winnerProduct
        ? `${winnerProduct.name} has the stronger overall result based on the available nutrition and ingredient information.`
        : 'The products have different nutritional tradeoffs with no clear overall winner.';
  }

  /*
   * ---------------------------------------------------------
   * Final comparison object
   * ---------------------------------------------------------
   */

  return {
    winner,
    winnerProduct,
    loserProduct,

    scoreDiff:
      scoreA != null && scoreB != null
        ? Math.abs(scoreDiff)
        : 0,

    leadExplanation,

    /*
     * Existing UI compatibility:
     * nutritionComparison = per serving.
     */
    nutritionComparison,

    /*
     * New explicit comparison data.
     */
    perServingComparison,
    per100gComparison,

    /*
     * Useful metadata for the UI.
     */
    comparisonBasis: {
      primary: 'perServing',
      normalized: 'per100g'
    },

    ingredientDifferences,

    recommendation,

    reasons: reasons.slice(0, 3),

    profileInsight
  };
}

/*
 * -----------------------------------------------------------
 * Helpers
 * -----------------------------------------------------------
 */

function getNutrientValue(nutrition, key) {
  if (!nutrition) return null;

  const aliases = {
    carbs: ['carbs', 'carbohydrates'],
    calories: ['calories'],
    protein: ['protein'],
    fiber: ['fiber'],
    addedSugar: ['addedSugar'],
    totalFat: ['totalFat'],
    saturatedFat: ['saturatedFat'],
    sodium: ['sodium']
  };

  const possibleKeys = aliases[key] || [key];

  for (const possibleKey of possibleKeys) {
    const value = nutrition[possibleKey];

    if (
      typeof value === 'number' &&
      Number.isFinite(value)
    ) {
      return value;
    }
  }

  return null;
}

function determineAdvantage(
  valA,
  valB,
  rule
) {
  /*
   * Never compare missing data.
   */
  if (valA == null || valB == null) {
    return 'UNKNOWN';
  }

  /*
   * Exact equality.
   */
  if (valA === valB) {
    return 'TIE';
  }

  if (rule === 'higher_better') {
    return valA > valB ? 'A' : 'B';
  }

  if (rule === 'lower_better') {
    return valA < valB ? 'A' : 'B';
  }

  /*
   * Carbohydrates and total fat are contextual.
   * We don't declare one product automatically better
   * simply because the raw number is lower.
   */
  return 'CONTEXT';
}

function findComparison(
  comparison,
  key
) {
  return comparison.find(
    item => item.key === key
  );
}

function formatValue(
  value,
  decimals = 1
) {
  if (value == null) return 'Not available';

  return Number(value).toFixed(decimals).replace(/\.0$/, '');
}

function buildLowerBetterReason(
  label,
  comparison,
  winner
) {
  const winnerValue =
    winner === 'A'
      ? comparison.valA
      : comparison.valB;

  const otherValue =
    winner === 'A'
      ? comparison.valB
      : comparison.valA;

  return `${label} (${formatValue(winnerValue)}${comparison.unit} vs ${formatValue(otherValue)}${comparison.unit})`;
}

function buildHigherBetterReason(
  label,
  comparison,
  winner
) {
  const winnerValue =
    winner === 'A'
      ? comparison.valA
      : comparison.valB;

  const otherValue =
    winner === 'A'
      ? comparison.valB
      : comparison.valA;

  return `${label} (${formatValue(winnerValue)}${comparison.unit} vs ${formatValue(otherValue)}${comparison.unit})`;
}

function buildIngredientComparison(
  label,
  valA,
  valB,
  tieNote
) {
  let advantage = 'UNKNOWN';

  if (
    typeof valA === 'number' &&
    typeof valB === 'number'
  ) {
    if (valA < valB) {
      advantage = 'A';
    } else if (valB < valA) {
      advantage = 'B';
    } else {
      advantage = 'TIE';
    }
  }

  let note = tieNote;

  if (
    typeof valA === 'number' &&
    typeof valB === 'number' &&
    valA !== valB
  ) {
    const difference = Math.abs(valA - valB);

    note =
      `${difference} fewer ${label.toLowerCase()}`;
  }

  return {
    label,
    valA,
    valB,
    advantage,
    note
  };
}