/**
 * Server-side validation and sanitization for FoodLens AI food-label extraction.
 *
 * Important:
 * Missing/unreadable nutrition values remain null.
 * We NEVER convert missing data into 0 because that would create false
 * nutritional information and distort the FoodLens score.
 */

export function validateAndSanitizeAiResponse(rawJson) {
  if (!rawJson || typeof rawJson !== 'object') {
    return {
      valid: false,
      error: 'Invalid response format received from AI model.'
    };
  }

  if (rawJson.isFoodLabel === false) {
    return {
      valid: false,
      error:
        rawJson.unreadableReason ||
        'The uploaded photo does not appear to contain a clear food label or nutrition facts table.'
    };
  }

  // Product metadata
  const rawProduct = rawJson.product || {};

  const product = {
    name:
      typeof rawProduct.name === 'string' && rawProduct.name.trim()
        ? rawProduct.name.trim()
        : 'Packaged Food Item',

    brand:
      typeof rawProduct.brand === 'string' && rawProduct.brand.trim()
        ? rawProduct.brand.trim()
        : 'Brand Unspecified',

    category:
      typeof rawProduct.category === 'string' && rawProduct.category.trim()
        ? rawProduct.category.trim()
        : 'Grocery Item',

    servingSize:
      typeof rawProduct.servingSize === 'string' &&
      rawProduct.servingSize.trim()
        ? rawProduct.servingSize.trim()
        : 'Serving size not clearly visible',

    energyKcal: parseNumeric(rawProduct.energyKcal)
  };

  // Nutrition values.
  // IMPORTANT: missing values stay null instead of becoming zero.
  const rawNut = rawJson.nutrition || {};

  const nutrition = {
    calories: parseNumeric(rawNut.calories) ?? product.energyKcal,

    protein: parseNumeric(rawNut.protein),

    carbohydrates:
      parseNumeric(rawNut.carbohydrates) ??
      parseNumeric(rawNut.carbs),

    totalFat:
      parseNumeric(rawNut.totalFat) ??
      parseNumeric(rawNut.fat),

    saturatedFat:
      parseNumeric(rawNut.saturatedFat) ??
      parseNumeric(rawNut.satFat),

    fiber: parseNumeric(rawNut.fiber),

    totalSugar:
      parseNumeric(rawNut.totalSugar) ??
      parseNumeric(rawNut.sugar),

    addedSugar: parseNumeric(rawNut.addedSugar),

    sodium: parseNumeric(rawNut.sodium)
  };

  // Ingredients
  const rawIngredients = Array.isArray(rawJson.ingredients)
    ? rawJson.ingredients
    : [];

  const ingredients = rawIngredients
    .map((item, index) => {
      if (typeof item === 'string') {
        return {
          id: `ai-ing-${index + 1}`,
          name: item.trim(),
          code: null,
          category: 'Ingredient',
          explanation: 'Extracted food ingredient.',
          purpose: 'Component of recipe formulation.',
          status: 'Commonly used',
          note:
            'Presence alone does not determine whether a product is healthy or unhealthy.'
        };
      }

      return {
        id: `ai-ing-${index + 1}`,

        name:
          typeof item.name === 'string' && item.name.trim()
            ? item.name.trim()
            : `Ingredient ${index + 1}`,

        code:
          typeof item.code === 'string' && item.code.trim()
            ? item.code.trim()
            : null,

        category:
          typeof item.category === 'string' && item.category.trim()
            ? item.category.trim()
            : 'Ingredient',

        explanation:
          typeof item.explanation === 'string' && item.explanation.trim()
            ? item.explanation.trim()
            : 'Ingredient extracted from package label.',

        purpose:
          typeof item.purpose === 'string' && item.purpose.trim()
            ? item.purpose.trim()
            : 'Contributes to product composition and taste.',

        status:
          typeof item.status === 'string' && item.status.trim()
            ? item.status.trim()
            : 'Commonly used',

        note:
          typeof item.note === 'string' && item.note.trim()
            ? item.note.trim()
            : 'Presence alone does not determine whether a product is healthy or unhealthy.'
      };
    })
    .filter((item) => item.name);

  // Qualitative analysis
  const rawAnalysis = rawJson.analysis || {};

  const positives = Array.isArray(rawAnalysis.positives)
    ? rawAnalysis.positives.filter(
        (p) => typeof p === 'string' && p.trim()
      )
    : [];

  const concerns = Array.isArray(rawAnalysis.concerns)
    ? rawAnalysis.concerns.filter(
        (c) => typeof c === 'string' && c.trim()
      )
    : [];

  const attentionPoints = Array.isArray(rawAnalysis.attentionPoints)
    ? rawAnalysis.attentionPoints.filter(
        (a) => typeof a === 'string' && a.trim()
      )
    : [];

  // Summary counts
  const additivesCount = ingredients.filter(
    (i) =>
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

  const attentionCount = ingredients.filter(
    (i) =>
      ['Worth checking', 'Worth understanding'].includes(i.status) ||
      ['Sweetener', 'Preservative'].includes(i.category)
  ).length;

  return {
    valid: true,

    data: {
      product,

      nutrition,

      ingredientsRaw:
        typeof rawJson.ingredientsRaw === 'string'
          ? rawJson.ingredientsRaw
          : '',

      ingredients,

      analysis: {
        verdict:
          typeof rawAnalysis.verdict === 'string'
            ? rawAnalysis.verdict
            : '',

        positives,
        concerns,
        attentionPoints
      },

      ingredientSummary: {
        totalCount: ingredients.length,
        additivesCount,
        attentionCount,
        summaryText: `${ingredients.length} ingredients with ${additivesCount} identified functional additives.`
      }
    }
  };
}

/**
 * Safely parses numbers from strings or numbers.
 *
 * Examples:
 * "6g" -> 6
 * "180 mg" -> 180
 * "24" -> 24
 * null -> null
 * "Unknown" -> null
 */
function parseNumeric(val) {
  if (typeof val === 'number') {
    return Number.isFinite(val) ? val : null;
  }

  if (typeof val === 'string') {
    const cleaned = val
      .replace(/,/g, '')
      .replace(/[^0-9.-]/g, '');

    if (!cleaned) return null;

    const num = parseFloat(cleaned);

    return Number.isFinite(num) ? num : null;
  }

  return null;
}