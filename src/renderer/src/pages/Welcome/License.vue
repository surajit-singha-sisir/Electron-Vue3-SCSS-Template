<template>
    <WelcomeLayout>
        <div class="main-screen h-vh-100" ref="mainScreen">
            <section class="abs-center f-center f-col gap-20">
                <div class="onuman-logo w--150">
                    <img src="../../assets/images/Onuman-logo-full-white.svg" alt="Onuman Logo">
                    <p class="text-sm text-right m-t--05">DEVELOPED BY <RouterLink to="https://kehem.com">KEHEM IT
                        </RouterLink>
                    </p>
                </div>
                <div class="licenser">
                    <h1 class="m-b-10">Active your product</h1>
                    <div class="license-key f-center">
                        <div class="f-center gap-03">
                            <input type="text" maxlength="4" v-model="keyParts[0]" @input="handleInput(0)"
                                @keydown="handleKeydown(0, $event)" class="license-input" placeholder="XXXX">
                            <span class="custom-separator">-</span>
                            <input type="text" maxlength="4" v-model="keyParts[1]" @input="handleInput(1)"
                                @keydown="handleKeydown(1, $event)" class="license-input" placeholder="XXXX">
                            <span class="custom-separator">-</span>
                            <input type="text" maxlength="4" v-model="keyParts[2]" @input="handleInput(2)"
                                @keydown="handleKeydown(2, $event)" class="license-input" placeholder="XXXX">
                            <span class="custom-separator">-</span>
                            <input type="text" maxlength="4" v-model="keyParts[3]" @input="handleInput(3)"
                                @keydown="handleKeydown(3, $event)" class="license-input" placeholder="XXXX">
                            <button type="button" class="btn btn-nav-secondary btn-sm paste-key" @click="pasteKey"><i
                                    class="m-paste"></i></button>
                        </div>

                        <aside class="w-100 f f-col gap-10">
                            <button type="button" class="btn btn-calm w-100">Activate</button>
                            <div class="text-right">
                                <RouterLink to="#" class="get-trial" ref="TrialGetModal">
                                    Get 7 days trial
                                </RouterLink>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>
        </div>
    </WelcomeLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';
import WelcomeLayout from '../../layouts/WelcomeLayout.vue';
import { RouterLink, useRouter } from 'vue-router';






const TrialGetModal = ref(false);






const keyParts = ref(['', '', '', '']);
const inputs = ref<(HTMLInputElement | null)[]>([]);

// Handle input to auto-focus the next field after 4 characters
const handleInput = (index: number) => {
    if (keyParts.value[index].length === 4 && index < 3) {
        inputs.value[index + 1]?.focus();
    }
};

// Handle backspace to move to the previous field
const handleKeydown = (index: number, event: KeyboardEvent) => {
    if (event.key === 'Backspace' && keyParts.value[index].length === 0 && index > 0) {
        inputs.value[index - 1]?.focus();
    }
};

const pasteKey = async () => {
    try {
        const text = await navigator.clipboard.readText();
        const cleanedText = text.replace(/[^A-Za-z0-9]/g, '').slice(0, 16);
        if (cleanedText.length === 16) {
            keyParts.value = [
                cleanedText.slice(0, 4),
                cleanedText.slice(4, 8),
                cleanedText.slice(8, 12),
                cleanedText.slice(12, 16)
            ];
        }
    } catch (err) {
        console.error('Failed to read clipboard:', err);
    }
};

</script>
