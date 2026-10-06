import { handleAnalyzeLabelRequest } from './apiHandler.js';

/**
 * Vite plugin that adds the /api/analyze-label endpoint to the Vite dev and preview servers.
 * Runs completely in Node.js server-side, protecting API keys from ever leaking to the browser.
 */
export function foodlensApiPlugin(env = {}) {
  return {
    name: 'foodlens-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (req.method === 'POST' && (url === '/api/analyze-label' || url === '/api/analyze-label/')) {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const result = await handleAnalyzeLabelRequest(parsed, env);

              res.statusCode = result.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result.payload));
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                error: 'Invalid JSON request payload: ' + err.message
              }));
            }
          });
          return;
        }

        // Health check endpoint for verifying API status
        if (req.method === 'GET' && url === '/api/health') {
          const hasKey = Boolean(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            status: 'ok',
            apiConfigured: hasKey,
            model: env.GEMINI_MODEL || process.env.GEMINI_MODEL || 'gemini-2.5-flash'
          }));
          return;
        }

        next();
      });
    }
  };
}
