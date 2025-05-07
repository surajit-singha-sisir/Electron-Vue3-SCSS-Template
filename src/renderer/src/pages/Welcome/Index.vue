<template>
    <WelcomeLayout class="no-scrollbar scroll-bar m--10">
        <h1>Index Page</h1>
        <p class="btn btn-warning">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus error at esse natus nisi explicabo harum!
            Consectetur minima commodi mollitia in. Voluptatem facere deleniti aperiam omnis in beatae amet quis.</p>
        <RouterLink class="text-dotted-1" to="/About">Get Route</RouterLink><br>
        <RouterLink to="/Contact">Contact</RouterLink>
    </WelcomeLayout>
</template>

<script setup lang="ts">
import WelcomeLayout from '@renderer/layouts/WelcomeLayout.vue';
</script>

<style>
h1,
p,
h2,
h3,
a {
    color: white;
}
</style>

