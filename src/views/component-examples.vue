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

        <fb-card>
            <fb-title-bar class="mb-4">
                <template v-slot:left>Modals</template>
            </fb-title-bar>
            <fb-title-bar class="mb-4" title-type="subtitle">
                <template v-slot:left>Simples</template>
            </fb-title-bar>

            <fb-button @click="openModal('simple')">Abrir Modal</fb-button>
            <fb-title-bar class="my-4" title-type="subtitle">
                <template v-slot:left>Animações</template>
            </fb-title-bar>
            <div class="flex flex-wrap gap-2">
                <fb-button @click="openModal('simple')">Scale</fb-button>
                <fb-button @click="openModal('scale-long')">Scale speed 1.5s</fb-button>
                <fb-button @click="openModal('fadeIn')">fadeIn</fb-button>
                <fb-button @click="openModal('dropIn')">dropIn</fb-button>
                <fb-button @click="openModal('flip')">flip</fb-button>
                <fb-button @click="openModal('newspaper')">newspaper</fb-button>
            </div>

            <fb-title-bar class="my-4" title-type="subtitle">
                <template v-slot:left>Tamanhos</template>
            </fb-title-bar>
            <div class="flex flex-wrap gap-2">
                <fb-button @click="openModal('size-xs')">xs</fb-button>
                <fb-button @click="openModal('size-sm')">sm</fb-button>
                <fb-button @click="openModal('size-md')">md</fb-button>
                <fb-button @click="openModal('size-lg')">lg</fb-button>
                <fb-button @click="openModal('size-full')">full</fb-button>
                <fb-button @click="openModal('size-custom')">Custom 900px</fb-button>
            </div>

            <fb-modal
                :size="modalExamples[self.modalSelected].size"
                :speed="modalExamples[self.modalSelected].speed"
                :animation="modalExamples[self.modalSelected].animation"
                :customSize="modalExamples[self.modalSelected].customSize"
                :isOpen="self.showModal"
                @close="self.showModal = false"
            >
                <template v-slot:header>Todos os registros</template>
                <template v-slot:body>
                    <fb-table :items="self.tableData" :headers="self.headersTable"></fb-table>
                </template>
            </fb-modal>
        </fb-card>

        <fb-card>
            <fb-title-bar class="mb-4">
                <template v-slot:left>Drawer</template>
            </fb-title-bar>
            <fb-title-bar class="mb-4" title-type="subtitle">
                <template v-slot:left>Simples</template>
            </fb-title-bar>

            <fb-button @click="openDrawer('simple')">Abrir Drawer</fb-button>

            <fb-title-bar class="my-4" title-type="subtitle">
                <template v-slot:left>Tamanhos</template>
            </fb-title-bar>
            <div class="flex flex-wrap gap-2">
                <fb-button @click="openDrawer('size-xs')">xs</fb-button>
                <fb-button @click="openDrawer('size-sm')">sm</fb-button>
                <fb-button @click="openDrawer('size-md')">md</fb-button>
                <fb-button @click="openDrawer('size-lg')">lg</fb-button>
                <fb-button @click="openDrawer('size-full')">full</fb-button>
                <fb-button @click="openDrawer('size-custom')">Custom 900px</fb-button>
            </div>

            <fb-title-bar class="my-4" title-type="subtitle">
                <template v-slot:left>Posição da abertura</template>
            </fb-title-bar>
            <div class="flex flex-wrap gap-2">
                <fb-button @click="openDrawer('simple')">Direita</fb-button>
                <fb-button @click="openDrawer('position-left')">Esquerda</fb-button>
            </div>

            <fb-drawer
                :size="drawerExamples[self.drawerSelected].size"
                :speed="drawerExamples[self.drawerSelected].speed"
                :position="drawerExamples[self.drawerSelected].position"
                :customSize="drawerExamples[self.drawerSelected].customSize"
                :isOpen="self.showDrawer"
                @close="self.showDrawer = false"
            >
                <template v-slot:header>Todos os registros</template>
                <template v-slot:body>
                    <div v-for="item in 10" :key="item">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, sapiente! Magnam, voluptate beatae? Fugiat adipisci,
                        rem dolorum possimus veniam deserunt id dolores nisi ducimus unde eligendi voluptate a accusamus sapiente?
                    </div>
                </template>
            </fb-drawer>
        </fb-card>
    </div>
</template>

<script setup lang="ts">
import FbTitleBar from '@/components/ui/fb-title-bar.vue';
import FbButton from '@/components/ui/fb-button.vue';
import FbTable from '@/components/ui/fb-table.vue';
import FbCard from '@/components/ui/fb-card.vue';
import FbModal from '@/components/ui/fb-modal.vue';
import FbDrawer from '@/components/ui/fb-drawer.vue';

import { reactive } from 'vue';
import { animationsModal, positionDrawer, sizes } from '@/theme/constantes-theme';

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
    showModal: false,
    showDrawer: false,
    modalSelected: 'simple',
    drawerSelected: 'simple',
});

const modalExamples: {
    [key: string]: {
        speed: number;
        animation: (typeof animationsModal)[number];
        size: (typeof sizes)[number] | 'full';
        customSize?: string;
    };
} = {
    simple: { speed: 0.5, animation: 'scale', size: 'md' },
    'scale-long': { speed: 1.5, animation: 'scale', size: 'md' },
    fadeIn: { speed: 0.5, animation: 'fadeIn', size: 'md' },
    dropIn: { speed: 0.5, animation: 'dropIn', size: 'md' },
    flip: { speed: 0.5, animation: 'flip', size: 'md' },
    newspaper: { speed: 0.5, animation: 'newspaper', size: 'md' },
    'size-xs': { speed: 0.5, animation: 'scale', size: 'xs' },
    'size-sm': { speed: 0.5, animation: 'scale', size: 'sm' },
    'size-md': { speed: 0.5, animation: 'scale', size: 'md' },
    'size-lg': { speed: 0.5, animation: 'scale', size: 'lg' },
    'size-full': { speed: 0.5, animation: 'scale', size: 'full' },
    'size-custom': { speed: 0.5, animation: 'scale', size: 'md', customSize: '900px' },
};

const openModal = (modalSelected: string) => {
    self.modalSelected = modalSelected;
    self.showModal = true;
};

const drawerExamples: {
    [key: string]: {
        speed: number;
        position: (typeof positionDrawer)[number];
        size: (typeof sizes)[number] | 'full';
        customSize?: string;
    };
} = {
    simple: { speed: 0.5, position: 'right', size: 'md' },
    'size-xs': { speed: 0.5, position: 'right', size: 'xs' },
    'size-sm': { speed: 0.5, position: 'right', size: 'sm' },
    'size-md': { speed: 0.5, position: 'right', size: 'md' },
    'size-lg': { speed: 0.5, position: 'right', size: 'lg' },
    'size-full': { speed: 0.5, position: 'right', size: 'full' },
    'size-custom': { speed: 0.5, position: 'right', size: 'md', customSize: '900px' },
    'position-left': { speed: 0.5, position: 'left', size: 'md' },
};

const openDrawer = (drawerSelected: string) => {
    self.drawerSelected = drawerSelected;
    self.showDrawer = true;
};
</script>

<style scoped></style>
