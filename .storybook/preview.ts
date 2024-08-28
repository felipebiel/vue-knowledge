import type { Preview } from '@storybook/vue3';
import '@/scss/style.scss';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        actions: { argTypesRegex: '^on.*' },
    },
};

export default preview;
