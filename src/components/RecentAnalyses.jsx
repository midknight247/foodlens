import React from 'react';
import {
  ArrowUpRight,
  Check,
  AlertCircle,
  Clock,
  ScanLine
} from 'lucide-react';
import { RECENT_ANALYSES } from '../data/mockData';

export default function RecentAnalyses({ onSelectProduct }) {
  return (
    <section
      id="recent-analyses"
      className="py-16 sm:py-20 bg-[#fff8e9]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">

          <div>

            <div className="flex items-center gap-3 mb-5">

              <span
                className="
                  inline-flex items-center gap-2
                  px-3 py-1.5
                  bg-[#26113f]
                  text-[#c8f31d]
                  border-2 border-[#26113f]
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                "
              >
                <ScanLine className="w-3.5 h-3.5" />
                Real Examples
              </span>

              <span className="hidden sm:block h-0.5 w-16 bg-[#ff6b2c]" />

            </div>

            <h2
              className="
                text-4xl sm:text-5xl
                font-black
                text-[#26113f]
                tracking-[-0.04em]
                leading-[0.95]
              "
            >
              Recent
              <br className="sm:hidden" />
              <span className="text-[#ff6b2c]"> analyses.</span>
            </h2>

            <p
              className="
                mt-5
                text-sm sm:text-base
                text-[#756d7d]
                max-w-xl
                leading-7
                tracking-[0.012em]
              "
            >
              See how Labelicious turns everyday grocery labels
              into clear, useful food decisions.
            </p>

          </div>


          {/* SAMPLE COUNT */}
          <div
            className="
              flex items-center gap-3
              self-start sm:self-auto
              px-4 py-3
              bg-[#c8f31d]
              text-[#26113f]
              border-2 border-[#26113f]
              shadow-[4px_4px_0_#ff6b2c]
            "
          >
            <span className="w-2 h-2 bg-[#26113f]" />

            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.1em]
              "
            >
              {RECENT_ANALYSES.length} sample food items analyzed
            </span>
          </div>

        </div>


        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

          {RECENT_ANALYSES.map((item) => {

            const isHigh = item.score >= 70;

            return (
              <article
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="
                  group
                  cursor-pointer
                  bg-[#fff8e9]
                  border-2 border-[#26113f]
                  shadow-[6px_6px_0_#ded5c5]
                  hover:shadow-[8px_8px_0_#ff6b2c]
                  hover:-translate-y-0.5
                  transition-all duration-150
                  overflow-hidden
                "
              >

                {/* PRODUCT TOP */}
                <div className="p-6 sm:p-7">

                  <div
                    className="
                      flex items-start
                      justify-between
                      gap-5
                      pb-5
                      border-b-2 border-[#ded5c5]
                    "
                  >

                    {/* PRODUCT INFO */}
                    <div className="min-w-0">

                      <div
                        className="
                          flex flex-wrap
                          items-center
                          gap-2
                          mb-3
                        "
                      >

                        <span
                          className="
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-[#ff6b2c]
                          "
                        >
                          {item.category}
                        </span>

                        <span className="text-[#ded5c5]">
                          /
                        </span>

                        <span
                          className="
                            inline-flex
                            items-center gap-1
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.08em]
                            text-[#756d7d]
                          "
                        >
                          <Clock className="w-3 h-3" />
                          {item.scannedAt}
                        </span>

                      </div>


                      <h3
                        className="
                          text-xl sm:text-2xl
                          font-black
                          text-[#26113f]
                          tracking-[-0.025em]
                          leading-tight
                          group-hover:text-[#ff6b2c]
                          transition-colors
                        "
                      >
                        {item.name}
                      </h3>


                      <p
                        className="
                          text-xs
                          text-[#756d7d]
                          mt-2
                          leading-5
                        "
                      >
                        {item.brand}
                        <span className="mx-2 text-[#ded5c5]">
                          /
                        </span>
                        Serving: {item.servingSize}
                        <span className="mx-2 text-[#ded5c5]">
                          /
                        </span>
                        {item.calories} kcal
                      </p>

                    </div>


                    {/* SCORE */}
                    <div className="shrink-0 text-center">

                      <div
                        className={`
                          w-16 h-16
                          border-2 border-[#26113f]
                          flex flex-col
                          items-center justify-center
                          ${
                            isHigh
                              ? 'bg-[#c8f31d]'
                              : 'bg-[#ff6b2c]'
                          }
                        `}
                      >

                        <span
                          className="
                            text-2xl
                            font-black
                            text-[#26113f]
                            leading-none
                          "
                        >
                          {item.score}
                        </span>

                        <span
                          className="
                            text-[9px]
                            font-black
                            text-[#26113f]/60
                            uppercase
                            tracking-[0.08em]
                            mt-1
                          "
                        >
                          / 100
                        </span>

                      </div>

                      <span
                        className="
                          block
                          mt-2
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.08em]
                          text-[#26113f]
                          max-w-[72px]
                          leading-3
                        "
                      >
                        {item.scoreLabel}
                      </span>

                    </div>

                  </div>


                  {/* SUMMARY */}
                  <div className="py-5">

                    <div
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.14em]
                        text-[#756d7d]
                        mb-2
                      "
                    >
                      Labelicious Read
                    </div>

                    <p
                      className="
                        text-sm
                        text-[#26113f]/75
                        leading-6
                        tracking-[0.012em]
                      "
                    >
                      {item.summary}
                    </p>

                  </div>


                  {/* NUTRITION STRIP */}
                  <div
                    className="
                      grid
                      grid-cols-2
                      sm:grid-cols-4
                      gap-2
                      mb-6
                    "
                  >

                    {item.keyMetrics.map((metric) => {

                      let statusBg =
                        'bg-[#f2eadb] border-[#ded5c5] text-[#26113f]';

                      if (metric.status === 'positive') {
                        statusBg =
                          'bg-[#c8f31d] border-[#26113f] text-[#26113f]';
                      }

                      if (metric.status === 'negative') {
                        statusBg =
                          'bg-[#ff6b2c]/20 border-[#ff6b2c] text-[#26113f]';
                      }

                      if (metric.status === 'neutral') {
                        statusBg =
                          'bg-[#fff8e9] border-[#26113f]/20 text-[#26113f]';
                      }

                      return (
                        <div
                          key={metric.label}
                          className={`
                            p-3
                            border-2
                            ${statusBg}
                          `}
                        >

                          <div
                            className="
                              text-[9px]
                              uppercase
                              font-black
                              tracking-[0.08em]
                              opacity-60
                            "
                          >
                            {metric.label}
                          </div>

                          <div
                            className="
                              text-sm
                              font-black
                              mt-1
                            "
                          >
                            {metric.value}
                          </div>

                        </div>
                      );
                    })}

                  </div>


                  {/* HIGHLIGHTS */}
                  <div className="space-y-2 mb-2">

                    {item.highlights.slice(0, 2).map((highlight, idx) => (
                      <div
                        key={idx}
                        className="
                          flex items-start gap-3
                          p-3
                          bg-[#c8f31d]/30
                          border border-[#c8f31d]
                          text-xs
                          text-[#26113f]
                          leading-5
                        "
                      >

                        <Check
                          className="
                            w-4 h-4
                            text-[#26113f]
                            shrink-0
                            mt-0.5
                          "
                        />

                        <span>{highlight}</span>

                      </div>
                    ))}


                    {item.concerns.slice(0, 2).map((concern, idx) => (
                      <div
                        key={idx}
                        className="
                          flex items-start gap-3
                          p-3
                          bg-[#ff6b2c]/10
                          border border-[#ff6b2c]
                          text-xs
                          text-[#26113f]
                          leading-5
                        "
                      >

                        <AlertCircle
                          className="
                            w-4 h-4
                            text-[#ff6b2c]
                            shrink-0
                            mt-0.5
                          "
                        />

                        <span>{concern}</span>

                      </div>
                    ))}

                  </div>

                </div>


                {/* CARD FOOTER */}
                <div
                  className="
                    px-6 sm:px-7
                    py-4
                    bg-[#26113f]
                    text-[#fff8e9]
                    flex items-center
                    justify-between
                    gap-4
                  "
                >

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-black
                      text-[#fff8e9]/55
                      uppercase
                      tracking-[0.08em]
                    "
                  >
                    Full analysis
                  </span>


                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-black
                      text-[#c8f31d]
                    "
                  >
                    <span>View details</span>

                    <ArrowUpRight
                      className="
                        w-4 h-4
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        transition-transform
                      "
                    />
                  </div>

                </div>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
}
