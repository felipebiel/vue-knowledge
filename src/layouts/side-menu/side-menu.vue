<template>
    <div class="navigation" :class="activeClass">
        <ul>
            <li>
                <router-link :to="{ name: 'Home' }">
                    <span class="icon"><span class="material-icons"> business </span></span>
                    <span class="title">Empresa</span>
                </router-link>
            </li>
            <li v-for="(link, index) in links" :key="index" :class="{ active: $route.name === link.routerName }">
                <!-- Links Internos -->
                <router-link :to="{ name: link.routerName }" v-if="!link.externalLink">
                    <span class="icon">
                        <span class="material-icons">{{ link.icon }} </span>
                    </span>
                    <span class="title">{{ link.title }}</span>
                </router-link>
                <!-- Links Externos -->
                <a :href="link.url" target="_blank" v-else>
                    <span class="icon">
                        <span class="material-icons">{{ link.icon }} </span>
                    </span>
                    <span class="title">{{ link.title }}</span>
                </a>
            </li>
            <li>
                <router-link :to="{ name: 'Home' }">
                    <span class="icon"><span class="material-icons"> logout </span></span>
                    <span class="title">Sair</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { sideMenuStore } from '@/stores/side-menu';
import { LINKS_MENU } from '@/utils/constants';
import { computed } from 'vue';

const sideMenu = sideMenuStore();

const links = computed(() => {
    return LINKS_MENU;
});

const activeClass = computed(() => {
    return sideMenu.toggle ? 'active' : '';
});
</script>

<style lang="scss" scoped>
.navigation {
    @apply fixed left-[-300px] lg:left-0 h-full w-[300px] bg-primary border-l-[10px] border-l-primary duration-500 overflow-hidden;
    &.active {
        @apply w-full sm:w-[300px] lg:w-[80px] left-0 z-10;
    }

    ul {
        @apply absolute top-0 left-0 w-full;
        li {
            @apply relative w-full list-none rounded-l-full hover:bg-body-color;

            &.active {
                @apply bg-body-color;
                a {
                    @apply text-primary;
                }
            }

            &:nth-child(1) {
                @apply mb-10 pointer-events-none;
                a {
                    @apply flex items-center;
                }
                .title {
                    @apply text-4xl;
                }
            }

            a {
                @apply relative w-full flex no-underline text-white hover:text-primary;
                .icon {
                    @apply relative min-w-[60px] h-[60px] text-center flex items-center pl-4;
                    .material-icons {
                        @apply text-3xl;
                    }
                }

                .title {
                    @apply relative py-4 px-0 pl-4 leading-8;
                }
            }

            /* Curvas do lado de fora */
            &:hover a::before,
            &.active a::before {
                @apply absolute right-0 top-[-50px] w-[50px] h-[50px] bg-transparent rounded-full pointer-events-none;
                content: '';
                box-shadow: 35px 35px 0 10px $body-color;
            }

            &:hover a::after,
            &.active a:after {
                @apply absolute right-0 bottom-[-50px] w-[50px] h-[50px] bg-transparent rounded-full pointer-events-none;
                content: '';
                box-shadow: 35px -35px 0 10px $body-color;
            }
        }
    }
}
</style>
