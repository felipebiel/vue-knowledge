import type { Meta, StoryObj } from '@storybook/vue3';
import FbCard from '@/components/ui/fb-card.vue';

const meta = {
    title: 'UI/Card',
    component: FbCard,
    tags: ['autodocs'],
} satisfies Meta<typeof FbCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        default: 'Sou um card simples',
    },
    render: (args) => ({
        components: { FbCard },
        template: `<FbCard><p class="text-3xl text-primary">${args.default}</p></FbCard>`,
    }),
    decorators: [() => ({ template: '<div><story /></div>' })],
};
