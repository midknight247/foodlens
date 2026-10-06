import React from 'react';
import { Sparkles, ScanLine, Info } from 'lucide-react';

export default function Navbar({ onNavigate, currentView }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg py-1 px-1.5 -ml-1.5 transition-colors hover:opacity-90"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
            <ScanLine className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                Food<span className="text-emerald-600">Lens</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                AI Beta
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-none hidden sm:block">
              Smart Food Label Intelligence
            </p>
          </div>
        </button>

        {/* Navigation links & Quick CTA */}
        <nav className="flex items-center gap-3 sm:gap-6">
          <a
            href="#how-it-works"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors hidden sm:inline-flex items-center gap-1"
          >
            How it works
          </a>
          <a
            href="#recent-analyses"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('recent-analyses')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors hidden sm:inline-flex items-center gap-1"
          >
            Recent scans
          </a>

          {/* Quick Header CTA */}
          <button
            onClick={() => onNavigate('scan')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 sm:px-4 py-2 rounded-lg transition-all active:scale-[0.98]"
          >
            <ScanLine className="w-4 h-4 text-emerald-600" />
            <span>Scan Label</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
