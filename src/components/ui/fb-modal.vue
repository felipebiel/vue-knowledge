<template>
    <Teleport to="body">
        <div class="fb-modal" :class="{ 'is-open': isOpen, 'is-visible': isVisible }" @click="close">
            <div :class="{ 'fb-modal__overlay': isOpen }" :style="{ transitionDuration: `${speed}s` }"></div>
            <transition name="modal-inner" @enter="enterAnimation" @leave="leaveAnimation">
                <div v-if="isOpen" class="fb-modal__content" :class="sizeComputed" @click.stop>
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
                            <fb-button @click="close()">OK</fb-button>
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
const emit = defineEmits(['close']);

const classesSizes = {
    xs: 'w-96',
    sm: 'w-[512px]',
    md: 'w-[672px]',
    lg: 'w-[768px]',
    full: 'w-full h-screen rounded-none',
};

const sizeComputed = computed(() => {
    return twMerge(
        'relative  mx-auto z-[1401] overflow-auto flex flex-col shadow-overlayer-content rounded-3xl bg-white',
        classesSizes[props.size],
    );
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

// const mobileView = (value: string): string => {
//     if (value == 'auto') return value;
//     if (~value.indexOf('%')) return value; // retornar valor boleano
//     let val: number = parseInt(value.split('px')[0]);
//     let number: number = 0;
//     if (val > 0 && val <= 800) return '90%';
//     else if (val >= 800) number = val * 0.6;
//     val = val - number;
//     return `${val}px`;
// };

// const mobileWidth = mobileView(props.width);
interface AnimationOject {
    initial: GSAPTweenVars;
    enter: GSAPTweenVars;
    leave: GSAPTweenVars;
}
const animations: { [key: string]: AnimationOject } = {
    scale: {
        initial: { opacity: 0, scale: 0.8 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0.8 },
    },
    fadeIn: {
        initial: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    },
    dropIn: {
        initial: { y: '-100vh', opacity: 0 },
        enter: { y: '0', opacity: 1 },
        leave: { y: '-100vh', opacity: 0 },
    },
    flip: {
        initial: { scale: 0, rotateX: '-360deg', opacity: 0 },
        enter: { scale: 1, rotateX: '0deg', opacity: 1 },
        leave: { scale: 0, rotateX: '-360deg', opacity: 0 },
    },
    newspaper: {
        initial: { scale: 0, rotate: '720deg', opacity: 0 },
        enter: { scale: 1, rotate: '0deg', opacity: 1 },
        leave: { scale: 0, rotate: '-720deg', opacity: 0 },
    },
};

const timeline = gsap.timeline();
const enterAnimation = (el: Element, done: () => void) => {
    timeline.fromTo(el, animations[props.animation].initial, {
        ...animations[props.animation].enter,
        duration: props.speed,
        onComplete: done,
    });
};

const leaveAnimation = (el: Element, done: () => void) => {
    timeline.to(el, { ...animations[props.animation].leave, duration: props.speed, onComplete: done });
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

    &__content {
        /* @apply relative  mx-auto z-[1401] overflow-auto flex flex-col shadow-overlayer-content bg-white; */
        /* width: v-bind(width); */
        /* @media screen and (max-width: 992px) { */
        /* width: v-bind(mobileWidth); */
        /* } */
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
        @apply p-5 flex justify-between gap-3;
    }
}
</style>
