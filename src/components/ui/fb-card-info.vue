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
    numbers: number;
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
    position: relative;
    background-color: $white;
    padding: 30px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
    @media screen and (max-width: 767px) {
        padding: 20px;
    }
    &:hover {
        background-color: $primary-color;
        .card-info__numbers,
        .card-info__name {
            color: $text-primary;
        }
        .card-info__icon-bx {
            .material-icons {
                color: $text-primary;
            }
        }
    }
    &__numbers {
        position: relative;
        font-size: 2.5em;
        font-weight: 500;
        color: $primary-color;
    }
    &__name {
        color: $text-secundary;
        font-size: 1.1em;
        margin-top: 5px;
    }
    &__icon-bx {
        .material-icons {
            font-size: 3.5em;
            color: $text-secundary;
        }
    }
}
</style>
