<template>
    <header class="ios-header layout-bg border-bottom">
        <NavBars />
        <Controls />
    </header>
    <main class="main dashboard-main">
        <slot />
    </main>
</template>

<script setup lang="ts">
import Controls from '../components/Controls.vue';
import NavBars from '../components/Navbars.vue';
</script>

<style scoped lang="scss">
.ios-header {
    height: 2.2rem;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
    margin-bottom: 2rem;
    // -webkit-app-region: drag;
}
</style>