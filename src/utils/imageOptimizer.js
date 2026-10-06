/**
 * Client-side image optimization using native browser Canvas API.
 * Keeps uploaded photos sharp for OCR while preventing oversized HTTP payloads.
 * No external libraries needed.
 */

export async function optimizeImageForAnalysis(file, maxDimension = 1800, quality = 0.88) {
  return new Promise((resolve, reject) => {
    // If the file is already small (< 1MB) and dimension is likely reasonable, read directly
    if (file.size < 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          base64: reader.result,
          mimeType: file.type || 'image/jpeg',
          originalSize: file.size,
          optimizedSize: file.size
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    // For larger camera snapshots, resize on an off-screen canvas
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Export as high-quality JPEG
      const mimeType = 'image/jpeg';
      const base64 = canvas.toDataURL(mimeType, quality);
      const approxSize = Math.round((base64.length * 3) / 4);

      resolve({
        base64,
        mimeType,
        originalSize: file.size,
        optimizedSize: approxSize
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for processing.'));
    };

    img.src = objectUrl;
  });
}
