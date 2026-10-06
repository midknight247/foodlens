import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowLeftRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Scale,
  SlidersHorizontal,
  Check,
  Info,
  ChevronDown,
  Layers,
  ArrowRight,
  Smile,
  Activity,
  Heart
} from 'lucide-react';
import { RECENT_ANALYSES, PERSONALIZATION_PROFILES } from '../data/mockData';
import { compareProducts } from '../utils/comparisonEngine';

export default function ComparisonPage({
  initialProductA,
  activeProfile,
  onProfileChange,
  onBackToAnalysis,
  onBackToHome,
  onExploreProductIngredients
}) {
  // ------------------------------------------------------------
  // LOAD REAL SCANS SAVED BY FOODLENS
  // ------------------------------------------------------------

  const savedScans = useMemo(() => {
    try {
      const stored = localStorage.getItem('foodlens_recent_scans');

      if (!stored) return [];

      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('[FoodLens] Could not load recent scans:', error);
      return [];
    }
  }, []);

  // Combine real scanned products with demo products.
  // Real scans appear first.
  const availableProducts = useMemo(() => {
    const combined = [...savedScans, ...RECENT_ANALYSES];

    const uniqueProducts = [];
    const seenIds = new Set();

    for (const product of combined) {
      if (!product?.id || seenIds.has(product.id)) continue;

      seenIds.add(product.id);
      uniqueProducts.push(product);
    }

    return uniqueProducts;
  }, [savedScans]);

  // Product B prefers another real scanned product.
  // If there is only one real scan, fall back to a demo product.
  const defaultProductB = useMemo(() => {
    const anotherSavedScan = savedScans.find(
      product => product.id !== initialProductA?.id
    );

    if (anotherSavedScan) {
      return anotherSavedScan;
    }

    return (
      RECENT_ANALYSES.find(
        product => product.id !== initialProductA?.id
      ) ||
      RECENT_ANALYSES[0]
    );
  }, [savedScans, initialProductA]);

  const [productA, setProductA] = useState(initialProductA);
  const [productB, setProductB] = useState(defaultProductB);

  // ------------------------------------------------------------
  // COMPARISON ENGINE
  // ------------------------------------------------------------

  const comparison = useMemo(() => {
    return compareProducts(productA, productB, activeProfile);
  }, [productA, productB, activeProfile]);

  // ------------------------------------------------------------
  // SWAP PRODUCTS A AND B
  // ------------------------------------------------------------

  const handleSwap = () => {
    const temp = productA;
    setProductA(productB);
    setProductB(temp);
  };

  // ------------------------------------------------------------
  // SWITCH PRODUCT B
  // ------------------------------------------------------------

  const handleSelectProductB = (prod) => {
    if (prod.id === productA.id) {
      handleSwap();
    } else {
      setProductB(prod);
    }
  };

  // Other products available for switching Product B.
  const otherProducts = availableProducts.filter(
    p => p.id !== productA.id && p.id !== productB.id
  );

  // ------------------------------------------------------------
  // PROFILE ICON
  // ------------------------------------------------------------

  const getProfileIcon = (iconName) => {
    switch (iconName) {
      case 'Smile':
        return <Smile className="w-4 h-4 text-amber-600" />;

      case 'Activity':
        return <Activity className="w-4 h-4 text-blue-600" />;

      case 'Heart':
        return <Heart className="w-4 h-4 text-rose-600" />;

      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="min-h-[85vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

      {/* --------------------------------------------------------
          1. HEADER
      -------------------------------------------------------- */}

      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          type="button"
          onClick={onBackToAnalysis}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5 pr-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back</span>
        </button>

        <button
          type="button"
          onClick={onBackToHome}
          className="text-xs font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
        >
          FoodLens Home
        </button>
      </div>

      {/* --------------------------------------------------------
          PAGE TITLE
      -------------------------------------------------------- */}

      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2.5">
          <Scale className="w-3.5 h-3.5 text-emerald-600" />
          <span>Product Comparison Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Which one is the better choice?
        </h1>

        <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
          FoodLens compares nutrition and ingredient information side by side so you can decide faster.
        </p>
      </div>

      {/* --------------------------------------------------------
          2. TOP PRODUCT CARDS
      -------------------------------------------------------- */}

      <div className="relative mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

          {/* PRODUCT A CARD */}

          <div
            className={`rounded-3xl p-6 sm:p-7 border-2 transition-all bg-white shadow-sm flex flex-col justify-between ${
              comparison.winner === 'A'
                ? 'border-emerald-400 ring-2 ring-emerald-100'
                : 'border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Product A
                </span>

                {comparison.winner === 'A' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Recommended Choice
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {productA.name}
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                {productA.brand} • {productA.category}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">
                FoodLens Score:
              </span>

              <div className="flex items-center gap-2">
                <span
                  className={`text-2xl font-black ${
                    productA.score >= 70
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                  }`}
                >
                  {productA.score}
                </span>

                <span className="text-xs text-slate-400 font-semibold">
                  / 100
                </span>

                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    productA.score >= 70
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {productA.scoreLabel}
                </span>
              </div>
            </div>
          </div>

          {/* PRODUCT B CARD */}

          <div
            className={`rounded-3xl p-6 sm:p-7 border-2 transition-all bg-white shadow-sm flex flex-col justify-between ${
              comparison.winner === 'B'
                ? 'border-emerald-400 ring-2 ring-emerald-100'
                : 'border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Product B
                </span>

                {comparison.winner === 'B' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Recommended Choice
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {productB.name}
              </h2>

              <p className="text-xs text-slate-500 mt-0.5">
                {productB.brand} • {productB.category}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">
                FoodLens Score:
              </span>

              <div className="flex items-center gap-2">
                <span
                  className={`text-2xl font-black ${
                    productB.score >= 70
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                  }`}
                >
                  {productB.score}
                </span>

                <span className="text-xs text-slate-400 font-semibold">
                  / 100
                </span>

                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    productB.score >= 70
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {productB.scoreLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CENTRAL SWAP BUTTON */}

        <div className="flex justify-center -my-3 sm:-my-4 relative z-10">
          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-300 shadow-md text-xs font-bold text-slate-700 hover:text-emerald-700 transition-all active:scale-95"
            title="Swap products A and B"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-600" />
            <span>Swap Products</span>
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------
          3. FINAL VERDICT
      -------------------------------------------------------- */}

      <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 rounded-3xl p-6 sm:p-9 text-white shadow-xl mb-8 space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-400/30 pb-5">
          <div className="flex items-center gap-2 text-emerald-200 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>FoodLens Recommendation</span>
          </div>

          <span className="text-xs text-emerald-100/80 font-medium">
            Score margin: +{comparison.scoreDiff} points
          </span>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            {comparison.recommendation}
          </h3>

          <p className="mt-2 text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
            {comparison.leadExplanation}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-200">
            Why does FoodLens prefer this option?
          </h4>

          <div className="space-y-2">
            {comparison.reasons.map((r, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-white/95"
              >
                {r.type === 'positive' ? (
                  <Check className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5 stroke-[2.5]" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                )}

                <span>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------
          4. PERSONALIZATION
      -------------------------------------------------------- */}

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              {getProfileIcon(activeProfile?.iconName)}
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Your choice may change based on your priorities
              </h3>

              <p className="text-xs text-slate-500">
                Currently evaluating through:{' '}
                <strong className="text-slate-800">
                  {activeProfile?.title || 'General Wellness'}
                </strong>
              </p>
            </div>
          </div>

          {/* QUICK PROFILE SWITCHING */}

          <div className="flex flex-wrap gap-1.5">
            {PERSONALIZATION_PROFILES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onProfileChange(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeProfile?.id === p.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{comparison.profileInsight}</span>
        </div>
      </div>

      {/* --------------------------------------------------------
          5. NUTRITION COMPARISON
      -------------------------------------------------------- */}

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Nutrient Breakdown
            </h3>

            <p className="text-xs text-slate-500">
              Side-by-side comparison of nutrition table values
            </p>
          </div>

          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Green highlights = Nutritional Advantage
          </span>
        </div>

        <div className="divide-y divide-slate-100">

          {comparison.nutritionComparison.map((item) => {
            const isAWinner = item.advantage === 'A';
            const isBWinner = item.advantage === 'B';

            return (
              <div
                key={item.key}
                className="py-3 sm:py-3.5 grid grid-cols-12 gap-2 sm:gap-4 items-center"
              >

                {/* METRIC LABEL */}

                <div className="col-span-4 sm:col-span-4 text-left">
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                    {item.label}
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono">
                    per serving ({item.unit})
                  </span>
                </div>

                {/* PRODUCT A VALUE */}

                <div className="col-span-4 sm:col-span-4 text-center">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                      isAWinner
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
                        : 'text-slate-700'
                    }`}
                  >
                    {isAWinner && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    )}

                    <span>
                      {item.valA} {item.unit}
                    </span>
                  </div>
                </div>

                {/* PRODUCT B VALUE */}

                <div className="col-span-4 sm:col-span-4 text-center">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                      isBWinner
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs'
                        : 'text-slate-700'
                    }`}
                  >
                    {isBWinner && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    )}

                    <span>
                      {item.valB} {item.unit}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* --------------------------------------------------------
          6. INGREDIENT DIFFERENCES
      -------------------------------------------------------- */}

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Ingredient differences
            </h3>

            <p className="text-xs text-slate-500">
              Formula complexity and functional additive metrics
            </p>
          </div>

          <span className="text-xs text-slate-400">
            Based on printed label ingredients
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {comparison.ingredientDifferences.map((ing) => (
            <div
              key={ing.label}
              className="p-4 rounded-2xl bg-[#F8FAF9] border border-slate-200/80"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                {ing.label}
              </span>

              <div className="flex items-center justify-between mt-2 font-bold text-sm">
                <span
                  className={
                    ing.advantage === 'A'
                      ? 'text-emerald-700 font-extrabold'
                      : 'text-slate-700'
                  }
                >
                  A: {ing.valA}
                </span>

                <span className="text-slate-300">
                  vs
                </span>

                <span
                  className={
                    ing.advantage === 'B'
                      ? 'text-emerald-700 font-extrabold'
                      : 'text-slate-700'
                  }
                >
                  B: {ing.valB}
                </span>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>{ing.note}</span>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* --------------------------------------------------------
          7. SWITCH PRODUCT B
      -------------------------------------------------------- */}

      <div className="bg-slate-50/90 rounded-3xl border border-slate-200/80 p-6 sm:p-8 text-center mb-10">

        <h4 className="text-base font-bold text-slate-900 mb-1">
          Try another comparison
        </h4>

        <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto">
          Compare{' '}
          <strong className="text-slate-700">
            {productA.name}
          </strong>{' '}
          against another scanned or demo product:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">

          {otherProducts.map((p) => {
            const isRealScan = p.isRealAi === true;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectProductB(p)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-800 shadow-xs transition-all active:scale-98"
              >
                <span>
                  {isRealScan ? '🟢 Scanned: ' : '📦 Demo: '}
                  {p.name}
                </span>

                <span className="text-[10px] text-slate-400 font-normal">
                  ({p.score}/100)
                </span>
              </button>
            );
          })}

        </div>
      </div>

      {/* --------------------------------------------------------
          BOTTOM NAVIGATION
      -------------------------------------------------------- */}

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">

        <button
          type="button"
          onClick={onBackToAnalysis}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to {productA.name} Analysis</span>
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
  );
}