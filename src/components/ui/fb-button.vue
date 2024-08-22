<template>
    <component class="fb-button" :class="classesComputed" :is="props.as" v-bind="$attrs"><slot></slot></component>
</template>

<script setup lang="ts">
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { computed, useAttrs } from 'vue';

export interface ButtonProps {
    as?: 'button' | 'a';
    variant?: 'primary' | 'primary-outline' | 'secundary';
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

const attrs = useAttrs();

const props = withDefaults(defineProps<ButtonProps>(), { as: 'button', variant: 'primary', size: 'md' });

const BASE_CLASSES = 'flex items-center justify-center gap-2 border-none rounded-md shadow-none cursor-pointer font-semibold';

const classesVariants = {
    primary: 'text-white bg-primary',
    'primary-outline': 'text-primary bg-transparent shadow-[inset_0px_0px_1px_1px_#287bff]',
    secundary: 'text-white bg-secundary',
};

const classesSizes = {
    xs: 'text-xs h-6 px-2 rounded-md',
    sm: 'text-sm h-8 px-3 rounded-lg',
    md: 'text-base h-10 px-4 rounded-[10px]',
    lg: 'text-lg h-12 px-6 rounded-[10px]',
};

const classesComputed = computed(() => {
    return twMerge(BASE_CLASSES, classesSizes[props.size], classesVariants[props.variant], attrs.class as ClassNameValue);
});
</script>

<style scoped lang="scss"></style>
