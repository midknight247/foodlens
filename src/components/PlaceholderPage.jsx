import React from 'react';
import { ArrowLeft, Camera, PenLine, Sparkles, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function PlaceholderPage({ type, product, onBack }) {
  if (type === 'scan') {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-100">
            <Camera className="w-8 h-8" />
          </div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
            Module in Preparation (Step 2)
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Food Label Scanner
          </h1>
          <p className="mt-3 text-slate-600 max-w-lg mx-auto text-base">
            This module will support instant camera capture and image upload of ingredient lists and nutrition fact panels for real-time OCR and AI analysis.
          </p>

          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 max-w-md mx-auto text-left space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Upcoming Capabilities:
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Camera capture & drag-and-drop image upload</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>OCR extraction of nutrition tables and ingredients</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant AI food score & additive decoding</span>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (type === 'manual') {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-6 border border-slate-200">
            <PenLine className="w-8 h-8" />
          </div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full mb-3">
            Module in Preparation (Step 2)
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Manual Ingredient Entry
          </h1>
          <p className="mt-3 text-slate-600 max-w-lg mx-auto text-base">
            For unreadable labels or quick testing, you will be able to type or paste product ingredients and nutritional numbers directly.
          </p>

          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 max-w-md mx-auto text-left space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Upcoming Capabilities:
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Paste ingredient text with auto-tagging</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Custom macros and dietary preference checks</span>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Detail view for mock product
  if (type === 'detail' && product) {
    const isHigh = product.score >= 70;
    const scoreColor = isHigh ? 'text-emerald-700 bg-emerald-50 border-emerald-300' : 'text-amber-700 bg-amber-50 border-amber-300';
    const badgeBg = isHigh ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200';

    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {product.category}
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {product.scannedAt}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {product.name}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Brand: <span className="font-medium text-slate-700">{product.brand}</span> • Serving: {product.servingSize}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl border-2 ${scoreColor} flex flex-col items-center justify-center`}>
                <span className="text-2xl font-black">{product.score}</span>
                <span className="text-[10px] font-semibold opacity-75">/ 100</span>
              </div>
              <div>
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${badgeBg}`}>
                  {product.scoreLabel}
                </span>
                <p className="text-xs text-slate-400 mt-1">Overall Health Score</p>
              </div>
            </div>
          </div>

          {/* AI Analysis Summary */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>FoodLens AI Evaluation</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {product.summary}
            </p>
          </div>

          {/* Metrics */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Nutritional Snapshot
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {product.keyMetrics.map((m) => (
                <div key={m.label} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                  <span className="text-xs text-slate-500 font-medium block">{m.label}</span>
                  <span className="text-base font-bold text-slate-900 block mt-1">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Positives and Concerns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100">
              <h3 className="text-sm font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Positive Highlights</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-100">
              <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Things to Watch Out For</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {product.concerns.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  return null;
}
