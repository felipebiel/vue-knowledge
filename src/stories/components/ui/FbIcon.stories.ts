import type { Meta, StoryObj } from '@storybook/vue3';
import FbIcon from '@/components/ui/fb-icon.vue';
import customIcons from '@/theme/custom-icons';

const meta = {
    title: 'UI/Icons',
    component: FbIcon,
    argTypes: {
        name: {
            options: Object.keys(customIcons),
            control: {
                type: 'select',
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof FbIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: '40px',
        name: 'info',
    },
};

export const LoadingExample: Story = {
    args: {
        size: '40px',
        name: 'loading',
    },
    render: (args) => ({
        components: { FbIcon },
        template: `<FbIcon name="${args.name}" size="${args.size}" class="animate-spin" />`,
    }),
    decorators: [() => ({ template: '<div class="w-80"><story /></div>' })],
};

export const CustomWithTailwind: Story = {
    args: {
        size: '40px',
        name: 'info',
    },
    render: (args) => ({
        components: { FbIcon },
        template: `<FbIcon name="${args.name}" size="${args.size}" color="" class=" text-primary drop-shadow-lg hover:text-red-600 hover:scale-150 duration-700" />`,
    }),
    decorators: [() => ({ template: '<div class="w-80">Hover me!<story /></div>' })],
};
