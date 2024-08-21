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
                <apexchart width="100%" type="pie" ref="languagesChart" :options="optionsLanguages" :series="seriesLanguages"></apexchart>
            </fb-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import FbCardInfo from '@/components/ui/fb-card-info.vue';
import FbCard from '@/components/ui/fb-card.vue';
import FbTitleBar from '@/components/ui/fb-title-bar.vue';
import { getRepositoryLanguages } from '@/services/api/github';
import { getKeysAndValues } from '@/utils';

import { onMounted, ref } from 'vue';
import { VueApexChartsComponent } from 'vue3-apexcharts';

interface ChartConfig {
    chart?: {
        id?: string;
    };
    labels?: string[];
}

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

// languages chart logic
const languagesChart = ref<VueApexChartsComponent>();

const optionsLanguages = ref<Partial<ChartConfig>>({
    chart: {
        id: 'languages-by-year',
    },
    labels: [],
});
const seriesLanguages = ref<Array<Number>>([]);

const prepareLanguagesChart = async () => {
    try {
        const languages = await getRepositoryLanguages();
        const { keys, values } = getKeysAndValues(languages);
        optionsLanguages.value.labels = keys;
        seriesLanguages.value = values;
        languagesChart.value?.updateOptions(optionsLanguages.value);
        languagesChart.value?.updateSeries(seriesLanguages.value);
    } catch (error) {}
};

onMounted(async () => {
    prepareLanguagesChart();
});

//
</script>

<style scoped></style>
