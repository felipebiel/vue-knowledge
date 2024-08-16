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
        port: 8080,
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    // Uso das variaveis diretamente no código
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/scss/_variables.scss";',
            },
        },
    },
});
