<template>
    <transition name="modal-animation">
        <Teleport to="body">
            <div class="fb-modal" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
                <div :class="{ 'fb-modal__overlay': isOpen }" :style="{ transitionDuration: `${speed}ms` }"></div>
                <transition name="modal-inner">
                    <div v-if="isOpen" class="fb-modal__content">
                        <div class="fb-modal__header">
                            <a class="fb-modal__close-modal" @click="close()">
                                <span class="material-icons-outlined"> close </span>
                            </a>
                            <slot name="header">Atenção</slot>
                        </div>

                        <div class="fb-modal__body" :class="{ 'padding-body': paddingBody }">
                            <slot name="body"> default body </slot>
                        </div>

                        <div class="fb-modal__footer" v-if="showFooter">
                            <slot name="footer">
                                <fb-button @click="close()">OK</fb-button>
                            </slot>
                        </div>
                    </div>
                </transition>
            </div>
        </Teleport>
    </transition>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import FbButton from './fb-button.vue';
export interface ModalProps {
    isOpen: boolean;
    showFooter?: boolean;
    width?: string;
    paddingBody?: boolean;
    speed?: number;
}
const props = withDefaults(defineProps<ModalProps>(), { isOpen: false, width: '800px', showFooter: true, paddingBody: true, speed: 1500 });
const emit = defineEmits(['close']);

const isVisible = ref<boolean>(false);

onMounted(() => {
    isVisible.value = props.isOpen;
});

watch(
    () => props.isOpen,
    (val) => {
        if (val) {
            isVisible.value = true;
        } else {
            setTimeout(() => (isVisible.value = false), props.speed);
        }
    },
);

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
.fb-modal {
    @apply h-screen w-screen fixed top-0 left-0 invisible z-[1401] overflow-x-hidden overflow-y-auto flex justify-center items-center;

    &.is-visible {
        @apply visible;
    }

    &.is-open {
        .fb-modal__overlay {
            @apply opacity-40;
        }
    }

    &__overlay {
        @apply fixed inset-0 w-full bg-black select-none;
        transition-duration: v-bind(speed) 'ms';
    }

    &__content {
        @apply relative  mx-auto w-full z-[1401] overflow-auto flex flex-col shadow-overlayer-content rounded-3xl bg-white;
        width: v-bind(width);
        @media screen and (max-width: 992px) {
            width: v-bind(mobileWidth);
        }
    }

    &__header {
        @apply px-5 pt-5 pb-0 z-[1401] text-primary text-center text-xl font-semibold;
    }

    &__close-modal {
        @apply absolute top-4 right-0 mr-6 rounded-full z-[1601] cursor-pointer;
    }

    &__body {
        @apply flex flex-col flex-1;
        &.padding-body {
            @apply p-10;
        }
    }
    &__footer {
        @apply p-5;
    }
}

// CSS PARA ANIMAÇÃO DO TRANSITION
.modal-animation-enter-active,
.modal-animation-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
    opacity: 0;
}

.modal-inner-leave-to {
    opacity: 0;
    transform: scale(1);
}

.modal-inner-enter-active {
    animation: transition-open-close 0.3s;
}
.modal-inner-leave-active {
    animation: transition-open-close 0.3s reverse;
}
@keyframes transition-open-close {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
