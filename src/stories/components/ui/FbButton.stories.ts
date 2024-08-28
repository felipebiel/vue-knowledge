import type { Meta, StoryObj } from '@storybook/vue3';

import FbButton from '@/components/ui/fb-button.vue';
import { buttonAs, sizes, buttonVariants } from '@/theme/constantes-theme';

const meta = {
    title: 'UI/Button',
    component: FbButton,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: sizes,
        },
        as: {
            options: buttonAs,
        },
        variant: {
            options: buttonVariants,
        },
    },
} satisfies Meta<typeof FbButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        default: 'Button',
    },
};

export const Variants: Story = {
    // é necessário retornar o 'args' para a documentação
    render: (args) => ({
        components: { FbButton },
        template: `
            <fb-button>Meu botão</fb-button>
            <fb-button variant="primary-outline">Meu botão</fb-button>
            <fb-button variant="primary-link">Meu botão</fb-button>
            <fb-button variant="secundary">Meu botão</fb-button>
            <fb-button variant="secundary-link">Meu botão</fb-button>`,
    }),
    decorators: [() => ({ template: '<div class="flex gap-2"><story /></div>' })],
};

export const Sizes: Story = {
    // é necessário retornar o 'args' para a documentação
    render: (args) => ({
        components: { FbButton },
        template: `
            <fb-button size="lg">Meu botão</fb-button>
            <fb-button>Meu botão</fb-button>
            <fb-button size="sm">Meu botão</fb-button>
            <fb-button size="xs"> Meu botão </fb-button>`,
    }),
    decorators: [() => ({ template: '<div class="flex gap-2"><story /></div>' })],
};

export const Icons: Story = {
    // é necessário retornar o 'args' para a documentação
    render: (args) => ({
        components: { FbButton },
        template: `
            <fb-button>
                <div class="material-icons">settings</div>
                Com ícones
                <div class="material-icons">check</div>
            </fb-button>`,
    }),
    decorators: [() => ({ template: '<div><story /></div>' })],
};

export const Loading: Story = {
    args: {
        default: 'Button',
        isLoading: true,
    },
};

export const Disabled: Story = {
    args: {
        default: 'Button',
        isDisabled: true,
    },
};

export const CustomWithTailwind: Story = {
    render: (args) => ({
        components: { FbButton },
        template: `
            <fb-button size="lg" class="bg-purple-800 italic hover:bg-purple-600 w-60 rounded-sm">Meu botão</fb-button>
            `,
    }),
    decorators: [() => ({ template: '<div ><story /></div>' })],
};
