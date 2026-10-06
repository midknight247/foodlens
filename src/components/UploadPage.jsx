import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  UploadCloud, 
  Image as ImageIcon, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ScanLine, 
  FileText,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Zap
} from 'lucide-react';
import { DEMO_PRODUCTS, RECENT_ANALYSES } from '../data/mockData';
import { optimizeImageForAnalysis } from '../utils/imageOptimizer';
import { transformAiDataToProduct } from '../utils/transformAiData';

export default function UploadPage({ onBack, onCompleteAnalysis, activeProfile }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [rawBase64, setRawBase64] = useState(null);
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');
  const [imageMetadata, setImageMetadata] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [associatedProduct, setAssociatedProduct] = useState(RECENT_ANALYSES[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Real AI analysis & error fallback states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [aiError, setAiError] = useState(null);

  const fileInputRef = useRef(null);

  const realAiLoadingMessages = [
    { text: 'Reading your nutrition label...', progress: 25 },
    { text: 'Extracting nutrition facts table...', progress: 50 },
    { text: 'Understanding ingredients & additives...', progress: 75 },
    { text: 'Calculating your FoodLens score...', progress: 95 }
  ];

  const demoLoadingMessages = [
    { text: 'Reading demo nutrition label...', progress: 30 },
    { text: 'Extracting nutrition facts...', progress: 65 },
    { text: 'Calculating FoodLens score...', progress: 95 }
  ];

  const loadingMessages = isDemo ? demoLoadingMessages : realAiLoadingMessages;

  // Handle file selection from local device
  const handleFileProcess = async (file) => {
    setErrorMessage('');
    setAiError(null);
    if (!file) return;

    const acceptedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!acceptedTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid image file (PNG, JPG, JPEG, or WEBP).');
      return;
    }

    // Check size (< 15MB limit before client-side optimization)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('Image size is too large (>15MB). Please choose a smaller photo.');
      return;
    }

    try {
      const optimized = await optimizeImageForAnalysis(file);
      setSelectedImage(optimized.base64);
      setRawBase64(optimized.base64);
      setImageMimeType(optimized.mimeType);
      setIsDemo(false);
      setImageMetadata({
        name: file.name,
        size: (optimized.optimizedSize / (1024 * 1024)).toFixed(2) + ' MB'
      });
    } catch (err) {
      setErrorMessage('Could not process image file. Please try another image.');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setRawBase64(null);
    setImageMetadata(null);
    setIsDemo(false);
    setErrorMessage('');
    setAiError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Demo selection handler (always runs locally & offline)
  const handleSelectDemo = (demoItem) => {
    setErrorMessage('');
    setAiError(null);
    setSelectedImage(demoItem.product.demoLabelSvg);
    setRawBase64(demoItem.product.demoLabelSvg);
    setImageMimeType('image/svg+xml');
    setIsDemo(true);
    setImageMetadata({
      name: demoItem.mockFileName,
      size: demoItem.mockFileSize
    });
    setAssociatedProduct(demoItem.product);
  };

  // Trigger analysis (Real AI or Demo)
const handleStartAnalysis = async () => {
  if (!selectedImage || isAnalyzing) return;

  setIsAnalyzing(true);
    setAiError(null);
    setLoadingStep(0);

    // If Demo product, run smooth offline simulation
    if (isDemo) {
      setTimeout(() => setLoadingStep(1), 400);
      setTimeout(() => setLoadingStep(2), 800);
      setTimeout(() => {
        setIsAnalyzing(false);
        onCompleteAnalysis({
          product: associatedProduct,
          imagePreview: selectedImage,
          fileName: imageMetadata?.name || 'demo_label.jpg',
          isRealAi: false
        });
      }, 1200);
      return;
    }

    // REAL AI VISION PATH
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < realAiLoadingMessages.length - 1 ? prev + 1 : prev));
    }, 700);

    try {
      const response = await fetch('/api/analyze-label', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: rawBase64,
          mimeType: imageMimeType
        })
      });

      clearInterval(stepInterval);

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.error || `Server responded with status ${response.status}`);
      }

      // Transform raw structured AI response to unified FoodLens product schema
      const foodlensProduct = transformAiDataToProduct(result.data, activeProfile);

      setIsAnalyzing(false);
      onCompleteAnalysis({
        product: foodlensProduct,
        imagePreview: selectedImage,
        fileName: imageMetadata?.name || 'real_label.jpg',
        isRealAi: true
      });

    } catch (err) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);

      // Section 9: Error fallback
      setAiError({
        title: "FoodLens couldn't analyze this label right now.",
        detail: err.message?.replace('AI_ANALYSIS_FAILED: ', '') || 'The AI service encountered an error while inspecting this image.'
      });
    }
  };

  return (
    <div className="min-h-[85vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* 1. Header with Back Button */}
      <div className="mb-8">
        <button
          type="button"
          onClick={onBack}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors py-2 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back</span>
        </button>

        <div className="mt-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Vision Enabled</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let's look inside your food.
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Upload a photo of the nutrition or ingredients label and FoodLens will translate it into simple, useful information.
          </p>
        </div>
      </div>

      {/* Main Upload / Preview Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm transition-all">
        
        {/* Error notification if wrong file type */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Hidden HTML File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleFileInputChange}
          className="hidden"
          id="food-label-file-input"
        />

        {/* SECTION 9: AI ERROR FALLBACK CARD */}
        {aiError ? (
          <div className="py-8 px-4 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {aiError.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {aiError.detail}
              </p>
            </div>

            {/* Error Actions: Try Again vs Use Demo Product */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAiError(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Try again</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemo(DEMO_PRODUCTS[0])}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Use a demo product</span>
              </button>
            </div>
          </div>
        ) : isAnalyzing ? (
          
          /* LOADING STATE ANIMATION */
          <div className="py-16 px-4 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-ping opacity-30" />
              <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                <Loader2 className="w-9 h-9 animate-spin text-emerald-600" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {isDemo ? 'Demo Mode Processing' : 'Gemini AI Vision In Progress'}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight transition-all duration-300">
                {loadingMessages[loadingStep]?.text || 'Analyzing food label...'}
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                {isDemo 
                  ? 'Loading local verified label model...'
                  : 'Sending photo to Gemini Vision for OCR and nutritional breakdown...'}
              </p>
            </div>

            {/* Smooth progress bar */}
            <div className="max-w-xs mx-auto">
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${loadingMessages[loadingStep]?.progress || 50}%` }}
                />
              </div>
            </div>
          </div>
        ) : !selectedImage ? (
          
          /* 2. UPLOAD AREA (Empty State) */
          <div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`group cursor-pointer rounded-2xl border-2 border-dashed p-10 sm:p-14 text-center transition-all duration-200 flex flex-col items-center justify-center ${
                isDragging 
                  ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]' 
                  : 'border-slate-300 hover:border-emerald-500 bg-[#FAFBFB] hover:bg-emerald-50/20'
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              {/* Upload Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-50 flex items-center justify-center text-slate-500 group-hover:text-emerald-600 transition-colors shadow-xs mb-4">
                <UploadCloud className="w-8 h-8" />
              </div>

              {/* Heading */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Drop your food label here
              </h2>

              {/* Supporting text */}
              <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
                PNG, JPG or JPEG • Best results with a clear, well-lit photo
              </p>

              {/* "Choose Image" Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm shadow-emerald-600/20 transition-all active:scale-[0.98]"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Choose Image</span>
              </button>
            </div>

            {/* Photo tips micro-bar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Nutrition facts table
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Ingredient list
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Automatic image compression
              </span>
            </div>
          </div>

        ) : (

          /* 3. IMAGE PREVIEW STATE */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs">
                    {imageMetadata?.name || 'Selected Label'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isDemo ? 'Demo Label' : 'Optimized for Gemini Vision'} • {imageMetadata?.size || 'Image loaded'}
                  </p>
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>

            {/* Display Image Preview without stretching */}
            <div className="relative rounded-2xl bg-[#F8FAF9] border border-slate-200 p-4 flex items-center justify-center overflow-hidden min-h-[260px] max-h-[380px]">
              <img
                src={selectedImage}
                alt="Uploaded food label preview"
                className="max-h-[340px] w-auto max-w-full object-contain rounded-xl shadow-xs"
              />
              <div className="absolute top-6 right-6">
                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full text-white backdrop-blur-xs ${
                  isDemo ? 'bg-slate-900/80' : 'bg-emerald-700/90'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  {isDemo ? 'Demo sample' : 'Live photo ready'}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-4 order-2 sm:order-1"
              >
                Upload a different image
              </button>

              {/* Primary Analyze Button */}
<button
  type="button"
  onClick={handleStartAnalysis}
  disabled={isAnalyzing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-sm shadow-emerald-600/30 hover:shadow-md hover:shadow-emerald-600/40 transition-all active:scale-[0.98] order-1 sm:order-2"
              >
                <Sparkles className="w-5 h-5 text-emerald-100" />
                <span>{isDemo ? 'Analyze Demo Label →' : 'Analyze with FoodLens →'}</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 4. DEMO OPTION (Subtle secondary option below upload card) */}
      {!isAnalyzing && !aiError && (
        <div className="mt-8 text-center bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80">
          <p className="text-sm font-semibold text-slate-700 mb-2.5">
            Don't have a label? Try a demo
          </p>
          <p className="text-xs text-slate-500 mb-3.5 max-w-md mx-auto">
            Click one of these sample packaged food labels to test FoodLens with verified local data:
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            {DEMO_PRODUCTS.map((demo) => (
              <button
                key={demo.product.id}
                type="button"
                onClick={() => handleSelectDemo(demo)}
                className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 text-slate-800 text-xs font-semibold transition-all shadow-xs active:scale-[0.98]"
              >
                <div className={`w-2 h-2 rounded-full ${demo.product.score >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div className="text-left">
                  <span className="block font-bold group-hover:text-emerald-700 transition-colors">
                    {demo.label}
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {demo.sublabel}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-600 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
