import React from 'react';
import {
  ArrowLeft,
  Camera,
  PenLine,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ScanLine
} from 'lucide-react';

export default function PlaceholderPage({ type, product, onBack }) {
  if (type === 'scan') {
    return (
      <main className="min-h-[85vh] bg-[#fff8e9] px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          <button
            type="button"
            onClick={onBack}
            className="
              inline-flex items-center gap-2
              text-sm font-black
              text-[#26113f]/65
              hover:text-[#26113f]
              transition-colors
              mb-8
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <section
            className="
              bg-[#26113f]
              text-[#fff8e9]
              border-2 border-[#26113f]
              shadow-[8px_8px_0_#ff6b2c]
              p-7 sm:p-10 lg:p-12
            "
          >

            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <span
                className="
                  inline-flex items-center gap-2
                  px-3 py-1.5
                  bg-[#c8f31d]
                  text-[#26113f]
                  border-2 border-[#190b2b]
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                "
              >
                <ScanLine className="w-3.5 h-3.5" />
                Module in Preparation
              </span>

              <span className="text-[10px] font-black text-[#fff8e9]/35 uppercase tracking-[0.12em]">
                Step 02
              </span>
            </div>


            {/* Hero */}
            <div className="flex flex-col sm:flex-row gap-7 sm:items-start">

              <div
                className="
                  w-16 h-16
                  shrink-0
                  bg-[#ff6b2c]
                  text-[#26113f]
                  border-2 border-[#190b2b]
                  flex items-center justify-center
                  shadow-[4px_4px_0_#c8f31d]
                "
              >
                <Camera className="w-8 h-8" />
              </div>

              <div>
                <h1
                  className="
                    text-4xl sm:text-5xl
                    font-black
                    tracking-[-0.04em]
                    leading-[0.95]
                  "
                >
                  Food Label
                  <br />
                  <span className="text-[#ff6b2c]">
                    Scanner.
                  </span>
                </h1>

                <p
                  className="
                    mt-6
                    text-sm sm:text-base
                    text-[#fff8e9]/65
                    max-w-xl
                    leading-7
                    tracking-[0.012em]
                  "
                >
                  Capture a food label with your camera or
                  upload an image. Labelicious will extract the
                  nutrition panel and ingredient list for analysis.
                </p>
              </div>

            </div>


            {/* Upcoming capabilities */}
            <div
              className="
                mt-10
                border-t-2 border-[#fff8e9]/15
                pt-7
              "
            >
              <div
                className="
                  text-[10px]
                  font-black
                  text-[#c8f31d]
                  uppercase
                  tracking-[0.16em]
                  mb-5
                "
              >
                Upcoming Capabilities
              </div>

              <div className="grid gap-3">

                <div
                  className="
                    flex items-start gap-3
                    p-4
                    bg-[#fff8e9]/5
                    border border-[#fff8e9]/15
                  "
                >
                  <CheckCircle2 className="w-4 h-4 text-[#c8f31d] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#fff8e9]/75 leading-6">
                    Camera capture & drag-and-drop image upload
                  </span>
                </div>

                <div
                  className="
                    flex items-start gap-3
                    p-4
                    bg-[#fff8e9]/5
                    border border-[#fff8e9]/15
                  "
                >
                  <CheckCircle2 className="w-4 h-4 text-[#c8f31d] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#fff8e9]/75 leading-6">
                    OCR extraction of nutrition tables and ingredients
                  </span>
                </div>

                <div
                  className="
                    flex items-start gap-3
                    p-4
                    bg-[#fff8e9]/5
                    border border-[#fff8e9]/15
                  "
                >
                  <CheckCircle2 className="w-4 h-4 text-[#c8f31d] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#fff8e9]/75 leading-6">
                    Instant Labelicious score & additive decoding
                  </span>
                </div>

              </div>
            </div>


            {/* Action */}
            <div className="mt-9">
              <button
                type="button"
                onClick={onBack}
                className="
                  inline-flex items-center gap-2
                  px-6 py-3
                  bg-[#c8f31d]
                  text-[#26113f]
                  border-2 border-[#190b2b]
                  font-black
                  text-sm
                  shadow-[4px_4px_0_#ff6b2c]
                  hover:translate-x-[2px]
                  hover:translate-y-[2px]
                  hover:shadow-[2px_2px_0_#ff6b2c]
                  transition-all
                "
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>

          </section>
        </div>
      </main>
    );
  }


  if (type === 'manual') {
    return (
      <main className="min-h-[85vh] bg-[#fff8e9] px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          <button
            type="button"
            onClick={onBack}
            className="
              inline-flex items-center gap-2
              text-sm font-black
              text-[#26113f]/65
              hover:text-[#26113f]
              transition-colors
              mb-8
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <section
            className="
              bg-[#fff8e9]
              border-2 border-[#26113f]
              shadow-[8px_8px_0_#c8f31d]
              p-7 sm:p-10 lg:p-12
            "
          >

            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <span
                className="
                  inline-flex items-center gap-2
                  px-3 py-1.5
                  bg-[#ff6b2c]
                  text-[#26113f]
                  border-2 border-[#26113f]
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                "
              >
                <PenLine className="w-3.5 h-3.5" />
                Module in Preparation
              </span>

              <span
                className="
                  text-[10px]
                  font-black
                  text-[#756d7d]
                  uppercase
                  tracking-[0.12em]
                "
              >
                Step 02
              </span>
            </div>


            {/* Hero */}
            <div className="flex flex-col sm:flex-row gap-7 sm:items-start">

              <div
                className="
                  w-16 h-16
                  shrink-0
                  bg-[#26113f]
                  text-[#c8f31d]
                  border-2 border-[#26113f]
                  flex items-center justify-center
                "
              >
                <PenLine className="w-8 h-8" />
              </div>

              <div>

                <h1
                  className="
                    text-4xl sm:text-5xl
                    font-black
                    text-[#26113f]
                    tracking-[-0.04em]
                    leading-[0.95]
                  "
                >
                  Manual
                  <br />
                  <span className="text-[#ff6b2c]">
                    Entry.
                  </span>
                </h1>

                <p
                  className="
                    mt-6
                    text-sm sm:text-base
                    text-[#756d7d]
                    max-w-xl
                    leading-7
                    tracking-[0.012em]
                  "
                >
                  For unreadable labels or quick testing, you
                  will be able to type or paste ingredients and
                  nutritional numbers directly.
                </p>

              </div>
            </div>


            {/* Capabilities */}
            <div
              className="
                mt-10
                border-t-2 border-[#ded5c5]
                pt-7
              "
            >
              <div
                className="
                  text-[10px]
                  font-black
                  text-[#26113f]
                  uppercase
                  tracking-[0.16em]
                  mb-5
                "
              >
                Upcoming Capabilities
              </div>

              <div className="grid gap-3">

                <div
                  className="
                    flex items-start gap-3
                    p-4
                    bg-[#f2eadb]
                    border-2 border-[#ded5c5]
                  "
                >
                  <CheckCircle2 className="w-4 h-4 text-[#26113f] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#756d7d] leading-6">
                    Paste ingredient text with auto-tagging
                  </span>
                </div>

                <div
                  className="
                    flex items-start gap-3
                    p-4
                    bg-[#f2eadb]
                    border-2 border-[#ded5c5]
                  "
                >
                  <CheckCircle2 className="w-4 h-4 text-[#26113f] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#756d7d] leading-6">
                    Custom macros and dietary preference checks
                  </span>
                </div>

              </div>
            </div>


            {/* Action */}
            <div className="mt-9">
              <button
                type="button"
                onClick={onBack}
                className="
                  inline-flex items-center gap-2
                  px-6 py-3
                  bg-[#26113f]
                  text-[#c8f31d]
                  border-2 border-[#190b2b]
                  font-black
                  text-sm
                  shadow-[4px_4px_0_#ff6b2c]
                  hover:translate-x-[2px]
                  hover:translate-y-[2px]
                  hover:shadow-[2px_2px_0_#ff6b2c]
                  transition-all
                "
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>

          </section>
        </div>
      </main>
    );
  }


  // Detail view for mock product
  if (type === 'detail' && product) {

    const isHigh = product.score >= 70;

    return (
      <main className="min-h-[85vh] bg-[#fff8e9] px-4 py-10 sm:px-6 lg:px-8">

        <div className="max-w-4xl mx-auto">

          {/* Back */}
          <button
            type="button"
            onClick={onBack}
            className="
              inline-flex items-center gap-2
              text-sm font-black
              text-[#26113f]/65
              hover:text-[#26113f]
              transition-colors
              mb-7
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>


          {/* Main Card */}
          <section
            className="
              bg-[#fff8e9]
              border-2 border-[#26113f]
              shadow-[8px_8px_0_#ff6b2c]
              overflow-hidden
            "
          >

            {/* PRODUCT HEADER */}
            <div className="p-6 sm:p-8 border-b-2 border-[#ded5c5]">

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-7">

                <div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">

                    <span
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.14em]
                        text-[#ff6b2c]
                      "
                    >
                      {product.category}
                    </span>

                    <span className="text-[#ded5c5]">
                      /
                    </span>

                    <span
                      className="
                        inline-flex items-center gap-1.5
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.08em]
                        text-[#756d7d]
                      "
                    >
                      <Clock className="w-3 h-3" />
                      {product.scannedAt}
                    </span>

                  </div>


                  <h1
                    className="
                      text-3xl sm:text-4xl
                      font-black
                      text-[#26113f]
                      tracking-[-0.035em]
                      leading-tight
                    "
                  >
                    {product.name}
                  </h1>


                  <p
                    className="
                      text-sm
                      text-[#756d7d]
                      mt-2
                      leading-6
                    "
                  >
                    Brand:{' '}
                    <span className="font-black text-[#26113f]">
                      {product.brand}
                    </span>

                    <span className="mx-2 text-[#ded5c5]">
                      /
                    </span>

                    Serving:{' '}
                    <span className="font-bold text-[#26113f]">
                      {product.servingSize}
                    </span>
                  </p>

                </div>


                {/* SCORE */}
                <div className="flex items-center gap-4 shrink-0">

                  <div
                    className={`
                      w-20 h-20
                      border-2 border-[#26113f]
                      flex flex-col items-center justify-center
                      ${
                        isHigh
                          ? 'bg-[#c8f31d]'
                          : 'bg-[#ff6b2c]'
                      }
                    `}
                  >
                    <span
                      className="
                        text-3xl
                        font-black
                        text-[#26113f]
                        leading-none
                      "
                    >
                      {product.score}
                    </span>

                    <span
                      className="
                        text-[9px]
                        font-black
                        text-[#26113f]/60
                        uppercase
                        tracking-[0.1em]
                        mt-1
                      "
                    >
                      / 100
                    </span>
                  </div>


                  <div>

                    <span
                      className="
                        block
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.14em]
                        text-[#756d7d]
                        mb-1
                      "
                    >
                      Labelicious Score
                    </span>

                    <p
                      className="
                        text-lg
                        font-black
                        text-[#26113f]
                      "
                    >
                      {product.scoreLabel}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* FOODLENS SUMMARY */}
            <div className="p-6 sm:p-8">

              <div
                className="
                  bg-[#26113f]
                  text-[#fff8e9]
                  border-2 border-[#26113f]
                  p-5 sm:p-6
                  shadow-[5px_5px_0_#c8f31d]
                "
              >

                <div
                  className="
                    flex items-center gap-2
                    text-[#c8f31d]
                    font-black
                    text-[10px]
                    uppercase
                    tracking-[0.16em]
                    mb-3
                  "
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Labelicious Read
                </div>

                <p
                  className="
                    text-sm sm:text-base
                    text-[#fff8e9]/75
                    leading-7
                    tracking-[0.012em]
                  "
                >
                  {product.summary}
                </p>

              </div>

            </div>


            {/* NUTRITION */}
            <div className="px-6 sm:px-8 pb-8">

              <div className="flex items-end justify-between gap-4 mb-4">

                <div>
                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.16em]
                      text-[#ff6b2c]
                    "
                  >
                    Label Data
                  </span>

                  <h2
                    className="
                      text-xl sm:text-2xl
                      font-black
                      text-[#26113f]
                      mt-1
                    "
                  >
                    Nutritional Snapshot
                  </h2>
                </div>

                <span
                  className="
                    hidden sm:block
                    text-[10px]
                    font-black
                    text-[#756d7d]
                    uppercase
                    tracking-[0.1em]
                  "
                >
                  Per listed serving
                </span>

              </div>


              <div
                className="
                  grid grid-cols-2
                  sm:grid-cols-4
                  gap-3
                "
              >
                {product.keyMetrics.map((m) => (
                  <div
                    key={m.label}
                    className="
                      bg-[#f2eadb]
                      border-2 border-[#ded5c5]
                      p-4
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.1em]
                        text-[#756d7d]
                        block
                      "
                    >
                      {m.label}
                    </span>

                    <span
                      className="
                        text-lg
                        font-black
                        text-[#26113f]
                        block
                        mt-2
                      "
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

            </div>


            {/* POSITIVES / CONCERNS */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-0
                border-t-2 border-[#ded5c5]
              "
            >

              {/* Positive */}
              <div
                className="
                  p-6 sm:p-8
                  border-b-2 md:border-b-0
                  md:border-r-2
                  border-[#ded5c5]
                "
              >

                <div className="flex items-center gap-3 mb-5">

                  <div
                    className="
                      w-10 h-10
                      bg-[#c8f31d]
                      border-2 border-[#26113f]
                      flex items-center justify-center
                    "
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#26113f]" />
                  </div>

                  <div>
                    <span
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.14em]
                        text-[#756d7d]
                      "
                    >
                      Side A
                    </span>

                    <h3
                      className="
                        text-lg
                        font-black
                        text-[#26113f]
                      "
                    >
                      Positive Highlights
                    </h3>
                  </div>

                </div>


                <ul className="space-y-3">

                  {product.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="
                        flex items-start gap-3
                        text-sm
                        text-[#756d7d]
                        leading-6
                      "
                    >
                      <span
                        className="
                          w-1.5 h-1.5
                          bg-[#26113f]
                          shrink-0
                          mt-2.5
                        "
                      />

                      <span>{h}</span>
                    </li>
                  ))}

                </ul>

              </div>


              {/* Concerns */}
              <div className="p-6 sm:p-8">

                <div className="flex items-center gap-3 mb-5">

                  <div
                    className="
                      w-10 h-10
                      bg-[#ff6b2c]
                      border-2 border-[#26113f]
                      flex items-center justify-center
                    "
                  >
                    <AlertTriangle className="w-5 h-5 text-[#26113f]" />
                  </div>

                  <div>
                    <span
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.14em]
                        text-[#756d7d]
                      "
                    >
                      Side B
                    </span>

                    <h3
                      className="
                        text-lg
                        font-black
                        text-[#26113f]
                      "
                    >
                      Things to Consider
                    </h3>
                  </div>

                </div>


                <ul className="space-y-3">

                  {product.concerns.map((c, i) => (
                    <li
                      key={i}
                      className="
                        flex items-start gap-3
                        text-sm
                        text-[#756d7d]
                        leading-6
                      "
                    >
                      <span
                        className="
                          w-1.5 h-1.5
                          bg-[#ff6b2c]
                          shrink-0
                          mt-2.5
                        "
                      />

                      <span>{c}</span>
                    </li>
                  ))}

                </ul>

              </div>

            </div>


            {/* FOOTER ACTION */}
            <div
              className="
                border-t-2 border-[#26113f]
                bg-[#26113f]
                p-6
                flex justify-center
              "
            >
              <button
                type="button"
                onClick={onBack}
                className="
                  inline-flex items-center gap-2
                  px-6 py-3
                  bg-[#c8f31d]
                  text-[#26113f]
                  border-2 border-[#190b2b]
                  font-black
                  text-sm
                  shadow-[4px_4px_0_#ff6b2c]
                  hover:translate-x-[2px]
                  hover:translate-y-[2px]
                  hover:shadow-[2px_2px_0_#ff6b2c]
                  transition-all
                "
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>

          </section>

        </div>
      </main>
    );
  }

  return null;
}
