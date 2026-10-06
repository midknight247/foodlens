import React from 'react';
import { Camera, PenLine, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function HeroSection({ onNavigate }) {
  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-20 overflow-hidden">
      {/* Subtle organic background warmth (restrained, no excessive gradients) */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.08),rgba(255,255,255,0))]" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Food Label Analyzer</span>
              <span className="text-emerald-400">•</span>
              <span className="text-emerald-700 font-normal">No nutrition degree needed</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Understand your food.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 block sm:inline">
                Make better choices.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl font-normal">
              AI-powered food label analysis that turns confusing nutrition information into simple, personalized decisions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              {/* Primary button */}
              <button
                type="button"
                onClick={() => onNavigate('scan')}
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-sm shadow-emerald-600/30 hover:shadow-md hover:shadow-emerald-600/40 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <Camera className="w-5 h-5 text-emerald-100 group-hover:scale-110 transition-transform duration-200" />
                <span>Scan Food Label</span>
                <ArrowRight className="w-4 h-4 ml-0.5 text-emerald-200 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              {/* Secondary button */}
              <button
                type="button"
                onClick={() => onNavigate('manual')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-300/80 shadow-sm hover:border-slate-400 transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                <PenLine className="w-4 h-4 text-slate-500" />
                <span>Enter Manually</span>
              </button>
            </div>

            {/* Trust and Feature Micro-Badges */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-200/80 max-w-lg">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant 0–100 score</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Plain English terms</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Uncovers additives</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Product Mockup Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative clean backdrop card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 p-5 sm:p-6 transition-transform hover:shadow-2xl">
                
                {/* Simulated scan bar header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Live Label Preview
                    </span>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    AI Analyzed
                  </span>
                </div>

                {/* Scanned Sample Content */}
                <div className="mt-4 space-y-4 text-left">
                  
                  {/* Product title and category */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                        Breakfast Cereal
                      </p>
                      <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                        Organic Almond Granola
                      </h2>
                      <p className="text-xs text-slate-500">
                        PureHarvest Organics • 45g serving
                      </p>
                    </div>

                    {/* Circular Score Badge */}
                    <div className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-500/30 text-center">
                      <span className="text-xl font-extrabold text-emerald-700 leading-none">
                        84
                      </span>
                      <span className="text-[9px] font-semibold text-emerald-600 mt-0.5">
                        / 100
                      </span>
                    </div>
                  </div>

                  {/* Plain English AI Takeaway */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-2">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>FoodLens AI Summary</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      "Clean ingredient list with high fiber and whole oats. Low added sugar (4g). Safe for daily breakfast."
                    </p>
                  </div>

                  {/* Key Nutrition Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                      <div className="text-[10px] text-slate-500 uppercase font-medium">Fiber</div>
                      <div className="text-sm font-bold text-emerald-800">6g (High)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                      <div className="text-[10px] text-slate-500 uppercase font-medium">Protein</div>
                      <div className="text-sm font-bold text-emerald-800">7g (Good)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100">
                      <div className="text-[10px] text-slate-500 uppercase font-medium">Added Sugar</div>
                      <div className="text-sm font-bold text-amber-800">4g (Moderate)</div>
                    </div>
                  </div>

                  {/* Ingredient highlights */}
                  <div className="pt-2 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>No artificial preservatives or high fructose syrup</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-700">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Allergen: Contains roasted almonds (tree nuts)</span>
                    </div>
                  </div>

                </div>

                {/* Footer preview note */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                  <p className="text-[11px] text-slate-400">
                    Snapshot of an actual FoodLens analysis
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
