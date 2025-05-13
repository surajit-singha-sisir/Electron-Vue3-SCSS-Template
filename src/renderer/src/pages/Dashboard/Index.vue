<template>
    <DefaultLayouts class="d-block relative">
        <section class="f-center h-vh-100">
            <div class="main-screen h-vh-100"></div>
        </section>
    </DefaultLayouts>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayouts from '../../layouts/DefaultLayouts.vue';

const router = useRouter();
</script>