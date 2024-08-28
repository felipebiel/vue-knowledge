import type { Meta, StoryObj } from '@storybook/vue3';

import FbModal from '@/components/ui/fb-modal.vue';
import { sizes, animationsModal } from '@/theme/constantes-theme';
import { fn } from '@storybook/test';

const loremMock = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae laoreet nunc. Ut non ex ultrices est accumsan facilisis vitae efficitur mauris. Mauris viverra augue erat, venenatis euismod mauris tincidunt egestas. Pellentesque interdum nec sapien et semper. Sed vel nunc euismod, volutpat lectus lobortis, finibus quam. Fusce placerat sapien sed felis sodales, at fermentum turpis pharetra. Nullam bibendum, dui eget rhoncus finibus, quam mi venenatis neque, sit amet tristique velit augue ut metus. Suspendisse nisl nulla, tempor vitae justo at, elementum interdum diam. Proin nec hendrerit nisl, eget auctor purus. Vestibulum gravida dapibus leo, a gravida nulla mollis vel. Mauris quis justo urna. Integer eget ullamcorper leo, eu pulvinar ante. Cras et nunc ut libero posuere vulputate non vitae mi. In imperdiet, massa at gravida mollis, nibh augue maximus arcu, vitae pretium nibh erat nec turpis. Duis condimentum ipsum eros, nec tempor magna hendrerit quis. Pellentesque euismod ullamcorper enim hendrerit scelerisque.`;
const storySlotBase = {
    header: 'Meu título',
    body: loremMock,
};
const meta = {
    title: 'UI/Modal',
    component: FbModal,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: [...sizes, 'full'],
        },
        animation: {
            options: animationsModal,
        },
    },
    args: {
        onClose: fn(),
        onConfirm: fn(),
    },
    decorators: [() => ({ template: '<div>Use the Controls<story /></div>' })],
} satisfies Meta<typeof FbModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {};

export const Slots: Story = {
    args: { ...storySlotBase },
};

export const ExtaSmall: Story = {
    args: {
        ...storySlotBase,
        size: 'xs',
    },
};

export const Small: Story = {
    args: {
        ...storySlotBase,
        size: 'sm',
    },
};

export const Medium: Story = {
    args: {
        ...storySlotBase,
        size: 'md',
    },
};

export const Large: Story = {
    args: {
        ...storySlotBase,
        size: 'lg',
    },
};

export const Full: Story = {
    args: {
        ...storySlotBase,
        size: 'full',
    },
};

export const Animations: Story = {
    args: {
        ...storySlotBase,
        speed: 1,
        animation: 'newspaper',
    },
};
