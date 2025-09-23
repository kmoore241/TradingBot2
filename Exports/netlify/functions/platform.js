const path = require('path');

// Import the main platform entry point
const platformPath = path.join(__dirname, '../../platform.js');

exports.handler = async (event, context) => {
  try {
    // Set environment variables for serverless execution
    process.env.PLATFORM_MODE = 'serverless';
    process.env.NODE_ENV = 'production';

    // For Netlify Functions, we need to handle the request differently
    // This is a simplified handler - you may need to adjust based on your platform.js structure

    const { httpMethod, path: requestPath, queryStringParameters, body, headers } = event;

    // Mock request/response objects for compatibility
    const req = {
      method: httpMethod,
      url: requestPath,
      query: queryStringParameters || {},
      body: body ? JSON.parse(body) : {},
      headers: headers || {}
    };

    const res = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: ''
    };

    // Handle preflight requests
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: res.headers,
        body: ''
      };
    }

    // Basic routing - adjust based on your platform.js API structure
    if (requestPath.startsWith('/api/')) {
      // Handle API requests
      res.body = JSON.stringify({
        message: 'Superalgos API',
        path: requestPath,
        method: httpMethod,
        timestamp: new Date().toISOString()
      });
    } else {
      // Serve the main application
      res.headers['Content-Type'] = 'text/html';
      res.body = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Superalgos Platform</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
          <div id="app">
            <h1>Superalgos Platform</h1>
            <p>Loading...</p>
          </div>
          <script>
            // Redirect to the appropriate workspace selection
            window.location.href = '/selection.html';
          </script>
        </body>
        </html>
      `;
    }

    return res;

  } catch (error) {
    console.error('Platform function error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};