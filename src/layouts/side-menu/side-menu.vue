<template>
    <nav class="navigation" :class="activeClass">
        <button class="navigation__close" @click="toogleFunction()">
            <span class="material-icons navigation__close--icon"> close </span>
        </button>
        <ul class="navigation__links">
            <li>
                <router-link :to="{ name: 'Home' }" as="a">
                    <span class="icon"><span class="material-icons navigation__links--icon"> business </span></span>
                    <span class="title">Empresa</span>
                </router-link>
            </li>
            <li v-for="(link, index) in links" :key="index" :class="{ active: $route.name === link.routerName }">
                <!-- Links Internos -->
                <router-link :to="{ name: link.routerName }" v-if="!link.externalLink" as="a">
                    <span class="icon">
                        <span class="material-icons navigation__links--icon">{{ link.icon }} </span>
                    </span>
                    <span class="title">{{ link.title }}</span>
                </router-link>
                <!-- Links Externos -->
                <a :href="link.url" target="_blank" v-else>
                    <span class="icon">
                        <span class="material-icons navigation__links--icon">{{ link.icon }} </span>
                    </span>
                    <span class="title">{{ link.title }}</span>
                </a>
            </li>
            <li>
                <router-link :to="{ name: 'Home' }" as="a">
                    <span class="icon"><span class="material-icons navigation__links--icon"> logout </span></span>
                    <span class="title">Sair</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { sideMenuStore } from '@/stores/side-menu';
import { LINKS_MENU } from '@/utils/constants';
import { computed } from 'vue';

const sideMenu = sideMenuStore();
const { toogleFunction } = sideMenuStore();

const links = computed(() => {
    return LINKS_MENU;
});

const activeClass = computed(() => {
    return sideMenu.toggle ? 'navigation--active' : '';
});
</script>

<style lang="scss" scoped>
.navigation {
    @apply fixed left-[-300px] lg:left-0 h-full w-[300px] bg-primary  border-l-[10px] border-l-primary duration-500 overflow-hidden z-10;
    /* dark-mode */
    @apply dark:bg-zinc-900 dark:border-l-zinc-900;
    &__close {
        @apply z-20 absolute top-4 right-5 block sm:hidden;
        &--icon {
            @apply text-white text-4xl;
        }
    }
    &--active {
        @apply w-full sm:w-[300px] lg:w-[80px] left-0;
    }

    &__links {
        @apply absolute top-0 left-0 w-full;
        li {
            @apply relative w-full list-none rounded-l-full hover:bg-body-color dark:hover:bg-zinc-700;

            &.active {
                @apply bg-body-color dark:bg-zinc-700;
                a {
                    @apply text-primary dark:text-white;
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
                @apply relative w-full flex no-underline text-white hover:text-primary dark:hover:text-white;
                .icon {
                    @apply relative min-w-[60px] h-[60px] text-center flex items-center pl-4;
                    .navigation__links--icon {
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
                @apply shadow-[35px_35px_0_10px] shadow-body-color dark:shadow-zinc-700;
            }

            &:hover a::after,
            &.active a:after {
                @apply absolute right-0 bottom-[-50px] w-[50px] h-[50px] bg-transparent rounded-full pointer-events-none;
                content: '';
                @apply shadow-[35px_-35px_0_10px] shadow-body-color dark:shadow-zinc-700;
            }
        }
    }
}
</style>
