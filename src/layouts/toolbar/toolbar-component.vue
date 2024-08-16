<template>
    <div class="toolbar">
        <button class="toolbar__toggle" @click="toogleFunction"><span class="material-icons"> menu </span></button>
        <div class="toolbar__functions">
            <button class="darkmode__button" @click="darkMode.toogleDarkMode">
                <span class="material-icons darkmode__icon"> {{ darkMode.isDarkMode ? 'light_mode' : 'dark_mode' }}</span>
            </button>
            <span class="material-icons user__icon"> account_circle </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { darkModeStore } from '@/stores/dark-mode';
import { sideMenuStore } from '@/stores/side-menu';

const { toogleFunction } = sideMenuStore();
const darkMode = darkModeStore();
</script>

<style lang="scss" scoped>
.toolbar {
    @apply w-full h-16 flex justify-between items-center py-2 px-4 bg-white dark:bg-zinc-800;
    .toolbar__toggle {
        @apply relative w-12 h-12 flex justify-center items-center text-4xl cursor-pointer hover:bg-zinc-100 rounded-full;
        @apply dark:hover:bg-zinc-700 dark:text-zinc-100;
    }
    .toolbar__functions {
        @apply relative flex items-center gap-4;

        .darkmode {
            &__button {
                @apply w-12 h-12 text-primary hover:bg-zinc-100 rounded-full;
                @apply dark:hover:bg-zinc-700 dark:text-zinc-100;
            }
            &__icon {
                @apply text-3xl;
            }
        }

        .user__icon {
            @apply text-[2.5rem] text-primary flex dark:text-zinc-100;
        }
    }
}
</style>
