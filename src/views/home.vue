<template>
    <div class="home">
        <div class="relative w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            <fb-card-info numbers="2,352" title="Visualizações" icon="visibility" :truncateSize="5"></fb-card-info>
            <fb-card-info numbers="80" title="Vendas" icon="shopping_cart" :truncateSize="5"></fb-card-info>
            <fb-card-info numbers="1,381" title="Comentários" icon="question_answer" :truncateSize="5"></fb-card-info>
            <fb-card-info numbers="$80548,36" title="Renda" icon="paid" :truncateSize="5"></fb-card-info>
        </div>
    </div>
</template>

<script setup lang="ts">
import FbCardInfo from '@/components/ui/fb-card-info.vue';
</script>

<style scoped></style>
