<template>
    <WelcomeLayout>
        <div class="main-screen h-vh-100">
            <section class="abs-center f-center f-col gap-20">
                <div class="onuman-logo w--150">
                    <img src="../../assets/images/Onuman-logo-full-white.svg" alt="Onuman Logo">
                    <p class="text-sm text-right m-t--05">DEVELOPED BY <RouterLink to="https://kehem.com">KEHEM IT
                        </RouterLink>
                    </p>
                </div>
                <div class="licenser">
                    <h1 class="m-b-10">Activate your product</h1>
                    <div class="license-key f-center">
                        <div class="f-center gap-03">
                            <input type="text" maxlength="4" v-model="keyParts[0]" @input="handleInput(0)"
                                @keydown="handleKeydown(0, $event)" class="license-input" placeholder="XXXX"
                                tabindex="1" aria-label="License key part 1" id="key-part-1">
                            <span class="custom-separator">-</span>
                            <input type="text" maxlength="4" v-model="keyParts[1]" @input="handleInput(1)"
                                @keydown="handleKeydown(1, $event)" class="license-input" placeholder="XXXX"
                                tabindex="2" aria-label="License key part 2" id="key-part-2">
                            <span class="custom-separator">-</span>
                            <input type="text" maxlength="4" v-model="keyParts[2]" @input="handleInput(2)"
                                @keydown="handleKeydown(2, $event)" class="license-input" placeholder="XXXX"
                                tabindex="3" aria-label="License key part 3" id="key-part-3">
                            <span class="custom-separator">-</span>
                            <input type="text" maxlength="4" v-model="keyParts[3]" @input="handleInput(3)"
                                @keydown="handleKeydown(3, $event)" class="license-input" placeholder="XXXX"
                                tabindex="4" aria-label="License key part 4" id="key-part-4">
                            <button type="button" class="btn btn-nav-secondary btn-sm paste-key" @click="pasteKey"
                                tabindex="5" aria-label="Paste license key">
                                <i class="m-paste"></i>
                            </button>
                        </div>

                        <aside class="w-100 f f-col gap-10">
                            <!-- ACTIVATION LOADING NEED TO ADDED -->
                            <button type="button" class="btn btn-calm w-100" tabindex="6" aria-label="Activate product"
                                @click="gotToPrivacyPolicy">
                                Activate
                            </button>

                            <div class="text-right">
                                <div class="get-trial cur-pointer" @click="openModal" tabindex="7" role="button"
                                    aria-label="Get 7 days trial" @keydown.enter="openModal"
                                    @keydown.space.prevent="openModal">
                                    Get 7 days trial
                                </div>
                            </div>
                        </aside>
                        <ModalBox :is-open="isModalOpen" :show-close-button="true" @close="closeModal">
                            <h2>Trial Registration</h2><br>
                            <div class="f f-col gap-06 m-b-10">
                                <p class="text-md star">Company name</p>
                                <input type="text" class="onuman-input" placeholder="Enter your company name"
                                    tabindex="8" aria-label="Company name" id="company-name">
                            </div>
                            <div class="f f-col gap-06 m-b-10">
                                <p class="text-md star">Company Address</p>
                                <input type="text" class="onuman-input" placeholder="Enter your company Address"
                                    tabindex="9" aria-label="Company address" id="company-address">
                            </div>
                            <div class="f f-col gap-06 m-b-10">
                                <p class="text-md star">Your Name</p>
                                <input type="text" class="onuman-input" placeholder="Enter your name" tabindex="10"
                                    aria-label="Your name" id="your-name">
                            </div>
                            <div class="f f-col gap-06 m-b-10">
                                <p class="text-md star">Your Phone no.</p>
                                <input type="text" class="onuman-input" placeholder="+8801-XXX-XX-XXXX"
                                    v-model="phoneNumber" @input="handleInputs" tabindex="11" aria-label="Phone number"
                                    id="phone-number" :aria-invalid="isInvalid" aria-describedby="phone-error" />
                                <p v-if="isInvalid" class="red" id="phone-error" role="alert">
                                    Please enter a valid phone number
                                </p>
                            </div>
                            <!-- Email Input -->
                            <div class="f f-col gap-06 m-b-10">
                                <p class="text-md star">Your Email Address</p>
                                <input type="email" class="onuman-input" placeholder="Enter your valid Email Address"
                                    v-model="email" @input="handleEmailInput" tabindex="12" aria-label="Email address"
                                    id="email-address" :aria-invalid="isEmailInvalid" aria-describedby="email-error" />
                                <p v-if="isEmailInvalid" class="red" id="email-error" role="alert">
                                    Please enter a valid email address
                                </p>
                                <p>
                                    <b class="text-underline warning">Note:</b> Onuman will send a temporary
                                    <strong class="success">License key</strong>
                                    to your email address
                                </p>
                            </div>
                            <div class="w-100 f-center">
                                <button type="submit" class="btn btn-alert" tabindex="13"
                                    aria-label="Submit trial registration">
                                    Submit
                                </button>
                            </div>
                        </ModalBox>
                    </div>
                </div>
            </section>
        </div>
    </WelcomeLayout>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { ref } from 'vue';
import WelcomeLayout from '../../layouts/WelcomeLayout.vue';
import { RouterLink, useRouter } from 'vue-router';
import ModalBox from '../../components/UI/ModalBox.vue';

const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const phoneNumber = ref('')
const isInvalid = ref(false)
const email = ref('')
const isEmailInvalid = ref(false)

// Format phone number
const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '')
    let formatted = '+8801'
    const remainingDigits = digits.startsWith('8801') ? digits.slice(4) : digits

    if (remainingDigits.length > 0) {
        formatted += '-' + remainingDigits.slice(0, 3)
    }
    if (remainingDigits.length > 3) {
        formatted += '-' + remainingDigits.slice(3, 5)
    }
    if (remainingDigits.length > 5) {
        formatted += '-' + remainingDigits.slice(5, 9)
    }

    return formatted
}

// Validate phone number
const validatePhoneNumber = (value: string): boolean => {
    const digits = value.replace(/\D/g, '')
    return digits.length === 13 && digits.startsWith('8801')
}

// Handle input
const handleInputs = (event: Event) => {
    const input = event.target as HTMLInputElement
    let value = input.value
    const digits = value.replace(/\D/g, '')

    // Restrict to 13 digits
    if (digits.length > 13) {
        value = formatPhoneNumber(digits.slice(0, 13))
    } else {
        value = formatPhoneNumber(value)
    }

    phoneNumber.value = value
    input.value = value

    // Validate and update error state
    isInvalid.value = value.length > 0 && !validatePhoneNumber(value)
}

// Email Validation
const validateEmail = (value: string): boolean => {
    // Basic email regex: allows most common email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
}

const handleEmailInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    email.value = input.value
    isEmailInvalid.value = email.value.length > 0 && !validateEmail(email.value)
}

// Watchers
watch(phoneNumber, (newValue) => {
    const formatted = formatPhoneNumber(newValue)
    if (formatted !== newValue) {
        phoneNumber.value = formatted
    }
    // Validate on change
    isInvalid.value = newValue.length > 0 && !validatePhoneNumber(newValue)
})

watch(email, (newValue) => {
    isEmailInvalid.value = newValue.length > 0 && !validateEmail(newValue)
})

const keyParts = ref(['', '', '', '']);
const inputs = ref<(HTMLInputElement | null)[]>([]);

// Handle input to auto-focus the next field after 4 characters
const handleInput = (index: number) => {
    const currentValue = keyParts.value[index].toUpperCase();
    keyParts.value[index] = currentValue.replace(/[^A-Za-z0-9]/g, '');

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
            inputs.value[3]?.focus();
        }
    } catch (err) {
        console.error('Failed to read clipboard:', err);
    }
};

// Initialize inputs array on mount
onMounted(() => {
    inputs.value = [
        document.querySelector('#key-part-1') as HTMLInputElement,
        document.querySelector('#key-part-2') as HTMLInputElement,
        document.querySelector('#key-part-3') as HTMLInputElement,
        document.querySelector('#key-part-4') as HTMLInputElement
    ];
});
const router = useRouter();
const gotToPrivacyPolicy = () => {
    router.push("/PrivacyPolicy");
}
</script>