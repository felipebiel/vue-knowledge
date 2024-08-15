import { createApp } from 'vue';
import '@/scss/style.scss';
import App from './App.vue';
import pluginsComponentsRegistration from './utils/plugins-components-registration';

const app = createApp(App);
pluginsComponentsRegistration(app);
app.mount('#app');
