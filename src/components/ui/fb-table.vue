<template>
    <div></div>
    <div class="table-responsive">
        <table class="fb-table">
            <thead>
                <tr class="fb-table__tr-head">
                    <th
                        class="fb-table__title"
                        :key="index"
                        v-for="(header, index) in headers"
                        :style="{ width: header.columnSize ? header.columnSize : 'auto' }"
                    >
                        <slot v-bind:header="header" :name="`header-` + header.value">{{ header.label }}</slot>
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-if="rows.length > 0">
                    <tr :key="index" v-for="(row, index) in rows" @click="$emit('selectedRow', row)">
                        <td v-for="(col, index) in columns" :key="index" class="fb-table__table-value">
                            <slot v-bind:item="row" :name="col">{{ row[col] }}</slot>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td :colspan="columns.length" class="fb-table__no-register">
                            <slot name="no-register">Nenhum registro foi encontrado</slot>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface IHeaders {
    label: string;
    value: string;
    columnSize?: string;
}

export interface TableProps {
    headers: Array<IHeaders>;
    items?: Array<any>;
}

const props = withDefaults(defineProps<TableProps>(), {});

defineEmits(['selectedRow']);

const rows = computed(() => {
    return props.items ? props.items : [];
});
const columns = computed(() => {
    return props.headers.map(({ value }) => {
        return value;
    });
});
</script>

<style scoped lang="scss">
table {
    @apply border-collapse w-full;
}

.table-responsive {
    @apply overflow-x-scroll sm:overflow-x-auto;
}

.fb-table {
    tbody {
        @apply align-top;
    }
    &__tr-head {
        @apply text-primary;
    }
    &__title {
        @apply text-sm font-bold text-left p-6;
    }
    &__table-value {
        @apply border-t border-t-zinc-200 text-sm text-secundary font-semibold p-6;
    }

    &__no-register {
        @apply border-t border-t-zinc-200 text-sm text-center text-zinc-400 font-semibold p-6;
    }
}
</style>
