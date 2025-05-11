<template>
    <div class="toast" :class="toastClasses" role="alert" @click="closeOnClick && hideToast()">
        <div v-if="props.showProgress" class="toast-progress" :style="progressStyle"></div>
        <div class="toast-content">
            <span v-if="props.icon" class="toast-icon" :class="iconClasses"></span>
            <span class="toast-message">{{ props.message }}</span>
            <i v-if="props.showClose" @click="hideToast" class="m-cross1 toast-close" title="Stop Notification"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface Props {
    message: string
    type?: 'success' | 'error' | 'info'
    duration?: number
    visible: boolean
    position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'
    transition?: 'slide' | 'fade' | 'bounce'
    icon?: boolean
    showClose?: boolean
    showProgress?: boolean
    closeOnClick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'success',
    duration: 5000,
    visible: false,
    position: 'bottom-right',
    transition: 'slide',
    icon: true,
    showClose: true,
    showProgress: true,
    closeOnClick: false
})

const isVisible = ref(props.visible)
const progress = ref(100)
let timeoutId: NodeJS.Timeout | null = null
let progressInterval: NodeJS.Timeout | null = null

const toastClasses = computed(() => ({
    'toast--success': props.type === 'success',
    'toast--error': props.type === 'error',
    'toast--info': props.type === 'info',
    [`toast--${props.position}`]: true,
    [`toast--transition-${props.transition}`]: true,
    'toast--hidden': !isVisible.value
}))

const iconClasses = computed(() => ({
    'icon-success': props.type === 'success',
    'icon-error': props.type === 'error',
    'icon-info': props.type === 'info'
}))

const progressStyle = computed(() => ({
    width: `${progress.value}%`
}))

const hideToast = () => {
    isVisible.value = false
    if (timeoutId) clearTimeout(timeoutId)
    if (progressInterval) clearInterval(progressInterval)
}

const showToast = () => {
    if (props.message && props.visible) {
        isVisible.value = true
        progress.value = 100
        if (props.duration > 0) {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(hideToast, props.duration)

            if (props.showProgress) {
                const interval = 50
                const decrement = (100 / props.duration) * interval
                if (progressInterval) clearInterval(progressInterval)
                progressInterval = setInterval(() => {
                    progress.value = Math.max(0, progress.value - decrement)
                }, interval)
            }
        }
    } else {
        hideToast()
    }
}

// Watch for prop changes
watch(
    () => [props.visible, props.message, props.type, props.duration],
    () => {
        showToast()
    },
    { immediate: true }
)

// Clean up on unmount
onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId)
    if (progressInterval) clearInterval(progressInterval)
})
</script>

<style scoped lang="scss">
$color-success: #28a745;
$color-success-gradient: linear-gradient(135deg, #005c15, #005068);
$color-error: #dc3545;
$color-error-gradient: linear-gradient(135deg, #880815, #14006e);
$color-info: #17a2b8;
$color-info-gradient: linear-gradient(135deg, #005b69, #70004b);
$color-text: #ffffff;
$color-text-hover: #e0e0e0;
$color-shadow: rgba(0, 0, 0, 0.2);
$color-progress: #5e5e5e;
$border-radius: 0;
$padding: 0.3rem;
$font-size: 1rem;
$font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$shadow: 0 6px 16px $color-shadow;
$glow: 0 0 8px rgba(255, 255, 255, 0.3);
$transition-duration: 0.3s;
$transition-easing: cubic-bezier(0.4, 0, 0.2, 1);

.toast {
    position: fixed;
    width: 100%;
    border-radius: $border-radius;
    box-shadow: $shadow;
    font-family: $font-family;
    cursor: pointer;
    z-index: 3;

    &--success {
        background: $color-success-gradient;
    }

    &--error {
        background: $color-error-gradient;
    }

    &--info {
        background: $color-info-gradient;
    }

    &--top-right {
        top: 2rem;
        right: 0;
    }

    &--bottom-right {
        bottom: 0;
        right: 0;
    }

    &--top-left {
        top: 2rem;
        left: 0;
    }

    &--bottom-left {
        bottom: 0;
        left: 0;
    }

    &--transition-slide {
        transition: transform $transition-duration $transition-easing, opacity $transition-duration $transition-easing;
        transform: translateY(0);
        opacity: 1;

        &.toast--hidden {
            opacity: 0;
            transform: translateY(30px);
        }
    }

    &--transition-fade {
        transition: opacity $transition-duration $transition-easing;
        opacity: 1;

        &.toast--hidden {
            opacity: 0;
        }
    }

    &--transition-bounce {
        transition: transform $transition-duration $transition-easing, opacity $transition-duration $transition-easing;
        transform: scale(1);
        opacity: 1;

        &.toast--hidden {
            opacity: 0;
            transform: scale(0.8);
        }
    }
}

.toast-content {
    display: flex;
    align-items: center;
    padding: $padding;
    color: $color-text;
}

// .toast-icon {
//     width: 1.5rem;
//     height: 1.5rem;
//     margin-right: 0.8rem;
//     background-size: cover;

//     &.icon-success {
//         background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>');
//     }

//     &.icon-error {
//         background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>');
//     }

//     &.icon-info {
//         background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>');
//     }
// }

.toast-message {
    flex: 1;
    font-size: $font-size;
    text-align: center;
    padding: 0 1rem;
}

.toast-close {
    display: flex;
    text-align: left;
    height: 100%;
    border: none;
    color: $color-text;
    cursor: pointer;
    transition: color $transition-duration $transition-easing;

    &:hover {
        color: $color-text-hover;
        text-shadow: $glow;
    }
}

.toast-progress {
    position: absolute;
    height: 2px;
    top: -2px;
    background: $color-progress;
    transition: width $transition-duration linear;
}
</style>