<template>
    <div class="fb-card">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.fb-card {
    @apply p-5 sm:px-10 sm:py-11 shadow-app rounded-3xl bg-white dark:bg-zinc-600;
}
</style>
