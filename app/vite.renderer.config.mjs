import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config
export default defineConfig({
    publicDir: '../shared',
    server: {
        fs: {
        allow: ['.', '../site'], // Allow access to the '../assets' directory
        },
    },
    plugins: [react()]
});
