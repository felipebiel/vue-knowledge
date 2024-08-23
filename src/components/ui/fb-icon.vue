<template>
    <svg :color="color" :width="size" :height="size" v-html="nameIcon" :viewBox="viewBoxIcon" role="presentation" class="fb-icon"></svg>
</template>

<script setup lang="ts">
import customIcons from '@/theme/custom-icons';
import { computed } from 'vue';

export interface IconProps {
    size?: string;
    name?: string;
    viewBox?: string;
    color?: string;
}
const props = withDefaults(defineProps<IconProps>(), { name: 'info', size: '16px', color: 'gray' });

const viewBoxIcon = computed(() => {
    return customIcons[props.name] && customIcons[props.name].viewBox ? customIcons[props.name].viewBox : props.viewBox;
});

const nameIcon = computed(() => {
    return customIcons[props.name] && customIcons[props.name].path ? customIcons[props.name].path : 'info';
});
</script>

<style scoped></style>
