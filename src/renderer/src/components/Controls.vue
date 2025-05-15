<template>
    <div class="window-controls">
        <div class="user-settings">
            <i class="m-user3 bordered-circle" title="Profile" @click="toggleMenu"></i>
            <ul class="profile-menus" v-show="isMenuVisible">
                <li class="menu">My Profile</li>
                <li class="menu">Company Info</li>
                <li class="menu">License</li>
                <li class="menu">Support</li>
            </ul>
        </div>
        <div class="vr m-t-02 m-r-03"></div>
        <div class="f-center gap-03">
            <button class="minimize" @click="minimizeWindow" title="Minimize"></button>
            <button class="maximize" @click="maximizeWindow" :title="isMaximized ? 'Restore' : 'Maximize'"></button>
            <button class="close" @click="closeWindow" title="Close"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMaximized = ref(false)
const isMenuVisible = ref(false)

const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value
}

const closeMenu = (event: MouseEvent) => {
    const userSettings = document.querySelector('.user-settings')
    if (userSettings && !userSettings.contains(event.target as Node)) {
        isMenuVisible.value = false
    }
}

const closeWindow = async () => {
    try {
        await window.electronAPI.closeWindow()
    } catch (error) {
        console.error('Failed to close window:', error)
    }
}

const minimizeWindow = async () => {
    try {
        await window.electronAPI.minimizeWindow()
    } catch (error) {
        console.error('Failed to minimize window:', error)
    }
}

const maximizeWindow = async () => {
    try {
        await window.electronAPI.maximizeWindow()
        isMaximized.value = !isMaximized.value
    } catch (error) {
        console.error('Failed to maximize/restore window:', error)
    }
}

// Add click listener to close menu when clicking outside
onMounted(() => {
    document.addEventListener('click', closeMenu)
})

onUnmounted(() => {
    document.removeEventListener('click', closeMenu)
})
</script>

<style scoped lang="scss">
@use '../assets/styles/variables/index' as *;
@use 'sass:color';

.profile-menus {
    position: absolute;
    min-width: 10rem;
    max-width: 100%;
    right: 0;
    top: 2.5rem;
    background-color: color.adjust($d-bg, $lightness: 3%);
    border: 1px solid $d-border;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    z-index: $z-toper;

    .menu {
        display: block;
        padding: 0.3rem 1rem;
        font-size: 0.8rem;
        border-bottom: 1px solid $d-border;
        cursor: pointer;

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background-color: $d-primary;
        }
    }
}

.window-controls {
    position: relative;
    display: flex;
    gap: 1rem;
    width: 40%;
    height: 80%;
    justify-content: flex-end;
    -webkit-app-region: drag;

    .user-settings {
        position: absolute;
        right: 5.8rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 3;
        -webkit-app-region: no-drag;

        .bordered-circle {
            min-width: 1.6rem !important;
            cursor: pointer;
        }
    }
}

@media (min-width: 1920px) {
    .window-controls {
        width: 70%;
    }
}

.window-controls button {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    -webkit-app-region: no-drag;
    transition: opacity 0.2s;
}

.window-controls button:hover {
    opacity: 0.8;
}

.close {
    background: #ff3b30;
}

.minimize {
    background: #ffcc00;
}

.maximize {
    background: #00ff00;
}
</style>