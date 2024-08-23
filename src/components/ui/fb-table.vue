<template>
    <div></div>
    <div class="table-responsive">
        <table id="fb-table">
            <thead>
                <tr class="tr-head">
                    <th
                        class="title"
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
                        <td v-for="(col, index) in columns" :key="index" class="table-value">
                            <slot v-bind:item="row" :name="col">{{ row[col] }}</slot>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td :colspan="columns.length" class="no-register">
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

export interface TableProps {
    headers: Array<any>;
    items?: Array<any>;
}

const props = withDefaults(defineProps<TableProps>(), {});

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

#fb-table tbody {
    @apply align-top;
}
.tr-head {
    @apply text-primary;
}
.tr-head .title {
    @apply text-sm font-bold text-left p-6;
    /* font-size: 13px;
    font-weight: bold;
    text-align: left;
    padding: 1rem /* 24px */
}
.table-value {
    @apply border-t border-t-zinc-200 text-sm text-secundary font-semibold p-6;
}

.no-register {
    @apply border-t border-t-zinc-200 text-sm text-center text-zinc-400 font-semibold p-6;
}

.table-responsive {
    @apply overflow-x-scroll sm:overflow-x-auto;
    /* @media screen and (max-width: 767px) {
        overflow-x: scroll;
    } */
}
</style>
