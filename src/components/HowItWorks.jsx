import React from 'react';
import { Camera, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

export default function HowItWorks({ onScanClick }) {
  const getIcon = (name) => {
    switch (name) {
      case 'Camera':
        return <Camera className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'ShieldCheck':
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-24 bg-[#fff8e9] border-y-2 border-[#26113f]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center px-3 py-1.5 bg-[#c8f31d] text-[#190b2b] border-2 border-[#26113f] text-xs font-black uppercase tracking-[0.14em]">
              Simple 3-Step Process
            </span>

            <span className="hidden sm:block h-0.5 flex-1 bg-[#ff6b2c]" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.035em] leading-[0.95] text-[#26113f]">
            How Labelicious
            <br />
            <span className="text-[#ff6b2c]">actually works.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base sm:text-lg text-[#756d7d] leading-7 tracking-[0.01em]">
            From a confusing nutrition label to a clear food decision —
            Labelicious breaks it down in three simple steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <div
              key={item.step}
              className={`
                relative flex flex-col justify-between
                min-h-[330px]
                p-6 sm:p-7
                border-2 border-[#26113f]
                transition-transform duration-200
                hover:-translate-y-1
                ${index === 0
                  ? 'bg-[#ff6b2c] shadow-[7px_7px_0_#26113f]'
                  : index === 1
                    ? 'bg-[#c8f31d] shadow-[7px_7px_0_#26113f]'
                    : 'bg-[#26113f] text-[#fff8e9] shadow-[7px_7px_0_#ff6b2c]'
                }
              `}
            >
              <div>
                {/* Top row */}
                <div className="flex items-start justify-between mb-9">
                  <div
                    className={`
                      w-14 h-14
                      border-2 border-[#26113f]
                      flex items-center justify-center
                      ${index === 2
                        ? 'bg-[#fff8e9] text-[#26113f]'
                        : 'bg-[#fff8e9] text-[#26113f]'
                      }
                    `}
                  >
                    {getIcon(item.iconName)}
                  </div>

                  <span
                    className={`
                      text-5xl leading-none font-black font-mono
                      ${index === 2
                        ? 'text-[#ff6b2c]'
                        : 'text-[#26113f]/30'
                      }
                    `}
                  >
                    {String(item.step).padStart(2, '0')}
                  </span>
                </div>

                {/* Tag */}
                <div className="mb-3">
                  <span
                    className={`
                      text-[11px] font-black uppercase tracking-[0.16em]
                      ${index === 2
                        ? 'text-[#c8f31d]'
                        : 'text-[#26113f]'
                      }
                    `}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`
                    text-2xl sm:text-3xl font-black tracking-[-0.025em] leading-tight
                    ${index === 2
                      ? 'text-[#fff8e9]'
                      : 'text-[#26113f]'
                    }
                  `}
                >
                  {item.title}
                </h3>

                {/* Subtitle */}
                <p
                  className={`
                    text-sm font-bold mt-1 tracking-[0.015em]
                    ${index === 2
                      ? 'text-[#fff8e9]/70'
                      : 'text-[#26113f]/60'
                    }
                  `}
                >
                  {item.subtitle}
                </p>

                {/* Description */}
                <p
                  className={`
                    text-sm leading-6 tracking-[0.012em] mt-5
                    ${index === 2
                      ? 'text-[#fff8e9]/85'
                      : 'text-[#26113f]/75'
                    }
                  `}
                >
                  {item.description}
                </p>
              </div>

              {/* Bottom marker */}
              <div
                className={`
                  mt-8 pt-4 border-t-2 flex items-center justify-between
                  ${index === 2
                    ? 'border-[#fff8e9]/20'
                    : 'border-[#26113f]/20'
                  }
                `}
              >
                <span
                  className={`
                    text-[10px] font-black uppercase tracking-[0.18em]
                    ${index === 2
                      ? 'text-[#fff8e9]/50'
                      : 'text-[#26113f]/50'
                    }
                  `}
                >
                  Labelicious
                </span>

                <span
                  className={`
                    text-xs font-black
                    ${index === 2
                      ? 'text-[#c8f31d]'
                      : 'text-[#26113f]'
                    }
                  `}
                >
                  {index + 1} / 3
                </span>
              </div>

              {/* Desktop connector */}
              {index < 2 && (
                <div className="hidden md:flex absolute -right-[23px] top-1/2 -translate-y-1/2 z-10">
                  <div className="w-10 h-10 bg-[#fff8e9] border-2 border-[#26113f] flex items-center justify-center shadow-[3px_3px_0_#26113f]">
                    <ArrowRight className="w-5 h-5 text-[#26113f]" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={onScanClick}
            className="
              group
              inline-flex items-center gap-3
              px-6 py-4
              bg-[#26113f]
              text-[#c8f31d]
              border-2 border-[#26113f]
              font-black text-sm
              tracking-[0.01em]
              shadow-[5px_5px_0_#ff6b2c]
              hover:translate-x-[2px]
              hover:translate-y-[2px]
              hover:shadow-[3px_3px_0_#ff6b2c]
              transition-all duration-150
            "
          >
            <Camera className="w-5 h-5" />

            <span>
              Ready to try it? Scan your first food label
            </span>

            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
