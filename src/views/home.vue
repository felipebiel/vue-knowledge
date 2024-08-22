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
                    <template v-slot:left>Dólar Americano/Real Brasileiro</template>
                </fb-title-bar>
                <apexchart width="100%" type="area" ref="priceQuotesChart" :options="optionsQuotes" :series="series"></apexchart>
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
import { getPriceQuotesUSDBRL } from '@/services/api/price-quotes';
import { getKeysAndValues } from '@/utils';

import { onMounted, ref } from 'vue';
import { VueApexChartsComponent } from 'vue3-apexcharts';
import moment from 'moment';
import { ApexOptions } from 'apexcharts';

// price quotes chart logic
const priceQuotesChart = ref<VueApexChartsComponent>();

const optionsQuotes = ref<ApexOptions>({
    chart: {
        id: 'views-by-year',
    },
    xaxis: {
        labels: {
            formatter: (value: any) => {
                return moment.unix(value).format('DD/MMM');
            },
        },
    },
    yaxis: {
        labels: {
            formatter: function (val: number) {
                return 'R$ ' + val.toFixed(2);
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 0,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
        },
    },
});
const series = ref<ApexAxisChartSeries>([]);

const preparePriceQuotesChart = async () => {
    try {
        const priceQuotes = await getPriceQuotesUSDBRL();
        const optionsCheck = optionsQuotes.value.xaxis;
        if (optionsCheck) optionsCheck.categories = priceQuotes.map((price) => price.timestamp);
        priceQuotesChart.value?.updateOptions(optionsQuotes.value);
        priceQuotesChart.value?.updateSeries([
            {
                name: 'Valor',
                data: priceQuotes.map((price) => price.ask),
            },
        ]);
    } catch (error) {}
};

// languages chart logic
const languagesChart = ref<VueApexChartsComponent>();

const optionsLanguages = ref<ApexOptions>({
    chart: {
        id: 'languages-by-year',
    },
    tooltip: {
        custom: ({ seriesIndex, w }) => {
            return '<p class="p-2">' + w.globals.labels[seriesIndex] + '</p>';
        },
    },
});
const seriesLanguages = ref<ApexNonAxisChartSeries>([]);

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
    preparePriceQuotesChart();
    prepareLanguagesChart();
});

//
</script>

<style scoped></style>
