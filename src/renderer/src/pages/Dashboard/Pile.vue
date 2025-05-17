<template>
    <DefaultLayouts class="d-block relative">
        <div class="main-screen onuman-main-scrollbar">
            <section class="pile-container">
                <br>
                <div class="project-info-container">
                    {{ organization }}
                </div>
            </section>
        </div>
    </DefaultLayouts>
</template>



<script setup lang="ts">
import { useRoute } from 'vue-router';
import DefaultLayouts from '../../layouts/DefaultLayouts.vue';
const route = useRoute()
const organization = route.params.organization
</script>
