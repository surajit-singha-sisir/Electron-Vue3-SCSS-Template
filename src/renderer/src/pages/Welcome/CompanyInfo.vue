<template>
    <WelcomeLayout>
        <div class="main-screen h-100 w-100 f-start-center f-col gap-10">
            <div class="onuman-logo w--100 m-t-50">
                <img src="../../assets/images/Onuman-logo-full-white.svg" alt="Onuman Logo">
            </div><br>
            <form class="g-res-2-col-container gap-10 two-column" method="post" @submit.prevent="submitForm">
                <!-- COMPANY INFORMATION -->
                <aside class="company-info columned">
                    <div class="company-info-warning">
                        <Tooltip class="info-tooltip"
                            content="Further you cannot change the company information. So carefully fill the inputs"
                            position="right" id="company-name-tooltip"><i class="m-info3"></i>
                        </Tooltip>
                    </div><br>

                    <div class="onuman-input-box">
                        <label for="company-name-input" id="company-name-label">Company Name</label>
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
                        <label for="office-email-address-input" id="email-address-label">Office Email
                            Address</label>
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

                <!-- EMPLOYEE INFORMATION -->
                <aside class="employee-info columned">
                    <h3>Employee Information</h3>
                    <hr>

                    <!-- Your Name -->
                    <div class="onuman-input-box">
                        <label for="employee-name-input" id="employee-name-label">Your Name</label>
                        <input type="text" id="employee-name-input" name="employeeName" class="onuman-input2"
                            placeholder="Enter your name" v-model="employeeName" :aria-invalid="!!employeeNameError"
                            aria-labelledby="employee-name-label" aria-describedby="employee-name-error"
                            maxlength="200">
                        <span v-if="employeeNameError" class="red" id="employee-name-error">{{ employeeNameError
                        }}</span>
                    </div>

                    <!-- Your Designation -->
                    <div class="onuman-input-box">
                        <label for="employee-designation-input" id="employee-designation-label">Your Designation</label>
                        <input type="text" id="employee-designation-input" name="employeeDesignation"
                            class="onuman-input2" placeholder="Enter your designation" v-model="employeeDesignation"
                            :aria-invalid="!!employeeDesignationError" aria-labelledby="employee-designation-label"
                            aria-describedby="employee-designation-error" maxlength="200">
                        <span v-if="employeeDesignationError" class="red" id="employee-designation-error">{{
                            employeeDesignationError }}</span>
                    </div>

                    <!-- Employee ID -->
                    <div class="onuman-input-box">
                        <label for="employee-id-input" id="employee-id-label">Employee ID</label>
                        <input type="text" id="employee-id-input" name="employeeId" class="onuman-input2"
                            placeholder="Enter your employee ID" v-model="employeeId" :aria-invalid="!!employeeIdError"
                            aria-labelledby="employee-id-label" aria-describedby="employee-id-error" maxlength="200">
                        <span v-if="employeeIdError" class="red" id="employee-id-error">{{ employeeIdError }}</span>
                    </div>

                    <!-- Your Phone No. -->
                    <div class="onuman-input-box">
                        <label for="employee-phone-input" id="employee-phone-label">Your Phone No.</label>
                        <input type="tel" id="employee-phone-input" name="employeePhone" class="onuman-input2"
                            placeholder="+1-123-456-7890" v-model="employeePhone" maxlength="17"
                            @input="formatEmployeePhoneNumber(employeePhone)" aria-labelledby="employee-phone-label"
                            aria-describedby="employee-phone-error" aria-required="true"
                            :aria-invalid="!isEmployeePhoneValid && !!employeePhone">
                        <span v-if="!isEmployeePhoneValid && employeePhone" class="red" id="employee-phone-error">
                            Please enter a valid phone number (e.g., +1-123-456-7890)
                        </span>
                        <span v-if="employeePhoneError" class="red">{{ employeePhoneError }}</span>
                    </div>

                    <!-- Your Email Address -->
                    <div class="onuman-input-box">
                        <label for="employee-email-input" id="employee-email-label">Your Email Address</label>
                        <input type="email" id="employee-email-input" name="employeeEmail" class="onuman-input2"
                            placeholder="yourname@domain.com" v-model="employeeEmail" maxlength="200"
                            aria-labelledby="employee-email-label" aria-describedby="employee-email-error"
                            aria-required="true" :aria-invalid="!isEmployeeEmailValid && !!employeeEmail">
                        <span v-if="!isEmployeeEmailValid && employeeEmail" class="red" id="employee-email-error">
                            Please enter a valid email address (e.g., yourname@domain.com)
                        </span>
                        <span v-if="employeeEmailError" class="red">{{ employeeEmailError }}</span>
                    </div>


                </aside>



                <button type="submit" class="btn btn-primary m-b-30 w--100" :disabled="loading">
                    {{ loading ? 'Submitting...' : 'Submit' }}
                </button>
            </form>
        </div>
    </WelcomeLayout>
</template>
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import WelcomeLayout from '../../layouts/WelcomeLayout.vue';
import locationData from '../../assets/jsons/country-state-city.json';
import OnumanCombobox from '../../components/OnumanCombobox.vue';
import Tooltip from '../../components/ToolTip.vue';
import { useValidators } from '../../composables/useValidators';
import { useRouter } from 'vue-router';

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

// EMPLOYEE INFORMATION
const employeeName = ref<string>('');
const employeeDesignation = ref<string>('');
const employeeId = ref<string>('');
const employeePhone = ref<string>('');
const employeeEmail = ref<string>('');

// EMPLOYEE ERROR STATES
const employeeNameError = ref<string>('');
const employeeDesignationError = ref<string>('');
const employeeIdError = ref<string>('');
const employeePhoneError = ref<string>('');
const employeeEmailError = ref<string>('');

// PHONE/EMAIL VALIDATION
const { isValidPhone: isEmployeePhoneValid, formatPhoneNumber: formatEmployeePhoneNumber } = usePhoneValidator(employeePhone);
const { isValidEmail: isEmployeeEmailValid } = useEmailValidator(employeeEmail);

// OFFICE PHONE
const officePhoneNumberError = ref<string>('');
// OFFICE EMAIL
const officeEmailAddressError = ref<string>('');

// LOAD SAVED DATA FROM LOCALSTORAGE ON MOUNT
onMounted(() => {
    const savedData = localStorage.getItem('companyFormData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            // Populate company fields
            companyName.value = parsedData.company?.companyName || '';
            selectedCountry.value = parsedData.company?.country || '';
            selectedState.value = parsedData.company?.state || '';
            selectedCity.value = parsedData.company?.city || '';
            addressLine.value = parsedData.company?.addressLine || '';
            zipCode.value = parsedData.company?.zipCode || '';
            tradeLicense.value = parsedData.company?.tradeLicense || '';
            officePhoneNumber.value = parsedData.company?.phoneNumber || '';
            officeEmailAddress.value = parsedData.company?.emailAddress || '';
            // Populate employee fields
            employeeName.value = parsedData.employee?.employeeName || '';
            employeeDesignation.value = parsedData.employee?.employeeDesignation || '';
            employeeId.value = parsedData.employee?.employeeId || '';
            employeePhone.value = parsedData.employee?.employeePhone || '';
            employeeEmail.value = parsedData.employee?.employeeEmail || '';
        } catch (e) {
            console.error('Error parsing saved form data:', e);
        }
    }
});
const loading = ref(false);
const router = useRouter();
// FORM SUBMISSION HANDLER
const submitForm = async () => {
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
    employeeNameError.value = '';
    employeeDesignationError.value = '';
    employeeIdError.value = '';
    employeePhoneError.value = '';
    employeeEmailError.value = '';

    // CHECK REQUIRED COMPANY FIELDS
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
    } else if (!isValidPhone.value) {
        officePhoneNumberError.value = 'Enter a valid phone number (e.g., +1-123-456-7890)';
        hasErrors = true;
    }
    if (!officeEmailAddress.value) {
        officeEmailAddressError.value = 'Office email address is required';
        hasErrors = true;
    } else if (!isValidEmail.value) {
        officeEmailAddressError.value = 'Enter a valid email address';
        hasErrors = true;
    }
    if (!tradeLicense.value) {
        errorMessage.value = 'Trade license is required';
        hasErrors = true;
    } else if (errorMessage.value) {
        hasErrors = true;
    }

    // CHECK REQUIRED EMPLOYEE FIELDS
    if (!employeeName.value) {
        employeeNameError.value = 'Employee name is required';
        hasErrors = true;
    }
    if (!employeeDesignation.value) {
        employeeDesignationError.value = 'Designation is required';
        hasErrors = true;
    }
    if (!employeeId.value) {
        employeeIdError.value = 'Employee ID is required';
        hasErrors = true;
    }
    if (!employeePhone.value) {
        employeePhoneError.value = 'Phone number is required';
        hasErrors = true;
    } else if (!isEmployeePhoneValid.value) {
        employeePhoneError.value = 'Enter a valid phone number (e.g., +1-123-456-7890)';
        hasErrors = true;
    }
    if (!employeeEmail.value) {
        employeeEmailError.value = 'Email address is required';
        hasErrors = true;
    } else if (!isEmployeeEmailValid.value) {
        employeeEmailError.value = 'Enter a valid email address';
        hasErrors = true;
    }

    // STOP IF THERE ARE ERRORS
    if (hasErrors) {
        return;
    }

    // COLLECT FORM DATA (INCLUDE COMPANY AND EMPLOYEE INFO)
    const formData = {
        company: {
            companyName: companyName.value,
            country: selectedCountry.value,
            state: selectedState.value,
            city: selectedCity.value,
            addressLine: addressLine.value,
            zipCode: zipCode.value,
            tradeLicense: tradeLicense.value,
            phoneNumber: officePhoneNumber.value,
            emailAddress: officeEmailAddress.value,
        },
        employee: {
            employeeName: employeeName.value,
            employeeDesignation: employeeDesignation.value,
            employeeId: employeeId.value,
            employeePhone: employeePhone.value,
            employeeEmail: employeeEmail.value,
        },
    };

    // SAVE TO LOCALSTORAGE
    try {
        localStorage.setItem('companyFormData', JSON.stringify(formData));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }

    console.log('Form data to be submitted:', formData);

    // SEND DATA TO API
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API response:', result);

        localStorage.removeItem('companyFormData');

        // Reset the form
        companyName.value = '';
        selectedCountry.value = '';
        selectedState.value = '';
        selectedCity.value = '';
        addressLine.value = '';
        zipCode.value = '';
        tradeLicense.value = '';
        officePhoneNumber.value = '';
        officeEmailAddress.value = '';
        employeeName.value = '';
        employeeDesignation.value = '';
        employeeId.value = '';
        employeePhone.value = '';
        employeeEmail.value = '';

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit the form. Please try again later.');
    } finally {
        loading.value = false;
        router.push('/welcome');
    }
};
</script>
