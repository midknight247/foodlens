/**
 * Mock data for Labelicious development.
 * Represents packaged food analyses, demo labels, and structured ingredient intelligence.
 */

// Embedded SVG data URIs for demo label previews
const GRANOLA_LABEL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500" fill="%23FFFFFF"><rect width="400" height="500" fill="%23FAFAFA" stroke="%23E2E8F0" stroke-width="2" rx="16"/><rect x="20" y="20" width="360" height="460" fill="%23FFFFFF" stroke="%23CBD5E1" stroke-width="1.5" rx="8"/><text x="40" y="55" font-family="Arial,sans-serif" font-size="24" font-weight="900" fill="%230F172A">Nutrition Facts</text><line x1="40" y1="65" x2="360" y2="65" stroke="%230F172A" stroke-width="8"/><text x="40" y="85" font-family="Arial,sans-serif" font-size="13" fill="%23475569">About 8 servings per container</text><text x="40" y="103" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="%230F172A">Serving size: 1/2 cup (45g)</text><line x1="40" y1="112" x2="360" y2="112" stroke="%230F172A" stroke-width="4"/><text x="40" y="132" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="%230F172A">Amount per serving</text><text x="40" y="160" font-family="Arial,sans-serif" font-size="28" font-weight="900" fill="%230F172A">Calories 195</text><line x1="40" y1="172" x2="360" y2="172" stroke="%230F172A" stroke-width="5"/><text x="40" y="192" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="%230F172A">Total Fat 7g (9% DV)</text><line x1="40" y1="200" x2="360" y2="200" stroke="%23E2E8F0" stroke-width="1"/><text x="40" y="218" font-family="Arial,sans-serif" font-size="13" fill="%23475569">Saturated Fat 1g (5% DV)</text><line x1="40" y1="226" x2="360" y2="226" stroke="%23E2E8F0" stroke-width="1"/><text x="40" y="244" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="%230F172A">Total Carbohydrate 29g (11% DV)</text><line x1="40" y1="252" x2="360" y2="252" stroke="%23E2E8F0" stroke-width="1"/><text x="60" y="270" font-family="Arial,sans-serif" font-size="13" fill="%2310B981" font-weight="bold">Dietary Fiber 6g (21% DV)</text><line x1="40" y1="278" x2="360" y2="278" stroke="%23E2E8F0" stroke-width="1"/><text x="60" y="296" font-family="Arial,sans-serif" font-size="13" fill="%23475569">Total Sugars 4g (Includes 4g Added)</text><line x1="40" y1="304" x2="360" y2="304" stroke="%23E2E8F0" stroke-width="1"/><text x="40" y="322" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="%230F172A">Protein 7g</text><line x1="40" y1="334" x2="360" y2="334" stroke="%230F172A" stroke-width="3"/><text x="40" y="360" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="%230F172A">INGREDIENTS:</text><text x="40" y="380" font-family="Arial,sans-serif" font-size="11" fill="%23475569">Whole Grain Rolled Oats*, Raw Honey*,</text><text x="40" y="398" font-family="Arial,sans-serif" font-size="11" fill="%23475569">Almonds*, Chia Seeds*, Sea Salt, Cinnamon.</text><text x="40" y="425" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="%23D97706">CONTAINS: TREE NUTS (ALMONDS).</text></svg>`;

const COOKIES_LABEL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500" fill="%23FFFFFF"><rect width="400" height="500" fill="%23FAFAFA" stroke="%23E2E8F0" stroke-width="2" rx="16"/><rect x="20" y="20" width="360" height="460" fill="%23FFFFFF" stroke="%23CBD5E1" stroke-width="1.5" rx="8"/><text x="40" y="55" font-family="Arial,sans-serif" font-size="24" font-weight="900" fill="%230F172A">Nutrition Facts</text><line x1="40" y1="65" x2="360" y2="65" stroke="%230F172A" stroke-width="8"/><text x="40" y="85" font-family="Arial,sans-serif" font-size="13" fill="%23475569">6 servings per container</text><text x="40" y="103" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="%230F172A">Serving size: 3 cookies (38g)</text><line x1="40" y1="112" x2="360" y2="112" stroke="%230F172A" stroke-width="4"/><text x="40" y="132" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="%230F172A">Amount per serving</text><text x="40" y="160" font-family="Arial,sans-serif" font-size="28" font-weight="900" fill="%230F172A">Calories 210</text><line x1="40" y1="172" x2="360" y2="172" stroke="%230F172A" stroke-width="5"/><text x="40" y="192" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="%230F172A">Total Fat 9g (12% DV)</text><line x1="40" y1="200" x2="360" y2="200" stroke="%23E2E8F0" stroke-width="1"/><text x="60" y="218" font-family="Arial,sans-serif" font-size="13" fill="%23E11D48" font-weight="bold">Saturated Fat 5g (25% DV)</text><line x1="40" y1="226" x2="360" y2="226" stroke="%23E2E8F0" stroke-width="1"/><text x="40" y="244" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="%230F172A">Total Carbohydrate 26g (9% DV)</text><line x1="40" y1="252" x2="360" y2="252" stroke="%23E2E8F0" stroke-width="1"/><text x="60" y="270" font-family="Arial,sans-serif" font-size="13" fill="%23E11D48" font-weight="bold">Added Sugars 18g (36% DV)</text><line x1="40" y1="278" x2="360" y2="278" stroke="%23E2E8F0" stroke-width="1"/><text x="60" y="296" font-family="Arial,sans-serif" font-size="13" fill="%23475569">Dietary Fiber 0.5g (2% DV)</text><line x1="40" y1="304" x2="360" y2="304" stroke="%23E2E8F0" stroke-width="1"/><text x="40" y="322" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="%230F172A">Protein 2g</text><line x1="40" y1="334" x2="360" y2="334" stroke="%230F172A" stroke-width="3"/><text x="40" y="360" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="%230F172A">INGREDIENTS:</text><text x="40" y="380" font-family="Arial,sans-serif" font-size="11" fill="%23475569">Refined Wheat Flour, Sugar, Palm Oil,</text><text x="40" y="398" font-family="Arial,sans-serif" font-size="11" fill="%23475569">Cocoa Solids, High Fructose Corn Syrup,</text><text x="40" y="416" font-family="Arial,sans-serif" font-size="11" fill="%23475569">Emulsifier (INS 322, INS 471), Art. Flavor.</text></svg>`;

const YOGURT_LABEL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500" fill="%23FFFFFF"><rect width="400" height="500" fill="%23FAFAFA" stroke="%23E2E8F0" stroke-width="2" rx="16"/><rect x="20" y="20" width="360" height="460" fill="%23FFFFFF" stroke="%23CBD5E1" stroke-width="1.5" rx="8"/><text x="40" y="55" font-family="Arial,sans-serif" font-size="24" font-weight="900" fill="%230F172A">Nutrition Facts</text><line x1="40" y1="65" x2="360" y2="65" stroke="%230F172A" stroke-width="8"/><text x="40" y="85" font-family="Arial,sans-serif" font-size="13" fill="%23475569">1 serving per container</text><text x="40" y="103" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="%230F172A">Serving size: 1 cup (150g)</text><line x1="40" y1="112" x2="360" y2="112" stroke="%230F172A" stroke-width="4"/><text x="40" y="132" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="%230F172A">Amount per serving</text><text x="40" y="160" font-family="Arial,sans-serif" font-size="28" font-weight="900" fill="%230F172A">Calories 130</text><line x1="40" y1="172" x2="360" y2="172" stroke="%230F172A" stroke-width="5"/><text x="40" y="192" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="%230F172A">Total Fat 2.5g (3% DV)</text><line x1="40" y1="200" x2="360" y2="200" stroke="%23E2E8F0" stroke-width="1"/><text x="40" y="218" font-family="Arial,sans-serif" font-size="13" fill="%23475569">Saturated Fat 1.5g (8% DV)</text><line x1="40" y1="226" x2="360" y2="226" stroke="%23E2E8F0" stroke-width="1"/><text x="40" y="244" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="%230F172A">Total Carbohydrate 14g (5% DV)</text><line x1="40" y1="252" x2="360" y2="252" stroke="%23E2E8F0" stroke-width="1"/><text x="60" y="270" font-family="Arial,sans-serif" font-size="13" fill="%23475569">Dietary Fiber 1g (4% DV)</text><line x1="40" y1="278" x2="360" y2="278" stroke="%23E2E8F0" stroke-width="1"/><text x="60" y="296" font-family="Arial,sans-serif" font-size="13" fill="%23475569">Total Sugars 11g (Includes 5g Added)</text><line x1="40" y1="304" x2="360" y2="304" stroke="%23E2E8F0" stroke-width="1"/><text x="40" y="322" font-family="Arial,sans-serif" font-size="13" fill="%2310B981" font-weight="bold">Protein 14g (28% DV)</text><line x1="40" y1="334" x2="360" y2="334" stroke="%230F172A" stroke-width="3"/><text x="40" y="360" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="%230F172A">INGREDIENTS:</text><text x="40" y="380" font-family="Arial,sans-serif" font-size="11" fill="%23475569">Cultured Grade A Nonfat Milk, Strawberries,</text><text x="40" y="398" font-family="Arial,sans-serif" font-size="11" fill="%23475569">Cane Sugar, Water, Pectin, Fruit Juice (Color).</text><text x="40" y="425" font-family="Arial,sans-serif" font-size="11" font-weight="bold" fill="%230F172A">Contains 5 Live Active Probiotic Cultures.</text></svg>`;

export const RECENT_ANALYSES = [
  {
    id: 'prod-001',
    name: 'Artisan Almond Crunch Granola',
    brand: 'PureHarvest Organics',
    category: 'Breakfast Cereals',
    scannedAt: '20 mins ago',
    score: 84,
    scoreLabel: 'Great Choice',
    scoreColor: 'emerald',
    verdict: 'Great Choice — Nutrient-dense breakfast option with clean ingredients.',
    summary: 'High in dietary fiber and heart-healthy unsaturated fats with no artificial sweeteners or synthetic preservatives.',
    servingSize: '45g (1/2 cup)',
    calories: 195,
    demoLabelSvg: GRANOLA_LABEL_SVG,
    // Step 4: Structured Nutrition Table for side-by-side comparison
    nutritionTable: {
      calories: 195,
      protein: 7,
      carbs: 29,
      addedSugar: 4,
      totalFat: 7,
      saturatedFat: 1,
      sodium: 45,
      fiber: 6
    },
    keyMetrics: [
      { label: 'Fiber', value: '6g', status: 'positive' },
      { label: 'Protein', value: '7g', status: 'positive' },
      { label: 'Added Sugar', value: '4g', status: 'neutral' },
      { label: 'Sodium', value: '45mg', status: 'positive' }
    ],
    highlights: [
      '100% Whole grain rolled oats provide sustained low-GI energy',
      'Naturally sweetened with raw honey without high-fructose corn syrup',
      'Zero synthetic food colorings, preservatives, or artificial flavorings'
    ],
    concerns: [
      'Contains roasted almonds — allergen alert for tree nuts',
      'Moderate 4g added sugar per 1/2 cup serving'
    ],
    // Step 3: Structured Ingredient Intelligence
    ingredientSummary: {
      totalCount: 6,
      additivesCount: 0,
      attentionCount: 1,
      summaryText: 'Simple, whole-food formulation with 0 synthetic additives.'
    },
    ingredients: [
      {
        id: 'ing-101',
        name: 'Whole Grain Rolled Oats',
        code: null,
        category: 'Ingredient',
        explanation: 'De-hulled oat grains steamed and rolled into flat flakes, rich in beta-glucan soluble fiber.',
        purpose: 'Forms the hearty carbohydrate and fiber base of the granola.',
        status: 'Whole food',
        note: 'Whole grain oats provide sustained energy release and support cardiovascular cholesterol balance.'
      },
      {
        id: 'ing-102',
        name: 'Raw Honey',
        code: null,
        category: 'Sweetener',
        explanation: 'Unfiltered natural liquid honey containing trace antioxidants and enzymes.',
        purpose: 'Provides natural sweetness and helps bind oat clusters during baking.',
        status: 'Commonly used',
        note: 'Presence alone does not determine whether a product is healthy or unhealthy. While natural, honey contributes to total added sugars.'
      },
      {
        id: 'ing-103',
        name: 'Roasted Almonds',
        code: null,
        category: 'Ingredient',
        explanation: 'Whole sliced tree nuts dry-roasted without added seed oils.',
        purpose: 'Adds crunchy texture, plant-based protein, and heart-healthy monounsaturated fats.',
        status: 'Worth checking',
        note: 'High nutritional value, but represents a primary allergen for individuals sensitive to tree nuts.'
      },
      {
        id: 'ing-104',
        name: 'Chia Seeds',
        code: null,
        category: 'Ingredient',
        explanation: 'Small edible seeds from the Salvia hispanica plant, rich in alpha-linolenic omega-3 fatty acids.',
        purpose: 'Enhances fiber density and essential fatty acid content.',
        status: 'Whole food',
        note: 'Known for high water-absorption capacity and plant-based micronutrient contribution.'
      },
      {
        id: 'ing-105',
        name: 'Sea Salt',
        code: null,
        category: 'Ingredient',
        explanation: 'Mineral salt produced by evaporation of ocean water.',
        purpose: 'Rounds out taste and balances the sweetness of honey.',
        status: 'Commonly used',
        note: 'Used in very small quantities here (45mg sodium per serving is well within low-sodium guidelines).'
      },
      {
        id: 'ing-106',
        name: 'Cinnamon Bark Powder',
        code: null,
        category: 'Ingredient',
        explanation: 'Ground spice obtained from the inner bark of Cinnamomum trees.',
        purpose: 'Provides warm aromatic flavoring without relying on synthetic vanillin or artificial flavors.',
        status: 'Whole food',
        note: 'A traditional culinary spice with known natural antioxidant properties.'
      }
    ],
    attentionPoints: [
      'Minimal 6-ingredient list comprised almost entirely of recognized whole foods.',
      'Protein and fiber contribute positively to the overall nutrition profile and satiety.',
      'No functional emulsifiers, chemical preservatives, or synthetic food colors identified.',
      'Contains tree nuts (almonds) which requires awareness for allergic individuals.'
    ]
  },
  {
    id: 'prod-002',
    name: 'ChocoCreme Sandwich Cookies',
    brand: 'Golden Bakery Co.',
    category: 'Snacks & Confectionery',
    scannedAt: '2 hours ago',
    score: 42,
    scoreLabel: 'Eat in Moderation',
    scoreColor: 'amber',
    verdict: 'Eat in Moderation — High in added sugars and refined palm fats.',
    summary: 'Ultra-processed snack high in refined sugars and saturated palm fats with artificial flavoring agents and emulsifiers.',
    servingSize: '3 cookies (38g)',
    calories: 210,
    demoLabelSvg: COOKIES_LABEL_SVG,
    // Step 4: Structured Nutrition Table for side-by-side comparison
    nutritionTable: {
      calories: 210,
      protein: 2,
      carbs: 26,
      addedSugar: 18,
      totalFat: 9,
      saturatedFat: 5,
      sodium: 180,
      fiber: 0.5
    },
    keyMetrics: [
      { label: 'Added Sugar', value: '18g', status: 'negative' },
      { label: 'Sat. Fat', value: '5g', status: 'negative' },
      { label: 'Fiber', value: '0.5g', status: 'negative' },
      { label: 'Sodium', value: '180mg', status: 'neutral' }
    ],
    highlights: [
      'Fortified with iron and essential B vitamins (Niacin)'
    ],
    concerns: [
      'High added sugar content (18g represents 36% of daily intake in just 3 cookies)',
      'Contains palm oil high in saturated fatty acids (5g)',
      'Synthetic emulsifiers (INS 471, INS 322) indicating ultra-processed formulation (NOVA 4)'
    ],
    // Step 3: Structured Ingredient Intelligence
    ingredientSummary: {
      totalCount: 9,
      additivesCount: 4,
      attentionCount: 4,
      summaryText: 'Contains multiple functional additives and refined sweeteners worth understanding.'
    },
    ingredients: [
      {
        id: 'ing-201',
        name: 'Refined Wheat Flour (Maida)',
        code: null,
        category: 'Ingredient',
        explanation: 'Milled wheat flour with the bran and germ removed, leaving mainly starch and endosperm proteins.',
        purpose: 'Provides the crisp structural crumb for the baked cookie biscuit.',
        status: 'Commonly used',
        note: 'Refined grain processing removes most of the natural grain fiber and micro-nutrients.'
      },
      {
        id: 'ing-202',
        name: 'Refined Sugar',
        code: null,
        category: 'Sweetener',
        explanation: 'Purified sucrose extracted from sugar cane or sugar beet crystals.',
        purpose: 'Imparts intense sweetness and contributes to the caramelized browning of cookies.',
        status: 'Worth understanding',
        note: 'Added sugar is one of the primary nutritional considerations in this product, with 18g per 3 cookies.'
      },
      {
        id: 'ing-203',
        name: 'Refined Palm Oil',
        code: null,
        category: 'Ingredient',
        explanation: 'Edible vegetable oil extracted from oil palm fruit, naturally solid at room temperature.',
        purpose: 'Creates a stable creamy center filling that remains firm without requiring hydrogenation.',
        status: 'Worth understanding',
        note: 'High in palmitic saturated fat (5g per serving). Presence alone is common in shelf-stable bakery items.'
      },
      {
        id: 'ing-204',
        name: 'High Fructose Corn Syrup',
        code: null,
        category: 'Sweetener',
        explanation: 'A liquid sweetener made from corn starch that has undergone enzymatic processing to convert glucose into fructose.',
        purpose: 'Maintains moisture in the cookie and enhances sweet taste intensity.',
        status: 'Worth checking',
        note: 'Secondary liquid sugar added alongside sucrose, accelerating rapid glycemic absorption.'
      },
      {
        id: 'ing-205',
        name: 'Cocoa Solids',
        code: null,
        category: 'Ingredient',
        explanation: 'Dry substance remaining after cocoa butter is pressed from roasted cacao beans.',
        purpose: 'Gives the characteristic dark chocolate flavor and natural brown hue.',
        status: 'Whole food',
        note: 'Contains polyphenols and natural cocoa flavonoids.'
      },
      {
        id: 'ing-206',
        name: 'Soy Lecithin',
        code: 'INS 322',
        category: 'Emulsifier',
        explanation: 'A natural fatty substance extracted from soybeans that allows fats and liquids to blend smoothly.',
        purpose: 'Prevents cocoa butter and palm fats from separating, ensuring a smooth mouthfeel.',
        status: 'Commonly used',
        note: 'Widely used in chocolate confectionary; generally recognized as safe by food authorities. Note: contains soy.'
      },
      {
        id: 'ing-207',
        name: 'Mono- and Diglycerides of Fatty Acids',
        code: 'INS 471',
        category: 'Emulsifier',
        explanation: 'Food additive composed of glycerol and fatty acids used as an emulsifying and stabilizing agent.',
        purpose: 'Improves dough handling and extends shelf life by preventing staling and fat crystallization.',
        status: 'Worth understanding',
        note: 'A synthetic or plant-derived additive common in ultra-processed baked goods to preserve texture over long shelf lives.'
      },
      {
        id: 'ing-208',
        name: 'Sodium Bicarbonate',
        code: 'INS 500(ii)',
        category: 'Acidity regulator',
        explanation: 'Chemical leavening agent commonly known as baking soda.',
        purpose: 'Releases carbon dioxide gas when heated to create an airy, crispy cookie texture.',
        status: 'Commonly used',
        note: 'Standard leavening agent used in baking; contributes minor sodium.'
      },
      {
        id: 'ing-209',
        name: 'Artificial Vanillin Flavoring',
        code: null,
        category: 'Flavour enhancer',
        explanation: 'Synthetically produced aroma chemical that mimics the flavor compound found in natural vanilla beans.',
        purpose: 'Provides strong, cost-effective vanilla scent and taste.',
        status: 'Worth checking',
        note: 'Synthetic aroma compound; does not contain actual vanilla bean extract.'
      }
    ],
    attentionPoints: [
      'Added sugar is the primary nutritional concern, with 18g (36% of daily limit) in just 3 cookies.',
      'Contains multiple functional additives (INS 322, INS 471) typical of shelf-stable industrial bakery products.',
      'Refined palm fat provides 5g of saturated fatty acids with limited dietary fiber (0.5g).',
      'Fortification with iron and niacin provides positive micro-nutrient contributions despite high sugar.'
    ]
  },
  {
    id: 'prod-003',
    name: 'Strawberry Greek Protein Yogurt',
    brand: 'Aura Dairy Farms',
    category: 'Dairy & Cultured',
    scannedAt: '1 day ago',
    score: 78,
    scoreLabel: 'Good Choice',
    scoreColor: 'emerald',
    verdict: 'Good Choice — High in lean dairy protein and live probiotic cultures.',
    summary: 'Nutritious cultured Greek yogurt offering 14g of protein with real fruit puree and moderate added cane sugar.',
    servingSize: '1 cup (150g)',
    calories: 130,
    demoLabelSvg: YOGURT_LABEL_SVG,
    // Step 4: Structured Nutrition Table for side-by-side comparison
    nutritionTable: {
      calories: 130,
      protein: 14,
      carbs: 14,
      addedSugar: 5,
      totalFat: 2.5,
      saturatedFat: 1.5,
      sodium: 65,
      fiber: 1
    },
    keyMetrics: [
      { label: 'Protein', value: '14g', status: 'positive' },
      { label: 'Fiber', value: '1g', status: 'neutral' },
      { label: 'Added Sugar', value: '5g', status: 'neutral' },
      { label: 'Sodium', value: '65mg', status: 'positive' }
    ],
    highlights: [
      '14g of high biological-value dairy protein per cup',
      'Contains 5 active live probiotic strains for gut microbiome health',
      'No artificial sweeteners, high-fructose corn syrup, or synthetic colors'
    ],
    concerns: [
      'Contains dairy (milk allergens and trace lactose)',
      'Contains 5g of added cane sugar from fruit preparation'
    ],
    ingredientSummary: {
      totalCount: 6,
      additivesCount: 1,
      attentionCount: 1,
      summaryText: 'Cultured dairy with fruit puree and natural citrus pectin.'
    },
    ingredients: [
      {
        id: 'ing-301',
        name: 'Cultured Grade A Nonfat Milk',
        code: null,
        category: 'Ingredient',
        explanation: 'Skim milk pasteurized and fermented with traditional yogurt cultures.',
        purpose: 'Provides lean protein, calcium, and cultured tartness.',
        status: 'Whole food',
        note: 'Rich source of bioavailable casein and whey proteins.'
      },
      {
        id: 'ing-302',
        name: 'Strawberries',
        code: null,
        category: 'Ingredient',
        explanation: 'Whole sliced strawberries cooked into a fruit puree.',
        purpose: 'Natural fruit flavor, fiber, and aroma.',
        status: 'Whole food',
        note: 'Provides real fruit antioxidants and vitamin C.'
      },
      {
        id: 'ing-303',
        name: 'Cane Sugar',
        code: null,
        category: 'Sweetener',
        explanation: 'Natural crystallized sugar cane used to balance fruit tartness.',
        purpose: 'Sweetens the strawberry blend (5g added sugar).',
        status: 'Commonly used',
        note: 'Moderate added sugar compared to standard fruit yogurts.'
      },
      {
        id: 'ing-304',
        name: 'Water',
        code: null,
        category: 'Ingredient',
        explanation: 'Purified water used to hydrate fruit puree.',
        purpose: 'Consistency blending.',
        status: 'Commonly used',
        note: 'Standard carrier ingredient.'
      },
      {
        id: 'ing-305',
        name: 'Pectin',
        code: 'INS 440',
        category: 'Thickener',
        explanation: 'Natural soluble dietary fiber extracted from citrus peels or apples.',
        purpose: 'Gently thickens the strawberry puree to prevent watery separation.',
        status: 'Commonly used',
        note: 'Natural plant-derived polysaccharide, safe and digestible.'
      },
      {
        id: 'ing-306',
        name: 'Fruit & Vegetable Juice (for color)',
        code: null,
        category: 'Colour',
        explanation: 'Natural juice concentrates used to maintain rosy pink color.',
        purpose: 'Replaces synthetic artificial dyes like Red 40.',
        status: 'Whole food',
        note: 'Plant-derived botanical color.'
      }
    ],
    attentionPoints: [
      'Exceptional protein-to-calorie ratio (14g protein in 130 kcal).',
      'Only 1 natural thickener (citrus pectin) with no synthetic emulsifiers.',
      'Contains 5g added cane sugar alongside 6g naturally occurring dairy sugars (lactose).'
    ]
  }
];

export const DEMO_PRODUCTS = [
  {
    label: 'Almond Crunch Granola',
    sublabel: 'Clean label (Score: 84)',
    product: RECENT_ANALYSES[0],
    mockFileName: 'granola_nutrition_label.jpg',
    mockFileSize: '1.2 MB'
  },
  {
    label: 'ChocoCreme Cookies',
    sublabel: 'High sugar alert (Score: 42)',
    product: RECENT_ANALYSES[1],
    mockFileName: 'sandwich_cookies_label.png',
    mockFileSize: '1.8 MB'
  },
  {
    label: 'Strawberry Greek Yogurt',
    sublabel: 'High protein (Score: 78)',
    product: RECENT_ANALYSES[2],
    mockFileName: 'greek_yogurt_label.jpg',
    mockFileSize: '1.4 MB'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Scan',
    subtitle: 'Point your camera or upload',
    description: 'Snap a quick photo of any packaged food label — nutrition facts table or ingredient list.',
    iconName: 'Camera',
    tag: 'Quick capture'
  },
  {
    step: '02',
    title: 'Understand',
    subtitle: 'AI translates the jargon',
    description: 'Labelicious decodes chemical additive codes, hidden sugars, and marketing claims into plain English.',
    iconName: 'Sparkles',
    tag: 'Instant decoding'
  },
  {
    step: '03',
    title: 'Decide',
    subtitle: 'Actionable health scores',
    description: 'Receive a clear 0–100 health score, personalized flags, and clean alternative product suggestions.',
    iconName: 'ShieldCheck',
    tag: 'Confident choices'
  }
];

// Step 3: Personalization Profiles
export const PERSONALIZATION_PROFILES = [
  {
    id: 'general',
    name: 'General',
    title: 'General Wellness',
    tagline: 'Balanced standard guidelines',
    description: 'Standard balanced dietary guidelines for everyday adult nutrition and healthy lifestyle.',
    iconName: 'Sparkles',
    badgeText: 'General Profile',
    focusTags: ['Balanced Nutrition', 'Moderate Sugar', 'Whole Foods']
  },
  {
    id: 'child',
    name: 'Child',
    title: 'Child & Family',
    tagline: 'Strict on dyes & added sugars',
    description: 'Prioritizes lower sugar thresholds, zero artificial colorings or flavorings, and whole food ingredients for developing children.',
    iconName: 'Smile',
    badgeText: 'Child Profile',
    focusTags: ['No Synthetic Dyes', 'Low Sugar (<5g)', 'Clean Additives']
  },
  {
    id: 'fitness',
    name: 'Fitness',
    title: 'Fitness & Athletic',
    tagline: 'High protein & complex carbs',
    description: 'Emphasizes high protein-to-calorie density, sustained-energy low GI carbohydrates, and minimal saturated fats.',
    iconName: 'Activity',
    badgeText: 'Fitness Profile',
    focusTags: ['Protein > 10g', 'Low Saturated Fat', 'Fiber Rich']
  },
  {
    id: 'low_sodium',
    name: 'Low Sodium',
    title: 'Heart & Low Sodium',
    tagline: 'Strict daily sodium limits',
    description: 'Optimized for cardiovascular care, strictly monitoring milligrams of sodium per serving and trans fat markers.',
    iconName: 'Heart',
    badgeText: 'Low Sodium Profile',
    focusTags: ['Sodium < 140mg', 'Heart Healthy Fats', 'No Hydrogenated Oils']
  }
];
