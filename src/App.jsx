import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import RecentAnalyses from './components/RecentAnalyses';
import UploadPage from './components/UploadPage';
import AnalysisPage from './components/AnalysisPage';
import IngredientsPage from './components/IngredientsPage';
import PersonalizePage from './components/PersonalizePage';
import ComparisonPage from './components/ComparisonPage';
import PlaceholderPage from './components/PlaceholderPage';
import Footer from './components/Footer';
import { PERSONALIZATION_PROFILES, RECENT_ANALYSES } from './data/mockData';

export default function App() {
  // Navigation state: 'home' | 'scan' | 'analysis' | 'ingredients' | 'personalize' | 'compare' | 'manual'
  const [currentView, setCurrentView] = useState('home');
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentImagePreview, setCurrentImagePreview] = useState(null);
  const [activeProfile, setActiveProfile] = useState(PERSONALIZATION_PROFILES[0]); // default 'general'

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When user clicks a recent analysis product card on the Home screen
  const handleSelectRecentProduct = (product) => {
    setCurrentProduct(product);
    setCurrentImagePreview(product.demoLabelSvg || null);
    setCurrentView('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called by UploadPage once the loading state finishes
const handleCompleteAnalysis = ({ product, imagePreview }) => {
  // Save real AI scans so they can be used later in Product Comparison.
  try {
    const existingScans = JSON.parse(
      localStorage.getItem('foodlens_recent_scans') || '[]'
    );

    const updatedScans = [
      product,
      ...existingScans.filter(scan => scan.id !== product.id)
    ].slice(0, 10);

    localStorage.setItem(
      'foodlens_recent_scans',
      JSON.stringify(updatedScans)
    );
  } catch (error) {
    console.error('[FoodLens] Could not save recent scan:', error);
  }

  setCurrentProduct(product);
  setCurrentImagePreview(imagePreview);
  setCurrentView('analysis');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  // Transition from Analysis to Ingredient Intelligence
  const handleExploreIngredients = () => {
    setCurrentView('ingredients');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transition from Analysis to Product Comparison
  const handleCompare = () => {
    setCurrentView('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transition from Ingredients to Personalize
  const handleNavigateToPersonalize = () => {
    setCurrentView('personalize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Confirming a profile returns to the Analysis screen with badge
  const handleConfirmProfile = (profile) => {
    setActiveProfile(profile);
    setCurrentView('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAnalysis = () => {
    setCurrentView('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToIngredients = () => {
    setCurrentView('ingredients');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToUpload = () => {
    setCurrentView('scan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackHome = () => {
    setCurrentView('home');
    setCurrentProduct(null);
    setCurrentImagePreview(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Navbar onNavigate={handleNavigate} currentView={currentView} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Home Screen */}
        {currentView === 'home' && (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <HowItWorks onScanClick={() => handleNavigate('scan')} />
            <RecentAnalyses onSelectProduct={handleSelectRecentProduct} />
          </>
        )}

        {/* 2. Step 2: Upload / Input Screen */}
        {currentView === 'scan' && (
          <UploadPage
            onBack={handleBackHome}
            onCompleteAnalysis={handleCompleteAnalysis}
          />
        )}

        {/* 3. Step 2 & 3: Analysis Result Screen */}
        {currentView === 'analysis' && currentProduct && (
          <AnalysisPage
            product={currentProduct}
            imagePreview={currentImagePreview}
            activeProfile={activeProfile}
            onExploreIngredients={handleExploreIngredients}
            onCompare={handleCompare}
            onBackToUpload={handleBackToUpload}
            onBackToHome={handleBackHome}
          />
        )}

        {/* 4. Step 3: Ingredient Intelligence Screen */}
        {currentView === 'ingredients' && currentProduct && (
          <IngredientsPage
            product={currentProduct}
            onBackToAnalysis={handleBackToAnalysis}
            onNavigateToPersonalize={handleNavigateToPersonalize}
          />
        )}

        {/* 5. Step 3: Personalization Profile Selection Screen */}
        {currentView === 'personalize' && (
          <PersonalizePage
            currentProfileId={activeProfile.id}
            onConfirmProfile={handleConfirmProfile}
            onBack={handleBackToIngredients}
          />
        )}

        {/* 6. Step 4: Product Comparison Screen */}
        {currentView === 'compare' && (
          <ComparisonPage
            initialProductA={currentProduct || RECENT_ANALYSES[0]}
            activeProfile={activeProfile}
            onProfileChange={setActiveProfile}
            onBackToAnalysis={handleBackToAnalysis}
            onBackToHome={handleBackHome}
            onExploreProductIngredients={(prod) => {
              setCurrentProduct(prod);
              setCurrentView('ingredients');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 7. Manual Input Placeholder */}
        {currentView === 'manual' && (
          <PlaceholderPage
            type="manual"
            onBack={handleBackHome}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
