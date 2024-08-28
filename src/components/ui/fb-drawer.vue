<template>
    <Teleport to="body">
        <div class="fb-drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }" @click="close">
            <div :class="{ 'fb-drawer__overlay': isOpen }" :style="{ transitionDuration: `${speed}s` }"></div>
            <transition name="modal-inner" @enter="enterAnimation" @leave="leaveAnimation">
                <div v-if="isOpen" class="fb-drawer__content" :class="classesComputed" :style="{ width: customSize ?? '' }" @click.stop>
                    <div class="fb-drawer__header" v-if="showHeader">
                        <a class="fb-drawer__close-modal" @click="close()">
                            <span class="material-icons-outlined"> close </span>
                        </a>
                        <slot name="header">Atenção</slot>
                    </div>

                    <div class="fb-drawer__body" :class="{ 'padding-body': paddingBody }">
                        <slot name="body"> default body </slot>
                    </div>

                    <div class="fb-drawer__footer" v-if="showFooter">
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
import { animationsDrawer, positionDrawer, sizes } from '@/theme/constantes-theme';
import { twMerge } from 'tailwind-merge';
import { gsapAnimations } from '@/theme/gsap-animations';
import { toggleBackgroundScrolling } from '@/utils';

export interface ModalProps {
    isOpen: boolean;
    showFooter?: boolean;
    showHeader?: boolean;
    size?: (typeof sizes)[number] | 'full';
    customSize?: string;
    paddingBody?: boolean;
    speed?: number;
    position?: (typeof positionDrawer)[number];
}
const props = withDefaults(defineProps<ModalProps>(), {
    isOpen: false,
    size: 'md',
    showFooter: true,
    showHeader: true,
    paddingBody: true,
    speed: 0.5,
    position: 'right',
});
const emit = defineEmits(['close', 'confirm']);

const classesSizes = {
    xs: 'max-w-96',
    sm: 'max-w-[512px]',
    md: 'max-w-[672px]',
    lg: 'max-w-[768px]',
    full: 'max-w-full h-screen rounded-none',
};

const classesPositions = {
    right: 'top-0 right-0 bottom-0 rounded-tl-3xl rounded-bl-3xl',
    left: 'top-0 left-0 bottom-0 rounded-tr-3xl rounded-br-3xl',
};

const animationPositions: { [key: string]: (typeof animationsDrawer)[number] } = {
    right: 'tranlateRight',
    left: 'tranlateLeft',
};

const BASE_SIZE = 'fixed h-full w-full z-modal overflow-auto flex flex-col bg-white shadow-overlayer-content dark:bg-zinc-600';

const classesComputed = computed(() => {
    return twMerge(BASE_SIZE, classesPositions[props.position], classesSizes[props.size]);
});

const isVisible = ref<boolean>(false);

onMounted(() => {
    isVisible.value = props.isOpen;
});

watch(
    () => props.isOpen,
    (val) => {
        if (val) {
            toggleBackgroundScrolling(true);
            isVisible.value = true;
        } else {
            toggleBackgroundScrolling(false);
            setTimeout(() => (isVisible.value = false), props.speed * 1000);
        }
    },
);

const close = () => {
    emit('close', false);
};

const timeline = gsap.timeline();
const enterAnimation = (el: Element, done: () => void) => {
    timeline.fromTo(el, gsapAnimations[animationPositions[props.position]].initial, {
        ...gsapAnimations[animationPositions[props.position]].enter,
        duration: props.speed,
        onComplete: done,
    });
};

const leaveAnimation = (el: Element, done: () => void) => {
    timeline.to(el, { ...gsapAnimations[animationPositions[props.position]].leave, duration: props.speed, onComplete: done });
};
</script>

<style scoped lang="scss">
.fb-drawer {
    @apply h-screen w-screen fixed top-0 left-0 invisible z-[1401] overflow-x-hidden overflow-y-hidden flex justify-center items-center;

    &.is-visible {
        @apply visible;
    }

    &.is-open {
        .fb-drawer__overlay {
            @apply fixed inset-0 w-full bg-black select-none opacity-40;
        }
    }

    &__header {
        @apply px-5 pt-5 pb-0 z-[1401] text-primary dark:text-zinc-100 text-center text-xl font-semibold;
    }

    &__close-modal {
        @apply absolute top-4 right-0 mr-6 rounded-full z-[1601] cursor-pointer;
    }

    &__body {
        @apply flex flex-col flex-1 overflow-x-hidden overflow-y-auto;
        &.padding-body {
            @apply p-10;
        }
    }
    &__footer {
        @apply p-5 flex justify-center gap-6;
    }
}
</style>
