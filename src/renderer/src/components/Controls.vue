<template>
    <div class="window-controls">
        <button class="minimize" @click="minimizeWindow" title="Minimize"></button>
        <button class="maximize" @click="maximizeWindow" :title="isMaximized ? 'Restore' : 'Maximize'"></button>
        <button class="close" @click="closeWindow" title="Close"></button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SystemInfo } from '../composables/SystemInfo'

const isMaximized = ref(false)

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
        isMaximized.value = !isMaximized.value // Toggle maximized state
    } catch (error) {
        console.error('Failed to maximize/restore window:', error)
    }
}


</script>

<style scoped>
.window-controls {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 6px;
    -webkit-app-region: drag;
}

.window-controls button {
    width: 1rem;
    aspect-ratio: 1;
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