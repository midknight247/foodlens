import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowLeftRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Check,
  Info,
  Smile,
  Activity,
  Heart,
  Trophy,
  ChevronRight
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
  const savedScans = useMemo(() => {
    try {
      const stored = localStorage.getItem('foodlens_recent_scans');
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('[Labelicious] Could not load recent scans:', error);
      return [];
    }
  }, []);

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

  const defaultProductB = useMemo(() => {
    const anotherSavedScan = savedScans.find(
      product => product.id !== initialProductA?.id
    );

    if (anotherSavedScan) return anotherSavedScan;

    return (
      RECENT_ANALYSES.find(
        product => product.id !== initialProductA?.id
      ) ||
      RECENT_ANALYSES[0]
    );
  }, [savedScans, initialProductA]);

  const [productA, setProductA] = useState(initialProductA);
  const [productB, setProductB] = useState(defaultProductB);

  const comparison = useMemo(() => {
    return compareProducts(productA, productB, activeProfile);
  }, [productA, productB, activeProfile]);

  const handleSwap = () => {
    const temp = productA;
    setProductA(productB);
    setProductB(temp);
  };

  const handleSelectProductB = (prod) => {
    if (prod.id === productA.id) {
      handleSwap();
    } else {
      setProductB(prod);
    }
  };

  const otherProducts = availableProducts.filter(
    p => p.id !== productA.id && p.id !== productB.id
  );

  const getProfileIcon = (iconName) => {
    switch (iconName) {
      case 'Smile':
        return <Smile className="w-4 h-4" />;
      case 'Activity':
        return <Activity className="w-4 h-4" />;
      case 'Heart':
        return <Heart className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const productCard = (product, side) => {
    const isWinner =
      comparison.winner === side;

    return (
      <div
        className={`relative overflow-hidden rounded-[2rem] border-2 transition-all ${
          isWinner
            ? 'border-[#C8F31D] bg-[#26113F] text-white shadow-[8px_8px_0_#FF6B2C]'
            : 'border-[#26113F]/15 bg-white text-[#17131C] shadow-[5px_5px_0_#26113F]/10'
        }`}
      >
        {/* Winner strip */}
        {isWinner && (
          <div className="absolute top-0 left-0 right-0 bg-[#C8F31D] text-[#190B2B] px-5 py-2 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.18em]">
              Labelicious pick
            </span>

            <Trophy className="w-4 h-4" />
          </div>
        )}

        <div className={`p-6 sm:p-8 ${isWinner ? 'pt-14' : ''}`}>
          <div className="flex items-center justify-between gap-3 mb-7">
            <span
              className={`text-[11px] font-black uppercase tracking-[0.18em] px-3 py-1.5 ${
                isWinner
                  ? 'bg-white/10 text-[#C8F31D] border border-white/15'
                  : 'bg-[#FFF8E9] text-[#26113F] border border-[#26113F]/15'
              }`}
            >
              Product {side}
            </span>

            {product.isRealAi && (
              <span
                className={`text-[10px] font-bold ${
                  isWinner ? 'text-white/65' : 'text-[#756D7D]'
                }`}
              >
                ● SCANNED
              </span>
            )}
          </div>

          <p
            className={`text-[10px] font-black uppercase tracking-[0.16em] mb-2 ${
              isWinner ? 'text-[#FF9A73]' : 'text-[#FF6B2C]'
            }`}
          >
            {product.category}
          </p>

          <h2
            className={`text-2xl sm:text-3xl font-black tracking-tight leading-[1.05] ${
              isWinner ? 'text-white' : 'text-[#26113F]'
            }`}
          >
            {product.name}
          </h2>

          <p
            className={`text-sm mt-2 ${
              isWinner ? 'text-white/60' : 'text-[#756D7D]'
            }`}
          >
            {product.brand}
          </p>

          {/* Score */}
          <div
            className={`mt-8 pt-6 border-t ${
              isWinner
                ? 'border-white/15'
                : 'border-[#26113F]/10'
            }`}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p
                  className={`text-[10px] font-black uppercase tracking-[0.16em] ${
                    isWinner ? 'text-white/45' : 'text-[#756D7D]'
                  }`}
                >
                  Labelicious score
                </p>

                <div className="flex items-baseline gap-1 mt-1">
                  <span
                    className={`text-5xl font-black leading-none ${
                      isWinner ? 'text-[#C8F31D]' : 'text-[#26113F]'
                    }`}
                  >
                    {product.score}
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      isWinner ? 'text-white/40' : 'text-[#756D7D]'
                    }`}
                  >
                    /100
                  </span>
                </div>
              </div>

              <div
                className={`text-[10px] font-black uppercase tracking-wide px-3 py-2 ${
                  isWinner
                    ? 'bg-[#C8F31D] text-[#190B2B]'
                    : 'bg-[#FFF8E9] text-[#26113F] border border-[#26113F]/15'
                }`}
              >
                {product.scoreLabel}
              </div>
            </div>

            {/* Score bar */}
            <div
              className={`h-2 mt-5 ${
                isWinner ? 'bg-white/10' : 'bg-[#26113F]/10'
              }`}
            >
              <div
                className={`h-full ${
                  isWinner ? 'bg-[#C8F31D]' : 'bg-[#FF6B2C]'
                }`}
                style={{
                  width: `${Math.min(100, Math.max(0, product.score || 0))}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[85vh] bg-[#FFF8E9] text-[#17131C]">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* --------------------------------------------------
            HEADER
        -------------------------------------------------- */}

        <div className="flex items-center justify-between gap-4 mb-10">
          <button
            type="button"
            onClick={onBackToAnalysis}
            className="inline-flex items-center gap-2 text-sm font-black text-[#26113F] hover:text-[#FF6B2C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to analysis
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="text-xs font-black uppercase tracking-wider text-[#756D7D] hover:text-[#26113F]"
          >
            Labelicious Home
          </button>
        </div>

        {/* --------------------------------------------------
            TITLE
        -------------------------------------------------- */}

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#26113F] text-[#C8F31D] flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5" />
            </div>

            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6B2C]">
              Labelicious Face-Off
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl sm:text-6xl font-black tracking-[-0.04em] leading-[0.95] text-[#26113F]">
            Two labels.
            <br />
            <span className="relative inline-block">
              One decision.
              <span className="absolute left-0 right-0 bottom-0.5 h-2 bg-[#C8F31D] -z-0" />
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base sm:text-lg text-[#756D7D] leading-relaxed">
            Put two foods head-to-head. Labelicious looks at their
            nutrition and ingredient information to show where each
            one has the advantage.
          </p>
        </section>

        {/* --------------------------------------------------
            PRODUCTS
        -------------------------------------------------- */}

        <section className="relative mb-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {productCard(productA, 'A')}
            {productCard(productB, 'B')}
          </div>

          {/* VS */}
          <div className="flex justify-center -my-5 relative z-20 pointer-events-none">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF6B2C] border-4 border-[#FFF8E9] text-white flex items-center justify-center shadow-[4px_4px_0_#26113F]">
              <span className="text-sm sm:text-base font-black">
                VS
              </span>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleSwap}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#26113F] text-[#C8F31D] border-2 border-[#26113F] text-xs font-black uppercase tracking-wide hover:bg-[#FF6B2C] hover:text-white transition-all active:translate-y-0.5"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Swap sides
            </button>
          </div>
        </section>

        {/* --------------------------------------------------
            WINNER
        -------------------------------------------------- */}

        <section className="mb-10">

          <div className="bg-[#26113F] text-white border-2 border-[#26113F] shadow-[8px_8px_0_#FF6B2C]">

            <div className="p-6 sm:p-9">

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 pb-6 border-b border-white/15">

                <div>
                  <div className="inline-flex items-center gap-2 text-[#C8F31D] text-[10px] font-black uppercase tracking-[0.2em]">
                    <Trophy className="w-4 h-4" />
                    Labelicious verdict
                  </div>

                  <h2 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                    {comparison.recommendation}
                  </h2>
                </div>

                <div className="shrink-0 bg-[#C8F31D] text-[#190B2B] px-4 py-3">
                  <p className="text-[9px] font-black uppercase tracking-wider">
                    Score lead
                  </p>
                  <p className="text-2xl font-black">
                    +{comparison.scoreDiff}
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-sm sm:text-base text-white/75 leading-relaxed">
                {comparison.leadExplanation}
              </p>

              {/* Reasons */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {comparison.reasons.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white/5 border border-white/10"
                  >
                    <div
                      className={`w-7 h-7 shrink-0 flex items-center justify-center ${
                        reason.type === 'positive'
                          ? 'bg-[#C8F31D] text-[#190B2B]'
                          : 'bg-[#FF6B2C] text-white'
                      }`}
                    >
                      {reason.type === 'positive' ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                    </div>

                    <span className="text-xs sm:text-sm text-white/85 leading-relaxed">
                      {reason.text}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* --------------------------------------------------
            PROFILE
        -------------------------------------------------- */}

        <section className="bg-white border-2 border-[#26113F]/10 mb-10">

          <div className="p-6 sm:p-7">

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#FFF8E9] border border-[#26113F]/10 text-[#FF6B2C] flex items-center justify-center shrink-0">
                  {getProfileIcon(activeProfile?.iconName)}
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6B2C]">
                    Personalise the comparison
                  </p>

                  <h3 className="mt-1 text-lg font-black text-[#26113F]">
                    Your priorities can change the context.
                  </h3>

                  <p className="text-xs text-[#756D7D] mt-1">
                    Currently viewing as{' '}
                    <strong className="text-[#26113F]">
                      {activeProfile?.title || 'General Wellness'}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {PERSONALIZATION_PROFILES.map((profile) => (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => onProfileChange(profile)}
                    className={`px-3 py-2 text-xs font-black border transition-all ${
                      activeProfile?.id === profile.id
                        ? 'bg-[#26113F] text-[#C8F31D] border-[#26113F]'
                        : 'bg-[#FFF8E9] text-[#26113F] border-[#26113F]/15 hover:border-[#FF6B2C]'
                    }`}
                  >
                    {profile.name}
                  </button>
                ))}
              </div>

            </div>

            <div className="mt-5 p-4 bg-[#FFF8E9] border-l-4 border-[#C8F31D] flex items-start gap-3">
              <Info className="w-4 h-4 text-[#26113F] shrink-0 mt-0.5" />

              <p className="text-xs sm:text-sm text-[#26113F] leading-relaxed">
                {comparison.profileInsight}
              </p>
            </div>

          </div>
        </section>

        {/* --------------------------------------------------
            NUTRITION
        -------------------------------------------------- */}

        <section className="bg-white border-2 border-[#26113F]/10 mb-10">

          <div className="p-6 sm:p-8">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF6B2C]">
                  Label showdown
                </p>

                <h3 className="mt-1 text-2xl font-black text-[#26113F]">
                  Nutrient breakdown
                </h3>

                <p className="text-xs text-[#756D7D] mt-1">
                  Values compared using the nutrition information available on each label.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wide text-[#26113F] bg-[#C8F31D] px-3 py-2 w-fit">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Highlight = advantage
              </div>
            </div>

            <div className="border-2 border-[#26113F]/10">

              {/* Column headers */}
              <div className="grid grid-cols-12 bg-[#26113F] text-white">
                <div className="col-span-4 p-3 text-[9px] font-black uppercase tracking-wider">
                  Nutrient
                </div>

                <div className="col-span-4 p-3 text-center text-[9px] font-black uppercase tracking-wider text-[#C8F31D]">
                  {productA.name}
                </div>

                <div className="col-span-4 p-3 text-center text-[9px] font-black uppercase tracking-wider text-[#FF9A73]">
                  {productB.name}
                </div>
              </div>

              {comparison.nutritionComparison.map((item) => {
                const isAWinner = item.advantage === 'A';
                const isBWinner = item.advantage === 'B';

                return (
                  <div
                    key={item.key}
                    className="grid grid-cols-12 border-t border-[#26113F]/10"
                  >

                    <div className="col-span-4 p-4 bg-[#FFF8E9]">
                      <span className="text-xs sm:text-sm font-black text-[#26113F] block">
                        {item.label}
                      </span>

                      <span className="text-[9px] text-[#756D7D] uppercase tracking-wide">
                        per serving
                      </span>
                    </div>

                    <div
                      className={`col-span-4 p-3 flex items-center justify-center ${
                        isAWinner
                          ? 'bg-[#C8F31D]/35'
                          : 'bg-white'
                      }`}
                    >
                      <div
                        className={`text-sm font-black text-center ${
                          isAWinner
                            ? 'text-[#26113F]'
                            : 'text-[#756D7D]'
                        }`}
                      >
                        {isAWinner && (
                          <Check className="inline w-3.5 h-3.5 mr-1 stroke-[3]" />
                        )}
                        {item.valA}
                        <span className="text-[10px] ml-1 font-bold">
                          {item.unit}
                        </span>
                      </div>
                    </div>

                    <div
                      className={`col-span-4 p-3 flex items-center justify-center ${
                        isBWinner
                          ? 'bg-[#C8F31D]/35'
                          : 'bg-white'
                      }`}
                    >
                      <div
                        className={`text-sm font-black text-center ${
                          isBWinner
                            ? 'text-[#26113F]'
                            : 'text-[#756D7D]'
                        }`}
                      >
                        {isBWinner && (
                          <Check className="inline w-3.5 h-3.5 mr-1 stroke-[3]" />
                        )}
                        {item.valB}
                        <span className="text-[10px] ml-1 font-bold">
                          {item.unit}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* --------------------------------------------------
            INGREDIENTS
        -------------------------------------------------- */}

        <section className="bg-[#26113F] text-white mb-10">

          <div className="p-6 sm:p-8">

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FF9A73]">
                  Behind the label
                </p>

                <h3 className="mt-1 text-2xl font-black">
                  Ingredient differences
                </h3>

                <p className="text-xs text-white/50 mt-1">
                  A quick look at formula complexity and functional additives.
                </p>
              </div>

              <span className="text-[9px] font-black uppercase tracking-wider text-[#C8F31D]">
                Printed label data
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              {comparison.ingredientDifferences.map((ingredient) => (
                <div
                  key={ingredient.label}
                  className="p-5 bg-white/5 border border-white/10"
                >
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-white/45">
                    {ingredient.label}
                  </span>

                  <div className="flex items-center justify-between gap-2 mt-4">

                    <span
                      className={`text-sm font-black ${
                        ingredient.advantage === 'A'
                          ? 'text-[#C8F31D]'
                          : 'text-white/75'
                      }`}
                    >
                      A: {ingredient.valA}
                    </span>

                    <span className="text-[10px] font-black text-white/25">
                      VS
                    </span>

                    <span
                      className={`text-sm font-black ${
                        ingredient.advantage === 'B'
                          ? 'text-[#C8F31D]'
                          : 'text-white/75'
                      }`}
                    >
                      B: {ingredient.valB}
                    </span>

                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C8F31D] shrink-0 mt-0.5" />

                    <span className="text-[10px] text-white/55 leading-relaxed">
                      {ingredient.note}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* --------------------------------------------------
            ANOTHER COMPARISON
        -------------------------------------------------- */}

        <section className="bg-[#FF6B2C] text-white p-6 sm:p-8 mb-10 shadow-[7px_7px_0_#26113F]">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/65">
                Keep comparing
              </p>

              <h3 className="mt-1 text-2xl font-black">
                Try a different opponent.
              </h3>

              <p className="text-sm text-white/80 mt-2 max-w-xl">
                Compare {productA.name} with another scanned or demo product.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">

              {otherProducts.length > 0 ? (
                otherProducts.map((product) => {
                  const isRealScan = product.isRealAi === true;

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleSelectProductB(product)}
                      className="inline-flex items-center gap-2 px-4 py-3 bg-[#FFF8E9] text-[#26113F] border-2 border-[#FFF8E9] hover:bg-[#C8F31D] hover:border-[#C8F31D] text-xs font-black transition-all"
                    >
                      <span>
                        {isRealScan ? 'SCANNED · ' : 'DEMO · '}
                        {product.name}
                      </span>

                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  );
                })
              ) : (
                <span className="text-xs font-bold text-white/70">
                  Scan another food to unlock more comparisons.
                </span>
              )}

            </div>

          </div>
        </section>

        {/* --------------------------------------------------
            FOOTER NAV
        -------------------------------------------------- */}

        <div className="pt-6 border-t-2 border-[#26113F]/10 flex flex-col sm:flex-row items-center justify-between gap-4">

          <button
            type="button"
            onClick={onBackToAnalysis}
            className="inline-flex items-center gap-2 text-sm font-black text-[#26113F] hover:text-[#FF6B2C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to {productA.name}
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#26113F] text-[#C8F31D] border-2 border-[#26113F] text-xs font-black uppercase tracking-wide hover:bg-[#FF6B2C] hover:text-white transition-all"
          >
            Labelicious dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

