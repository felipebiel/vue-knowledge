<template>
    <div class="card-info">
        <div>
            <div class="card-info__numbers" v-tippy="numbersTippy">{{ truncateString(String(numbers), truncate) }}</div>
            <div class="card-info__name">{{ title }}</div>
        </div>
        <div class="card-info__icon-bx">
            <span class="material-icons"> {{ icon }} </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { truncateString } from '@/utils';
import { computed } from 'vue';

export interface CardInfoProps {
    numbers: string;
    title: string;
    icon: string;
    truncateSize: number;
}

const props = withDefaults(defineProps<CardInfoProps>(), { truncateSize: 0 });

const truncate = computed(() => {
    return props.truncateSize > 0 ? props.truncateSize : String(props.numbers).length;
});
const numbersTippy = computed(() => {
    return props.truncateSize > 0 ? props.numbers : false;
});
</script>

<style scoped lang="scss">
.card-info {
    @apply relative bg-white p-5 sm:p-7 rounded-3xl flex justify-between cursor-pointer shadow-app;
    @apply dark:bg-zinc-600;
    &:hover {
        @apply bg-primary dark:bg-zinc-500;

        .card-info__numbers,
        .card-info__name {
            @apply text-white dark:text-zinc-50;
        }
        .card-info__icon-bx {
            .material-icons {
                @apply text-white dark:text-zinc-50;
            }
        }
    }
    &__numbers {
        @apply text-4xl font-normal text-primary dark:text-zinc-50;
    }
    &__name {
        @apply text-secundary text-lg mt-2;
    }
    &__icon-bx {
        .material-icons {
            @apply text-6xl text-secundary;
        }
    }
}
</style>
