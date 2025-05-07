<template>
    <div class="layout no-scrollbar">
        <header class="ios-header layout-bg border-bottom">
            <p>Onuman Software</p>
            <Controls />
        </header>
        <main class="content">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import Controls from '../components/Controls.vue';

</script>

<style scoped lang="scss">
@use "../assets/styles/variables/_index.scss" as *;

.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    -webkit-app-region: no-drag;
}

.ios-header {
    height: 2rem;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    -webkit-app-region: drag;
}

</style>