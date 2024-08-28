import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import FbTable from '@/components/ui/fb-table.vue';

const headersTable = [
    { label: 'Nome', value: 'name' },
    { label: 'Preço', value: 'price' },
    { label: 'Pagamento', value: 'payment' },
    { label: 'Status', value: 'status' },
];
const tableData = [
    { name: 'Felipe', price: '1250,50', payment: 'Cartão', status: 'Pendente' },
    { name: 'Davi', price: '830,50', payment: 'Debito', status: 'Pago' },
    { name: 'Gustavo', price: '2,50', payment: 'Cartão', status: 'Pago' },
    { name: 'Arthur', price: '35,00', payment: 'Dinheiro', status: 'Cancelado' },
    { name: 'Jonas', price: '98,25', payment: 'PIX', status: 'Estornado' },
    { name: 'Vilmar', price: '5531,96', payment: 'Vale', status: 'Pendente' },
];
const dictStatus = {
    Pendente: 'bg-orange-500',
    Pago: 'bg-green-500',
    Cancelado: 'bg-red-500',
    Estornado: 'bg-zinc-500',
};

const meta = {
    title: 'UI/Table',
    component: FbTable,
    tags: ['autodocs'],
    args: {
        headers: headersTable,
        items: tableData,
        onSelectedRow: fn(),
    },
} satisfies Meta<typeof FbTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoRegister: Story = {
    args: {
        items: [],
    },
};

export const ColumnSize: Story = {
    args: {
        headers: headersTable.map((el) => {
            return { ...el, columnSize: '50%' };
        }),
    },
};

export const CustomSlots: Story = {
    render: (args) => ({
        components: { FbTable },
        setup() {
            return { args, self: { dictStatus: dictStatus } };
        },
        template: `
        <fb-table v-bind="args">
            <template v-slot:header-price> <p class="font-bold text-red-800">Troquei o preço</p> </template>
            <template v-slot:price="{ item }"> R$ {{ item.price }} </template>
            <template v-slot:payment="{ item }">
                <p class="font-bold text-primary">{{ item.payment }}</p>
            </template>
            <template v-slot:status="{ item }">
                <div
                    class="px-4 py-1 rounded-full text-white w-fit"
                    :class="self.dictStatus[item.status]"
                    size="small"
                    rounded
                >
                    {{ item.status }}
                </div>
            </template>
      </fb-table>`,
    }),
    decorators: [() => ({ template: '<div ><story /></div>' })],
};
