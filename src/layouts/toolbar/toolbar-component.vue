<template>
    <div class="toolbar">
        <button class="toolbar__toggle" @click="toogleFunction"><span class="material-icons"> menu </span></button>
        <div class="user">
            <span class="material-icons user__icon"> account_circle </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { sideMenuStore } from '@/stores/side-menu';

const { toogleFunction } = sideMenuStore();
</script>

<style lang="scss" scoped>
.toolbar {
    @apply w-full h-16 flex justify-between items-center py-0 px-4 bg-white;
    .toolbar__toggle {
        @apply relative w-16 h-16 flex justify-center items-center text-4xl cursor-pointer z-[1001] hover:bg-zinc-100 rounded-full;
    }
    .user {
        @apply relative;

        .user__icon {
            @apply text-[2.5rem] text-primary flex;
        }
    }
}
</style>
