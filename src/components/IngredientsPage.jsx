import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  CheckCircle2,
  ShieldCheck,
  Tag,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function IngredientsPage({
  product,
  onBackToAnalysis,
  onNavigateToPersonalize
}) {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!product) return null;

  const ingredients = product.ingredients || [];

  const summary = product.ingredientSummary || {
    totalCount: ingredients.length,
    additivesCount: 0,
    attentionCount: 0,
    summaryText: 'Standard ingredients list.'
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const categories = [
    'all',
    ...Array.from(
      new Set(
        ingredients
          .map((ing) => ing.category)
          .filter(Boolean)
      )
    )
  ];

  const filteredIngredients =
    selectedCategory === 'all'
      ? ingredients
      : ingredients.filter(
          (ing) => ing.category === selectedCategory
        );

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'Sweetener':
        return 'bg-[#ff6b2c] text-[#26113f] border-[#26113f]';

      case 'Emulsifier':
        return 'bg-[#c8f31d] text-[#26113f] border-[#26113f]';

      case 'Flavour enhancer':
        return 'bg-[#26113f] text-[#fff8e9] border-[#26113f]';

      case 'Acidity regulator':
        return 'bg-[#fff8e9] text-[#26113f] border-[#26113f]';

      case 'Preservative':
        return 'bg-[#ff6b2c]/20 text-[#26113f] border-[#ff6b2c]';

      case 'Thickener':
      case 'Colour':
        return 'bg-[#c8f31d]/50 text-[#26113f] border-[#26113f]';

      default:
        return 'bg-[#f2eadb] text-[#26113f] border-[#ded5c5]';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Whole food':
        return {
          wrapper:
            'bg-[#c8f31d]/50 text-[#26113f] border-[#26113f]',
          dot: 'bg-[#26113f]'
        };

      case 'Worth checking':
      case 'Worth understanding':
        return {
          wrapper:
            'bg-[#ff6b2c]/15 text-[#8d3212] border-[#ff6b2c]',
          dot: 'bg-[#ff6b2c]'
        };

      default:
        return {
          wrapper:
            'bg-[#f2eadb] text-[#756d7d] border-[#ded5c5]',
          dot: 'bg-[#756d7d]'
        };
    }
  };

  return (
    <div className="min-h-[85vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#fff8e9]">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <button
            type="button"
            onClick={onBackToAnalysis}
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
            Back to Analysis
          </button>

          <div className="flex items-center gap-3 mb-5">
            <span
              className="
                inline-flex items-center gap-2
                px-3 py-1.5
                bg-[#c8f31d]
                text-[#26113f]
                border-2 border-[#26113f]
                text-[10px] font-black
                uppercase tracking-[0.16em]
              "
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ingredient Intelligence
            </span>

            <span className="hidden sm:block h-0.5 flex-1 bg-[#ff6b2c]" />
          </div>

          <h1
            className="
              text-4xl sm:text-5xl lg:text-6xl
              font-black
              tracking-[-0.04em]
              leading-[0.95]
              text-[#26113f]
            "
          >
            What's
            <br />
            <span className="text-[#ff6b2c]">inside?</span>
          </h1>

          <p
            className="
              mt-6
              text-base sm:text-lg
              text-[#756d7d]
              max-w-2xl
              leading-7
              tracking-[0.012em]
            "
          >
            Labelicious translates complicated ingredient names
            into plain English, so you can understand what
            you're actually looking at.
          </p>

          <div
            className="
              mt-5
              flex flex-wrap items-center gap-x-2 gap-y-1
              text-sm font-bold
              text-[#26113f]
            "
          >
            <span>Product:</span>
            <span className="text-[#ff6b2c]">
              {product.name}
            </span>
            <span className="text-[#756d7d]">
              ({product.brand})
            </span>
          </div>
        </div>

        {/* COMPOSITION OVERVIEW */}
        <section
          className="
            bg-[#26113f]
            text-[#fff8e9]
            border-2 border-[#26113f]
            shadow-[7px_7px_0_#ff6b2c]
            p-6 sm:p-8
            mb-10
          "
        >
          <div
            className="
              flex flex-col sm:flex-row
              sm:items-center sm:justify-between
              gap-3
              pb-5
              mb-6
              border-b-2 border-[#fff8e9]/15
            "
          >
            <h2 className="text-base font-black flex items-center gap-2">
              <Info className="w-4 h-4 text-[#c8f31d]" />
              Label Composition Overview
            </h2>

            <span className="text-[11px] text-[#fff8e9]/45">
              {summary.summaryText}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div
              className="
                bg-[#fff8e9]
                text-[#26113f]
                border-2 border-[#fff8e9]
                p-4
              "
            >
              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.15em]
                  text-[#756d7d]
                "
              >
                Total Ingredients
              </span>

              <div className="text-3xl font-black mt-2">
                {summary.totalCount}
              </div>

              <p className="text-[11px] text-[#756d7d] mt-1">
                From printed package label
              </p>
            </div>

            <div
              className="
                bg-[#c8f31d]
                text-[#26113f]
                border-2 border-[#26113f]
                p-4
              "
            >
              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.15em]
                "
              >
                Functional Additives
              </span>

              <div className="text-3xl font-black mt-2">
                {summary.additivesCount}
              </div>

              <p className="text-[11px] text-[#26113f]/65 mt-1">
                Emulsifiers, regulators, enhancers
              </p>
            </div>

            <div
              className="
                bg-[#ff6b2c]
                text-[#26113f]
                border-2 border-[#26113f]
                p-4
              "
            >
              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.15em]
                "
              >
                Things to Understand
              </span>

              <div className="text-3xl font-black mt-2">
                {summary.attentionCount}
              </div>

              <p className="text-[11px] text-[#26113f]/70 mt-1">
                Worth looking at more closely
              </p>
            </div>

          </div>
        </section>

        {/* CATEGORY FILTER */}
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-[#ff6b2c]" />

            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-[#26113f]
              "
            >
              Filter ingredients
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-3.5 py-2
                  border-2
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[0.04em]
                  transition-all
                  ${
                    selectedCategory === cat
                      ? 'bg-[#26113f] text-[#c8f31d] border-[#26113f] shadow-[3px_3px_0_#ff6b2c]'
                      : 'bg-[#fff8e9] text-[#26113f]/65 border-[#ded5c5] hover:border-[#26113f] hover:text-[#26113f]'
                  }
                `}
              >
                {cat === 'all'
                  ? `All (${ingredients.length})`
                  : cat}
              </button>
            ))}
          </div>
        </div>

        {/* INGREDIENT LIST */}
        <div className="space-y-4 mb-12">
          {filteredIngredients.map((item) => {
            const isExpanded = expandedId === item.id;
            const statusStyle = getStatusStyle(item.status);

            return (
              <div
                key={item.id}
                className={`
                  overflow-hidden
                  border-2
                  transition-all duration-200
                  ${
                    isExpanded
                      ? 'border-[#26113f] shadow-[5px_5px_0_#c8f31d]'
                      : 'border-[#ded5c5] hover:border-[#26113f]'
                  }
                  bg-[#fff8e9]
                `}
              >
                {/* INGREDIENT HEADER */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="
                    w-full
                    p-4 sm:p-5
                    text-left
                    flex items-start sm:items-center
                    justify-between
                    gap-4
                    hover:bg-[#f8efdf]
                    transition-colors
                  "
                  aria-expanded={isExpanded}
                >
                  <div className="flex-1 min-w-0">

                    <div
                      className="
                        flex flex-wrap
                        items-center
                        gap-2
                        mb-2
                      "
                    >
                      <span
                        className="
                          text-base
                          sm:text-lg
                          font-black
                          text-[#26113f]
                          tracking-[-0.015em]
                        "
                      >
                        {item.name}
                      </span>

                      {item.code && (
                        <span
                          className="
                            text-[10px]
                            font-mono
                            font-black
                            px-2 py-1
                            bg-[#26113f]
                            text-[#c8f31d]
                            border border-[#26113f]
                          "
                        >
                          {item.code}
                        </span>
                      )}

                      <span
                        className={`
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.04em]
                          px-2 py-1
                          border
                          ${getCategoryStyle(item.category)}
                        `}
                      >
                        {item.category}
                      </span>

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          text-[10px]
                          font-bold
                          px-2 py-1
                          border
                          ${statusStyle.wrapper}
                        `}
                      >
                        <span
                          className={`
                            w-1.5 h-1.5
                            ${statusStyle.dot}
                          `}
                        />

                        {item.status}
                      </span>
                    </div>

                    <p
                      className="
                        text-xs sm:text-sm
                        text-[#756d7d]
                        leading-6
                        tracking-[0.012em]
                      "
                    >
                      {item.explanation}
                    </p>
                  </div>

                  <div
                    className="
                      shrink-0
                      w-9 h-9
                      border-2 border-[#ded5c5]
                      flex items-center justify-center
                      text-[#26113f]
                    "
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* EXPANDED DETAILS */}
                {isExpanded && (
                  <div
                    className="
                      px-4 sm:px-5
                      pb-5
                      pt-5
                      border-t-2 border-[#ded5c5]
                      bg-[#f8efdf]
                      space-y-5
                    "
                  >
                    <div>
                      <h4
                        className="
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.16em]
                          text-[#756d7d]
                          mb-2
                        "
                      >
                        What it is
                      </h4>

                      <p
                        className="
                          text-sm
                          text-[#26113f]/80
                          leading-6
                          tracking-[0.012em]
                        "
                      >
                        {item.explanation}
                      </p>
                    </div>

                    <div
                      className="
                        p-4
                        bg-[#fff8e9]
                        border-2 border-[#ded5c5]
                      "
                    >
                      <h4
                        className="
                          text-xs
                          font-black
                          text-[#26113f]
                          flex items-center gap-2
                          mb-2
                        "
                      >
                        <HelpCircle className="w-4 h-4 text-[#ff6b2c]" />
                        Why is it used in this food?
                      </h4>

                      <p
                        className="
                          text-xs sm:text-sm
                          text-[#756d7d]
                          leading-6
                          tracking-[0.012em]
                        "
                      >
                        {item.purpose}
                      </p>
                    </div>

                    <div
                      className="
                        p-4
                        bg-[#26113f]
                        text-[#fff8e9]
                        border-2 border-[#26113f]
                      "
                    >
                      <h4
                        className="
                          text-xs
                          font-black
                          flex items-center gap-2
                          mb-2
                        "
                      >
                        <ShieldCheck className="w-4 h-4 text-[#c8f31d]" />
                        Labelicious Note
                      </h4>

                      <p
                        className="
                          text-xs
                          text-[#fff8e9]/70
                          leading-6
                          tracking-[0.012em]
                        "
                      >
                        {item.note ||
                          "Presence alone does not determine whether a product is healthy or unhealthy. Consider the ingredient alongside the product's overall nutrition profile."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredIngredients.length === 0 && (
            <div
              className="
                border-2 border-dashed
                border-[#ded5c5]
                p-10
                text-center
                text-sm
                text-[#756d7d]
              "
            >
              No ingredients found in this category.
            </div>
          )}
        </div>

        {/* WHAT TO PAY ATTENTION TO */}
        <section
          className="
            bg-[#fff8e9]
            border-2 border-[#26113f]
            p-6 sm:p-8
            mb-12
            shadow-[6px_6px_0_#c8f31d]
          "
        >
          <div className="flex items-start gap-4 mb-6">
            <div
              className="
                w-10 h-10
                shrink-0
                bg-[#ff6b2c]
                border-2 border-[#26113f]
                flex items-center justify-center
              "
            >
              <Info className="w-5 h-5 text-[#26113f]" />
            </div>

            <div>
              <h3
                className="
                  text-xl sm:text-2xl
                  font-black
                  text-[#26113f]
                  tracking-[-0.02em]
                "
              >
                What should I pay attention to?
              </h3>

              <p className="text-xs text-[#756d7d] mt-1.5 leading-5">
                Balanced observations based on this ingredient list.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {(product.attentionPoints || [
              'Consider the overall nutrient density alongside individual additives.',
              'Added sugar and saturated fats represent key dietary metrics.',
              'Review for personal sensitivities or acute allergen triggers.'
            ]).map((point, idx) => (
              <div
                key={idx}
                className="
                  flex items-start gap-3
                  p-4
                  bg-[#f8efdf]
                  border-2 border-[#ded5c5]
                  text-xs sm:text-sm
                  text-[#26113f]/80
                  leading-6
                  tracking-[0.012em]
                "
              >
                <CheckCircle2
                  className="
                    w-4 h-4
                    text-[#26113f]
                    shrink-0
                    mt-1
                  "
                />

                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PERSONALIZATION CTA */}
        <section
          className="
            bg-[#26113f]
            text-[#fff8e9]
            border-2 border-[#26113f]
            p-6 sm:p-8
            shadow-[7px_7px_0_#ff6b2c]
            flex flex-col sm:flex-row
            items-start sm:items-center
            justify-between
            gap-7
          "
        >
          <div>
            <div
              className="
                flex items-center gap-2
                text-[10px]
                font-black
                text-[#c8f31d]
                uppercase
                tracking-[0.16em]
                mb-3
              "
            >
              <Sparkles className="w-3.5 h-3.5" />
              Tailor to Your Goals
            </div>

            <h3
              className="
                text-2xl sm:text-3xl
                font-black
                tracking-[-0.025em]
              "
            >
              See this food for you.
            </h3>

            <p
              className="
                text-sm
                text-[#fff8e9]/60
                max-w-md
                mt-2
                leading-6
                tracking-[0.012em]
              "
            >
              Adjust the analysis based on your priorities,
              such as fitness, children, or other dietary goals.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToPersonalize}
            className="
              group
              shrink-0
              inline-flex
              items-center
              gap-3
              px-5 py-3.5
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
            <span>Choose My Profile</span>

            <ArrowRight
              className="
                w-4 h-4
                group-hover:translate-x-1
                transition-transform
              "
            />
          </button>
        </section>

        {/* BOTTOM BACK BUTTON */}
        <div
          className="
            mt-10
            pt-5
            border-t-2 border-[#ded5c5]
            flex justify-center
          "
        >
          <button
            type="button"
            onClick={onBackToAnalysis}
            className="
              text-xs
              font-black
              text-[#756d7d]
              hover:text-[#26113f]
              transition-colors
              uppercase
              tracking-[0.08em]
            "
          >
            ← Return to Overall Product Analysis
          </button>
        </div>

      </div>
    </div>
  );
}
