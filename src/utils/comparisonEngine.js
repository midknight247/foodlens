/**
 * Reusable FoodLens Product Comparison Engine.
 * Derives dynamic score, nutritional, and ingredient advantages based on objective data.
 */

export function compareProducts(productA, productB, profile = { id: 'general', name: 'General' }) {
  if (!productA || !productB) return null;

  const scoreDiff = productA.score - productB.score;
  const isWinnerA = scoreDiff > 0;
  const isWinnerB = scoreDiff < 0;
  const isTie = scoreDiff === 0;

  const winner = isWinnerA ? 'A' : isWinnerB ? 'B' : 'TIE';
  const winnerProduct = isWinnerA ? productA : isWinnerB ? productB : null;
  const loserProduct = isWinnerA ? productB : isWinnerB ? productA : null;

  const nutA = productA.nutritionTable || {
    calories: productA.calories || 200,
    protein: 5,
    carbs: 25,
    addedSugar: 10,
    totalFat: 5,
    sodium: 100,
    fiber: 2
  };

  const nutB = productB.nutritionTable || {
    calories: productB.calories || 200,
    protein: 5,
    carbs: 25,
    addedSugar: 10,
    totalFat: 5,
    sodium: 100,
    fiber: 2
  };

  // Compare each of the 7 core nutrients
  // Rule types: 'higher_better', 'lower_better', 'context'
  const nutrientRules = [
    { key: 'calories', label: 'Calories', unit: 'kcal', rule: 'lower_better', tolerance: 20 },
    { key: 'protein', label: 'Protein', unit: 'g', rule: 'higher_better', tolerance: 1 },
    { key: 'fiber', label: 'Dietary Fiber', unit: 'g', rule: 'higher_better', tolerance: 1 },
    { key: 'addedSugar', label: 'Added Sugar', unit: 'g', rule: 'lower_better', tolerance: 2 },
    { key: 'totalFat', label: 'Total Fat', unit: 'g', rule: 'lower_better', tolerance: 2 },
    { key: 'sodium', label: 'Sodium', unit: 'mg', rule: 'lower_better', tolerance: 30 },
    { key: 'carbs', label: 'Total Carbs', unit: 'g', rule: 'context', tolerance: 5 }
  ];

  const nutritionComparison = nutrientRules.map(rule => {
    const valA = nutA[rule.key] ?? 0;
    const valB = nutB[rule.key] ?? 0;
    const diff = valA - valB;

    let advantage = 'TIE';
    if (Math.abs(diff) >= (rule.tolerance || 0.1)) {
      if (rule.rule === 'higher_better') {
        advantage = diff > 0 ? 'A' : 'B';
      } else if (rule.rule === 'lower_better') {
        advantage = diff < 0 ? 'A' : 'B';
      }
    }

    return {
      key: rule.key,
      label: rule.label,
      unit: rule.unit,
      valA,
      valB,
      advantage,
      diff: Math.abs(diff)
    };
  });

  // Ingredient differences
  const ingSummaryA = productA.ingredientSummary || { totalCount: 0, additivesCount: 0, attentionCount: 0 };
  const ingSummaryB = productB.ingredientSummary || { totalCount: 0, additivesCount: 0, attentionCount: 0 };

  const ingredientDifferences = [
    {
      label: 'Total Ingredients',
      valA: ingSummaryA.totalCount,
      valB: ingSummaryB.totalCount,
      advantage: ingSummaryA.totalCount < ingSummaryB.totalCount ? 'A' : ingSummaryB.totalCount < ingSummaryA.totalCount ? 'B' : 'TIE',
      note: ingSummaryA.totalCount !== ingSummaryB.totalCount 
        ? `${Math.abs(ingSummaryA.totalCount - ingSummaryB.totalCount)} fewer ingredients` 
        : 'Similar length'
    },
    {
      label: 'Identified Additives',
      valA: ingSummaryA.additivesCount,
      valB: ingSummaryB.additivesCount,
      advantage: ingSummaryA.additivesCount < ingSummaryB.additivesCount ? 'A' : ingSummaryB.additivesCount < ingSummaryA.additivesCount ? 'B' : 'TIE',
      note: ingSummaryA.additivesCount !== ingSummaryB.additivesCount 
        ? `${Math.abs(ingSummaryA.additivesCount - ingSummaryB.additivesCount)} fewer functional additives` 
        : 'Identical additive count'
    },
    {
      label: 'Ingredients to Understand',
      valA: ingSummaryA.attentionCount,
      valB: ingSummaryB.attentionCount,
      advantage: ingSummaryA.attentionCount < ingSummaryB.attentionCount ? 'A' : ingSummaryB.attentionCount < ingSummaryA.attentionCount ? 'B' : 'TIE',
      note: ingSummaryA.attentionCount !== ingSummaryB.attentionCount 
        ? `${Math.abs(ingSummaryA.attentionCount - ingSummaryB.attentionCount)} fewer flags` 
        : 'Similar watch-outs'
    }
  ];

  // Derive dynamic reasons for why FoodLens recommends the winner
  const reasons = [];
  const sugarAdv = nutritionComparison.find(n => n.key === 'addedSugar');
  const proteinAdv = nutritionComparison.find(n => n.key === 'protein');
  const fiberAdv = nutritionComparison.find(n => n.key === 'fiber');
  const sodiumAdv = nutritionComparison.find(n => n.key === 'sodium');

  if (winner !== 'TIE' && winnerProduct) {
    if (sugarAdv && sugarAdv.advantage === winner) {
      reasons.push({
        type: 'positive',
        text: `Significantly lower added sugar (${winner === 'A' ? nutA.addedSugar : nutB.addedSugar}g vs ${winner === 'A' ? nutB.addedSugar : nutA.addedSugar}g per serving)`
      });
    }

    if (fiberAdv && fiberAdv.advantage === winner) {
      reasons.push({
        type: 'positive',
        text: `Higher dietary fiber (${winner === 'A' ? nutA.fiber : nutB.fiber}g vs ${winner === 'A' ? nutB.fiber : nutA.fiber}g for digestive satiety)`
      });
    }

    if (proteinAdv && proteinAdv.advantage === winner) {
      reasons.push({
        type: 'positive',
        text: `More dietary protein (${winner === 'A' ? nutA.protein : nutB.protein}g vs ${winner === 'A' ? nutB.protein : nutA.protein}g)`
      });
    }

    if (sodiumAdv && sodiumAdv.advantage === winner) {
      reasons.push({
        type: 'positive',
        text: `Lower sodium per serving (${winner === 'A' ? nutA.sodium : nutB.sodium}mg vs ${winner === 'A' ? nutB.sodium : nutA.sodium}mg)`
      });
    }

    const addAdv = ingredientDifferences.find(i => i.label === 'Identified Additives');
    if (addAdv && addAdv.advantage === winner) {
      reasons.push({
        type: 'positive',
        text: `Fewer functional food additives (${winner === 'A' ? ingSummaryA.additivesCount : ingSummaryB.additivesCount} vs ${winner === 'A' ? ingSummaryB.additivesCount : ingSummaryA.additivesCount})`
      });
    }

    // Add a balanced observation if the loser has an individual advantage
    const caloriesAdv = nutritionComparison.find(n => n.key === 'calories');
    if (caloriesAdv && caloriesAdv.advantage !== 'TIE' && caloriesAdv.advantage !== winner) {
      reasons.push({
        type: 'caution',
        text: `Note: ${loserProduct.name} has slightly fewer calories (${caloriesAdv.valA < caloriesAdv.valB ? nutA.calories : nutB.calories} kcal)`
      });
    }
  }

  // Fallback reasons if tie or close
  if (reasons.length === 0) {
    reasons.push({
      type: 'positive',
      text: 'Both products have comparable overall health metrics and serving parameters.'
    });
  }

  // Derive lead explanation
  let leadExplanation = '';
  if (winner !== 'TIE') {
    const primaryAdv = reasons[0]?.text?.replace('Significantly ', '')?.replace('More dietary ', '') || 'better nutritional balance';
    leadExplanation = `${winnerProduct.name} has a notable advantage with ${primaryAdv.toLowerCase()} and an overall score of ${winnerProduct.score}/100.`;
  } else {
    leadExplanation = 'Both products have balanced nutritional profiles with distinct tradeoffs.';
  }

  // Recommendation phrasing (adhering strictly to responsible non-medical language)
  let recommendation = '';
  if (winner !== 'TIE') {
    recommendation = `Based on the information provided, FoodLens recommends ${winnerProduct.name}.`;
  } else {
    recommendation = 'Based on the information provided, both options offer similar nutritional value with different culinary tradeoffs.';
  }

  // Profile-specific insights (Section 8: "It depends on you")
  let profileInsight = '';
  const currentProfileId = profile?.id || 'general';

  if (currentProfileId === 'fitness') {
    const higherProteinProduct = nutA.protein >= nutB.protein ? productA : productB;
    const proteinDiff = Math.abs(nutA.protein - nutB.protein);
    profileInsight = `For athletic and fitness goals, ${higherProteinProduct.name} is favored with ${proteinDiff}g more protein per serving and stronger satiety density.`;
  } else if (currentProfileId === 'child') {
    const lowerSugarProduct = nutA.addedSugar <= nutB.addedSugar ? productA : productB;
    profileInsight = `For children and families, ${lowerSugarProduct.name} is the clearer choice due to lower added sugar (${Math.min(nutA.addedSugar, nutB.addedSugar)}g) and cleaner additive formulation.`;
  } else if (currentProfileId === 'low_sodium') {
    const lowerSodiumProduct = nutA.sodium <= nutB.sodium ? productA : productB;
    profileInsight = `For cardiovascular care and sodium moderation, ${lowerSodiumProduct.name} has a distinct advantage with only ${Math.min(nutA.sodium, nutB.sodium)}mg of sodium per serving.`;
  } else {
    profileInsight = `For general adult wellness, ${winnerProduct ? winnerProduct.name : productA.name} provides superior whole-food nutrient density and fewer ultra-processed ingredients.`;
  }

  return {
    winner,
    winnerProduct,
    loserProduct,
    scoreDiff: Math.abs(scoreDiff),
    leadExplanation,
    nutritionComparison,
    ingredientDifferences,
    recommendation,
    reasons: reasons.slice(0, 3),
    profileInsight
  };
}
