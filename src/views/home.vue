<template>
    <div class="home">
        <div class="relative w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <fb-card-info numbers="2,352" title="Visualizações" icon="visibility" :truncateSize="5"></fb-card-info>
            <fb-card-info numbers="80" title="Vendas" icon="shopping_cart" :truncateSize="5"></fb-card-info>
            <fb-card-info numbers="1,381" title="Comentários" icon="question_answer" :truncateSize="5"></fb-card-info>
            <fb-card-info numbers="$80548,36" title="Renda" icon="paid" :truncateSize="5"></fb-card-info>
        </div>
        <div class="mt-5 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <fb-card>
                <fb-title-bar>
                    <template v-slot:left>Visualizações por ano</template>
                </fb-title-bar>
                <apexchart width="100%" type="bar" :options="options" :series="series"></apexchart>
            </fb-card>

            <fb-card>
                <fb-title-bar>
                    <template v-slot:left>Linguagem deste repositório</template>
                </fb-title-bar>
                <apexchart width="100%" type="pie" :options="optionsPie" :series="seriesPie"></apexchart>
            </fb-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import FbCardInfo from '@/components/ui/fb-card-info.vue';
import FbCard from '@/components/ui/fb-card.vue';
import FbTitleBar from '@/components/ui/fb-title-bar.vue';

import { ref } from 'vue';

const options = ref<Object>({
    chart: {
        id: 'views-by-year',
    },
    xaxis: {
        categories: ['2019', '2020', '2021', '2022', '2023'],
    },
});
const series = ref<Array<Object>>([
    {
        name: 'Visualizações',
        data: [1200, 1500, 1800, 2300, 2900],
    },
]);

const optionsPie = ref<Object>({
    chart: {
        id: 'languages-by-year',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
});
const seriesPie = ref<Array<Number>>([44, 55, 13, 43, 22]);
</script>

<style scoped></style>
