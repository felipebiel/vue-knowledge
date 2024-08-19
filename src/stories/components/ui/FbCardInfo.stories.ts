import type { Meta, StoryObj } from '@storybook/vue3';
import FbCardInfo from '@/components/ui/fb-card-info.vue';

const meta = {
    title: 'UI/CardInfo',
    component: FbCardInfo,
    tags: ['autodocs'],
} satisfies Meta<typeof FbCardInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        numbers: '1234',
        icon: 'info',
        title: 'Valor',
    },
};

export const Truncate: Story = {
    args: {
        numbers: '12345678910',
        icon: 'info',
        title: 'Valor',
        truncateSize: 5,
    },
    render: (args) => ({
        components: { FbCardInfo },
        template: `<FbCardInfo :numbers="${args.numbers}" title="${args.title}" icon="${args.icon}" :truncateSize="${args.truncateSize}" />`,
    }),
    decorators: [() => ({ template: '<div class="w-80"><story /></div>' })],
};
