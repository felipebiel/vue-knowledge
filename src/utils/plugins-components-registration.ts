import { App } from 'vue';
import router from '@/router';
import { createPinia } from 'pinia';

export default (app: App) => {
    app.use(router);
    app.use(createPinia());
};
