<template>
    <Teleport to="body">
        <div class="fb-modal" :class="{ 'is-open': isOpen, 'is-visible': isVisible }" @click="close">
            <div :class="{ 'fb-modal__overlay': isOpen }" :style="{ transitionDuration: `${speed}s` }"></div>
            <transition name="modal-inner" @enter="enterAnimation" @leave="leaveAnimation">
                <div v-if="isOpen" class="fb-modal__content" :class="sizeComputed" :style="{ width: customSize ?? '' }" @click.stop>
                    <div class="fb-modal__header" v-if="showHeader">
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
                            <fb-button variant="primary-outline" @click="close()">Cancelar</fb-button>
                            <fb-button @click="$emit('confirm')">Confirmar</fb-button>
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import FbButton from './fb-button.vue';
import gsap from 'gsap';
import { animationsModal, sizes } from '@/theme/constantes-theme';
import { twMerge } from 'tailwind-merge';
import { gsapAnimations } from '@/theme/gsap-animations';

export interface ModalProps {
    isOpen: boolean;
    showFooter?: boolean;
    showHeader?: boolean;
    size?: (typeof sizes)[number] | 'full';
    customSize?: string;
    paddingBody?: boolean;
    speed?: number;
    animation?: (typeof animationsModal)[number];
}
const props = withDefaults(defineProps<ModalProps>(), {
    isOpen: false,
    size: 'md',
    showFooter: true,
    showHeader: true,
    paddingBody: true,
    speed: 0.5,
    animation: 'scale',
});
const emit = defineEmits(['close', 'confirm']);

const classesSizes = {
    xs: 'w-96',
    sm: 'w-[512px]',
    md: 'w-[672px]',
    lg: 'w-[768px]',
    full: 'w-full h-screen rounded-none',
};

const BASE_SIZE = 'relative  mx-auto z-[1401] overflow-auto flex flex-col shadow-overlayer-content rounded-3xl bg-white';

const sizeComputed = computed(() => {
    return twMerge(BASE_SIZE, classesSizes[props.size]);
});

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
            setTimeout(() => (isVisible.value = false), props.speed * 1000);
        }
    },
);

const close = () => {
    emit('close', false);
};

const timeline = gsap.timeline();
const enterAnimation = (el: Element, done: () => void) => {
    timeline.fromTo(el, gsapAnimations[props.animation].initial, {
        ...gsapAnimations[props.animation].enter,
        duration: props.speed,
        onComplete: done,
    });
};

const leaveAnimation = (el: Element, done: () => void) => {
    timeline.to(el, { ...gsapAnimations[props.animation].leave, duration: props.speed, onComplete: done });
};
</script>

<style scoped lang="scss">
.fb-modal {
    @apply h-screen w-screen fixed top-0 left-0 invisible z-[1401] overflow-x-hidden overflow-y-hidden flex justify-center items-center;

    &.is-visible {
        @apply visible;
    }

    &.is-open {
        .fb-modal__overlay {
            @apply fixed inset-0 w-full bg-black select-none opacity-40;
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
        @apply p-5 flex justify-center gap-6;
    }
}
</style>
