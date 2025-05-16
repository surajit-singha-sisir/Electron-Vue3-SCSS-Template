<template>
    <DefaultLayouts class="d-block relative w-90 m-auto">
        <h1>Hi</h1>

        <button type="button" class="btn btn-warning" @click="router.push('/dashboard')">Go to Dashboard</button><br>
        <button type="button" class="btn btn-primary" @click="router.push('/addNewProject')">New Project</button><br>
    </DefaultLayouts>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import DefaultLayouts from '../../layouts/DefaultLayouts.vue';
const router = useRouter();

</script>