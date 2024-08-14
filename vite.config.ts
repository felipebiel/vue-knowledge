import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/vue-knowledge/',
    plugins: [vue()],
    // setando a porta padrão
    server: {
        host: true,
        port: 8080, // <-- Set your own server port here
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
