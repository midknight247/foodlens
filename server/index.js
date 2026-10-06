import http from 'http';
import { handleAnalyzeLabelRequest } from './apiHandler.js';

const PORT = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = req.url?.split('?')[0];

  if (req.method === 'POST' && url === '/api/analyze-label') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const result = await handleAnalyzeLabelRequest(parsed, process.env);

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

  if (req.method === 'GET' && url === '/api/health') {
    const hasKey = Boolean(process.env.GEMINI_API_KEY);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'ok',
      apiConfigured: hasKey,
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    }));
    return;
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`Labelicious backend API server listening on http://localhost:${PORT}`);
});
