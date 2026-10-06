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
  Smile,
  Activity,
  Heart,
  FlaskConical,
  Leaf,
} from 'lucide-react';

export default function AnalysisPage({
  product,
  imagePreview,
  activeProfile,
  onExploreIngredients,
  onCompare,
  onBackToUpload,
  onBackToHome,
}) {
  const [showImageModal, setShowImageModal] = useState(false);

  if (!product) return null;

  const score = Number(product.score) || 0;

  const getScoreTheme = () => {
    if (score >= 75) {
      return {
        label: product.scoreLabel || 'GOOD CHOICE',
        scoreColor: 'text-[var(--fl-lime)]',
        accent: 'bg-[var(--fl-lime)]',
        accentText: 'text-[var(--fl-purple-dark)]',
      };
    }

    if (score >= 58) {
      return {
        label: product.scoreLabel || 'WORTH CONSIDERING',
        scoreColor: 'text-[var(--fl-orange)]',
        accent: 'bg-[var(--fl-orange)]',
        accentText: 'text-[var(--fl-purple-dark)]',
      };
    }

    return {
      label: product.scoreLabel || 'EAT IN MODERATION',
      scoreColor: 'text-[var(--fl-orange)]',
      accent: 'bg-[var(--fl-orange)]',
      accentText: 'text-[var(--fl-purple-dark)]',
    };
  };

  const scoreTheme = getScoreTheme();

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

  const getMetricStyle = (status) => {
    if (status === 'positive') {
      return {
        border: 'border-[var(--fl-lime)]',
        bg: 'bg-[var(--fl-lime)]/15',
        badge: 'bg-[var(--fl-lime)] text-[var(--fl-purple-dark)]',
      };
    }

    if (status === 'negative') {
      return {
        border: 'border-[var(--fl-orange)]',
        bg: 'bg-[var(--fl-orange)]/10',
        badge: 'bg-[var(--fl-orange)] text-[var(--fl-purple-dark)]',
      };
    }

    return {
      border: 'border-[var(--fl-border)]',
      bg: 'bg-white',
      badge: 'bg-[var(--fl-purple)] text-[var(--fl-cream)]',
    };
  };

  const formatMetricValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return '—';
    }

    return value;
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--fl-cream)] text-[var(--fl-ink)]">

      {/* TOP LABEL STRIP */}
      <div className="border-b-2 border-[var(--fl-purple)] bg-[var(--fl-purple)] px-4 py-2.5 text-center text-[9px] font-black uppercase tracking-[0.24em] text-[var(--fl-lime)]">
        Labelicious / LABEL DECODED
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">

        {/* NAVIGATION */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToUpload}
            className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--fl-purple)] transition-colors hover:text-[var(--fl-orange)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to scan
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="hidden text-[10px] font-black uppercase tracking-[0.14em] text-[var(--fl-muted)] transition-colors hover:text-[var(--fl-purple)] sm:block"
          >
            Labelicious Home
          </button>
        </div>

        {/* PERSONALIZATION */}
        {activeProfile && activeProfile.id !== 'general' && (
          <div className="mb-8 flex flex-col gap-3 border-2 border-[var(--fl-purple)] bg-[var(--fl-lime)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-xs font-bold text-[var(--fl-purple-dark)]">
              <div className="flex h-8 w-8 items-center justify-center border-2 border-[var(--fl-purple)] bg-[var(--fl-cream)]">
                {getProfileIcon(activeProfile.iconName)}
              </div>

              <div>
                Viewing with:
                <strong className="ml-1">{activeProfile.title}</strong>

                {activeProfile.tagline && (
                  <span className="ml-2 hidden font-normal opacity-70 sm:inline">
                    — {activeProfile.tagline}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onExploreIngredients}
              className="text-left text-[10px] font-black uppercase tracking-[0.12em] text-[var(--fl-purple)] underline underline-offset-4 hover:text-[var(--fl-orange)]"
            >
              Change profile
            </button>
          </div>
        )}

        {/* PAGE INTRO */}
        <section className="relative mb-12">
          <div className="absolute -right-5 -top-8 hidden h-20 w-20 rotate-6 bg-[var(--fl-orange)] lg:block" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 border-2 border-[var(--fl-purple)] bg-[var(--fl-orange)] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--fl-purple-dark)]">
              <Sparkles className="h-3.5 w-3.5" />
              Food label analysis
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.88] tracking-[-0.075em] text-[var(--fl-purple)] sm:text-7xl lg:text-8xl">
              YOUR FOOD.
              <br />
              <span className="relative inline-block">
                     DECODED.
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-[var(--fl-lime)] sm:h-4" />
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-6 text-[var(--fl-muted)] sm:text-base">
              Labelicious pulled the useful stuff out of the label so you can
              understand the product without reading the fine print for five
              minutes.
            </p>
          </div>
        </section>

        {/* PRODUCT + SCORE */}
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">

          {/* PRODUCT */}
          <div className="relative overflow-hidden border-2 border-[var(--fl-purple)] bg-white shadow-[8px_8px_0_var(--fl-orange)]">

            <div className="absolute left-0 top-0 z-10 bg-[var(--fl-purple)] px-4 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--fl-lime)]">
              SCANNED PRODUCT
            </div>

            <div className="grid min-h-[390px] md:grid-cols-[0.82fr_1.18fr]">

              {/* IMAGE */}
              <div className="flex items-center justify-center border-b-2 border-[var(--fl-purple)] bg-[var(--fl-cream)] p-8 md:border-b-0 md:border-r-2">
                {imagePreview ? (
                  <button
                    type="button"
                    onClick={() => setShowImageModal(true)}
                    className="group relative block max-h-72 max-w-full focus:outline-none"
                  >
                    <img
                      src={imagePreview}
                      alt="Scanned food label"
                      className="max-h-72 max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />

                    <span className="absolute bottom-2 left-2 flex items-center gap-1.5 border-2 border-[var(--fl-purple)] bg-[var(--fl-lime)] px-2 py-1 text-[8px] font-black uppercase tracking-wide text-[var(--fl-purple-dark)] opacity-0 transition-opacity group-hover:opacity-100">
                      <Eye className="h-3 w-3" />
                      View
                    </span>
                  </button>
                ) : (
                  <div className="flex h-56 w-40 items-center justify-center border-2 border-dashed border-[var(--fl-purple)] bg-white p-5 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--fl-purple)]">
                      Label image unavailable
                    </span>
                  </div>
                )}
              </div>

              {/* PRODUCT INFO */}
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--fl-orange)]">
                  {product.category || 'Food product'}
                </div>

                <h2 className="mt-3 text-3xl font-black leading-[0.95] tracking-[-0.055em] text-[var(--fl-purple)] sm:text-4xl">
                  {product.name || 'Unnamed product'}
                </h2>

                {product.brand && (
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.12em] text-[var(--fl-muted)]">
                    {product.brand}
                  </p>
                )}

                <div className="mt-8 grid grid-cols-2 gap-3 border-t-2 border-[var(--fl-border)] pt-5">
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-[0.14em] text-[var(--fl-muted)]">
                      Serving
                    </div>
                    <div className="mt-1 text-sm font-black text-[var(--fl-purple)]">
                      {product.servingSize || '—'}
                    </div>
                  </div>

                  <div>
                    <div className="text-[8px] font-black uppercase tracking-[0.14em] text-[var(--fl-muted)]">
                      Energy
                    </div>
                    <div className="mt-1 text-sm font-black text-[var(--fl-purple)]">
                      {product.calories ?? '—'} kcal
                    </div>
                  </div>
                </div>

                {product.brand && (
                  <div className="mt-7 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--fl-muted)]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--fl-orange)]" />
                    Label information analyzed
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SCORE */}
          <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden border-2 border-[var(--fl-purple)] bg-[var(--fl-purple)] p-7 text-[var(--fl-cream)] shadow-[8px_8px_0_var(--fl-lime)] sm:p-9">

            <div className="absolute -bottom-12 -right-10 h-36 w-36 rounded-full border-[22px] border-[var(--fl-orange)]/30" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--fl-lime)]">
                  Labelicious Score
                </span>

                <ShieldCheck className="h-5 w-5 text-[var(--fl-orange)]" />
              </div>

              <div className="mt-10 flex items-end">
                <span
                  className={`text-[8rem] font-black leading-[0.72] tracking-[-0.11em] sm:text-[10rem] ${scoreTheme.scoreColor}`}
                >
                  {score}
                </span>

                <span className="mb-1 ml-3 text-lg font-black text-[var(--fl-cream)]/50">
                  /100
                </span>
              </div>

              <div className="mt-8 inline-block border-2 border-[var(--fl-lime)] bg-[var(--fl-lime)] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--fl-purple-dark)]">
                {scoreTheme.label}
              </div>
            </div>

            <div className="relative mt-10 border-t border-[var(--fl-cream)]/20 pt-5">
              <div className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--fl-orange)]">
                Quick read
              </div>

              <p className="mt-2 text-sm leading-6 text-[var(--fl-cream)]/75">
                {product.summary ||
                  'Based on the nutrition and ingredient information available from the label.'}
              </p>
            </div>
          </div>
        </section>

        {/* VERDICT */}
        <section className="mt-12 border-2 border-[var(--fl-purple)] bg-[var(--fl-lime)] p-6 shadow-[6px_6px_0_var(--fl-purple)] sm:p-8">
          <div className="flex gap-4 sm:gap-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-[var(--fl-purple)] bg-[var(--fl-cream)]">
              <ShieldCheck className="h-5 w-5 text-[var(--fl-purple)]" />
            </div>

            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--fl-purple)]">
                Labelicious verdict
              </div>

              <h2 className="mt-1 text-xl font-black tracking-[-0.035em] text-[var(--fl-purple)] sm:text-2xl">
                {product.verdict || product.scoreLabel || 'Analysis complete'}
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--fl-purple-dark)]/70">
                {product.summary ||
                  'This is an informational interpretation of the nutrition and ingredient information visible on the label.'}
              </p>
            </div>
          </div>
        </section>

        {/* THE NUMBERS */}
        <section className="mt-16">
          <div className="mb-7">
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--fl-orange)]">
              01 / Nutrition
            </div>

            <div className="mt-1 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <h2 className="text-4xl font-black tracking-[-0.065em] text-[var(--fl-purple)] sm:text-6xl">
                THE NUMBERS.
              </h2>

              <span className="w-fit border-2 border-[var(--fl-purple)] px-3 py-2 text-[9px] font-black uppercase tracking-[0.13em] text-[var(--fl-purple)]">
                {product.nutritionBasis === 'per100g'
                  ? 'Per 100g'
                  : product.nutritionBasis === 'perServing'
                    ? `Per serving / ${product.servingSize || 'label'}`
                    : 'As printed on label'}
              </span>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--fl-muted)]">
              Key nutrients extracted from the packaging table.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {product.keyMetrics.map((metric, index) => {
              const style = getMetricStyle(metric.status);

              return (
                <div
                  key={`${metric.label}-${index}`}
                  className={`border-2 p-4 transition-transform duration-200 hover:-translate-y-1 ${style.border} ${style.bg}`}
                >
                  <div className="text-[9px] font-black uppercase tracking-[0.14em] text-[var(--fl-muted)]">
                    {metric.label}
                  </div>

                  <div className="mt-3 text-3xl font-black tracking-[-0.06em] text-[var(--fl-purple)]">
                    {formatMetricValue(metric.value)}
                  </div>

                  <div className="mt-1 text-[10px] font-bold text-[var(--fl-muted)]">
                    {metric.unit || ''}
                  </div>

                  <span
                    className={`mt-4 inline-block px-2 py-1 text-[8px] font-black uppercase tracking-[0.1em] ${style.badge}`}
                  >
                    {metric.statusLabel || 'Reference context'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="border-2 border-[var(--fl-purple)] bg-white p-5">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-[var(--fl-orange)]" />

                <span className="text-[9px] font-black uppercase tracking-[0.14em] text-[var(--fl-muted)]">
                  Calories
                </span>
              </div>

              <div className="mt-2 text-4xl font-black tracking-[-0.06em] text-[var(--fl-purple)]">
                {product.calories ?? '—'}
                <span className="ml-2 text-sm tracking-normal text-[var(--fl-muted)]">
                  kcal
                </span>
              </div>
            </div>

            <div className="border-2 border-[var(--fl-purple)] bg-[var(--fl-purple)] p-5 text-[var(--fl-cream)]">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-[var(--fl-lime)]" />

                <span className="text-[9px] font-black uppercase tracking-[0.14em] text-[var(--fl-lime)]">
                  Serving context
                </span>
              </div>

              <div className="mt-2 text-xl font-black">
                {product.servingSize || 'As printed'}
              </div>

              <p className="mt-1 text-xs leading-5 text-[var(--fl-cream)]/60">
                Nutrient values are interpreted using the basis shown on the
                package.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT STANDS OUT */}
        <section className="mt-16">
          <div className="mb-7">
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--fl-orange)]">
              02 / Interpretation
            </div>

            <h2 className="mt-1 text-4xl font-black tracking-[-0.065em] text-[var(--fl-purple)] sm:text-6xl">
              WHAT STANDS OUT.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--fl-muted)]">
              These labels provide reference context rather than universal
              “good” or “bad” cutoffs.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {product.keyMetrics.map((metric, index) => {
              const style = getMetricStyle(metric.status);

              return (
                <div
                  key={`interpretation-${metric.label}-${index}`}
                  className={`border-2 p-5 ${style.border} ${style.bg}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-[0.14em] text-[var(--fl-muted)]">
                        {metric.label}
                      </div>

                      <div className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--fl-purple)]">
                        {formatMetricValue(metric.value)}
                        {metric.unit && (
                          <span className="ml-1 text-xs text-[var(--fl-muted)]">
                            {metric.unit}
                          </span>
                        )}
                      </div>
                    </div>

                    <Info className="h-4 w-4 shrink-0 text-[var(--fl-muted)]" />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2 py-1 text-[8px] font-black uppercase tracking-[0.1em] ${style.badge}`}
                    >
                      {metric.statusLabel || 'Reference context'}
                    </span>

                    {metric.reference && (
                      <span className="text-[9px] font-medium text-[var(--fl-muted)]">
                        {metric.reference}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* POSITIVES + WATCH */}
        <section className="mt-16 grid gap-5 md:grid-cols-2">

          {/* POSITIVES */}
          <div className="border-2 border-[var(--fl-purple)] bg-white p-6 sm:p-7">
            <div className="flex items-center gap-3 border-b-2 border-[var(--fl-purple)] pb-4">
              <div className="flex h-9 w-9 items-center justify-center border-2 border-[var(--fl-purple)] bg-[var(--fl-lime)]">
                <CheckCircle2 className="h-4 w-4 text-[var(--fl-purple-dark)]" />
              </div>

              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--fl-orange)]">
                  Good to know
                </div>

                <h3 className="text-lg font-black text-[var(--fl-purple)]">
                  POSITIVES
                </h3>
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {product.highlights?.length > 0 ? (
                product.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm leading-6 text-[var(--fl-ink)]"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--fl-lime)]" />
                    <span>{highlight}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-[var(--fl-muted)]">
                  No specific positive highlights were identified.
                </li>
              )}
            </ul>
          </div>

          {/* WATCH */}
          <div className="border-2 border-[var(--fl-purple)] bg-[var(--fl-purple)] p-6 text-[var(--fl-cream)] sm:p-7">
            <div className="flex items-center gap-3 border-b-2 border-[var(--fl-cream)]/20 pb-4">
              <div className="flex h-9 w-9 items-center justify-center border-2 border-[var(--fl-orange)] bg-[var(--fl-orange)]">
                <AlertTriangle className="h-4 w-4 text-[var(--fl-purple-dark)]" />
              </div>

              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--fl-orange)]">
                  Worth checking
                </div>

                <h3 className="text-lg font-black text-[var(--fl-cream)]">
                  THINGS TO WATCH
                </h3>
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {product.concerns?.length > 0 ? (
                product.concerns.map((concern, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 border-l-2 border-[var(--fl-orange)] pl-3 text-sm leading-6 text-[var(--fl-cream)]/80"
                  >
                    <span>{concern}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-[var(--fl-cream)]/60">
                  No specific concerns were identified from the available
                  label information.
                </li>
              )}
            </ul>
          </div>
        </section>

        {/* INGREDIENTS */}
        <section className="mt-16">
          <div className="mb-7">
            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--fl-orange)]">
              03 / Ingredients
            </div>

            <h2 className="mt-1 text-4xl font-black tracking-[-0.065em] text-[var(--fl-purple)] sm:text-6xl">
              THE FINE PRINT.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--fl-muted)]">
              Go deeper into ingredient codes, additives, allergens, sugars,
              and other details.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">

            {/* SUMMARY */}
            <div className="border-2 border-[var(--fl-purple)] bg-[var(--fl-purple)] p-6 text-[var(--fl-cream)] sm:p-7">
              <div className="flex items-center gap-3">
                <FlaskConical className="h-5 w-5 text-[var(--fl-lime)]" />

                <span className="text-[9px] font-black uppercase tracking-[0.17em] text-[var(--fl-lime)]">
                  Label composition
                </span>
              </div>

              <div className="mt-9">
                <div className="text-7xl font-black leading-none tracking-[-0.09em] text-[var(--fl-lime)]">
                  {product.ingredientSummary?.totalCount ??
                    product.ingredients?.length ??
                    0}
                </div>

                <div className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--fl-cream)]/55">
                  identified ingredients
                </div>
              </div>

              <div className="mt-9 space-y-4">
                <div className="flex items-center justify-between border-t border-[var(--fl-cream)]/20 pt-4">
                  <span className="text-xs text-[var(--fl-cream)]/60">
                    Functional additives
                  </span>

                  <span className="text-2xl font-black text-[var(--fl-orange)]">
                    {product.ingredientSummary?.additivesCount ?? 0}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-[var(--fl-cream)]/20 pt-4">
                  <span className="text-xs text-[var(--fl-cream)]/60">
                    Things to understand
                  </span>

                  <span className="text-2xl font-black text-[var(--fl-orange)]">
                    {product.ingredientSummary?.attentionCount ?? 0}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onExploreIngredients}
                className="mt-9 inline-flex w-full items-center justify-center gap-2 border-2 border-[var(--fl-lime)] bg-[var(--fl-lime)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--fl-purple-dark)] transition-transform hover:-translate-y-0.5"
              >
                Explore ingredients
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* INGREDIENT PREVIEW */}
            <div className="border-2 border-[var(--fl-purple)] bg-white">
              <div className="flex items-center justify-between border-b-2 border-[var(--fl-purple)] bg-[var(--fl-cream)] px-5 py-4">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-[var(--fl-orange)]" />

                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[var(--fl-purple)]">
                    Extracted ingredient list
                  </span>
                </div>

                <span className="text-[9px] font-black text-[var(--fl-muted)]">
                  {product.ingredients?.length || 0}
                </span>
              </div>

              <div className="divide-y divide-[var(--fl-border)]">
                {product.ingredients?.length > 0 ? (
                  product.ingredients.slice(0, 12).map((ingredient, index) => {
                    const name =
                      typeof ingredient === 'string'
                        ? ingredient
                        : ingredient.name || 'Unnamed ingredient';

                    const status =
                      typeof ingredient === 'object'
                        ? ingredient.status
                        : null;

                    const attention =
                      status === 'Concern' ||
                      status === 'Attention' ||
                      status === 'Worth understanding';

                    return (
                      <div
                        key={`${name}-${index}`}
                        className="flex items-start gap-4 px-5 py-3.5"
                      >
                        <span className="w-6 shrink-0 text-[9px] font-black text-[var(--fl-orange)]">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-[var(--fl-purple)]">
                              {name}
                            </span>

                            {attention && (
                              <span className="bg-[var(--fl-orange)] px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wide text-[var(--fl-purple-dark)]">
                                Check
                              </span>
                            )}
                          </div>

                          {typeof ingredient === 'object' &&
                            ingredient.category && (
                              <div className="mt-1 text-[8px] font-black uppercase tracking-[0.1em] text-[var(--fl-muted)]">
                                {ingredient.category}
                              </div>
                            )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-sm text-[var(--fl-muted)]">
                    No ingredient list was confidently extracted from the
                    label.
                  </div>
                )}
              </div>

              {product.ingredients?.length > 12 && (
                <div className="border-t-2 border-[var(--fl-purple)] bg-[var(--fl-cream)] px-5 py-3 text-center text-[9px] font-black uppercase tracking-[0.12em] text-[var(--fl-purple)]">
                  + {product.ingredients.length - 12} more ingredients
                </div>
              )}
            </div>
          </div>
        </section>

        {/* NEXT STEP */}
        <section className="mt-16 border-2 border-[var(--fl-purple)] bg-[var(--fl-orange)] p-6 shadow-[7px_7px_0_var(--fl-purple)] sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--fl-purple-dark)]">
                What next?
              </div>

              <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-[var(--fl-purple-dark)] sm:text-3xl">
                Don't just scan it. Compare it.
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--fl-purple-dark)]/70">
                Put this product beside another food and see which label makes
                more sense for your needs.
              </p>
            </div>

            <button
              type="button"
              onClick={onCompare}
              className="inline-flex shrink-0 items-center justify-center gap-2 border-2 border-[var(--fl-purple)] bg-[var(--fl-purple)] px-6 py-4 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--fl-lime)] shadow-[5px_5px_0_var(--fl-lime)] transition-transform hover:-translate-y-0.5"
            >
              Compare another food
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* BOTTOM ACTIONS */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-[var(--fl-purple)] pt-7 sm:flex-row">
          <button
            type="button"
            onClick={onBackToUpload}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--fl-purple)] transition-colors hover:text-[var(--fl-orange)]"
          >
            <ScanLine className="h-4 w-4" />
            Scan another label
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 border-2 border-[var(--fl-purple)] bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--fl-purple)] transition-colors hover:bg-[var(--fl-lime)]"
          >
            Labelicious Home
          </button>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-8 border-l-4 border-[var(--fl-orange)] bg-white/60 px-5 py-4 text-xs leading-5 text-[var(--fl-muted)]">
          {product.disclaimer ||
            'Labelicious provides informational label interpretation and is not a substitute for professional medical or dietary advice.'}
        </div>
      </div>

      {/* IMAGE MODAL */}
      {showImageModal && imagePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--fl-purple-dark)]/85 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="w-full max-w-3xl border-2 border-[var(--fl-lime)] bg-[var(--fl-cream)] p-4 shadow-[8px_8px_0_var(--fl-orange)] sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-[var(--fl-purple)] pb-4">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.17em] text-[var(--fl-orange)]">
                  Original scan
                </div>

                <div className="mt-1 text-lg font-black text-[var(--fl-purple)]">
                  Food label
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="flex h-9 w-9 items-center justify-center border-2 border-[var(--fl-purple)] bg-white text-[var(--fl-purple)] transition-colors hover:bg-[var(--fl-orange)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex max-h-[70vh] justify-center overflow-auto border-2 border-[var(--fl-purple)] bg-white p-4">
              <img
                src={imagePreview}
                alt="Full food label"
                className="max-h-[65vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

