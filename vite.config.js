import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
    ],
    optimizeDeps: {
        include: ['froala-editor', 'react-froala-wysiwyg'],
    },
    resolve: {
        alias: {
        },
    },
    server: {
        host: 'localhost',
        cors: true,
        hmr: {
            host: 'localhost',
        },
    },
});
