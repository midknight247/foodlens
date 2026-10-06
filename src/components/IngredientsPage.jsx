import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  SlidersHorizontal, 
  ArrowRight,
  ShieldCheck,
  Tag,
  HelpCircle
} from 'lucide-react';

export default function IngredientsPage({ 
  product, 
  onBackToAnalysis, 
  onNavigateToPersonalize 
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!product) return null;

  const ingredients = product.ingredients || [];
  const summary = product.ingredientSummary || {
    totalCount: ingredients.length,
    additivesCount: 0,
    attentionCount: 0,
    summaryText: 'Standard ingredients list.'
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // Get unique categories for optional filtering
  const categories = ['all', ...Array.from(new Set(ingredients.map(ing => ing.category)))];

  const filteredIngredients = selectedCategory === 'all' 
    ? ingredients 
    : ingredients.filter(ing => ing.category === selectedCategory);

  // Category badge styles
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Sweetener':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Emulsifier':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Flavour enhancer':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Acidity regulator':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Preservative':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Thickener':
      case 'Colour':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'Ingredient':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Status indicator styles (neutral, educational)
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Whole food':
        return {
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'Worth checking':
      case 'Worth understanding':
        return {
          badge: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'Commonly used':
      default:
        return {
          badge: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400'
        };
    }
  };

  return (
    <div className="min-h-[85vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* 1. Header with Back Button */}
      <div className="mb-8">
        <button
          type="button"
          onClick={onBackToAnalysis}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5 pr-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Analysis</span>
        </button>

        <div className="mt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ingredient Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What's inside?
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            FoodLens translates complicated ingredient names into plain English.
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Product: <span className="text-emerald-700">{product.name}</span> ({product.brand})
          </p>
        </div>
      </div>

      {/* 2. INGREDIENT SUMMARY CARD */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Label Composition Overview</span>
          </h2>
          <span className="text-xs text-slate-400">
            {summary.summaryText}
          </span>
        </div>

        {/* 3 Metrics: Number of ingredients, additives identified, things to understand */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Ingredients
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {summary.totalCount} <span className="text-sm font-normal text-slate-500">ingredients</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              From printed package label
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Functional Additives
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {summary.additivesCount} <span className="text-sm font-normal text-slate-500">identified</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Emulsifiers, regulators, or enhancers
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Things to Understand
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 mt-1">
              {summary.attentionCount} <span className="text-sm font-normal text-amber-700">worth checking</span>
            </div>
            <p className="text-[11px] text-amber-700/80 mt-1">
              Allergens, sugars, or refined fats
            </p>
          </div>

        </div>
      </div>

      {/* Category Filter Pills (Smart Categories) */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" />
          <span>Category:</span>
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'all' ? `All (${ingredients.length})` : cat}
          </button>
        ))}
      </div>

      {/* 3 & 5. EXPANDABLE INGREDIENT LIST */}
      <div className="space-y-3 mb-10">
        {filteredIngredients.map((item) => {
          const isExpanded = expandedId === item.id;
          const statusStyle = getStatusBadge(item.status);

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded 
                  ? 'border-emerald-300 shadow-md ring-1 ring-emerald-200/60' 
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Collapsed Bar / Trigger */}
              <button
                type="button"
                onClick={() => toggleExpand(item.id)}
                className="w-full p-4 sm:p-5 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none focus:bg-slate-50/50"
                aria-expanded={isExpanded}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    {/* Ingredient Name */}
                    <span className="text-base font-bold text-slate-900">
                      {item.name}
                    </span>

                    {/* Optional INS / E-number code */}
                    {item.code && (
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {item.code}
                      </span>
                    )}

                    {/* Category Badge */}
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadge(item.category)}`}>
                      {item.category}
                    </span>

                    {/* Status Indicator */}
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusStyle.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      <span>{item.status}</span>
                    </span>
                  </div>

                  {/* Short plain English explanation (Visible in collapsed state) */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-1 sm:line-clamp-none">
                    {item.explanation}
                  </p>
                </div>

                {/* Expand / Collapse Icon */}
                <div className="shrink-0 text-slate-400 p-1">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* 5. Expanded Details Pane */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-100 bg-[#FAFCFB] space-y-4 animate-in fade-in duration-200">
                  
                  {/* Detailed explanation */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      What it is
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>

                  {/* Why it is used (purpose) */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/80">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Why is it used in this food?</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.purpose}
                    </p>
                  </div>

                  {/* FoodLens Responsible Note */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-100/80">
                    <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>FoodLens Note</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.note || "Presence alone does not determine whether a product is healthy or unhealthy. Consider the ingredient alongside the product's overall nutrition profile."}
                    </p>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 6. "WHAT SHOULD I PAY ATTENTION TO?" HIGHLIGHT SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              What should I pay attention to?
            </h3>
            <p className="text-xs text-slate-500">
              Balanced, objective observations based on this ingredient list
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {(product.attentionPoints || [
            'Consider the overall nutrient density alongside individual additives.',
            'Added sugar and saturated fats represent key dietary metrics.',
            'Review for personal sensitivities or acute allergen triggers.'
          ]).map((point, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FAF9] border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 7. PERSONALIZATION PREVIEW CTA */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-200 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Tailor to Your Goals</span>
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight">
            See this food for me →
          </h3>
          <p className="text-sm text-emerald-100/90 max-w-md">
            FoodLens can adjust the analysis based on your priorities (Child, Fitness, Heart Health, etc.).
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToPersonalize}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-sm shadow-sm transition-all active:scale-[0.98]"
        >
          <span>Choose My Profile →</span>
        </button>
      </div>

      {/* Bottom Back Button */}
      <div className="mt-8 pt-4 border-t border-slate-200 flex justify-center">
        <button
          type="button"
          onClick={onBackToAnalysis}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← Return to Overall Product Analysis
        </button>
      </div>

    </div>
  );
}
