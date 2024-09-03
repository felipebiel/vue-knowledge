import type { Meta, StoryObj } from '@storybook/vue3';

import FbInput from '@/components/ui/fb-input.vue';
import { fn } from '@storybook/test';
import { reactive, ref } from 'vue';
import { isValidRules, RulesInterface } from '@/utils/validations/rules';

const meta = {
    title: 'UI/Input',
    component: FbInput,
    tags: ['autodocs'],
    args: {
        onInput: fn(),
        onEnter: fn(),
        onOnblur: fn(),
        onValid: fn(),
    },
} satisfies Meta<typeof FbInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
    args: {
        idInput: 'simple-input',
        nameInput: 'simple-input',
    },
    render: (args) => ({
        components: { FbInput },
        setup() {
            const testeBind = ref<string>('');
            return { args, testeBind };
        },
        template: `
        <fb-input idInput="${args.idInput}" nameInput="${args.nameInput}" v-model="testeBind" />
        Bind: {{testeBind}}
        `,
    }),
    decorators: [() => ({ template: '<div ><story /> </div>' })],
};

export const LabelAndPlaceholder: Story = {
    args: {
        idInput: 'label-input',
        nameInput: 'label-input',
        label: 'My Input',
        placeholderText: 'My placeholder',
    },
    render: (args) => ({
        components: { FbInput },
        setup() {
            const testeBind = ref<string>('');
            return { args, testeBind };
        },
        template: `
        <fb-input label="${args.label}" placeholderText="${args.placeholderText}" idInput="${args.idInput}" nameInput="${args.nameInput}" v-model="testeBind" />
        Bind: {{testeBind}}
        `,
    }),
    decorators: [() => ({ template: '<div ><story /> </div>' })],
};

export const LeftAndRightAddons: Story = {
    args: {
        idInput: 'Addons-input',
        nameInput: 'Addons-input',
        label: 'My Input',
        placeholderText: 'My placeholder',
        leftAddonText: 'https://',
        rightAddonText: '.com',
    },
    render: (args) => ({
        components: { FbInput },
        setup() {
            const testeBind = ref<string>('');
            return { args, testeBind };
        },
        template: `
        <fb-input 
            label="${args.label}" 
            placeholderText="${args.placeholderText}" 
            leftAddonText="${args.leftAddonText}"
            rightAddonText="${args.rightAddonText}"
            idInput="${args.idInput}" 
            nameInput="${args.nameInput}" 
            v-model="testeBind" 
        />
        Bind: {{testeBind}}
        `,
    }),
    decorators: [() => ({ template: '<div ><story /> </div>' })],
};

export const SlotsLeftAndRightAddons: Story = {
    args: {
        idInput: 'Addons-input',
        nameInput: 'Addons-input',
        label: 'My Input',
        placeholderText: 'My placeholder',
    },
    render: (args) => ({
        components: { FbInput },
        setup() {
            const testeBind = ref<string>('');
            return { args, testeBind };
        },
        template: `
        <fb-input
            label="${args.label}" 
            placeholderText="${args.placeholderText}" 
            idInput="${args.idInput}" 
            nameInput="${args.nameInput}" 
            v-model="testeBind"
        >
            <template #leftAddon> <div class="h-full flex items-center px-5 bg-red-200">Customizado</div> </template>
            <template #rightAddon><div class="h-full flex items-center px-5 bg-green-200">Customizado</div></template>
        </fb-input>
        <fb-input
            label="${args.label}" 
            placeholderText="${args.placeholderText}" 
            idInput="${args.idInput}-2" 
            nameInput="${args.nameInput}-2" 
            v-model="testeBind"
        >
            <template #leftAddon>
                <div class="h-full flex items-center pl-3"><span class="material-icons text-primary"> search </span></div>
            </template>
            <template #rightAddon
                ><div class="h-full flex items-center pr-3">
                    <span class="material-icons text-green-800"> verified </span>
                </div></template
            >
        </fb-input>
        Bind: {{testeBind}}
        `,
    }),
    decorators: [() => ({ template: '<div ><story /> </div>' })],
};

export const Disabled: Story = {
    args: {
        idInput: 'states-input',
        nameInput: 'states-input',
        label: 'My Input',
        placeholderText: 'My placeholder',
        isDisabled: true,
    },
};

export const ReadOnly: Story = {
    args: {
        idInput: 'states-input',
        nameInput: 'states-input',
        label: 'My Input',
        placeholderText: 'My placeholder',
        isReadOnly: true,
    },
};

export const Validations: Story = {
    args: {
        idInput: 'states-input',
        nameInput: 'states-input',
        label: 'My Input',
        placeholderText: 'My placeholder',
        isReadOnly: true,
    },
    render: (args) => ({
        components: { FbInput },
        setup() {
            const form = reactive({ text: '', email: '' });
            const isFormValid = ref<boolean>(false);
            const validationsRules = reactive<{ [key: string]: RulesInterface }>({
                text: {
                    required: true,
                    valid: false,
                    name: 'text',
                    type: 'text',
                    customMessageRequired: 'Obrigatório',
                    minLength: 3,
                    maxLength: 5,
                },
                email: {
                    required: true,
                    valid: false,
                    name: 'email',
                    type: 'email',
                },
            });

            const validateForm = async (): Promise<boolean> => {
                return isValidRules(validationsRules);
            };

            const checkDisabledButton = async () => {
                const disabledButton = await validateForm();
                isFormValid.value = disabledButton;
            };
            return { args, form, isFormValid, validationsRules, checkDisabledButton };
        },
        template: `
        <fb-input
                label="My Input"
                placeholder-text="My placeholder"
                v-model="form.text"
                idInput="my-input-8"
                nameInput="my-input-8"
                :rules="validationsRules['text']"
                @valid="
                    validationsRules['text'].valid = $event;
                    checkDisabledButton();
                "
            />

            <fb-input
                label="My Input"
                placeholder-text="Just valid email"
                v-model="form.email"
                idInput="my-input-9"
                nameInput="my-input-9"
                :rules="validationsRules['email']"
                @valid="
                    validationsRules['email'].valid = $event;
                    checkDisabledButton();
                "
            />
            <p class="px-2" :class="{ 'bg-green-300': isFormValid, 'bg-red-300': !isFormValid }">
                {{ isFormValid ? 'Formulário válido' : 'Formulário inválido' }}
            </p>
        `,
    }),
    decorators: [() => ({ template: '<div ><story /> </div>' })],
};

export const DatePicker: Story = {
    args: {
        idInput: 'datepicker-input',
        nameInput: 'datepicker-input',
        calendar: true,
    },
    render: (args) => ({
        components: { FbInput },
        setup() {
            const testeBind = ref<string>('');

            return { args, testeBind };
        },
        template: `
        <fb-input v-bind="args" v-model="testeBind" />
        Bind: {{testeBind}}
        `,
    }),
    decorators: [() => ({ template: '<div ><story /> </div>' })],
};

export const RangePicker: Story = {
    args: {
        idInput: 'Range-input',
        nameInput: 'Range-input',
        calendar: true,
        rangeDate: true,
    },
    render: (args) => ({
        components: { FbInput },
        setup() {
            const testeBind = ref<string>('');

            return { args, testeBind };
        },
        template: `
        <fb-input v-bind="args" v-model="testeBind" />
        Bind: {{testeBind}}
        `,
    }),
    decorators: [() => ({ template: '<div ><story /> </div>' })],
};
