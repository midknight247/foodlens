import React from 'react';
import { Camera, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

export default function HowItWorks({ onScanClick }) {
  // Map icon names to Lucide icons
  const getIcon = (name) => {
    switch (name) {
      case 'Camera':
        return <Camera className="w-6 h-6 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
      case 'ShieldCheck':
      default:
        return <CheckCircle className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How FoodLens works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            From complicated nutrition facts tables to crystal-clear decisions in three easy steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="relative group bg-[#FAFBFB] hover:bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step badge and icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-emerald-50 border border-slate-200 group-hover:border-emerald-200 flex items-center justify-center shadow-xs transition-colors">
                    {getIcon(item.iconName)}
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-emerald-500/40 transition-colors font-mono">
                    {item.step}
                  </span>
                </div>

                {/* Step title */}
                <div className="mb-2">
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                {/* Step description */}
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  {item.description}
                </p>
              </div>

              {/* Step indicator arrow for 1 and 2 on desktop */}
              {index < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Subtle CTA prompt under steps */}
        <div className="mt-12 text-center">
          <button
            onClick={onScanClick}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-5 py-2.5 rounded-xl border border-emerald-200/80 transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>Ready to try it? Scan your first food label</span>
          </button>
        </div>

      </div>
    </section>
  );
}
