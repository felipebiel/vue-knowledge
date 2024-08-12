import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

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
      alias: [
          {
              find: '@',
              replacement: path.resolve(__dirname, './src'),
          },
      ],
  },
})
