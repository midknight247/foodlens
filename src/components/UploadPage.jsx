import React, { useState, useRef } from 'react';
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
  RotateCcw,
  Zap
} from 'lucide-react';
import { DEMO_PRODUCTS, RECENT_ANALYSES } from '../data/mockData';
import { optimizeImageForAnalysis } from '../utils/imageOptimizer';
import { transformAiDataToProduct } from '../utils/transformAiData';

export default function UploadPage({
  onBack,
  onCompleteAnalysis,
  activeProfile
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [rawBase64, setRawBase64] = useState(null);
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');
  const [imageMetadata, setImageMetadata] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [associatedProduct, setAssociatedProduct] = useState(
    RECENT_ANALYSES[0]
  );
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [aiError, setAiError] = useState(null);

  const fileInputRef = useRef(null);

  const realAiLoadingMessages = [
    {
      text: 'Reading your nutrition label...',
      progress: 25
    },
    {
      text: 'Extracting nutrition facts table...',
      progress: 50
    },
    {
      text: 'Understanding ingredients & additives...',
      progress: 75
    },
    {
      text: 'Calculating your Labelicious score...',
      progress: 95
    }
  ];

  const demoLoadingMessages = [
    {
      text: 'Reading demo nutrition label...',
      progress: 30
    },
    {
      text: 'Extracting nutrition facts...',
      progress: 65
    },
    {
      text: 'Calculating Labelicious score...',
      progress: 95
    }
  ];

  const loadingMessages = isDemo
    ? demoLoadingMessages
    : realAiLoadingMessages;


  // --------------------------------------------------
  // FILE PROCESSING
  // --------------------------------------------------

  const handleFileProcess = async (file) => {
    setErrorMessage('');
    setAiError(null);

    if (!file) return;

    const acceptedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp'
    ];

    if (!acceptedTypes.includes(file.type)) {
      setErrorMessage(
        'Please upload a valid image file (PNG, JPG, JPEG, or WEBP).'
      );
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage(
        'Image size is too large (>15MB). Please choose a smaller photo.'
      );
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
        size:
          (optimized.optimizedSize / (1024 * 1024)).toFixed(2) +
          ' MB'
      });
    } catch (err) {
      setErrorMessage(
        'Could not process image file. Please try another image.'
      );
    }
  };


  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      handleFileProcess(file);
    }
  };


  // --------------------------------------------------
  // DRAG & DROP
  // --------------------------------------------------

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


  // --------------------------------------------------
  // REMOVE IMAGE
  // --------------------------------------------------

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


  // --------------------------------------------------
  // DEMO PRODUCT
  // --------------------------------------------------

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


  // --------------------------------------------------
  // ANALYSIS
  // --------------------------------------------------

  const handleStartAnalysis = async () => {
    if (!selectedImage || isAnalyzing) return;

    setIsAnalyzing(true);
    setAiError(null);
    setLoadingStep(0);

    // DEMO PATH
    if (isDemo) {
      setTimeout(() => setLoadingStep(1), 400);
      setTimeout(() => setLoadingStep(2), 800);

      setTimeout(() => {
        setIsAnalyzing(false);

        onCompleteAnalysis({
          product: associatedProduct,
          imagePreview: selectedImage,
          fileName:
            imageMetadata?.name || 'demo_label.jpg',
          isRealAi: false
        });
      }, 1200);

      return;
    }


    // REAL AI PATH
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) =>
        prev < realAiLoadingMessages.length - 1
          ? prev + 1
          : prev
      );
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
        throw new Error(
          result.error ||
            `Server responded with status ${response.status}`
        );
      }

      const foodlensProduct = transformAiDataToProduct(
        result.data,
        activeProfile
      );

      setIsAnalyzing(false);

      onCompleteAnalysis({
        product: foodlensProduct,
        imagePreview: selectedImage,
        fileName:
          imageMetadata?.name || 'real_label.jpg',
        isRealAi: true
      });

    } catch (err) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);

      setAiError({
        title:
          "Labelicious couldn't analyze this label right now.",
        detail:
          err.message?.replace(
            'AI_ANALYSIS_FAILED: ',
            ''
          ) ||
          'The AI service encountered an error while inspecting this image.'
      });
    }
  };


  return (
    <div
      className="
        min-h-[85vh]
        bg-[#fff8e9]
        py-8 sm:py-12
        px-4 sm:px-6 lg:px-8
      "
    >

      <div className="max-w-4xl mx-auto">


        {/* =========================================
            HEADER
        ========================================= */}

        <div className="mb-10">

          <button
            type="button"
            onClick={onBack}
            disabled={isAnalyzing}
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
            Back
          </button>


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
              <Zap className="w-3.5 h-3.5" />
              Labelicious Scanner
            </span>

            <span className="hidden sm:block h-0.5 flex-1 bg-[#ff6b2c]" />

          </div>


          <h1
            className="
              text-4xl sm:text-5xl lg:text-6xl
              font-black
              text-[#26113f]
              tracking-[-0.04em]
              leading-[0.95]
            "
          >
            Let's look
            <br />
            <span className="text-[#ff6b2c]">
              inside.
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
            Upload a clear photo of the nutrition or
            ingredients label. Labelicious will turn the
            printed information into a simple product read.
          </p>

        </div>


        {/* =========================================
            MAIN WORKSPACE
        ========================================= */}

        <div
          className="
            bg-[#fff8e9]
            border-2 border-[#26113f]
            shadow-[8px_8px_0_#ff6b2c]
            p-5 sm:p-8
          "
        >


          {/* ERROR */}
          {errorMessage && (
            <div
              className="
                mb-6
                p-4
                bg-[#ff6b2c]/10
                border-2 border-[#ff6b2c]
                text-[#26113f]
                text-sm
                flex items-start gap-3
              "
            >
              <AlertCircle
                className="
                  w-5 h-5
                  text-[#ff6b2c]
                  shrink-0
                  mt-0.5
                "
              />

              <span className="leading-6">
                {errorMessage}
              </span>
            </div>
          )}


          {/* HIDDEN FILE INPUT */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={handleFileInputChange}
            className="hidden"
            id="food-label-file-input"
          />


          {/* =========================================
              AI ERROR
          ========================================= */}

          {aiError ? (

            <div className="py-12 px-4 text-center">

              <div
                className="
                  w-16 h-16
                  mx-auto
                  mb-6
                  bg-[#ff6b2c]
                  text-[#26113f]
                  border-2 border-[#26113f]
                  flex items-center justify-center
                  shadow-[4px_4px_0_#c8f31d]
                "
              >
                <AlertCircle className="w-8 h-8" />
              </div>


              <h3
                className="
                  text-2xl sm:text-3xl
                  font-black
                  text-[#26113f]
                  tracking-[-0.025em]
                "
              >
                {aiError.title}
              </h3>


              <p
                className="
                  mt-3
                  text-sm
                  text-[#756d7d]
                  leading-6
                  max-w-md
                  mx-auto
                "
              >
                {aiError.detail}
              </p>


              <div
                className="
                  flex flex-col
                  sm:flex-row
                  items-center
                  justify-center
                  gap-3
                  mt-8
                "
              >

                <button
                  type="button"
                  onClick={() => setAiError(null)}
                  className="
                    w-full sm:w-auto
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-6 py-3
                    bg-[#fff8e9]
                    text-[#26113f]
                    border-2 border-[#26113f]
                    font-black
                    text-sm
                    hover:bg-[#f2eadb]
                    transition-colors
                  "
                >
                  <RotateCcw className="w-4 h-4" />
                  Try again
                </button>


                <button
                  type="button"
                  onClick={() =>
                    handleSelectDemo(DEMO_PRODUCTS[0])
                  }
                  className="
                    w-full sm:w-auto
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-6 py-3
                    bg-[#c8f31d]
                    text-[#26113f]
                    border-2 border-[#26113f]
                    font-black
                    text-sm
                    shadow-[4px_4px_0_#ff6b2c]
                    hover:translate-x-[2px]
                    hover:translate-y-[2px]
                    hover:shadow-[2px_2px_0_#ff6b2c]
                    transition-all
                  "
                >
                  <Sparkles className="w-4 h-4" />
                  Use a demo product
                </button>

              </div>

            </div>


          ) : isAnalyzing ? (

            /* =========================================
               ANALYSIS LOADING
            ========================================= */

            <div className="py-14 sm:py-16 px-4">

              <div className="max-w-xl mx-auto">

                <div className="flex items-center gap-4 mb-8">

                  <div
                    className="
                      w-14 h-14
                      shrink-0
                      bg-[#c8f31d]
                      text-[#26113f]
                      border-2 border-[#26113f]
                      flex items-center justify-center
                    "
                  >
                    <Loader2 className="w-7 h-7 animate-spin" />
                  </div>

                  <div className="text-left">

                    <span
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.16em]
                        text-[#ff6b2c]
                      "
                    >
                      {isDemo
                        ? 'Demo Processing'
                        : 'Label Analysis'}
                    </span>

                    <h3
                      className="
                        text-xl sm:text-2xl
                        font-black
                        text-[#26113f]
                        mt-1
                      "
                    >
                      {loadingMessages[loadingStep]?.text ||
                        'Analyzing food label...'}
                    </h3>

                  </div>

                </div>


                {/* STEP LIST */}

                <div className="space-y-2">

                  {loadingMessages.map((message, index) => {

                    const completed =
                      index < loadingStep;

                    const current =
                      index === loadingStep;

                    return (
                      <div
                        key={message.text}
                        className={`
                          flex items-center gap-3
                          p-3.5
                          border-2
                          transition-all
                          ${
                            completed
                              ? 'bg-[#c8f31d]/35 border-[#c8f31d]'
                              : current
                                ? 'bg-[#26113f] text-[#fff8e9] border-[#26113f]'
                                : 'bg-[#f2eadb] border-[#ded5c5] text-[#756d7d]'
                          }
                        `}
                      >

                        <div
                          className={`
                            w-6 h-6
                            shrink-0
                            border-2
                            flex items-center justify-center
                            ${
                              completed
                                ? 'bg-[#26113f] border-[#26113f] text-[#c8f31d]'
                                : current
                                  ? 'border-[#c8f31d] text-[#c8f31d]'
                                  : 'border-[#ded5c5]'
                            }
                          `}
                        >
                          {completed ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : current ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <span className="w-1.5 h-1.5 bg-current" />
                          )}
                        </div>

                        <span
                          className="
                            text-xs sm:text-sm
                            font-bold
                            leading-5
                          "
                        >
                          {message.text}
                        </span>

                      </div>
                    );
                  })}

                </div>


                {/* PROGRESS */}

                <div className="mt-7">

                  <div className="flex justify-between mb-2">

                    <span
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.12em]
                        text-[#756d7d]
                      "
                    >
                      Processing
                    </span>

                    <span
                      className="
                        text-[10px]
                        font-black
                        text-[#26113f]
                      "
                    >
                      {loadingMessages[loadingStep]?.progress || 0}%
                    </span>

                  </div>

                  <div
                    className="
                      w-full
                      h-3
                      bg-[#f2eadb]
                      border-2 border-[#26113f]
                      overflow-hidden
                    "
                  >
                    <div
                      className="
                        h-full
                        bg-[#c8f31d]
                        transition-all
                        duration-500
                        ease-out
                      "
                      style={{
                        width: `${
                          loadingMessages[loadingStep]?.progress ||
                          50
                        }%`
                      }}
                    />
                  </div>

                </div>


                <p
                  className="
                    text-[11px]
                    text-[#756d7d]
                    text-center
                    mt-5
                    leading-5
                  "
                >
                  {isDemo
                    ? 'Using the local verified demo data.'
                    : 'Inspecting the uploaded label and extracting only visible information.'}
                </p>

              </div>

            </div>


          ) : !selectedImage ? (

            /* =========================================
               EMPTY UPLOAD STATE
            ========================================= */

            <div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className={`
                  group
                  cursor-pointer
                  border-2
                  border-dashed
                  p-8 sm:p-14
                  text-center
                  transition-all duration-150
                  flex flex-col
                  items-center
                  justify-center
                  ${
                    isDragging
                      ? 'border-[#26113f] bg-[#c8f31d]/30 scale-[0.995]'
                      : 'border-[#ded5c5] bg-[#f2eadb]/40 hover:border-[#26113f] hover:bg-[#f2eadb]'
                  }
                `}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (
                    e.key === 'Enter' ||
                    e.key === ' '
                  ) {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
              >

                {/* ICON */}

                <div
                  className={`
                    w-20 h-20
                    border-2 border-[#26113f]
                    flex items-center justify-center
                    mb-6
                    transition-all
                    ${
                      isDragging
                        ? 'bg-[#ff6b2c] shadow-[5px_5px_0_#26113f]'
                        : 'bg-[#c8f31d] shadow-[5px_5px_0_#ff6b2c]'
                    }
                  `}
                >
                  <UploadCloud
                    className="
                      w-9 h-9
                      text-[#26113f]
                    "
                  />
                </div>


                <span
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-[#ff6b2c]
                    mb-2
                  "
                >
                  {isDragging
                    ? 'Release to upload'
                    : 'Start here'}
                </span>


                <h2
                  className="
                    text-2xl sm:text-3xl
                    font-black
                    text-[#26113f]
                    tracking-[-0.025em]
                  "
                >
                  Drop your food label here
                </h2>


                <p
                  className="
                    text-sm
                    text-[#756d7d]
                    max-w-md
                    mt-3
                    mb-7
                    leading-6
                  "
                >
                  PNG, JPG, JPEG or WEBP.
                  <br />
                  Best results come from a clear,
                  well-lit photo.
                </p>


                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="
                    inline-flex
                    items-center
                    gap-2
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
                  <ImageIcon className="w-4 h-4" />
                  Choose Image
                </button>

              </div>


              {/* PHOTO TIPS */}

              <div
                className="
                  mt-6
                  grid
                  grid-cols-1
                  sm:grid-cols-3
                  border-2 border-[#ded5c5]
                "
              >

                <div
                  className="
                    p-4
                    flex items-center gap-2.5
                    border-b-2
                    sm:border-b-0
                    sm:border-r-2
                    border-[#ded5c5]
                  "
                >
                  <CheckCircle2 className="w-4 h-4 text-[#26113f] shrink-0" />

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.05em]
                      text-[#756d7d]
                    "
                  >
                    Nutrition facts
                  </span>
                </div>


                <div
                  className="
                    p-4
                    flex items-center gap-2.5
                    border-b-2
                    sm:border-b-0
                    sm:border-r-2
                    border-[#ded5c5]
                  "
                >
                  <CheckCircle2 className="w-4 h-4 text-[#26113f] shrink-0" />

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.05em]
                      text-[#756d7d]
                    "
                  >
                    Ingredient list
                  </span>
                </div>


                <div
                  className="
                    p-4
                    flex items-center gap-2.5
                  "
                >
                  <CheckCircle2 className="w-4 h-4 text-[#26113f] shrink-0" />

                  <span
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.05em]
                      text-[#756d7d]
                    "
                  >
                    Auto compression
                  </span>
                </div>

              </div>

            </div>


          ) : (

            /* =========================================
               IMAGE PREVIEW
            ========================================= */

            <div>

              {/* FILE HEADER */}

              <div
                className="
                  flex items-center
                  justify-between
                  gap-4
                  pb-5
                  mb-6
                  border-b-2 border-[#ded5c5]
                "
              >

                <div className="flex items-center gap-3 min-w-0">

                  <div
                    className="
                      w-10 h-10
                      shrink-0
                      bg-[#c8f31d]
                      border-2 border-[#26113f]
                      flex items-center justify-center
                    "
                  >
                    <FileText className="w-5 h-5 text-[#26113f]" />
                  </div>

                  <div className="min-w-0">

                    <h3
                      className="
                        text-sm
                        font-black
                        text-[#26113f]
                        truncate
                        max-w-[190px]
                        sm:max-w-sm
                      "
                    >
                      {imageMetadata?.name ||
                        'Selected Label'}
                    </h3>

                    <p
                      className="
                        text-[10px]
                        text-[#756d7d]
                        uppercase
                        tracking-[0.06em]
                        mt-1
                      "
                    >
                      {isDemo
                        ? 'Demo label'
                        : 'Image ready for analysis'}
                      {' '}
                      /{' '}
                      {imageMetadata?.size ||
                        'Image loaded'}
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="
                    shrink-0
                    inline-flex
                    items-center
                    gap-1.5
                    px-3 py-2
                    bg-[#ff6b2c]/10
                    text-[#8d3212]
                    border-2 border-[#ff6b2c]
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.06em]
                    hover:bg-[#ff6b2c]/20
                    transition-colors
                  "
                >
                  <X className="w-3.5 h-3.5" />
                  Remove
                </button>

              </div>


              {/* IMAGE */}

              <div
                className="
                  relative
                  bg-[#f2eadb]
                  border-2 border-[#ded5c5]
                  p-4 sm:p-6
                  flex items-center justify-center
                  overflow-hidden
                  min-h-[260px]
                  max-h-[420px]
                "
              >

                <img
                  src={selectedImage}
                  alt="Uploaded food label preview"
                  className="
                    max-h-[360px]
                    w-auto
                    max-w-full
                    object-contain
                    border-2 border-[#26113f]
                    shadow-[5px_5px_0_#c8f31d]
                  "
                />


                {/* STATUS LABEL */}

                <div className="absolute top-4 right-4">

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      px-2.5 py-1.5
                      bg-[#26113f]
                      text-[#c8f31d]
                      border-2 border-[#26113f]
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.08em]
                    "
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />

                    {isDemo
                      ? 'Demo sample'
                      : 'Photo ready'}
                  </span>

                </div>

              </div>


              {/* ACTION BAR */}

              <div
                className="
                  pt-6
                  flex flex-col
                  sm:flex-row
                  items-center
                  justify-between
                  gap-5
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.08em]
                    text-[#756d7d]
                    hover:text-[#26113f]
                    underline
                    underline-offset-4
                    order-2 sm:order-1
                  "
                >
                  Upload a different image
                </button>


                <button
                  type="button"
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="
                    w-full sm:w-auto
                    inline-flex
                    items-center
                    justify-center
                    gap-2.5
                    px-7 py-3.5
                    bg-[#26113f]
                    text-[#c8f31d]
                    border-2 border-[#190b2b]
                    font-black
                    text-sm
                    shadow-[5px_5px_0_#ff6b2c]
                    hover:translate-x-[2px]
                    hover:translate-y-[2px]
                    hover:shadow-[2px_2px_0_#ff6b2c]
                    transition-all
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    order-1 sm:order-2
                  "
                >
                  <ScanLine className="w-5 h-5" />

                  <span>
                    {isDemo
                      ? 'Analyze Demo Label'
                      : 'Analyze with Labelicious'}
                  </span>

                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

            </div>
          )}

        </div>


        {/* =========================================
            DEMO PRODUCTS
        ========================================= */}

        {!isAnalyzing && !aiError && (

          <section
            className="
              mt-9
              bg-[#26113f]
              text-[#fff8e9]
              border-2 border-[#26113f]
              shadow-[6px_6px_0_#c8f31d]
              p-5 sm:p-6
            "
          >

            <div
              className="
                flex flex-col
                sm:flex-row
                sm:items-end
                sm:justify-between
                gap-3
                mb-5
              "
            >

              <div>

                <span
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-[#c8f31d]
                  "
                >
                  No label?
                </span>

                <h3
                  className="
                    text-xl sm:text-2xl
                    font-black
                    tracking-[-0.02em]
                    mt-1
                  "
                >
                  Try a demo product.
                </h3>

              </div>

              <p
                className="
                  text-xs
                  text-[#fff8e9]/50
                  max-w-sm
                  leading-5
                "
              >
                Use a verified local sample to see the
                complete Labelicious analysis flow.
              </p>

            </div>


            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-3
              "
            >

              {DEMO_PRODUCTS.map((demo) => (

                <button
                  key={demo.product.id}
                  type="button"
                  onClick={() =>
                    handleSelectDemo(demo)
                  }
                  className="
                    group
                    flex items-center
                    gap-3
                    p-4
                    text-left
                    bg-[#fff8e9]/5
                    border-2 border-[#fff8e9]/15
                    hover:border-[#c8f31d]
                    hover:bg-[#fff8e9]/10
                    transition-all
                  "
                >

                  <div
                    className={`
                      w-3 h-3
                      shrink-0
                      border-2 border-[#fff8e9]
                      ${
                        demo.product.score >= 70
                          ? 'bg-[#c8f31d]'
                          : 'bg-[#ff6b2c]'
                      }
                    `}
                  />


                  <div className="min-w-0 flex-1">

                    <span
                      className="
                        block
                        text-sm
                        font-black
                        text-[#fff8e9]
                        group-hover:text-[#c8f31d]
                        transition-colors
                      "
                    >
                      {demo.label}
                    </span>

                    <span
                      className="
                        block
                        text-[10px]
                        text-[#fff8e9]/45
                        mt-1
                        leading-4
                      "
                    >
                      {demo.sublabel}
                    </span>

                  </div>


                  <ChevronRight
                    className="
                      w-4 h-4
                      text-[#fff8e9]/35
                      group-hover:text-[#c8f31d]
                      group-hover:translate-x-1
                      transition-all
                    "
                  />

                </button>

              ))}

            </div>

          </section>

        )}

      </div>
    </div>
  );
}
