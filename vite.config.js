import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: './',
  server: {
    port: 3000,
    open: false,
    host: true,
    fs: {
      allow: ['.']
    }
  },
  plugins: [
    {
      name: 'serve-root-videos',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0];
          if (/\.(mp4|webm|mov|mkv)$/i.test(url)) {
            const fileName = path.basename(url);
            
            // Check directly in public/
            const publicPath = path.resolve('public', fileName);
            if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
              return next();
            }

            // Check directly in root
            const rootPath = path.resolve('.', fileName);
            if (fs.existsSync(rootPath) && fs.statSync(rootPath).isFile()) {
              res.setHeader('Content-Type', 'video/mp4');
              return fs.createReadStream(rootPath).pipe(res);
            }

            // Fallback: search for ANY video file in root
            try {
              const rootFiles = fs.readdirSync('.');
              const rootVideo = rootFiles.find(f => /\.(mp4|webm|mov)$/i.test(f) && fs.statSync(f).isFile());
              if (rootVideo) {
                res.setHeader('Content-Type', 'video/mp4');
                return fs.createReadStream(path.resolve('.', rootVideo)).pipe(res);
              }

              // Fallback: search for ANY video file in public/
              if (fs.existsSync('public')) {
                const pubFiles = fs.readdirSync('public');
                const pubVideo = pubFiles.find(f => /\.(mp4|webm|mov)$/i.test(f) && fs.statSync(path.join('public', f)).isFile());
                if (pubVideo) {
                  res.setHeader('Content-Type', 'video/mp4');
                  return fs.createReadStream(path.resolve('public', pubVideo)).pipe(res);
                }
              }
            } catch (err) {
              console.error('Video resolution error:', err);
            }
          }
          next();
        });
      }
    }
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        wordpress: path.resolve(__dirname, 'wordpress/index.html'),
        shopify: path.resolve(__dirname, 'shopify/index.html'),
        n8n: path.resolve(__dirname, 'n8n/index.html'),
        googleAds: path.resolve(__dirname, 'google-ads/index.html'),
        metaAds: path.resolve(__dirname, 'meta-ads/index.html'),
      }
    }
  }
});
