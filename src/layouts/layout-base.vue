<template>
    <div>
        <div class="w-full relative">
            <side-menu></side-menu>
        </div>
        <div class="main-box" :class="{}">
            <!-- <toolbar-component></toolbar-component> -->
            <div class="content-box p-5">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import SideMenu from '@/layouts/side-menu/side-menu.vue';
</script>

<style scoped lang="scss">
.main-box {
    @apply absolute w-full left-0 lg:w-[calc(100%-300px)] lg:left-[300px] min-h-screen duration-500 bg-zinc-700;
}
</style>
