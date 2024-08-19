import type { Meta, StoryObj } from '@storybook/vue3';
import FbTitleBar from '@/components/ui/fb-title-bar.vue';

const meta = {
    title: 'UI/TitleBar',
    component: FbTitleBar,
    tags: ['autodocs'],
} satisfies Meta<typeof FbTitleBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        left: 'Título primário',
        right: 'Slot a direita',
    },
};

export const Subtitle: Story = {
    args: {
        titleType: 'subtitle',
        left: 'Título secundário',
        right: 'Slot a direita',
    },
};
