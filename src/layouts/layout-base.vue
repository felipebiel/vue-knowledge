<template>
    <div>
        <div class="w-full relative">
            <side-menu></side-menu>
        </div>
        <div class="main-box" :class="activeClass">
            <toolbar-component></toolbar-component>
            <div class="content-box p-5">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SideMenu from '@/layouts/side-menu/side-menu.vue';
import ToolbarComponent from '@/layouts/toolbar/toolbar-component.vue';
import { sideMenuStore } from '@/stores/side-menu';
import { computed } from 'vue';

const sideMenu = sideMenuStore();

const activeClass = computed(() => {
    return sideMenu.toggle ? 'active' : '';
});
</script>

<style scoped lang="scss">
.main-box {
    @apply absolute w-full left-0 lg:w-[calc(100%-300px)] lg:left-[300px] min-h-screen duration-500 bg-body-color;
    &.active {
        @apply left-[80px] w-[calc(100%-80px)];
        @media screen and (max-width: 991px) {
            @apply left-[300px];
        }
        /* @media screen and (max-width: 767px) {
            left: 85%;
            color: $white;
        } */
    }
}
</style>
