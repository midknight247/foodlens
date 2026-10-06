import React from 'react';
import { ScanLine, ArrowUpRight } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="mt-auto bg-[#26113f] text-[#fff8e9] border-t-2 border-[#26113f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main Footer */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 pb-9 border-b-2 border-[#fff8e9]/15">

          {/* Logo & Slogan */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#c8f31d] border-2 border-[#190b2b] flex items-center justify-center text-[#26113f] shadow-[4px_4px_0_#ff6b2c]">
                <ScanLine className="w-5 h-5" strokeWidth={2.5} />
              </div>

              <div>
                <div className="text-2xl font-black tracking-[-0.03em] leading-none">
                  Food<span className="text-[#ff6b2c]">Lens</span>
                </div>

                <p className="text-xs text-[#fff8e9]/60 mt-1.5 tracking-[0.02em]">
                  Know what's inside.
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-6 tracking-[0.01em] text-[#fff8e9]/65">
              Understand your food. Make better choices.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold">
            <button
              onClick={() => onNavigate('home')}
              className="text-[#fff8e9]/75 hover:text-[#c8f31d] transition-colors"
            >
              Home
            </button>

            <a
              href="#how-it-works"
              className="text-[#fff8e9]/75 hover:text-[#c8f31d] transition-colors"
            >
              How it works
            </a>

            <a
              href="#recent-analyses"
              className="text-[#fff8e9]/75 hover:text-[#c8f31d] transition-colors"
            >
              Recent scans
            </a>

            <button
              onClick={() => onNavigate('scan')}
              className="group inline-flex items-center gap-1.5 text-[#ff6b2c] hover:text-[#c8f31d] transition-colors"
            >
              Scan a label
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </nav>
        </div>

        {/* Health Notice */}
        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-[#ff6b2c]" />
              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#c8f31d]">
                Health notice
              </span>
            </div>

            <p className="text-[11px] leading-5 tracking-[0.01em] text-[#fff8e9]/50">
              Labelicious is an educational tool designed to help explain
              packaged food labels using public nutritional guidelines.
              Always verify ingredient information for acute allergies,
              medical conditions, or dietary restrictions.
            </p>
          </div>

          {/* Vibeathon mark */}
          <div className="shrink-0 border-2 border-[#fff8e9]/20 px-4 py-2.5">
            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#fff8e9]/45">
              Built for Vibeathon 2026
            </span>
          </div>
        </div>

        {/* Bottom Brand Strip */}
        <div className="mt-9 pt-5 border-t border-[#fff8e9]/10 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#fff8e9]/30">
            Food label intelligence
          </span>

          <span className="text-[10px] font-black text-[#ff6b2c]">
            © 2026 Labelicious
          </span>
        </div>

      </div>
    </footer>
  );
}
