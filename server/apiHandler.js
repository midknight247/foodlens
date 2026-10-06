import { analyzeLabelWithGemini } from './geminiService.js';
import { validateAndSanitizeAiResponse } from './validator.js';

/**
 * Handles POST /api/analyze-label requests.
 *
 * The function name/imports remain compatible with the existing
 * Labelicious code, but the AI provider is now OpenRouter.
 */
export async function handleAnalyzeLabelRequest(body, env = {}) {
  try {
    if (!body || !body.image) {
      return {
        status: 400,
        payload: {
          success: false,
          error: 'No image data was provided in the request payload.'
        }
      };
    }

    const apiKey =
      env.OPENROUTER_API_KEY ||
      process.env.OPENROUTER_API_KEY;

    const modelName =
      env.OPENROUTER_MODEL ||
      process.env.OPENROUTER_MODEL ||
      'openrouter/free';

    if (
      !apiKey ||
      apiKey.trim() === '' ||
      apiKey.includes('your_api_key_here')
    ) {
      return {
        status: 503,
        payload: {
          success: false,
          code: 'API_KEY_NOT_CONFIGURED',
          error:
            'OpenRouter API key is not configured. Please add OPENROUTER_API_KEY to your .env file.'
        }
      };
    }

    // Send the ACTUAL uploaded image to the AI provider.
    const rawAiResponse = await analyzeLabelWithGemini({
      imageBase64: body.image,
      mimeType: body.mimeType || 'image/jpeg',
      apiKey,
      modelName
    });

    // Validate and sanitize the AI response.
    const validation =
      validateAndSanitizeAiResponse(rawAiResponse);

    if (!validation.valid) {
      return {
        status: 422,
        payload: {
          success: false,
          code: 'UNREADABLE_LABEL',
          error:
            validation.error ||
            'The image could not be recognized as a food label.'
        }
      };
    }

    return {
      status: 200,
      payload: {
        success: true,
        data: validation.data
      }
    };
  } catch (err) {
    console.error('[Labelicious] AI analysis failed:', err.message);

    return {
      status: 500,
      payload: {
        success: false,
        code: 'AI_ANALYSIS_FAILED',
        error:
          err.message ||
          'An error occurred during AI analysis.'
      }
    };
  }
}