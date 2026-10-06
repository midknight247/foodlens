import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Smile,
  Activity,
  Heart,
  Check,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { PERSONALIZATION_PROFILES } from '../data/mockData';

export default function PersonalizePage({
  currentProfileId = 'general',
  onConfirmProfile,
  onBack
}) {
  const [selectedId, setSelectedId] = useState(currentProfileId);

  const getProfileIcon = (iconName) => {
    switch (iconName) {
      case 'Smile':
        return <Smile className="w-6 h-6" />;
      case 'Activity':
        return <Activity className="w-6 h-6" />;
      case 'Heart':
        return <Heart className="w-6 h-6" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const handleContinue = () => {
    const chosenProfile =
      PERSONALIZATION_PROFILES.find(
        (p) => p.id === selectedId
      ) || PERSONALIZATION_PROFILES[0];

    onConfirmProfile(chosenProfile);
  };

  const selectedProfile =
    PERSONALIZATION_PROFILES.find(
      (p) => p.id === selectedId
    ) || PERSONALIZATION_PROFILES[0];

  return (
    <div className="min-h-[85vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#fff8e9]">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

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
            Back to Ingredients
          </button>

          <div className="flex items-center gap-3 mb-5">
            <span
              className="
                inline-flex items-center gap-2
                px-3 py-1.5
                bg-[#c8f31d]
                text-[#26113f]
                border-2 border-[#26113f]
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
              "
            >
              <Sparkles className="w-3.5 h-3.5" />
              Profile Customization
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
            See this food
            <br />
            <span className="text-[#ff6b2c]">
              for you.
            </span>
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
            Labelicious can adjust the interpretation based on
            your priorities. Pick the profile that best
            matches what you care about.
          </p>
        </div>


        {/* PROFILE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

          {PERSONALIZATION_PROFILES.map((profile, index) => {
            const isSelected = selectedId === profile.id;

            return (
              <div
                key={profile.id}
                onClick={() => setSelectedId(profile.id)}
                className={`
                  group
                  cursor-pointer
                  relative
                  p-6 sm:p-7
                  border-2
                  transition-all duration-150
                  flex flex-col
                  justify-between
                  min-h-[270px]
                  ${
                    isSelected
                      ? 'bg-[#c8f31d] border-[#26113f] shadow-[6px_6px_0_#ff6b2c] -translate-y-0.5'
                      : 'bg-[#fff8e9] border-[#ded5c5] hover:border-[#26113f] hover:-translate-y-0.5'
                  }
                `}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedId(profile.id);
                  }
                }}
              >

                {/* Top Row */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-7">

                    {/* Icon */}
                    <div
                      className={`
                        w-14 h-14
                        border-2 border-[#26113f]
                        flex items-center justify-center
                        shrink-0
                        ${
                          isSelected
                            ? 'bg-[#ff6b2c] text-[#26113f]'
                            : index % 2 === 0
                              ? 'bg-[#26113f] text-[#c8f31d]'
                              : 'bg-[#c8f31d] text-[#26113f]'
                        }
                      `}
                    >
                      {getProfileIcon(profile.iconName)}
                    </div>

                    {/* Profile Number */}
                    <span
                      className={`
                        text-4xl
                        font-black
                        font-mono
                        leading-none
                        ${
                          isSelected
                            ? 'text-[#26113f]/25'
                            : 'text-[#26113f]/15'
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>


                  {/* Title */}
                  <div className="mb-4">

                    <h3
                      className={`
                        text-2xl
                        font-black
                        tracking-[-0.025em]
                        leading-tight
                        ${
                          isSelected
                            ? 'text-[#26113f]'
                            : 'text-[#26113f]'
                        }
                      `}
                    >
                      {profile.title}
                    </h3>

                    <span
                      className={`
                        inline-block
                        mt-1
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.14em]
                        ${
                          isSelected
                            ? 'text-[#26113f]/65'
                            : 'text-[#ff6b2c]'
                        }
                      `}
                    >
                      {profile.tagline}
                    </span>

                  </div>


                  {/* Description */}
                  <p
                    className="
                      text-sm
                      text-[#756d7d]
                      leading-6
                      tracking-[0.012em]
                      max-w-md
                    "
                  >
                    {profile.description}
                  </p>


                  {/* Focus Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">

                    {profile.focusTags.map((tag) => (
                      <span
                        key={tag}
                        className={`
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.04em]
                          px-2.5 py-1
                          border
                          ${
                            isSelected
                              ? 'bg-[#fff8e9]/70 text-[#26113f] border-[#26113f]/30'
                              : 'bg-[#f2eadb] text-[#26113f]/65 border-[#ded5c5]'
                          }
                        `}
                      >
                        {tag}
                      </span>
                    ))}

                  </div>

                </div>


                {/* Selection Indicator */}
                <div
                  className={`
                    mt-6
                    pt-4
                    border-t-2
                    flex items-center justify-between
                    ${
                      isSelected
                        ? 'border-[#26113f]/20'
                        : 'border-[#ded5c5]'
                    }
                  `}
                >

                  <span
                    className={`
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      ${
                        isSelected
                          ? 'text-[#26113f]'
                          : 'text-[#756d7d]'
                      }
                    `}
                  >
                    {isSelected
                      ? 'Selected profile'
                      : 'Select profile'}
                  </span>


                  <div
                    className={`
                      w-7 h-7
                      border-2 border-[#26113f]
                      flex items-center justify-center
                      ${
                        isSelected
                          ? 'bg-[#26113f] text-[#c8f31d]'
                          : 'bg-[#fff8e9] text-transparent'
                      }
                    `}
                  >
                    {isSelected && (
                      <Check className="w-4 h-4 stroke-[3]" />
                    )}
                  </div>

                </div>

              </div>
            );
          })}

        </div>


        {/* CURRENT SELECTION / ACTION */}
        <section
          className="
            bg-[#26113f]
            text-[#fff8e9]
            border-2 border-[#26113f]
            shadow-[7px_7px_0_#ff6b2c]
            p-6 sm:p-7
          "
        >

          <div
            className="
              flex flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-6
            "
          >

            {/* Selection */}
            <div>

              <div
                className="
                  flex items-center gap-2
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-[#c8f31d]
                  mb-2
                "
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Current Selection
              </div>

              <p
                className="
                  text-xl
                  sm:text-2xl
                  font-black
                  tracking-[-0.02em]
                "
              >
                {selectedProfile.title}
              </p>

              <p
                className="
                  text-xs
                  text-[#fff8e9]/50
                  mt-1
                  leading-5
                "
              >
                Labelicious will use this profile when interpreting
                the product.
              </p>

            </div>


            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">

              <button
                type="button"
                onClick={onBack}
                className="
                  w-1/2
                  sm:w-auto
                  px-5 py-3
                  bg-transparent
                  text-[#fff8e9]/70
                  border-2 border-[#fff8e9]/20
                  hover:border-[#fff8e9]/50
                  hover:text-[#fff8e9]
                  font-black
                  text-sm
                  transition-colors
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="
                  group
                  w-1/2
                  sm:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
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
                <span>Continue</span>

                <ArrowRight
                  className="
                    w-4 h-4
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </button>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}
