// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);


// Add wasm asset support
config.resolver.assetExts.push('wasm');
config.resolver.assetExts.push('db');
 
// Add COEP and COOP headers to support SharedArrayBuffer
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    if (req.url === '/__open-in-editor') {
      return next();
    }
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    middleware(req, res, next);
  };
};

module.exports = config;


/* module.exports = {
  // ... other configurations
  server: {
    // ... other configurations
    enhanceMiddleware: middleware => {
      return (req, res, next) => {
        if (req.url === '/__open-in-editor') {
          return next();
        }
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        return next();
      };
    },
  },
}; */