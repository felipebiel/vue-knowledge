<template>
    <div class="fb-input" :class="{ 'padding-bottom-input': !noPadding }">
        <div v-if="label.trim().length" class="label-input flex items-center justify-between mb-1">
            <p class="font-semibold text-grayscale-500 flex items-center">
                {{ label }}
            </p>
        </div>
        <!-- <div class="input-component" :style="!!slots['left-item'] ? 'position: relative; z-index: 20 !important' : ''"> -->
        <div class="input-component">
            <div class="relative flex">
                <!-- <div v-if="leftIconName" class="flex items-center justify-center absolute w-12 h-12 z-[2] left-0 top-0">
                    <BfIcon class="left-icon" :name="leftIconName" :color="leftIconColor" :size="sizeIcon" />
                </div>

                <div class="w-32" v-if="!!slots['left-item']">
                    <slot v-if="!!slots['left-item']" name="left-item"></slot>
                </div> -->

                <input
                    :id="idInput"
                    :placeholder="placeholderText"
                    :disabled="isDisabled"
                    :type="fieldType"
                    v-model="model"
                    v-on:keyup.enter="$emit('enter', true)"
                    @blur="$emit('onblur')"
                />

                <!-- <template v-if="isLoading">
                    <div class="flex items-center justify-center absolute w-12 h-12 z-[2] right-0 top-0 transition duration-300">
                        <BfSpinner class="loading-icon" size="md" /> 
                    </div>
                </template> -->
                <!-- <template v-else>
                    <div
                        v-if="rightIconName && !showVisibility"
                        class="flex items-center justify-center absolute w-12 h-12 z-[2] right-0 top-0"
                    >
                        <BfIcon class="right-icon" :name="rightIconName" :color="rightIconColor" :size="sizeIcon" />
                    </div>

                    <div v-if="showVisibility" class="flex items-center justify-center absolute w-12 h-12 z-[2] right-0 top-0">
                        <span @click="switchVisibility()">
                            <BfIcon class="left-icon cursor-pointer" :name="iconVisibility" :color="leftIconColor" :size="sizeIcon" />
                        </span>
                    </div>
                    <div
                        v-if="(showCleanField && value.length) || ((calendar || rangeDate) && value && value.length)"
                        class="flex items-center justify-center absolute w-12 h-12 z-[2] right-0 top-0"
                    >
                        <span @click="cleanInput">
                            <BfIcon
                                class="right-icon text-neutral-20 hover:text-neutral-40 cursor-pointer"
                                name="bf-close"
                                :size="sizeIcon"
                            />
                        </span>
                    </div>
                </template> -->
            </div>
        </div>
        <!-- <transition
            name="custom-classes-transition"
            enter-active-class="animate__animated animate__faster animate__fadeIn"
            leave-active-class="animate__animated animate__faster animate__fadeOut"
        >
            <BfText
                variant="p3"
                class="pl-4 font-normal mt-1 absolute text-status-red-900"
                :class="[noPadding ? 'mb-1' : 'mb-0']"
                v-if="showError"
            >
                {{ messageError }}
            </BfText>
            <BfText
                variant="p3"
                class="pl-4 font-normal mt-1 absolute"
                :class="[isDisabled ? 'text-grayscale-500' : 'text-grayscale-400']"
                v-if="showHelperText"
                position="absolute"
            >
                {{ helperText }}
            </BfText>
        </transition> -->
    </div>
</template>

<script setup lang="ts">
import { InputTypeHTMLAttribute } from 'vue';

export interface inputProps {
    label?: string;
    placeholderText?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isLoading?: boolean;
    modelValue?: string | number;
    maxLength?: boolean | number;
    valid?: boolean;
    validOnlyTouch?: boolean;
    showRequiredError?: boolean;
    rules?: object;
    fieldType?: InputTypeHTMLAttribute;
    noPadding?: boolean;
    textAlignInput?: 'left' | 'center' | 'right';
    idInput: string;
    nameInput: string;
    showCleanField?: boolean;
    showVisibility?: boolean;
    // calendar: {
    //     type: Boolean,
    //     default: false,
    // },
    // rangeDate: {
    //     type: Boolean,
    //     default: false,
    // },
    // minDate: {
    //     type: String,
    //     default: '',
    // },
    // maxDate: {
    //     type: String,
    //     default: '',
    // },
    // configCalendar: {
    //     type: Object,
    //     default: () => {
    //         return {
    //             monthSelectorType: 'dropdown',
    //             allowInput: true,
    //             altFormat: 'd/m/Y',
    //             dateFormat: 'd/m/Y',
    //             locale: { ...Portuguese, rangeSeparator: ' a ' },
    //             mode: 'single',
    //             minDate: '',
    //             maxDate: '',
    //         };
    //     },
    // },
    // revalidate: {
    //     type: Boolean;
    //     default: false;
    // };
}

const props = withDefaults(defineProps<inputProps>(), {
    label: '',
    isDisabled: false,
    isReadOnly: false,
    isLoading: false,
    maxLength: false,
    valid: false,
    validOnlyTouch: false,
    showRequiredError: false,
    // rules: {},
    fieldType: 'text',
    noPadding: false,
    textAlignInput: 'left',
    showCleanField: false,
    showVisibility: false,
});
const emit = defineEmits(['input', 'update:modelValue', 'enter', 'onblur']);

// const model = defineModel('modelValue', {
//     set(modelValue) {
//         emit('input', modelValue);
//     },
//     get() {
//         return props.modelValue;
//     },
// });

const model = defineModel({
    set(modelValue) {
        return modelValue;
    },
    get() {
        return props.modelValue;
    },
});
</script>

<style scoped lang="scss">
.fb-input {
    @apply relative;

    &.padding-bottom-input {
        @apply pb-8;
    }

    input {
        @apply w-full;
        text-align: v-bind(textAlignInput);

        &:disabled {
            // @apply bg-neutral-0;
        }
    }
}
</style>
