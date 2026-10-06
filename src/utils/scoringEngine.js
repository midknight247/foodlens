/**
 * Centralized deterministic FoodLens scoring engine.
 * Computes an objective 0–100 health score based on extracted nutrition and ingredient data.
 *
 * Scoring Philosophy:
 * - Base score starts at a balanced 65 points.
 * - Positive Points:
 *   + Dietary Fiber: +2.5 points per gram (up to +15)
 *   + Protein: +1.5 points per gram (up to +15)
 *   + Whole food / clean ingredients: +1.5 points per whole food (up to +9)
 * - Negative Deductions:
 *   - Added Sugar: -2.0 points per gram (higher penalty if >10g)
 *   - Sodium: -1.0 point for every 50mg above 140mg (up to -20)
 *   - Saturated Fat: -2.5 points per gram above 2g (up to -15)
 *   - Functional Synthetic Additives: -3.5 points per identified additive (up to -18)
 * - Result is clamped between 15 and 98 points.
 */

export function calculateFoodScore(nutrition = {}, ingredients = [], profile = { id: 'general' }) {
  let score = 65;
  const breakdown = [];

  const protein = Number(nutrition.protein) || 0;
  const fiber = Number(nutrition.fiber) || 0;
  const addedSugar = Number(nutrition.addedSugar) || (Number(nutrition.totalSugar) ? Math.max(0, Number(nutrition.totalSugar) - 2) : 0);
  const saturatedFat = Number(nutrition.saturatedFat) || (Number(nutrition.totalFat) ? Number(nutrition.totalFat) * 0.4 : 0);
  const sodium = Number(nutrition.sodium) || 0;

  // Profile-specific weight adjustments
  const isFitness = profile?.id === 'fitness';
  const isChild = profile?.id === 'child';
  const isLowSodium = profile?.id === 'low_sodium';

  // 1. Dietary Fiber (Positive)
  if (fiber > 0) {
    const fiberBonus = Math.min(15, fiber * (isFitness ? 3.0 : 2.5));
    score += fiberBonus;
    breakdown.push({ label: 'Dietary Fiber', points: +Math.round(fiberBonus), positive: true });
  }

  // 2. Protein (Positive)
  if (protein > 0) {
    const proteinBonus = Math.min(15, protein * (isFitness ? 2.5 : 1.5));
    score += proteinBonus;
    breakdown.push({ label: 'Dietary Protein', points: +Math.round(proteinBonus), positive: true });
  }

  // 3. Whole Food Ingredients (Positive)
  const wholeFoodsCount = ingredients.filter(i => 
    i.status === 'Whole food' || 
    i.category === 'Whole grain' ||
    ['oats', 'almonds', 'chia', 'milk', 'fruit', 'berries', 'seeds'].some(k => i.name.toLowerCase().includes(k))
  ).length;

  if (wholeFoodsCount > 0) {
    const wholeFoodBonus = Math.min(10, wholeFoodsCount * 2);
    score += wholeFoodBonus;
    breakdown.push({ label: 'Whole Food Ingredients', points: +Math.round(wholeFoodBonus), positive: true });
  }

  // 4. Added Sugar (Negative Deduction)
  if (addedSugar > 0) {
    const sugarPenaltyRate = isChild ? 2.8 : 2.0;
    const sugarDeduction = Math.min(30, addedSugar * sugarPenaltyRate);
    score -= sugarDeduction;
    breakdown.push({ label: 'Added Sugars', points: -Math.round(sugarDeduction), positive: false });
  }

  // 5. Sodium (Negative Deduction above 140mg benchmark)
  if (sodium > 140) {
    const sodiumRate = isLowSodium ? 1.5 : 1.0;
    const sodiumDeduction = Math.min(22, ((sodium - 140) / 50) * sodiumRate);
    score -= sodiumDeduction;
    breakdown.push({ label: 'Sodium (>140mg)', points: -Math.round(sodiumDeduction), positive: false });
  }

  // 6. Saturated Fat (Negative Deduction above 2g benchmark)
  if (saturatedFat > 2) {
    const satFatDeduction = Math.min(16, (saturatedFat - 2) * 2.5);
    score -= satFatDeduction;
    breakdown.push({ label: 'Saturated Fat', points: -Math.round(satFatDeduction), positive: false });
  }

  // 7. Synthetic / Functional Additives (Negative Deduction)
  const additivesCount = ingredients.filter(i => 
    i.code || 
    ['Emulsifier', 'Preservative', 'Acidity regulator', 'Flavour enhancer', 'Colour', 'Thickener'].includes(i.category)
  ).length;

  if (additivesCount > 0) {
    const additivePenalty = isChild ? 4.5 : 3.5;
    const additiveDeduction = Math.min(18, additivesCount * additivePenalty);
    score -= additiveDeduction;
    breakdown.push({ label: 'Functional Additives', points: -Math.round(additiveDeduction), positive: false });
  }

  // Final score clamping
  const finalScore = Math.max(15, Math.min(96, Math.round(score)));

  let scoreLabel = 'Eat in Moderation';
  let scoreColor = 'amber';
  let verdict = 'Eat in Moderation — Contains high added sugars, saturated fats, or multiple industrial additives.';

  if (finalScore >= 75) {
    scoreLabel = 'Great Choice';
    scoreColor = 'emerald';
    verdict = 'Great Choice — Nutrient-dense food with clean ingredients and minimal refined additives.';
  } else if (finalScore >= 58) {
    scoreLabel = 'Good Choice';
    scoreColor = 'emerald';
    verdict = 'Good Choice — Moderate nutritional balance with a reasonable ingredient profile.';
  }

  return {
    score: finalScore,
    scoreLabel,
    scoreColor,
    verdict,
    breakdown,
    disclaimer: 'An informational score based on the nutrition and ingredient information available from this label.'
  };
}
