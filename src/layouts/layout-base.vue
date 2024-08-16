<template>
    <div :class="{ dark: darkMode.isDarkMode }">
        <div class="side__box"><side-menu></side-menu></div>
        <div class="main__box" :class="activeClass">
            <toolbar-component></toolbar-component>
            <div class="main__box__content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SideMenu from '@/layouts/side-menu/side-menu.vue';
import ToolbarComponent from '@/layouts/toolbar/toolbar-component.vue';
import { darkModeStore } from '@/stores/dark-mode';
import { sideMenuStore } from '@/stores/side-menu';
import { computed } from 'vue';

const sideMenu = sideMenuStore();
const darkMode = darkModeStore();

const activeClass = computed(() => {
    return sideMenu.toggle ? 'main__box--active' : '';
});
</script>

<style scoped lang="scss">
.side__box {
    @apply w-full relative;
}
.main__box {
    @apply w-full pl-0 lg:pl-[300px] min-h-screen duration-500 bg-body-color;
    &__content {
        @apply p-5;
    }
    &--active {
        @apply sm:pl-[300px] lg:pl-[80px];
    }
}
</style>
