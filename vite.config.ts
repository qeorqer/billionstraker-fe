import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import * as sass from 'sass';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "Billionstracker",
        name: "Billionstracker",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon"
          },
          {
            src: "favicon-16x16.png",
            sizes: "16x16",
            type: "image/png"
          },
          {
            src: "favicon-32x32.png",
            sizes: "32x32",
            type: "image/png"
          },
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff"
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'src')]
        }
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: 'src', replacement: path.resolve(__dirname, './src') },
      { find: 'App', replacement: path.resolve(__dirname, './src/App') },
      { find: 'store', replacement: path.resolve(__dirname, './src/store') },
      { find: 'features', replacement: path.resolve(__dirname, './src/features') },
      { find: 'i18n', replacement: path.resolve(__dirname, './src/i18n') },
      { find: 'components', replacement: path.resolve(__dirname, './src/components') },
      { find: 'assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: 'hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: 'constants', replacement: path.resolve(__dirname, './src/constants') },
      { find: 'navigation', replacement: path.resolve(__dirname, './src/navigation') },
      { find: 'pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: 'api', replacement: path.resolve(__dirname, './src/api') }
    ]
  },
  base: process.env.NODE_ENV === 'production' ? '/billionstraker-fe/' : '/',
  server: {
    port: 3000
  },
  build: {
    outDir: 'build',
    sourcemap: true
  }
});
