import { defineConfig, searchForWorkspaceRoot } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

const parentDir = path.resolve(__dirname, '..');
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: '../shared',
  server: {
    fs: {
      allow: ['.', '../shared'], // Allow access to the '../assets' directory
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const originalName = assetInfo.name.split('/').pop();
          const originalPath = assetInfo.name.substring(0, assetInfo.name.lastIndexOf('/'));
          return `shared/${originalPath}/${originalName}.[hash].[ext]`;
        },
      },
    },
  },
})
