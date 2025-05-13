<template>
    <WelcomeLayout class="d-block relative">
        <section class="f-center h-vh-100">
            <div class="abs-center" ref="welcomeLoading">
                <h1 class="text-center animate-top-bottom">Welcome to</h1><br>
                <div class="onuman-logo w--150">
                    <img src="../../assets/images/Onuman-logo-full-white.svg" alt="Onuman Logo">
                </div>
                <div class="welcome-loader"></div>
            </div>
        </section>
    </WelcomeLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WelcomeLayout from '../../layouts/WelcomeLayout.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
setTimeout(() => {
    router.push('/dashboard')
}, 5000);
</script>