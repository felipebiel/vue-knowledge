import { App } from 'vue';
import router from '@/router';
import { createPinia } from 'pinia';
// Vuetippy
import { plugin as VueTippy } from 'vue-tippy';
import 'tippy.js/dist/tippy.css'; // optional for styling
import FbCardInfo from '@/components/ui/fb-card-info.vue';

export default (app: App) => {
    app.use(router);
    app.use(createPinia());
    app.use(VueTippy, {
        defaultProps: { placement: 'top', arrow: true },
    });

    // components
    app.component('fb-card-info', FbCardInfo);
};
