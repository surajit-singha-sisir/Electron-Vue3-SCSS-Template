<template>
    <header class="ios-header layout-bg border-bottom">
        <div class="text-nowrap text-s f-center gap-05">
            <div class="onuman-icon">
                <img src="../assets/images/Onuman-logo.svg" alt="Onuman Logo">
            </div>
            <b>Onuman 1.0</b>
        </div>
        <Controls />
    </header>
    <main class="main">
        <slot />
    </main>
</template>

<script setup lang="ts">
import Controls from '../components/Controls.vue';
</script>

<style scoped lang="scss">
@use "../assets/styles/variables/_index.scss" as *;

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
    z-index: 5;
    margin-bottom: 2rem;
    -webkit-app-region: drag;
}
</style>