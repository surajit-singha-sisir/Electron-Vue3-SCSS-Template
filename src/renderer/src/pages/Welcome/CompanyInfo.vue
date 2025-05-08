<template>
    <WelcomeLayout>
        <div class="main-screen h-vh-100 w-100 f-start-center f-col gap-10">
            <div class="onuman-logo w--100 m-t-50">
                <img src="../../assets/images/Onuman-logo-full-white.svg" alt="Onuman Logo">
            </div><br>
            <section class="g-res-2-col-container gap-10 two-column onuman-scrollbar">
                <!-- COMPANY INFORMATION -->
                <aside class="company-info columned">
                    <div class="onuman-input-box">
                        <label for="company-name">Company Name</label>
                        <input type="text" id="company-name" class="onuman-input2"
                            placeholder="Enter your company name">
                    </div>

                    <div class="onuman-input-box">
                        <fieldset>
                            <legend>Office Address</legend>
                            <div class="onuman-combobox">
                                <div class="combo-inputbox" @click="toggleDropdown">
                                    <input type="text" id="onuman-combobox" class="onuman-input2" :value="searchQuery"
                                        @input="handleInput" placeholder="Select Country" ref="comboboxInput" />
                                    <i class="combobox-chevron m-chevron-down d-sub-sub-text" :class="{ 'rotate-180': isOpen }"></i>
                                </div>
                                <ul class="combo-dropdown-list onuman-scrollbar" v-show="isOpen" ref="dropdownList">
                                    <li v-for="(option, index) in filteredOptions" :key="option" class="combo-option"
                                        :class="{ 'focused': index === focusedOptionIndex }"
                                        @click="selectOption(option)">
                                        {{ option }}
                                    </li>
                                </ul>
                            </div>
                        </fieldset>
                    </div>
                </aside>


                <aside class="employee-info columned">

                </aside>
            </section>
        </div>

    </WelcomeLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WelcomeLayout from '../../layouts/WelcomeLayout.vue';
import { RouterLink, useRouter } from 'vue-router';
import { useOnumanCombobox } from '../../composables/onumanCombobox';


// Define dynamic options
const options = [
    'USA',
    'Bangladesh',
    'India',
    'Australia',
    'Brazil',
    'China',
    'China',
];

const {
    isOpen,
    searchQuery,
    filteredOptions,
    comboboxInput,
    dropdownList,
    focusedOptionIndex,
    toggleDropdown,
    selectOption,
    handleInput,
} = useOnumanCombobox(options);
</script>

<style scoped></style>