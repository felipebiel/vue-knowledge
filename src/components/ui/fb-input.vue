<template>
    <div class="fb-input" :class="{ 'padding-bottom-input': !noPadding }">
        <div className="flex justify-between">
            <label v-if="label.trim().length" class="fb-input__label" :for="idInput">
                {{ label }}
            </label>
            <transition name="custom-classes-transition" @enter="enterAnimationError" @leave="leaveAnimationError">
                <p class="fb-input__error-message" v-if="showError"><span class="material-icons"> info </span> {{ messageError }}</p>
            </transition>
        </div>

        <div class="fb-input__group" :class="{ 'border-red-400 ring-2 ring-red-400': showError }">
            <div class="self-stretch">
                <slot name="leftAddon"></slot>
            </div>
            <div class="h-full flex items-center px-5 bg-zinc-100" v-if="!$slots.leftAddon && leftAddonText">{{ leftAddonText }}</div>

            <input
                :id="idInput"
                :placeholder="placeholderText"
                :disabled="isDisabled"
                :readonly="isReadOnlyLocal"
                :type="fieldType"
                ref="inputRef"
                v-model="model"
                v-on:keyup.enter="$emit('enter', true)"
                @blur="$emit('onblur')"
            />

            <div class="self-stretch">
                <slot name="rightAddon"></slot>
            </div>
            <div class="h-full flex items-center px-5 bg-zinc-100" v-if="!$slots.rightAddon && rightAddonText">{{ rightAddonText }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { gsapAnimations } from '@/theme/gsap-animations';
import gsap from 'gsap';
import { RulesInterface, validateInput } from '@/utils/validations/rules';
import { InputTypeHTMLAttribute, ref } from 'vue';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import flatpickr from 'flatpickr';
import { cloneDeep } from 'lodash';
import { Options as FlatpickrOptions } from 'flatpickr/dist/types/options';
import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';
import { onMounted, computed } from 'vue';

export interface inputProps {
    label?: string;
    placeholderText?: string;
    leftAddonText?: string;
    rightAddonText?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isLoading?: boolean;
    modelValue?: string | number;
    maxLength?: boolean | number;
    valid?: boolean;
    validOnlyTouch?: boolean;
    showRequiredError?: boolean;
    rules?: RulesInterface | null;
    fieldType?: InputTypeHTMLAttribute;
    noPadding?: boolean;
    textAlignInput?: 'left' | 'center' | 'right';
    idInput: string;
    nameInput: string;
    showCleanField?: boolean;
    showVisibility?: boolean;
    calendar?: boolean;
    rangeDate?: boolean;
    configCalendar?: FlatpickrOptions;
}

const props = withDefaults(defineProps<inputProps>(), {
    label: '',
    isDisabled: false,
    isReadOnly: false,
    isLoading: false,
    maxLength: false,
    valid: false,
    validOnlyTouch: false,
    showRequiredError: false,
    fieldType: 'text',
    noPadding: false,
    textAlignInput: 'left',
    showCleanField: false,
    showVisibility: false,
    calendar: false,
    rangeDate: false,
    configCalendar: () => {
        return {
            monthSelectorType: 'dropdown',
            allowInput: true,
            altFormat: 'd/m/Y',
            dateFormat: 'd/m/Y',
            locale: { ...Portuguese, rangeSeparator: ' a ' },
            mode: 'single',
        };
    },
});
const emit = defineEmits(['input', 'update:modelValue', 'enter', 'onblur', 'valid']);

const model = defineModel({
    set(modelValue: string) {
        validate(modelValue);
        return modelValue;
    },
    get() {
        return props.modelValue;
    },
});

// validation erros
const showError = ref<boolean>(false);
const messageError = ref<string>('');

const validate = (modelValue: string | number) => {
    if (!props.rules && !props.modelValue) return false;

    messageError.value = validateInput(props.rules, modelValue);
    if (messageError.value.trim().split('').length) {
        showError.value = true;
    } else {
        showError.value = false;
    }
    emit('valid', !showError.value);
};

const timeline = gsap.timeline();
const enterAnimationError = (el: Element, done: () => void) => {
    timeline.fromTo(el, gsapAnimations['fadeIn'].initial, {
        ...gsapAnimations['fadeIn'].enter,
        duration: 0.5,
        onComplete: done,
    });
};

const leaveAnimationError = (el: Element, done: () => void) => {
    timeline.to(el, { ...gsapAnimations['fadeIn'].leave, duration: 0.5, onComplete: done });
};

// date picker

const inputRef = ref<HTMLInputElement>();
const calendarInstance = ref<FlatpickrInstance>();
// ações do calendário
const prepareDatePicker = () => {
    if (props.calendar || (props.rangeDate && inputRef.value)) {
        const localConfig = cloneDeep(props.configCalendar);
        const config = localConfig;
        config.mode = props.rangeDate ? 'range' : 'single';
        calendarInstance.value = flatpickr(inputRef.value as Node, config);
    }
};

onMounted(() => prepareDatePicker());

const isReadOnlyLocal = computed(() => {
    return props.calendar || props.rangeDate ? true : props.isReadOnly;
});
</script>

<style scoped lang="scss">
.fb-input {
    @apply relative;
    &.padding-bottom-input {
        @apply pb-8;
    }
    &__label {
        @apply font-semibold text-zinc-500 dark:text-zinc-100 flex mb-1;
    }
    &__group {
        @apply flex items-center relative w-full h-12 border rounded-xl border-zinc-200 text-zinc-950 overflow-hidden duration-150;

        input {
            @apply px-5 font-medium h-12 outline-none flex-1;
            text-align: v-bind(textAlignInput);

            &:disabled {
                @apply bg-zinc-100 text-zinc-400;
            }
        }
    }
    &__error-message {
        @apply flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md mb-1;
    }
}
</style>
