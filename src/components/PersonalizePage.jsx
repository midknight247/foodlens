import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Smile, 
  Activity, 
  Heart, 
  Check, 
  ArrowRight,
  ShieldCheck,
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
        return <Smile className="w-6 h-6 text-amber-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-blue-600" />;
      case 'Heart':
        return <Heart className="w-6 h-6 text-rose-600" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-6 h-6 text-emerald-600" />;
    }
  };

  const handleContinue = () => {
    const chosenProfile = PERSONALIZATION_PROFILES.find(p => p.id === selectedId) || PERSONALIZATION_PROFILES[0];
    onConfirmProfile(chosenProfile);
  };

  return (
    <div className="min-h-[85vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1.5 pr-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to Ingredients</span>
        </button>

        <div className="mt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Profile Customization</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See this food for you.
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            FoodLens can adjust the analysis based on your priorities. Select a profile to view tailored flags and recommendations.
          </p>
        </div>
      </div>

      {/* 4 Selectable Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {PERSONALIZATION_PROFILES.map((profile) => {
          const isSelected = selectedId === profile.id;

          return (
            <div
              key={profile.id}
              onClick={() => setSelectedId(profile.id)}
              className={`group cursor-pointer rounded-3xl p-6 sm:p-7 border-2 transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-white ring-4 ring-emerald-500/10 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-[#FAFBFB] shadow-xs'
              }`}
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
              <div>
                {/* Header row with Icon, Title and Radio Checkmark */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      {getProfileIcon(profile.iconName)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {profile.title}
                      </h3>
                      <span className="text-xs font-medium text-emerald-700">
                        {profile.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'border-emerald-600 bg-emerald-600 text-white' 
                      : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  {profile.description}
                </p>

                {/* Focus Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {profile.focusTags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {isSelected && (
                <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selected Profile</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Current Selection
          </span>
          <p className="text-sm font-bold text-slate-900 mt-0.5">
            {PERSONALIZATION_PROFILES.find(p => p.id === selectedId)?.title}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBack}
            className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold text-sm transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm shadow-emerald-600/20 transition-all active:scale-[0.98]"
          >
            <span>Continue →</span>
          </button>
        </div>
      </div>

    </div>
  );
}
