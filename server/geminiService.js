import {
  FOODLENS_SYSTEM_PROMPT,
  FOODLENS_USER_PROMPT
} from './prompts.js';

export async function analyzeLabelWithGemini({
  imageBase64,
  mimeType = 'image/jpeg',
  apiKey,
  modelName = 'openrouter/free'
}) {
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured.');
  }

  const model = modelName || 'openrouter/free';

  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Labelicious'
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: FOODLENS_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: FOODLENS_USER_PROMPT
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64.startsWith('data:')
                    ? imageBase64
                    : `data:${mimeType};base64,${imageBase64}`
                }
              }
            ]
          }
        ],

        temperature: 0,

        // Give the vision model enough room to finish the JSON.
        max_tokens: 8000,

        // Dots can spend output tokens on reasoning.
        // Labelicious only needs the structured JSON.
        reasoning: {
          effort: 'low',
          exclude: true
        }
      })
    }
  );

  const responseText = await response.text();

  if (!response.ok) {
    console.error(
      '[Labelicious] OpenRouter HTTP error:',
      response.status,
      responseText
    );

    throw new Error(
      `OPENROUTER_ERROR: ${response.status}`
    );
  }

  let result;

  try {
    result = JSON.parse(responseText);
  } catch {
    console.error(
      '[Labelicious] Invalid OpenRouter response:',
      responseText
    );

    throw new Error(
      'OPENROUTER_INVALID_RESPONSE: The AI service returned an invalid response.'
    );
  }

  const choice = result?.choices?.[0];

  console.log(
    '[Labelicious] OpenRouter choice:',
    JSON.stringify(choice, null, 2)
  );

  let content = choice?.message?.content;

  if (Array.isArray(content)) {
    content = content
      .map(part => {
        if (typeof part === 'string') return part;
        return part?.text || '';
      })
      .join('');
  }

  if (!content || typeof content !== 'string') {
    const finishReason =
      choice?.finish_reason ||
      choice?.native_finish_reason ||
      'unknown';

    if (
      finishReason === 'content_filter' ||
      finishReason === 'safety'
    ) {
      throw new Error(
        `CONTENT_FILTER: The AI model filtered this request (${finishReason}).`
      );
    }

    throw new Error(
      `EMPTY_RESPONSE: The AI model returned no usable analysis. Finish reason: ${finishReason}`
    );
  }

  console.log('[Labelicious] Raw AI JSON:');
  console.log(content);

  let cleaned = content.trim();

  // Remove markdown fences if the model adds them.
  if (cleaned.startsWith('```')) {
    cleaned = cleaned
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
  }

  let parsed;

  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    const finishReason =
      choice?.finish_reason ||
      choice?.native_finish_reason ||
      'unknown';

    console.error(
      '[Labelicious] AI returned invalid JSON. Finish reason:',
      finishReason
    );

    console.error(
      '[Labelicious] AI returned invalid JSON:',
      cleaned
    );

    if (finishReason === 'length') {
      throw new Error(
        'OUTPUT_TRUNCATED: The AI response was cut off before the JSON was complete.'
      );
    }

    throw new Error(
      'INVALID_JSON: The AI returned analysis that could not be parsed as JSON.'
    );
  }

  return parsed;
}