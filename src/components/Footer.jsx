import React from 'react';
import { ScanLine, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs">
              <ScanLine className="w-4 h-4" strokeWidth={2.2} />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                Food<span className="text-emerald-600">Lens</span>
              </span>
              <p className="text-xs text-slate-500">
                Understand your food. Make better choices.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-emerald-600 transition-colors"
            >
              Home
            </button>
            <a
              href="#how-it-works"
              className="hover:text-emerald-600 transition-colors"
            >
              How it works
            </a>
            <a
              href="#recent-analyses"
              className="hover:text-emerald-600 transition-colors"
            >
              Recent Scans
            </a>
            <button
              onClick={() => onNavigate('scan')}
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Scan Food Label
            </button>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="max-w-xl leading-relaxed">
            <span className="font-medium text-slate-500">Health notice:</span> FoodLens is an educational tool designed to demystify packaged food labels using public nutritional guidelines. Always verify ingredient information for acute allergies or medical conditions.
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <span>Built for Vibeathon 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
