import React from 'react';
import {
  Camera,
  PenLine,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ScanLine
} from 'lucide-react';

export default function HeroSection({ onNavigate }) {
  return (
    <section className="relative overflow-hidden bg-[#fff8e9] pt-10 pb-16 sm:pt-16 sm:pb-24">

      {/* Decorative graphic */}
      <div
        className="absolute -right-24 top-20 w-72 h-72 rounded-full bg-[#c8f31d] opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute -left-20 bottom-0 w-56 h-56 bg-[#ff6b2c] opacity-10 rotate-12 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div className="lg:col-span-7">

            {/* Small label */}
            <div className="inline-flex items-center gap-2 mb-6 text-xs font-black uppercase tracking-[0.16em] text-[#26113f]">
              <span className="w-3 h-3 bg-[#c8f31d] border-2 border-[#26113f] rotate-45" />
              Food label intelligence
            </div>

            {/* Headline */}
            <h1 className="text-[48px] sm:text-[64px] lg:text-[76px] font-black tracking-[-0.065em] leading-[0.92] text-[#26113f] max-w-4xl">

              What's
              <br />

              <span className="relative inline-block">
                actually
                <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-3 sm:h-4 bg-[#c8f31d] -z-0" />
              </span>

              <br />

              <span className="text-[#ff6b2c]">
                inside?
              </span>

            </h1>

            {/* Description */}
            <p className="mt-7 text-base sm:text-lg leading-relaxed text-[#4f4757] max-w-xl">
              Labelicious reads the label, breaks down the nutrition and
              ingredients, and gives you a clearer way to compare what
              you're buying.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <button
                type="button"
                onClick={() => onNavigate('scan')}
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#26113f] text-[#c8f31d] border-2 border-[#26113f] rounded-lg font-black text-base shadow-[5px_5px_0_#ff6b2c] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#ff6b2c] transition-all"
              >
                <Camera className="w-5 h-5" />
                Scan a label
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('manual')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#fff8e9] text-[#26113f] border-2 border-[#26113f] rounded-lg font-black text-base hover:bg-[#c8f31d] transition-colors"
              >
                <PenLine className="w-4 h-4" />
                Enter manually
              </button>

            </div>

            {/* Facts */}
            <div className="mt-10 pt-5 border-t-2 border-[#26113f] grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">

              <div className="flex items-center gap-2 text-xs font-bold text-[#26113f]">
                <CheckCircle2 className="w-4 h-4 text-[#ff6b2c]" />
                0–100 score
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#26113f]">
                <CheckCircle2 className="w-4 h-4 text-[#ff6b2c]" />
                Plain language
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#26113f]">
                <CheckCircle2 className="w-4 h-4 text-[#ff6b2c]" />
                Ingredient breakdown
              </div>

            </div>
          </div>


          {/* RIGHT — PRODUCT CARD */}
          <div className="lg:col-span-5 relative">

            {/* Small floating label */}
            <div className="absolute -top-5 -left-3 z-20 bg-[#c8f31d] border-2 border-[#26113f] px-3 py-2 rotate-[-4deg] font-black text-xs uppercase tracking-wider shadow-[3px_3px_0_#26113f]">
              Label decoded
            </div>

            <div className="bg-[#26113f] p-3 rounded-xl border-2 border-[#26113f] shadow-[10px_10px_0_#ff6b2c]">

              <div className="bg-[#fff8e9] border-2 border-[#26113f] rounded-lg p-5 sm:p-6">

                {/* Top strip */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-[#26113f]">

                  <div className="flex items-center gap-2">
                    <ScanLine className="w-4 h-4 text-[#ff6b2c]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#26113f]">
                      Labelicious scan
                    </span>
                  </div>

                  <span className="text-[9px] font-black uppercase tracking-wider bg-[#c8f31d] text-[#26113f] px-2 py-1 border border-[#26113f] rounded">
                    Complete
                  </span>

                </div>


                {/* Product */}
                <div className="mt-5">

                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#ff6b2c]">
                    Breakfast cereal
                  </p>

                  <div className="flex items-start justify-between gap-4 mt-1">

                    <div>
                      <h2 className="text-2xl font-black tracking-[-0.04em] text-[#26113f]">
                        Organic Almond
                        <br />
                        Granola
                      </h2>

                      <p className="text-xs font-medium text-[#756d7d] mt-2">
                        PureHarvest Organics · 45g serving
                      </p>
                    </div>

                    {/* Score */}
                    <div className="shrink-0 w-[76px] h-[76px] bg-[#ff6b2c] border-2 border-[#26113f] rounded-full flex flex-col items-center justify-center text-white rotate-[4deg]">

                      <span className="text-3xl font-black leading-none">
                        84
                      </span>

                      <span className="text-[9px] font-black uppercase tracking-wider">
                        score
                      </span>

                    </div>

                  </div>
                </div>


                {/* Main takeaway */}
                <div className="mt-6 bg-[#c8f31d] border-2 border-[#26113f] p-4 rounded-lg">

                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#26113f] mb-2">
                    The quick read
                  </p>

                  <p className="text-sm font-bold leading-relaxed text-[#26113f]">
                    High fiber, whole oats and relatively low added sugar.
                    Worth checking the almond allergen.
                  </p>

                </div>


                {/* Nutrition */}
                <div className="grid grid-cols-3 gap-2 mt-4">

                  <div className="border-2 border-[#26113f] p-3 rounded-lg bg-white">
                    <p className="text-[9px] font-black uppercase tracking-wider text-[#756d7d]">
                      Fiber
                    </p>
                    <p className="text-lg font-black text-[#26113f] mt-1">
                      6g
                    </p>
                    <p className="text-[9px] font-bold text-[#ff6b2c]">
                      contribution
                    </p>
                  </div>

                  <div className="border-2 border-[#26113f] p-3 rounded-lg bg-white">
                    <p className="text-[9px] font-black uppercase tracking-wider text-[#756d7d]">
                      Protein
                    </p>
                    <p className="text-lg font-black text-[#26113f] mt-1">
                      7g
                    </p>
                    <p className="text-[9px] font-bold text-[#ff6b2c]">
                      contribution
                    </p>
                  </div>

                  <div className="border-2 border-[#26113f] p-3 rounded-lg bg-white">
                    <p className="text-[9px] font-black uppercase tracking-wider text-[#756d7d]">
                      Sugar
                    </p>
                    <p className="text-lg font-black text-[#26113f] mt-1">
                      4g
                    </p>
                    <p className="text-[9px] font-bold text-[#756d7d]">
                      added
                    </p>
                  </div>

                </div>


                {/* Ingredient notes */}
                <div className="mt-5 pt-4 border-t-2 border-[#26113f] space-y-2">

                  <div className="flex items-start gap-2 text-xs font-bold text-[#26113f]">
                    <CheckCircle2 className="w-4 h-4 text-[#ff6b2c] shrink-0 mt-0.5" />
                    Whole oats identified
                  </div>

                  <div className="flex items-start gap-2 text-xs font-bold text-[#26113f]">
                    <AlertTriangle className="w-4 h-4 text-[#ff6b2c] shrink-0 mt-0.5" />
                    Contains tree nuts
                  </div>

                </div>


                <div className="mt-5 text-center">
                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#756d7d]">
                    Read the label. Know the food.
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
