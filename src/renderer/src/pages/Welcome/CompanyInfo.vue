<template>
    <WelcomeLayout>
        <div class="main-screen h-vh-100 w-100 f-start-center f-col gap-10">
            <div class="onuman-logo w--100 m-t-50">
                <img src="../../assets/images/Onuman-logo-full-white.svg" alt="Onuman Logo">
            </div>
            <form class="g-res-2-col-container gap-10 two-column" method="post"
                @submit.prevent="submitForm">
                <!-- COMPANY INFORMATION -->
                <aside class="company-info columned">
                    <div class="onuman-input-box">
                        <label for="company-name-input" id="company-name-label">
                            Company Name
                        </label>
                        <Tooltip content="Enter the legal name of your company" position="top"
                            id="company-name-tooltip">
                            <input type="text" id="company-name-input" name="companyName" class="onuman-input2"
                                placeholder="Enter your company name" v-model="companyName"
                                aria-labelledby="company-name-label"
                                aria-describedby="company-name-tooltip company-name-error" aria-required="true"
                                :aria-invalid="!!companyNameError">
                        </Tooltip>
                        <span v-if="companyNameError" class="red" id="company-name-error">
                            {{ companyNameError }}
                        </span>
                    </div>
                    <!-- ADDRESS -->
                    <div class="onuman-input-box">
                        <fieldset>
                            <legend id="office-address-legend">Office Address</legend>
                            <div class="auto-options-3-cols">
                                <!-- COUNTRY COMBOBOX -->
                                <div class="combobox-wrapper">
                                    <Tooltip content="Select the country of your office" position="top"
                                        id="country-tooltip">
                                        <OnumanCombobox id="onuman-combobox-country" name="country"
                                            :options="countryOptions" placeholder="Select Country"
                                            v-model:selected="selectedCountry" role="combobox"
                                            aria-describedby="country-tooltip country-error" aria-required="true"
                                            aria-controls="onuman-combobox-country-listbox" aria-expanded="false"
                                            :aria-invalid="!!countryError" tabindex="0" />
                                    </Tooltip>
                                    <span v-if="countryError" class="red" id="country-error">
                                        {{ countryError }}
                                    </span>
                                </div>
                                <!-- STATE COMBOBOX -->
                                <div class="combobox-wrapper">
                                    <Tooltip content="Select the state or division or province" position="top"
                                        id="state-tooltip">
                                        <OnumanCombobox id="onuman-combobox-state" name="state" :options="stateOptions"
                                            placeholder="Select State" :disabled="!selectedCountry"
                                            v-model:selected="selectedState" role="combobox"
                                            aria-describedby="state-tooltip state-error" aria-required="true"
                                            aria-controls="onuman-combobox-state-listbox" aria-expanded="false"
                                            :aria-disabled="!selectedCountry" :aria-invalid="!!stateError"
                                            tabindex="0" />
                                    </Tooltip>
                                    <span v-if="stateError" class="red" id="state-error">
                                        {{ stateError }}
                                    </span>
                                </div>
                                <!-- CITY COMBOBOX -->
                                <div class="combobox-wrapper">
                                    <Tooltip content="Select the city or district" position="top" id="city-tooltip">
                                        <OnumanCombobox id="onuman-combobox-city" name="city" :options="cityOptions"
                                            placeholder="Select City" :disabled="!selectedState"
                                            v-model:selected="selectedCity" role="combobox"
                                            aria-describedby="city-tooltip city-error" aria-required="true"
                                            aria-controls="onuman-combobox-city-listbox" aria-expanded="false"
                                            :aria-disabled="!selectedState" :aria-invalid="!!cityError" tabindex="0" />
                                    </Tooltip>
                                    <span v-if="cityError" class="red" id="city-error">
                                        {{ cityError }}
                                    </span>
                                </div>
                            </div><br>
                            <div class="address-inputs g-res-3-col-container gap-10">
                                <input type="text" id="address-line-input" name="addressLine"
                                    class="onuman-input2 span-2" placeholder="Ex: Region, Building, Floor, Shop no."
                                    v-model="addressLine" aria-labelledby="office-address-legend"
                                    aria-describedby="address-line-error" aria-required="true"
                                    :aria-invalid="!!addressLineError" />
                                <span v-if="addressLineError" class="red" id="address-line-error">
                                    {{ addressLineError }}
                                </span>
                                <input type="text" id="zip-code-input" name="zipCode" class="onuman-input2"
                                    placeholder="ZIP Code" v-model="zipCode" aria-labelledby="office-address-legend"
                                    aria-describedby="zip-code-error" aria-required="true"
                                    :aria-invalid="!!zipCodeError" />
                                <span v-if="zipCodeError" class="red" id="zip-code-error">
                                    {{ zipCodeError }}
                                </span>
                            </div>
                        </fieldset>
                    </div>
                    <!-- TRADE LICENSE -->
                    <div class="onuman-input-box">
                        <label for="company-trade-license-input" id="trade-license-label">
                            Trade License No.
                        </label>
                        <Tooltip content="Enter the local authorization number. Ex: TIN/EIN/BIN" position="top"
                            id="trade-license-tooltip">
                            <input v-model="tradeLicense" type="text" id="company-trade-license-input"
                                name="tradeLicense" class="onuman-input2" placeholder="Enter your trade license number"
                                :class="{ 'input-error': errorMessage }" maxlength="18"
                                aria-labelledby="trade-license-label"
                                aria-describedby="trade-license-tooltip trade-license-error" aria-required="true"
                                :aria-invalid="!!errorMessage" />
                        </Tooltip>
                        <p v-if="errorMessage" class="red" id="trade-license-error">{{ errorMessage }}</p>
                    </div>
                    <!-- OFFICE PHONE NUMBER -->
                    <div class="onuman-input-box">
                        <label for="office-phone-number-input" id="phone-number-label">Office Phone No.</label>
                        <input type="text" id="office-phone-number-input" name="phoneNumber" class="onuman-input2"
                            v-model="officePhoneNumber" placeholder="+1-123-456-7890" maxlength="17"
                            @input="formatPhoneNumber(officePhoneNumber)" aria-labelledby="phone-number-label"
                            aria-describedby="phone-number-error" aria-required="true"
                            :aria-invalid="!isValidPhone && !!officePhoneNumber" />
                        <span v-if="!isValidPhone && officePhoneNumber" class="red" id="phone-number-error">
                            Please enter a valid phone number (e.g., +1-123-456-7890)
                        </span>
                        <span v-if="officePhoneNumberError" class="red" id="office-phone-error">
                            {{ officePhoneNumberError }}
                        </span>
                    </div>
                    <!-- OFFICE EMAIL ADDRESS -->
                    <div class="onuman-input-box">
                        <label for="office-email-address-input" id="email-address-label">Office Email Address</label>
                        <input type="text" id="office-email-address-input" name="emailAddress" class="onuman-input2"
                            v-model="officeEmailAddress" placeholder="yourname@domain.com" maxlength="100"
                            aria-labelledby="email-address-label" aria-describedby="email-address-error"
                            aria-required="true" :aria-invalid="!isValidEmail && !!officeEmailAddress" />
                        <span v-if="!isValidEmail && officeEmailAddress" class="red" id="email-address-error">
                            Please enter a valid email address (e.g., yourname@domain.com)
                        </span>
                        <span v-if="officeEmailAddressError" class="red" id="office-email-error">
                            {{ officeEmailAddressError }}
                        </span>
                    </div>
                </aside>
                <aside class="employee-info columned"></aside>
                <button type="submit" class="btn btn-primary m-b-30 w--100">Submit</button>
            </form>
        </div>
    </WelcomeLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import WelcomeLayout from '../../layouts/WelcomeLayout.vue';
import locationData from '../../assets/jsons/country-state-city.json';
import OnumanCombobox from '../../components/OnumanCombobox.vue';
import Tooltip from '../../components/ToolTip.vue';
import { useValidators } from '../../composables/useValidators';

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

// WATCH COUNTRY SELECTION TO RESET STATE AND CITY
watch(selectedCountry, () => {
    selectedState.value = '';
    selectedCity.value = '';
});

// WATCH STATE SELECTION TO RESET CITY
watch(selectedState, () => {
    selectedCity.value = '';
});

// HANDLE JSON LOADING ERROR
if (!locationData || !Array.isArray(locationData)) {
    error.value = 'FAILED TO LOAD OR PARSE COUNTRY-STATE-CITY.JSON';
}

// USE VALIDATORS
const { usePhoneValidator, useEmailValidator, useTradeLicenseValidator } = useValidators();

// COMPANY NAME
const companyName = ref<string>('');
const companyNameError = ref<string>('');

// COUNTRY
const countryError = ref<string>('');

// STATE
const stateError = ref<string>('');

// CITY
const cityError = ref<string>('');

// ADDRESS LINE
const addressLine = ref<string>('');
const addressLineError = ref<string>('');

// ZIP CODE
const zipCode = ref<string>('');
const zipCodeError = ref<string>('');

// PHONE NUMBER VALIDATION
const officePhoneNumber = ref<string>('');
const { isValidPhone, formatPhoneNumber } = usePhoneValidator(officePhoneNumber);

// EMAIL VALIDATION
const officeEmailAddress = ref<string>('');
const { isValidEmail } = useEmailValidator(officeEmailAddress);

// TRADE LICENSE VALIDATION
const tradeLicense = ref<string>('');
const { errorMessage } = useTradeLicenseValidator(tradeLicense);




// OFFICE PHONE
const officePhoneNumberError = ref<string>('');
// OFFICE EMAIL
const officeEmailAddressError = ref<string>('');

// FORM SUBMISSION HANDLER
const submitForm = () => {
    let hasErrors = false;

    // RESET ERROR MESSAGES
    companyNameError.value = '';
    countryError.value = '';
    stateError.value = '';
    cityError.value = '';
    addressLineError.value = '';
    zipCodeError.value = '';
    officePhoneNumberError.value = '';
    officeEmailAddressError.value = '';

    // CHECK REQUIRED FIELDS
    if (!companyName.value) {
        companyNameError.value = 'Company name is required';
        hasErrors = true;
    }
    if (!selectedCountry.value) {
        countryError.value = 'Country is required';
        hasErrors = true;
    }
    if (!selectedState.value) {
        stateError.value = 'State is required';
        hasErrors = true;
    }
    if (!selectedCity.value) {
        cityError.value = 'City is required';
        hasErrors = true;
    }
    if (!addressLine.value) {
        addressLineError.value = 'Address line is required';
        hasErrors = true;
    }
    if (!zipCode.value) {
        zipCodeError.value = 'ZIP code is required';
        hasErrors = true;
    }
    if (!officePhoneNumber.value) {
        officePhoneNumberError.value = 'Office phone number is required';
        hasErrors = true;
    }
    if (!officeEmailAddress.value) {
        officeEmailAddressError.value = 'Office email address is required';
        hasErrors = true;
    }
    if (!tradeLicense.value) {
        errorMessage.value = 'Trade license is required';
        hasErrors = true;
    } else if (errorMessage.value) {
        hasErrors = true;
    }
    if (!officePhoneNumber.value) {
        hasErrors = true;
    } else if (!isValidPhone.value) {
        hasErrors = true;
    }
    if (!officeEmailAddress.value) {
        hasErrors = true;
    } else if (!isValidEmail.value) {
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    // COLLECT FORM DATA
    const formData = {
        companyName: companyName.value,
        country: selectedCountry.value,
        state: selectedState.value,
        city: selectedCity.value,
        addressLine: addressLine.value,
        zipCode: zipCode.value,
        tradeLicense: tradeLicense.value,
        phoneNumber: officePhoneNumber.value,
        emailAddress: officeEmailAddress.value,
    };

    console.log('Form submitted:', formData);
    // ADD API CALL OR ROUTING LOGIC HERE
};
</script>