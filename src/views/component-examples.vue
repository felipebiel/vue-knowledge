<template>
    <div class="component-examples">
        <fb-title-bar class="mb-4">
            <template v-slot:left>Botões</template>
        </fb-title-bar>
        <fb-title-bar class="mb-4" title-type="subtitle">
            <template v-slot:left>Variantes</template>
        </fb-title-bar>
        <div class="flex gap-2">
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
        <div class="flex gap-2">
            <fb-button size="lg">Meu botão</fb-button>
            <fb-button>Meu botão</fb-button>
            <fb-button size="sm">Meu botão</fb-button>
            <fb-button size="xs"> Meu botão </fb-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import FbTitleBar from '@/components/ui/fb-title-bar.vue';
import FbButton from '@/components/ui/fb-button.vue';
</script>

<style scoped></style>
