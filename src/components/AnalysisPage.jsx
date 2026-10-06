import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  ScanLine, 
  Info, 
  Flame, 
  Scale, 
  ShieldCheck, 
  Eye, 
  X,
  SlidersHorizontal,
  Smile,
  Activity,
  Heart
} from 'lucide-react';

export default function AnalysisPage({ 
  product, 
  imagePreview, 
  activeProfile,
  onExploreIngredients,
  onCompare,
  onBackToUpload, 
  onBackToHome 
}) {
  const [showImageModal, setShowImageModal] = useState(false);

  if (!product) return null;

  const isHigh = product.score >= 70;
  const scoreTheme = isHigh ? {
    circleBorder: 'border-emerald-500',
    bgBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    numberColor: 'text-emerald-700',
    barFill: 'bg-emerald-500',
    verdictBg: 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900',
    badgeText: 'Good Nutritional Value'
  } : {
    circleBorder: 'border-amber-500',
    bgBadge: 'bg-amber-50 text-amber-800 border-amber-200',
    numberColor: 'text-amber-700',
    barFill: 'bg-amber-500',
    verdictBg: 'bg-amber-50/70 border-amber-200/80 text-amber-900',
    badgeText: 'Needs Attention'
  };

  const getProfileIcon = (iconName) => {
    switch (iconName) {
      case 'Smile':
        return <Smile className="w-3.5 h-3.5 text-amber-600" />;
      case 'Activity':
        return <Activity className="w-3.5 h-3.5 text-blue-600" />;
      case 'Heart':
        return <Heart className="w-3.5 h-3.5 text-rose-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  return (
    <div className="min-h-[85vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          type="button"
          onClick={onBackToUpload}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5 pr-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Upload</span>
        </button>

        <button
          type="button"
          onClick={onBackToHome}
          className="text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          FoodLens Home
        </button>
      </div>

      {/* Active Personalization Profile Badge (if selected) */}
      {activeProfile && activeProfile.id !== 'general' && (
        <div className="mb-6 p-3 px-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-semibold">
            {getProfileIcon(activeProfile.iconName)}
            <span>Viewing with: <strong>{activeProfile.title}</strong></span>
            <span className="text-emerald-600 font-normal hidden sm:inline">• {activeProfile.tagline}</span>
          </div>
          <button
            type="button"
            onClick={onExploreIngredients}
            className="text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-2 shrink-0"
          >
            Change in Ingredients
          </button>
        </div>
      )}

      {/* Main Analysis Card Container */}
      <div className="space-y-6">

        {/* 1. Header Card: Product Name, Brand & Scanned Label Snapshot */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                  {product.category}
                </span>
                <span className="text-xs text-slate-400">
                  • Verified by FoodLens AI
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Brand: <span className="font-semibold text-slate-700">{product.brand}</span>
              </p>
            </div>

            {/* Scanned Label Thumbnail (if available) */}
            {imagePreview && (
              <div className="flex sm:flex-col items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowImageModal(true)}
                  className="group relative w-16 h-20 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <img
                    src={imagePreview}
                    alt="Scanned label thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Eye className="w-4 h-4" />
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setShowImageModal(true)}
                  className="text-[11px] font-semibold text-slate-600 hover:text-emerald-700 underline underline-offset-2"
                >
                  View Original
                </button>
              </div>
            )}
          </div>

          {/* 2. Overall FoodLens Score & Verdict */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Score Ring Display */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#FAFBFB] to-slate-50 border border-slate-200/80 text-center">
              <div className={`relative w-24 h-24 rounded-full border-4 ${scoreTheme.circleBorder} bg-white flex flex-col items-center justify-center shadow-xs`}>
                <span className={`text-4xl font-black ${scoreTheme.numberColor} leading-none`}>
                  {product.score}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                  / 100
                </span>
              </div>
              <span className={`inline-block mt-3 text-xs font-bold px-3 py-1 rounded-full border ${scoreTheme.bgBadge}`}>
                {product.scoreLabel}
              </span>
              <p className="text-[11px] text-slate-400 mt-1.5">
                FoodLens Health Score
              </p>
            </div>

            {/* Verdict & Plain English Summary */}
            <div className="md:col-span-8 space-y-4">
              <div className={`p-4 rounded-2xl border ${scoreTheme.verdictBg}`}>
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Verdict: {product.verdict || product.scoreLabel}</span>
                </div>
                <p className="text-sm leading-relaxed opacity-90">
                  {product.summary}
                </p>
              </div>

              {/* Serving Size & Energy */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 font-medium">
                  <Scale className="w-3.5 h-3.5 text-slate-500" />
                  Serving size: <strong className="text-slate-800">{product.servingSize}</strong>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 font-medium">
                  <Flame className="w-3.5 h-3.5 text-slate-500" />
                  Energy: <strong className="text-slate-800">{product.calories} kcal</strong>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Nutrition Summary (Key Macro Metrics) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Nutrition Summary
              </h2>
              <p className="text-xs text-slate-500">
                Key nutrients extracted from the packaging table
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Per serving ({product.servingSize})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {product.keyMetrics.map((metric) => {
              let metricBg = 'bg-slate-50 border-slate-200/80 text-slate-800';
              let badgeColor = 'bg-slate-100 text-slate-600';
let statusLabel = metric.statusLabel || 'Not available';

if (metric.status === 'positive') {
  metricBg = 'bg-emerald-50/60 border-emerald-200 text-emerald-950';
  badgeColor = 'bg-emerald-100 text-emerald-800';
} else if (metric.status === 'negative') {
  metricBg = 'bg-rose-50/60 border-rose-200 text-rose-950';
  badgeColor = 'bg-rose-100 text-rose-800';
} else if (metric.status === 'neutral') {
  metricBg = 'bg-amber-50/60 border-amber-200 text-amber-950';
  badgeColor = 'bg-amber-100 text-amber-800';
}

              return (
                <div key={metric.label} className={`p-4 rounded-2xl border ${metricBg} flex flex-col justify-between`}>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                      {metric.label}
                    </span>
                    <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                      {metric.value}
                    </span>
                  </div>
                  <span className={`inline-block mt-3 text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${badgeColor}`}>
                    {statusLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Positives & Things to Watch (Two Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Positives Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-emerald-800 font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span>Positives</span>
            </div>
            <ul className="space-y-3">
              {product.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Things to Watch Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-amber-800 font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span>Things to Watch</span>
            </div>
            <ul className="space-y-3">
              {product.concerns.map((concern, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-100/80">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{concern}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 5. Explore Ingredients Action Card */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-slate-50 rounded-3xl border border-emerald-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ingredient Intelligence</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              What's actually inside this food?
            </h3>
            <p className="text-sm text-slate-600 max-w-md">
              FoodLens decodes every ingredient code, functional additive, and hidden sugar in plain English.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onExploreIngredients}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm shadow-emerald-600/20 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <span>Explore Ingredients →</span>
            </button>
          </div>
        </div>

        {/* 6. Step 4: Compare Entry Point (Section 1) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Debating between grocery items?
              </h3>
              <p className="text-xs text-slate-500">
                Compare nutrition facts, sugar levels, and additive counts side by side.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCompare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:border-emerald-300 bg-white hover:bg-emerald-50/50 text-slate-800 hover:text-emerald-800 font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0 active:scale-98"
          >
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Compare with another food →</span>
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80">
          <button
            type="button"
            onClick={onBackToUpload}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ScanLine className="w-4 h-4" />
            <span>Scan Another Food Label</span>
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-slate-900 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 shadow-xs transition-all"
          >
            <span>Return to Dashboard</span>
          </button>
        </div>

      </div>

      {/* Full-size label preview modal */}
      {showImageModal && imagePreview && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="bg-white rounded-3xl p-4 max-w-lg w-full max-h-[90vh] overflow-auto shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-800">Scanned Food Label</span>
              <button
                onClick={() => setShowImageModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-center p-2 bg-[#FAFBFB] rounded-2xl">
              <img
                src={imagePreview}
                alt="Full food label"
                className="max-h-[60vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
