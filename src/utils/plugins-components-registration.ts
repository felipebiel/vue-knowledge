import { App } from 'vue';
import router from '@/router';
import { createPinia } from 'pinia';
// Vuetippy
import { plugin as VueTippy } from 'vue-tippy';
import 'tippy.js/dist/tippy.css'; // optional for styling
// Apex Charts
import VueApexCharts from 'vue3-apexcharts';

export default (app: App) => {
    app.use(router);
    app.use(createPinia());
    app.use(VueTippy, {
        defaultProps: { placement: 'top', arrow: true },
    });
    app.use(VueApexCharts);
};
