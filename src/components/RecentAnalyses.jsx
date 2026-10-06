import React from 'react';
import { ArrowUpRight, Check, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { RECENT_ANALYSES } from '../data/mockData';

export default function RecentAnalyses({ onSelectProduct }) {
  return (
    <section id="recent-analyses" className="py-16 sm:py-20 bg-[#F8FAF9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real Examples</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Recent analyses
            </h2>
            <p className="mt-1 text-slate-600 text-base max-w-xl">
              Explore how FoodLens breaks down everyday grocery packages into clear, actionable health insights.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>2 sample food items analyzed</span>
          </div>
        </div>

        {/* 2 Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {RECENT_ANALYSES.map((item) => {
            const isHigh = item.score >= 70;
            const badgeBg = isHigh ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200';
            const scoreColor = isHigh ? 'text-emerald-700 bg-emerald-50 border-emerald-300' : 'text-amber-700 bg-amber-50 border-amber-300';
            
            return (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top Bar: Category, Time & Score */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {item.category}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          {item.scannedAt}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.brand} • Serving: {item.servingSize} ({item.calories} kcal)
                      </p>
                    </div>

                    {/* Food Score Indicator */}
                    <div className="shrink-0 text-center">
                      <div className={`w-14 h-14 rounded-2xl border-2 ${scoreColor} flex flex-col items-center justify-center shadow-xs`}>
                        <span className="text-xl font-black leading-none">{item.score}</span>
                        <span className="text-[10px] font-semibold opacity-80">/ 100</span>
                      </div>
                      <span className={`inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badgeBg}`}>
                        {item.scoreLabel}
                      </span>
                    </div>
                  </div>

                  {/* Plain English Summary */}
                  <div className="py-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* Key Nutrition Metrics Pills */}
                  <div className="grid grid-cols-4 gap-2 mb-5">
                    {item.keyMetrics.map((metric) => {
                      let statusBg = 'bg-slate-50 text-slate-700 border-slate-200';
                      if (metric.status === 'positive') statusBg = 'bg-emerald-50/70 text-emerald-800 border-emerald-100';
                      if (metric.status === 'negative') statusBg = 'bg-rose-50/70 text-rose-800 border-rose-100';
                      if (metric.status === 'neutral') statusBg = 'bg-amber-50/70 text-amber-800 border-amber-100';

                      return (
                        <div key={metric.label} className={`p-2 rounded-xl text-center border ${statusBg}`}>
                          <div className="text-[10px] uppercase font-medium tracking-tight opacity-75">
                            {metric.label}
                          </div>
                          <div className="text-xs sm:text-sm font-bold mt-0.5">
                            {metric.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Positive Highlights & Watch-outs */}
                  <div className="space-y-2 mb-6">
                    {item.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                    {item.concerns.slice(0, 2).map((concern, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{concern}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Click to view full analysis breakdown
                  </span>
                  <div className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
                    <span>View details</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
