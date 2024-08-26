<template>
    <transition name="custom-classes-transition">
        <Teleport to="body">
            <div id="modal" class="modal-mask" v-if="show" transition="modal">
                <div class="modal-wrapper">
                    <div class="modal-header">
                        <a class="close-modal" @click="close()">
                            <span class="material-icons-outlined"> close </span>
                        </a>
                        <p class="header"><slot name="header">Atenção</slot></p>
                    </div>
                    <div class="modal-container">
                        <div class="modal-body" :class="{ 'padding-body': paddingBody }">
                            <slot name="body"> default body </slot>
                        </div>
                    </div>
                    <div class="modal-footer" v-if="showFooter">
                        <slot name="footer">
                            <fb-button @click="close()">OK</fb-button>
                        </slot>
                    </div>
                </div>
            </div>
        </Teleport>
    </transition>
</template>

<script setup lang="ts">
import FbButton from './fb-button.vue';
export interface ModalProps {
    show: boolean;
    showFooter?: boolean;
    width?: string;
    paddingBody?: boolean;
}
const props = withDefaults(defineProps<ModalProps>(), { width: '800px', showFooter: true, paddingBody: true });
const emit = defineEmits(['close']);

const close = () => {
    emit('close', false);
};

const mobileView = (value: string): string => {
    if (value == 'auto') return value;
    if (~value.indexOf('%')) return value; // retornar valor boleano
    let val: number = parseInt(value.split('px')[0]);
    let number: number = 0;
    if (val > 0 && val < 800) number = val * 0.4;
    else if (val >= 800) number = val * 0.6;
    val = val - number;
    return `${val}px`;
};

const mobileWidth = mobileView(props.width);
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: center;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.close-modal {
    position: absolute;
    right: 20px;
    margin-top: 4px;
    font-size: 20px;
    cursor: pointer;
    font-weight: 600;
}
.modal-container {
    width: v-bind(width);
    height: 'auto';
    margin: 0px auto;
    background-color: $white;
    /* overflow-y: var(--scrollable); */
    max-height: 'auto';
}
.modal-container::-webkit-scrollbar {
    width: 10px; /* width of the entire scrollbar */
}
.modal-container::-webkit-scrollbar-track {
    background: $white; /* color of the tracking area */
}

.modal-container::-webkit-scrollbar-thumb {
    background-color: #dbdbdb; /* color of the scroll thumb */
    border-radius: 10px; /* roundness of the scroll thumb */
    border: 3px solid $white; /* creates padding around scroll thumb */
}
.modal-header {
    margin: 0px auto;
    width: v-bind(width);
    margin-top: 0;
    border-radius: 20px 20px 0px 0px;
    background-color: white !important;
    padding: 1.25rem /* 20px */;
    font-size: 20px;
    color: $primary-color;
    font-weight: 600;
    position: relative;
}

.modal-body.padding-body {
    padding: 2.75rem /* 44px */;
}
.modal-footer {
    margin: 0px auto;
    width: v-bind(width);
    background-color: $white !important;
    padding: 10px;
    border-radius: 2px;
    border-radius: 0px 0px 20px 20px;
    text-align: var(--footerPositionItens);
    // border-top: 1px solid $text-secundary;
    padding: 1.5rem /* 24px */;
}

.close-btn .material-icons-outlined {
    color: $primary-color;
}
.modal-enter,
.modal-leave {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
@media screen and (max-width: 992px) {
    .modal-header {
        width: v-bind(mobileWidth);
    }
    .modal-container {
        width: v-bind(mobileWidth);
        /* max-height: var(--mobHeight); */
    }
    .modal-footer {
        width: v-bind(mobileWidth);
    }
}
</style>
