import React from 'react';
import { ScanLine, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onNavigate, currentView }) {
  return (
    <header className="sticky top-0 z-50 bg-[#fff8e9]/95 backdrop-blur-sm border-b-2 border-[#26113f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">

        {/* Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-10 h-10 bg-[#26113f] text-[#c8f31d] flex items-center justify-center rounded-lg rotate-[-3deg]">
            <ScanLine className="w-5 h-5" strokeWidth={2.5} />
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black tracking-[-0.06em] text-[#26113f]">
                Labelicious
              </span>
              <span className="text-2xl font-black tracking-[-0.06em] text-[#ff6b2c]">
                
              </span>
            </div>

            <p className="hidden sm:block text-[9px] font-bold uppercase tracking-[0.18em] text-[#756d7d]">
              Know what's inside
            </p>
          </div>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-3 sm:gap-7">

          <a
            href="#how-it-works"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                onNavigate('home');

                setTimeout(() => {
                  document
                    .getElementById('how-it-works')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hidden sm:block text-sm font-bold text-[#26113f] hover:text-[#ff6b2c] transition-colors"
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
                  document
                    .getElementById('recent-analyses')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hidden sm:block text-sm font-bold text-[#26113f] hover:text-[#ff6b2c] transition-colors"
          >
            Recent scans
          </a>

          <button
            onClick={() => onNavigate('scan')}
            className="group inline-flex items-center gap-2 px-4 py-2.5 bg-[#ff6b2c] text-white border-2 border-[#26113f] rounded-lg font-black text-sm shadow-[3px_3px_0_#26113f] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_#26113f] transition-all"
          >
            <ScanLine className="w-4 h-4" />
            Scan label
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

        </nav>
      </div>
    </header>
  );
}

