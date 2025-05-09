<template>
    <WelcomeLayout>
        <div class="main-screen h-vh-100 w-100 f-start-center f-col gap-10">
            <div class="onuman-logo w--100 m-t-50">
                <img src="../../assets/images/Onuman-logo-full-white.svg" alt="Onuman Logo">
            </div><br>
            <button class="btn btn-warning" @click="combo">Combobox</button>
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

                            <div class="auto-options-3-cols">
                                <!-- COUNTRY COMBOBOX -->
                                <div class="onuman-combobox">
                                    <div class="combo-inputbox" @click="toggleCountryDropdown">
                                        <input type="text" id="onuman-combobox-country" class="onuman-input2"
                                            :value="countrySearchQuery" @input="handleCountryInput"
                                            placeholder="Select Country" ref="countryComboboxInput" />
                                        <i class="combobox-chevron m-chevron-down d-sub-sub-text"
                                            :class="{ 'rotate-180': isCountryOpen }"></i>
                                    </div>
                                    <ul class="combo-dropdown-list onuman-scrollbar" v-show="isCountryOpen"
                                        ref="countryDropdownList">
                                        <li v-if="countryFilteredOptions.length === 0" class="combo-option no-data">
                                            No data
                                        </li>
                                        <li v-else v-for="(option, index) in countryFilteredOptions" :key="option"
                                            class="combo-option"
                                            :class="{ 'focused': index === countryFocusedOptionIndex }"
                                            @click="selectCountryOption(option)">
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>

                                <!-- STATE COMBOBOX -->
                                <div class="onuman-combobox">
                                    <div class="combo-inputbox" @click="toggleStateDropdown">
                                        <input type="text" id="onuman-combobox-state" class="onuman-input2"
                                            :value="stateSearchQuery" @input="handleStateInput"
                                            placeholder="Select State" ref="stateComboboxInput"
                                            :disabled="!selectedCountry" />
                                        <i class="combobox-chevron m-chevron-down d-sub-sub-text"
                                            :class="{ 'rotate-180': isStateOpen }"></i>
                                    </div>
                                    <ul class="combo-dropdown-list onuman-scrollbar" v-show="isStateOpen"
                                        ref="stateDropdownList">
                                        <li v-if="stateFilteredOptions.length === 0" class="combo-option no-data">
                                            No data
                                        </li>
                                        <li v-else v-for="(option, index) in stateFilteredOptions" :key="option"
                                            class="combo-option"
                                            :class="{ 'focused': index === stateFocusedOptionIndex }"
                                            @click="selectStateOption(option)">
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>

                                <!-- CITY COMBOBOX -->
                                <div class="onuman-combobox">
                                    <div class="combo-inputbox" @click="toggleCityDropdown">
                                        <input type="text" id="on |uman-combobox-city" class="onuman-input2"
                                            :value="citySearchQuery" @input="handleCityInput" placeholder="Select City"
                                            ref="cityComboboxInput" :disabled="!selectedState" />
                                        <i class="combobox-chevron m-chevron-down d-sub-sub-text"
                                            :class="{ 'rotate-180': isCityOpen }"></i>
                                    </div>
                                    <ul class="combo-dropdown-list onuman-scrollbar" v-show="isCityOpen"
                                        ref="cityDropdownList">
                                        <li v-if="cityFilteredOptions.length === 0" class="combo-option no-data">
                                            No data
                                        </li>
                                        <li v-else v-for="(option, index) in cityFilteredOptions" :key="option"
                                            class="combo-option"
                                            :class="{ 'focused': index === cityFocusedOptionIndex }"
                                            @click="selectCityOption(option)">
                                            {{ option }}
                                        </li>
                                    </ul>
                                </div>
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
import { ref, computed, watch } from 'vue';
import WelcomeLayout from '../../layouts/WelcomeLayout.vue';
import { useOnumanCombobox } from '../../composables/onumanCombobox';
import locationData from '../../assets/jsons/country-state-city.json';
import { useRouter } from 'vue-router';



const router = useRouter();
const combo = () => {
    router.push('/Combobox');
}

// DEFINE INTERFACES FOR JSON STRUCTURE
interface City {
    name: string;
}

interface State {
    name: string;
    cities: City[];
}

interface Country {
    name: string;
    states: State[];
}

// TYPE THE IMPORTED JSON DATA
const locations = ref<Country[]>(locationData as Country[]);
const error = ref<string | null>(null);

// REACTIVE STATE FOR SELECTIONS
const selectedCountry = ref<string>('');
const selectedState = ref<string>('');
const selectedCity = ref<string>('');

// COMPUTE COUNTRY OPTIONS
const countryOptions = computed(() =>
    locations.value.map((country) => country.name).sort()
);

// COMPUTE STATE OPTIONS BASED ON SELECTED COUNTRY
const stateOptions = computed(() => {
    const country = locations.value.find((c) => c.name === selectedCountry.value);
    return country ? country.states.map((state) => state.name).sort() : [];
});

// COMPUTE CITY OPTIONS BASED ON SELECTED STATE
const cityOptions = computed(() => {
    const country = locations.value.find((c) => c.name === selectedCountry.value);
    const state = country?.states.find((s) => s.name === selectedState.value);
    return state ? state.cities.map((city) => city.name).sort() : [];
});

// COUNTRY COMBOBOX SETUP
const {
    isOpen: isCountryOpen,
    selectedOption: countrySelectedOption,
    searchQuery: countrySearchQuery,
    filteredOptions: countryFilteredOptions,
    comboboxInput: countryComboboxInput,
    dropdownList: countryDropdownList,
    focusedOptionIndex: countryFocusedOptionIndex,
    toggleDropdown: toggleCountryDropdown,
    selectOption: selectCountryOption,
    handleInput: handleCountryInput,
} = useOnumanCombobox(countryOptions);

// STATE COMBOBOX SETUP
const {
    isOpen: isStateOpen,
    selectedOption: stateSelectedOption,
    searchQuery: stateSearchQuery,
    filteredOptions: stateFilteredOptions,
    comboboxInput: stateComboboxInput,
    dropdownList: stateDropdownList,
    focusedOptionIndex: stateFocusedOptionIndex,
    toggleDropdown: toggleStateDropdown,
    selectOption: selectStateOption,
    handleInput: handleStateInput,
} = useOnumanCombobox(stateOptions);

// CITY COMBOBOX SETUP
const {
    isOpen: isCityOpen,
    selectedOption: citySelectedOption,
    searchQuery: citySearchQuery,
    filteredOptions: cityFilteredOptions,
    comboboxInput: cityComboboxInput,
    dropdownList: cityDropdownList,
    focusedOptionIndex: cityFocusedOptionIndex,
    toggleDropdown: toggleCityDropdown,
    selectOption: selectCityOption,
    handleInput: handleCityInput,
} = useOnumanCombobox(cityOptions);

// WATCH COUNTRY SELECTION TO RESET STATE AND CITY
watch(countrySelectedOption, (newOption) => {
    selectedCountry.value = newOption;
    selectedState.value = '';
    selectedCity.value = '';
    stateSearchQuery.value = '';
    citySearchQuery.value = '';
});

// WATCH STATE SELECTION TO RESET CITY
watch(stateSelectedOption, (newOption) => {
    selectedState.value = newOption;
    selectedCity.value = '';
    citySearchQuery.value = '';
});

// SYNC CITY SELECTION
watch(citySelectedOption, (newOption) => {
    selectedCity.value = newOption;
});

// HANDLE JSON LOADING ERROR
if (!locationData || !Array.isArray(locationData)) {
    error.value = 'Failed to load or parse country-state-city.json';
}
</script>