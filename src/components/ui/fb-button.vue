<template>
    <component class="fb-button" :class="classesComputed" :is="props.as" :disabled="isDisabled || isLoading" v-bind="$attrs">
        <div v-if="isLoading">
            <fb-icon name="loading" class="animate-spin text-white"></fb-icon>
        </div>

        <slot> </slot>
    </component>
</template>

<script setup lang="ts">
import { buttonAs, sizes, buttonVariants } from '@/theme/constantes-theme';
import FbIcon from './fb-icon.vue';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { computed, useAttrs } from 'vue';

export interface ButtonProps {
    as?: (typeof buttonAs)[number];
    variant?: (typeof buttonVariants)[number];
    size?: (typeof sizes)[number];
    isDisabled?: boolean;
    isLoading?: boolean;
}

const attrs = useAttrs();

const props = withDefaults(defineProps<ButtonProps>(), {
    as: 'button',
    variant: 'primary',
    size: 'md',
    isDisabled: false,
    isLoading: false,
});

const BASE_CLASSES =
    'flex items-center justify-center gap-2 border-none rounded-md shadow-none cursor-pointer font-semibold hover:opacity-80 duration-300';
const DISABLED_LOADING = 'opacity-80 bg-gray-500 hover:bg-gray-500 cursor-not-allowed text-white border-none no-underline shadow-none';

const classesVariants = {
    primary: 'text-white bg-primary',
    'primary-outline': 'text-primary bg-transparent shadow-[inset_0px_0px_1px_1px] dark:text-zinc-100',
    'primary-link': 'text-primary bg-transparent underline',
    secundary: 'text-white bg-link',
    'secundary-link': 'text-link bg-transparent underline',
};

const classesSizes = {
    xs: 'text-xs h-6 px-2 rounded-md',
    sm: 'text-sm h-8 px-3 rounded-lg',
    md: 'text-base h-10 px-4 rounded-[10px]',
    lg: 'text-lg h-12 px-6 rounded-[10px]',
};

const disabledButton = computed(() => {
    if (!props.isDisabled) return '';
    return DISABLED_LOADING;
});

const loadingButton = computed(() => {
    if (!props.isLoading) return '';
    return DISABLED_LOADING;
});

const classesComputed = computed(() => {
    return twMerge(
        BASE_CLASSES,
        classesSizes[props.size],
        classesVariants[props.variant],
        disabledButton.value,
        loadingButton.value,
        attrs.class as ClassNameValue,
    );
});
</script>

<style scoped lang="scss"></style>
