<template>
    <div class="component-examples flex flex-col gap-5">
        <fb-card>
            <fb-title-bar class="mb-4">
                <template v-slot:left>Botões</template>
            </fb-title-bar>
            <fb-title-bar class="mb-4" title-type="subtitle">
                <template v-slot:left>Variantes</template>
            </fb-title-bar>
            <div class="flex flex-wrap gap-2">
                <fb-button>Meu botão</fb-button>
                <fb-button variant="primary-outline">Meu botão</fb-button>
                <fb-button variant="primary-link">Meu botão</fb-button>
                <fb-button variant="secundary">Meu botão</fb-button>
                <fb-button variant="secundary-link">Meu botão</fb-button>
                <fb-button>
                    <div class="material-icons">settings</div>
                    Com ícones
                    <div class="material-icons">check</div>
                </fb-button>
                <fb-button isDisabled>Desabilitado</fb-button>
                <fb-button isLoading>Carregando</fb-button>
            </div>

            <fb-title-bar class="my-4" title-type="subtitle">
                <template v-slot:left>Tamanhos</template>
            </fb-title-bar>
            <div class="flex flex-wrap gap-2">
                <fb-button size="lg">Meu botão</fb-button>
                <fb-button>Meu botão</fb-button>
                <fb-button size="sm">Meu botão</fb-button>
                <fb-button size="xs"> Meu botão </fb-button>
            </div>
            <fb-title-bar class="my-4" title-type="subtitle">
                <template v-slot:left>Customizado com tailwind</template>
            </fb-title-bar>
            <fb-button size="lg" class="bg-purple-800 italic hover:bg-purple-600 w-60 rounded-sm" @click="() => console.log('Ola mundo')"
                >Meu botão</fb-button
            >
        </fb-card>
        <fb-card>
            <fb-title-bar class="mb-4 mt-6">
                <template v-slot:left>Tabela</template>
            </fb-title-bar>
            <fb-title-bar class="mb-4" title-type="subtitle">
                <template v-slot:left>Simples</template>
            </fb-title-bar>

            <fb-table :items="self.tableData" :headers="self.headersTable"></fb-table>

            <fb-title-bar class="mb-4" title-type="subtitle">
                <template v-slot:left>Sem registros</template>
            </fb-title-bar>
            <fb-table :items="[]" :headers="self.headersTable"></fb-table>

            <fb-title-bar class="my-4" title-type="subtitle">
                <template v-slot:left>Customizando as colunas e cabeçalhos</template>
            </fb-title-bar>

            <fb-table :items="self.tableData" :headers="self.headersTable">
                <template v-slot:header-price> <p class="font-bold text-red-800">Troquei o preço</p> </template>
                <template v-slot:price="{ item }"> R$ {{ item.price }} </template>
                <template v-slot:payment="{ item }">
                    <p class="font-bold text-primary">{{ item.payment }}</p>
                </template>
                <template v-slot:status="{ item }">
                    <div
                        class="px-4 py-1 rounded-full text-white w-fit"
                        :class="(self.dictStatus as any)[item.status]"
                        size="small"
                        rounded
                    >
                        {{ item.status }}
                    </div>
                </template>
            </fb-table>
        </fb-card>
    </div>
</template>

<script setup lang="ts">
import FbTitleBar from '@/components/ui/fb-title-bar.vue';
import FbButton from '@/components/ui/fb-button.vue';
import FbTable from '@/components/ui/fb-table.vue';
import { reactive } from 'vue';
import FbCard from '@/components/ui/fb-card.vue';

const self = reactive({
    headersTable: [
        { label: 'Nome', value: 'name' },
        { label: 'Preço', value: 'price' },
        { label: 'Pagamento', value: 'payment' },
        { label: 'Status', value: 'status' },
    ],
    tableData: [
        { name: 'Felipe', price: '1250,50', payment: 'Cartão', status: 'Pendente' },
        { name: 'Davi', price: '830,50', payment: 'Debito', status: 'Pago' },
        { name: 'Gustavo', price: '2,50', payment: 'Cartão', status: 'Pago' },
        { name: 'Arthur', price: '35,00', payment: 'Dinheiro', status: 'Cancelado' },
        { name: 'Jonas', price: '98,25', payment: 'PIX', status: 'Estornado' },
        { name: 'Vilmar', price: '5531,96', payment: 'Vale', status: 'Pendente' },
    ],
    dictStatus: {
        Pendente: 'bg-orange-500',
        Pago: 'bg-green-500',
        Cancelado: 'bg-red-500',
        Estornado: 'bg-zinc-500',
    },
});
</script>

<style scoped></style>
