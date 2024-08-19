<template>
    <div class="fb-title-bar">
        <div class="fb-title-bar__left">
            <h1 class="fb-title-bar__title" v-if="titleType === 'title'"><slot name="left"></slot></h1>
            <h2 class="fb-title-bar__sub-title" v-if="titleType === 'subtitle'"><slot name="left"></slot></h2>
        </div>
        <div class="fb-title-bar__right"><slot name="right"></slot></div>
    </div>
</template>

<script setup lang="ts">
export interface CardInfoProps {
    titleType: 'title' | 'subtitle';
}

withDefaults(defineProps<CardInfoProps>(), { titleType: 'title' });
</script>

<style scoped lang="scss">
.fb-title-bar {
    @apply flex items-center;
    &__left {
        @apply flex-1;
    }
    &__title {
        @apply m-0 text-primary text-2xl font-semibold dark:text-zinc-50;
    }
    &__sub-title {
        @apply m-0 text-secundary text-xl font-semibold dark:text-zinc-100;
    }
}
</style>
