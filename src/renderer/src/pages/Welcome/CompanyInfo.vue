<template>
    <WelcomeLayout>
        <form enctype="multipart/form-data" class="main-screen h-100 w-100 f-start-center f-col gap-10" method="post"
            @submit.prevent="submitForm">
            <div class="onuman-logo w--100 m-t-50">
                <img src="../../assets/images/Onuman-logo-full-white.svg" alt="Onuman Logo">
            </div><br>
            <section class="g-res-2-col-container gap-10 two-column">
                <!-- COMPANY INFORMATION -->
                <aside class="company-info columned">
                    <div class="company-info-warning">
                        <Tooltip class="info-tooltip"
                            :content="hasCompanyData ? 'Company information is pre-filled and cannot be edited' : 'Further you cannot change the company information. So carefully fill the inputs'"
                            position="right" id="company-name-tooltip"><i class="m-info3"></i>
                        </Tooltip>
                    </div><br>

                    <div class="onuman-input-box">
                        <label for="company-name-input" id="company-name-label">Company Name</label>
                        <Tooltip
                            :content="hasCompanyData ? 'Company name is pre-filled and cannot be edited' : 'Enter the legal name of your company'"
                            position="top" id="company-name-tooltip">
                            <input type="text" id="company-name-input" name="companyName" class="onuman-input2"
                                placeholder="Enter your company name" v-model="companyName"
                                aria-labelledby="company-name-label"
                                aria-describedby="company-name-tooltip company-name-error" :disabled="hasCompanyData"
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
                                    <Tooltip
                                        :content="hasCompanyData ? 'Country is pre-filled and cannot be edited' : 'Select the country of your office'"
                                        position="top" id="country-tooltip">
                                        <OnumanCombobox id="onuman-combobox-country" name="country"
                                            :options="countryOptions" placeholder="Select Country"
                                            v-model:selected="selectedCountry" role="combobox"
                                            aria-describedby="country-tooltip country-error" :disabled="hasCompanyData"
                                            aria-controls="onuman-combobox-country-listbox" aria-expanded="false"
                                            :aria-invalid="!!countryError" tabindex="0" />
                                    </Tooltip>
                                    <span v-if="countryError" class="red" id="country-error">
                                        {{ countryError }}
                                    </span>
                                </div>
                                <!-- STATE COMBOBOX -->
                                <div class="combobox-wrapper">
                                    <Tooltip
                                        :content="hasCompanyData ? 'State is pre-filled and cannot be edited' : 'Select the state or division or province'"
                                        position="top" id="state-tooltip">
                                        <OnumanCombobox id="onuman-combobox-state" name="state" :options="stateOptions"
                                            placeholder="Select State" :disabled="!selectedCountry || hasCompanyData"
                                            v-model:selected="selectedState" role="combobox"
                                            aria-describedby="state-tooltip state-error"
                                            aria-controls="onuman-combobox-state-listbox" aria-expanded="false"
                                            :aria-disabled="!selectedCountry || hasCompanyData"
                                            :aria-invalid="!!stateError" tabindex="0" />
                                    </Tooltip>
                                    <span v-if="stateError" class="red" id="state-error">
                                        {{ stateError }}
                                    </span>
                                </div>
                                <!-- CITY COMBOBOX -->
                                <div class="combobox-wrapper">
                                    <Tooltip
                                        :content="hasCompanyData ? 'City is pre-filled and cannot be edited' : 'Select the city or district'"
                                        position="top" id="city-tooltip">
                                        <OnumanCombobox id="onuman-combobox-city" name="city" :options="cityOptions"
                                            placeholder="Select City" :disabled="!selectedState || hasCompanyData"
                                            v-model:selected="selectedCity" role="combobox"
                                            aria-describedby="city-tooltip city-error"
                                            aria-controls="onuman-combobox-city-listbox" aria-expanded="false"
                                            :aria-disabled="!selectedState || hasCompanyData"
                                            :aria-invalid="!!cityError" tabindex="0" />
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
                                    aria-describedby="address-line-error" :disabled="hasCompanyData"
                                    :aria-invalid="!!addressLineError" />
                                <span v-if="addressLineError" class="red" id="address-line-error">
                                    {{ addressLineError }}
                                </span>
                                <input type="text" id="zip-code-input" name="zipCode" class="onuman-input2"
                                    placeholder="ZIP Code" v-model="zipCode" aria-labelledby="office-address-legend"
                                    aria-describedby="zip-code-error" :disabled="hasCompanyData"
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
                        <Tooltip
                            :content="hasCompanyData ? 'Trade license is pre-filled and cannot be edited' : 'Enter the local authorization number. Ex: TIN/EIN/BIN'"
                            position="top" id="trade-license-tooltip">
                            <input v-model="tradeLicense" type="text" id="company-trade-license-input"
                                name="tradeLicense" class="onuman-input2" placeholder="Enter your trade license number"
                                :class="{ 'input-error': errorMessage }" maxlength="18"
                                aria-labelledby="trade-license-label"
                                aria-describedby="trade-license-tooltip trade-license-error" :disabled="hasCompanyData"
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
                            aria-describedby="phone-number-error" :disabled="hasCompanyData"
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
                            :disabled="hasCompanyData" :aria-invalid="!isValidEmail && !!officeEmailAddress" />
                        <span v-if="!isValidEmail && officeEmailAddress" class="red" id="email-address-error">
                            Please enter a valid email address (e.g., yourname@domain.com)
                        </span>
                        <span v-if="officeEmailAddressError" class="red" id="office-email-error">
                            {{ officeEmailAddressError }}
                        </span>
                    </div>
                    <div class="onuman-input-box">
                        <label for="company-logo-input" id="company-logo-label">Company Logo</label>
                        <Tooltip
                            :content="hasCompanyData ? 'Company logo is pre-filled and cannot be edited' : 'Recommended: 400x400px'"
                            position="top" id="company-logo-tooltip">
                            <input type="file" id="company-logo-input" name="companyLogo" class="onuman-input2"
                                @change="handleCompanyLogo" accept="image/jpeg, image/png, image/svg+xml"
                                aria-labelledby="company-logo-label"
                                aria-describedby="company-logo-tooltip company-logo-error" :disabled="hasCompanyData"
                                :aria-valid="!!companyLogoError">
                        </Tooltip>
                        <span v-if="companyLogoError" class="red" id="company-logo-error">
                            {{ companyLogoError }}
                        </span>
                    </div>
                </aside>

                <!-- EMPLOYEE INFORMATION -->
                <aside class="employee-info columned">
                    <h3>Employee Information</h3>
                    <hr>

                    <!-- YOUR NAME -->
                    <div class="onuman-input-box">
                        <label for="employee-name-input" id="employee-name-label">Your Name</label>
                        <input type="text" id="employee-name-input" name="employeeName" class="onuman-input2"
                            placeholder="Enter your name" v-model="employeeName" :aria-invalid="!!employeeNameError"
                            aria-labelledby="employee-name-label" aria-describedby="employee-name-error"
                            maxlength="200">
                        <span v-if="employeeNameError" class="red" id="employee-name-error">{{ employeeNameError
                            }}</span>
                    </div>

                    <!-- YOUR DESIGNATION -->
                    <div class="onuman-input-box">
                        <label for="employee-designation-input" id="employee-designation-label">Your Designation</label>
                        <input type="text" id="employee-designation-input" name="employeeDesignation"
                            class="onuman-input2" placeholder="Enter your designation" v-model="employeeDesignation"
                            :aria-invalid="!!employeeDesignationError" aria-labelledby="employee-designation-label"
                            aria-describedby="employee-designation-error" maxlength="200">
                        <span v-if="employeeDesignationError" class="red" id="employee-designation-error">{{
                            employeeDesignationError }}</span>
                    </div>

                    <!-- EMPLOYEE ID -->
                    <div class="onuman-input-box">
                        <label for="employee-id-input" id="employee-id-label">Employee ID</label>
                        <input type="text" id="employee-id-input" name="employeeId" class="onuman-input2"
                            placeholder="Enter your employee ID" v-model="employeeId" :aria-invalid="!!employeeIdError"
                            aria-labelledby="employee-id-label" aria-describedby="employee-id-error" maxlength="200">
                        <span v-if="employeeIdError" class="red" id="employee-id-error">{{ employeeIdError }}</span>
                    </div>

                    <!-- YOUR PHONE NO. -->
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

                    <!-- YOUR EMAIL ADDRESS -->
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

                    <div class="onuman-input-box">
                        <label for="employee-logo-input" id="employee-logo-label">Your Profile Picture</label>
                        <Tooltip content="Recommended: 400x400px" position="top" id="employee-logo-tooltip">
                            <input type="file" id="employee-logo-input" name="employeeLogo" class="onuman-input2"
                                @change="handleEmployeeLogo" accept="image/*" aria-labelledby="employee-logo-label"
                                aria-describedby="employee-logo-tooltip employee-logo-error" aria-required="true"
                                :aria-valid="!!employeeLogoError">
                        </Tooltip>
                        <span v-if="employeeLogoError" class="red" id="employee-logo-error">
                            {{ employeeLogoError }}
                        </span>
                    </div>
                </aside>
            </section>
            <div class="w-95 f-end-center">
                <button type="submit" class="btn btn-primary m-b-30 w--100 float-right">
                    {{ loading ? 'Submitting...' : 'Submit' }}
                </button>
            </div>
        </form>
    </WelcomeLayout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import WelcomeLayout from '../../layouts/WelcomeLayout.vue';
import locationData from '../../assets/jsons/countryStateCity.json';
import OnumanCombobox from '../../components/OnumanCombobox.vue';
import Tooltip from '../../components/ToolTip.vue';
import { useValidators } from '../../composables/useValidators';
import { useRouter } from 'vue-router';
import type { SystemInfo } from '../../composables/SystemInfo';
import axios from 'axios';
import { useToast } from '../../composables/Toast';

// INTERFACES
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
interface Company {
    id: number;
    companyName: string;
    Logo: string;
    country: string;
    state: string;
    city: string;
    addressLine: string;
    zipCode: string;
    tradeLicense: string;
    phoneNumber: string;
    emailAddress: string;
    created_at: string;
    license_key: number;
}
interface OrgData {
    companies: Company[];
}

// COMPOSABLES
const { showToast } = useToast();
const { usePhoneValidator, useEmailValidator, useTradeLicenseValidator } = useValidators();
const router = useRouter();

// STATE - FORM STATUS
const loading = ref(false);
const hasErrors = ref(false);

// STATE - LOCATION DATA
const locations = ref<Country[]>(locationData as Country[]);
const error = ref<string | null>(null);
const selectedCountry = ref<string>('');
const selectedState = ref<string>('');
const selectedCity = ref<string>('');

// STATE - COMPANY FIELDS
const companyName = ref<string>('');
const companyNameError = ref<string>('');
const countryError = ref<string>('');
const stateError = ref<string>('');
const cityError = ref<string>('');
const addressLine = ref<string>('');
const addressLineError = ref<string>('');
const zipCode = ref<string>('');
const zipCodeError = ref<string>('');
const companyLogoFile = ref<File | null>(null);
const companyLogoError = ref<string>('');
const officePhoneNumber = ref<string>('');
const officePhoneNumberError = ref<string>('');
const officeEmailAddress = ref<string>('');
const officeEmailAddressError = ref<string>('');
const tradeLicense = ref<string>('');
const hasCompanyData = ref<boolean>(false);

// STATE - EMPLOYEE FIELDS
const employeeName = ref<string>('');
const employeeNameError = ref<string>('');
const employeeDesignation = ref<string>('');
const employeeDesignationError = ref<string>('');
const employeeId = ref<string>('');
const employeeIdError = ref<string>('');
const employeePhone = ref<string>('');
const employeePhoneError = ref<string>('');
const employeeEmail = ref<string>('');
const employeeEmailError = ref<string>('');
const employeeLogoFile = ref<File | null>(null);
const employeeLogoError = ref<string>('');

// STATE - SYSTEM INFO
const systemInfo = ref<SystemInfo | null>(null);
const serialNumber = ref<string>('Not fetched');

// STATE - API DATA
const getOrgData = ref<OrgData>({ companies: [] });
const retrievedKey = ref<string>('');

// VALIDATION
const { isValidPhone, formatPhoneNumber } = usePhoneValidator(officePhoneNumber);
const { isValidEmail } = useEmailValidator(officeEmailAddress);
const { errorMessage } = useTradeLicenseValidator(tradeLicense);
const { isValidPhone: isEmployeePhoneValid, formatPhoneNumber: formatEmployeePhoneNumber } = usePhoneValidator(employeePhone);
const { isValidEmail: isEmployeeEmailValid } = useEmailValidator(employeeEmail);

// COMPUTED - LOCATION OPTIONS
const countryOptions = computed(() => locations.value.map((country) => country.name).sort());
const stateOptions = computed(() => {
    const country = locations.value.find((c) => c.name === selectedCountry.value);
    return country ? country.states.map((state) => state.name).sort() : [];
});
const cityOptions = computed(() => {
    const country = locations.value.find((c) => c.name === selectedCountry.value);
    const state = country?.states.find((s) => s.name === selectedState.value);
    return state ? state.cities.map((city) => city.name).sort() : [];
});

// WATCHERS
watch(selectedCountry, () => {
    selectedState.value = '';
    selectedCity.value = '';
});
watch(selectedState, () => {
    selectedCity.value = '';
});

// INITIALIZATION FUNCTIONS
const validateLocationData = () => {
    if (!locationData || !Array.isArray(locationData)) {
        error.value = 'FAILED TO LOAD OR PARSE COUNTRY-STATE-CITY.JSON';
    }
};

const loadSavedFormData = () => {
    const savedData = localStorage.getItem('companyFormData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            if (!hasCompanyData.value) {
                companyName.value = parsedData.company?.companyName || '';
                selectedCountry.value = parsedData.company?.country || '';
                selectedState.value = parsedData.company?.state || '';
                selectedCity.value = parsedData.company?.city || '';
                addressLine.value = parsedData.company?.addressLine || '';
                zipCode.value = parsedData.company?.zipCode || '';
                tradeLicense.value = parsedData.company?.tradeLicense || '';
                officePhoneNumber.value = parsedData.company?.phoneNumber || '';
                officeEmailAddress.value = parsedData.company?.emailAddress || '';
            }
            employeeName.value = parsedData.employee?.employeeName || '';
            employeeDesignation.value = parsedData.employee?.employeeDesignation || '';
            employeeId.value = parsedData.employee?.employeeId || '';
            employeePhone.value = parsedData.employee?.employeePhone || '';
            employeeEmail.value = parsedData.employee?.employeeEmail || '';
        } catch (e) {
            showToast('error', 'ERROR PARSING SAVED FORM DATA:');
        }
    }
};

// SYSTEM INFO FUNCTIONS
const fetchSystemInfo = async () => {
    try {
        systemInfo.value = await window.electronAPI.getSystemInfo();
    } catch (error) {
        console.error('FAILED TO FETCH SYSTEM INFO:', error);
    }
};

const fetchSerialNumber = async () => {
    try {
        serialNumber.value = await window.electronAPI.getMotherboardSerial();
    } catch (error) {
        console.error('ERROR FETCHING MOTHERBOARD SERIAL:', error);
        serialNumber.value = 'FAILED TO FETCH';
    }
};

// API FUNCTIONS
const retrieveLicenseKey = async () => {
    try {
        retrievedKey.value = await window.electronAPI.getLicenseKey();
    } catch (error) {
        console.error('FAILED TO RETRIEVE LICENSE KEY:', error);
        retrievedKey.value = 'FAILED TO RETRIEVE LICENSE KEY';
        showToast('error', "YOU HAVEN'T ANY LICENSE KEY");
    }
};

const getDefaultData = async () => {
    try {
        const response = await axios.get(`http://192.168.0.111:8000/api/get_org/${retrievedKey.value}`);
        getOrgData.value = { companies: response.data };
        hasErrors.value = false;

        if (getOrgData.value.companies.length > 0) {
            hasCompanyData.value = true;
            const company = getOrgData.value.companies[0];
            companyName.value = company.companyName || '';
            selectedCountry.value = company.country || '';
            selectedState.value = company.state || '';
            selectedCity.value = company.city || '';
            addressLine.value = company.addressLine || '';
            zipCode.value = company.zipCode || '';
            tradeLicense.value = company.tradeLicense || '';
            officePhoneNumber.value = company.phoneNumber || '';
            officeEmailAddress.value = company.emailAddress || '';
        }
    } catch (error) {
        console.error('FAILED TO FETCH DEFAULT DATA:', error);
        showToast('error', 'FAILED TO LOAD DEFAULT ORGANIZATION DATA', 5000, 'right-bottom');
    }
};

// FILE HANDLING FUNCTIONS
const handleCompanyLogo = (event: Event) => {
    const input = event.target as HTMLInputElement;
    companyLogoFile.value = input.files && input.files.length > 0 ? input.files[0] : null;
    companyLogoError.value = '';
};

const handleEmployeeLogo = (event: Event) => {
    const input = event.target as HTMLInputElement;
    employeeLogoFile.value = input.files && input.files.length > 0 ? input.files[0] : null;
    employeeLogoError.value = '';
};

// VALIDATION FUNCTIONS
const resetErrors = () => {
    hasErrors.value = false;
    companyNameError.value = '';
    countryError.value = '';
    stateError.value = '';
    cityError.value = '';
    addressLineError.value = '';
    zipCodeError.value = '';
    officePhoneNumberError.value = '';
    officeEmailAddressError.value = '';
    companyLogoError.value = '';
    employeeNameError.value = '';
    employeeDesignationError.value = '';
    employeeIdError.value = '';
    employeePhoneError.value = '';
    employeeEmailError.value = '';
    employeeLogoError.value = '';
};

const validateCompanyFields = () => {
    if (hasCompanyData.value) return;

    if (!companyName.value.trim()) {
        companyNameError.value = 'COMPANY NAME IS REQUIRED';
        hasErrors.value = true;
    }
    if (!selectedCountry.value) {
        countryError.value = 'COUNTRY IS REQUIRED';
        hasErrors.value = true;
    }
    if (!selectedState.value) {
        stateError.value = 'STATE IS REQUIRED';
        hasErrors.value = true;
    }
    if (!selectedCity.value) {
        cityError.value = 'CITY IS REQUIRED';
        hasErrors.value = true;
    }
    if (!addressLine.value.trim()) {
        addressLineError.value = 'ADDRESS LINE IS REQUIRED';
        hasErrors.value = true;
    }
    if (!zipCode.value.trim()) {
        zipCodeError.value = 'ZIP CODE IS REQUIRED';
        hasErrors.value = true;
    }
    if (!officePhoneNumber.value) {
        officePhoneNumberError.value = 'OFFICE PHONE NUMBER IS REQUIRED';
        hasErrors.value = true;
    } else if (!isValidPhone.value) {
        officePhoneNumberError.value = 'ENTER A VALID PHONE NUMBER (E.G., +1-123-456-7890)';
        hasErrors.value = true;
    }
    if (!officeEmailAddress.value.trim()) {
        officeEmailAddressError.value = 'OFFICE EMAIL ADDRESS IS REQUIRED';
        hasErrors.value = true;
    } else if (!isValidEmail.value) {
        officeEmailAddressError.value = 'ENTER A VALID EMAIL ADDRESS';
        hasErrors.value = true;
    }
    if (!tradeLicense.value.trim()) {
        errorMessage.value = 'TRADE LICENSE IS REQUIRED';
        hasErrors.value = true;
    } else if (errorMessage.value) {
        hasErrors.value = true;
    }
    if (!companyLogoFile.value) {
        companyLogoError.value = 'COMPANY LOGO IS REQUIRED';
        hasErrors.value = true;
    }
};

const validateEmployeeFields = () => {
    if (!employeeName.value.trim()) {
        employeeNameError.value = 'EMPLOYEE NAME IS REQUIRED';
        hasErrors.value = true;
    }
    if (!employeeDesignation.value.trim()) {
        employeeDesignationError.value = 'DESIGNATION IS REQUIRED';
        hasErrors.value = true;
    }
    if (!employeeId.value.trim()) {
        employeeIdError.value = 'EMPLOYEE ID IS REQUIRED';
        hasErrors.value = true;
    }
    if (!employeePhone.value) {
        employeePhoneError.value = 'PHONE NUMBER IS REQUIRED';
        hasErrors.value = true;
    } else if (!isEmployeePhoneValid.value) {
        employeePhoneError.value = 'ENTER A VALID PHONE NUMBER (E.G., +1-123-456-7890)';
        hasErrors.value = true;
    }
    if (!employeeEmail.value.trim()) {
        employeeEmailError.value = 'EMAIL ADDRESS IS REQUIRED';
        hasErrors.value = true;
    } else if (!isEmployeeEmailValid.value) {
        employeeEmailError.value = 'ENTER A VALID EMAIL ADDRESS';
        hasErrors.value = true;
    }
    if (!employeeLogoFile.value) {
        employeeLogoError.value = 'PROFILE PICTURE IS REQUIRED';
        hasErrors.value = true;
    }
};

const validateLicenseKey = () => {
    if (!retrievedKey.value || retrievedKey.value === 'NO VALID LICENSE KEY FOUND' || retrievedKey.value === 'FAILED TO RETRIEVE LICENSE KEY') {
        showToast('error', 'A VALID LICENSE KEY IS REQUIRED', 5000, 'right-bottom');
        hasErrors.value = true;
    }
};

// FORM SUBMISSION FUNCTIONS
const saveToLocalStorage = () => {
    try {
        const storageData = {
            company: hasCompanyData.value ? {} : {
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
        localStorage.setItem('companyFormData', JSON.stringify(storageData));
    } catch (e) {
        console.error('ERROR SAVING TO LOCALSTORAGE:', e);
    }
};

const prepareFormData = () => {
    const formData = new FormData();
    if (!hasCompanyData.value) {
        formData.append('companyName', companyName.value);
        formData.append('addressLine', addressLine.value);
        formData.append('zipCode', zipCode.value);
        formData.append('phoneNumber', officePhoneNumber.value);
        formData.append('tradeLicense', tradeLicense.value);
        formData.append('emailAddress', officeEmailAddress.value);
        formData.append('country', selectedCountry.value);
        formData.append('state', selectedState.value);
        formData.append('city', selectedCity.value);
        if (companyLogoFile.value) {
            formData.append('logo', companyLogoFile.value);
        }
    }

    formData.append('license_key', retrievedKey.value);
    formData.append('employeeName', employeeName.value);
    formData.append('employeeDesignation', employeeDesignation.value);
    formData.append('employeeId', employeeId.value);
    formData.append('employeePhone', employeePhone.value);
    formData.append('employeeEmail', employeeEmail.value);
    formData.append('serial_number', serialNumber.value);
    formData.append('host_name', systemInfo.value?.hostname || 'UNKNOWN');
    formData.append('os', systemInfo.value?.platform || 'UNKNOWN');
    formData.append('ram', systemInfo.value?.totalMemory
        ? `${Math.round(systemInfo.value.totalMemory / (1024 * 1024 * 1024))}GB`
        : 'UNKNOWN');
    formData.append('cpu', systemInfo.value?.cpus?.[0]?.model || 'UNKNOWN');
    formData.append('mac', systemInfo.value?.networkInterfaces?.[Object.keys(systemInfo.value.networkInterfaces)[0]]?.[0]?.mac || 'UNKNOWN');
    formData.append('access', 'true');

    if (employeeLogoFile.value) {
        formData.append('photo', employeeLogoFile.value);
    }

    return formData;
};

const submitForm = async () => {
    resetErrors();
    validateCompanyFields();
    validateEmployeeFields();
    validateLicenseKey();

    if (hasErrors.value) {
        showToast('error', hasCompanyData.value ? 'PLEASE FILL ALL REQUIRED EMPLOYEE FIELDS' : 'PLEASE FILL ALL REQUIRED FIELDS', 5000, 'right-bottom');
        return;
    }

    await fetchSystemInfo();
    await fetchSerialNumber();
    saveToLocalStorage();

    try {
        loading.value = true;
        const formData = prepareFormData();
        const response = await axios.post('http://192.168.0.111:8000/api/org_info', formData);
        console.log('API RESPONSE:', response.data);
        localStorage.removeItem('companyFormData');
        showToast('success', 'SUCCESSFULLY COMPLETED ALL SETUP', 10000, 'right-bottom');
    } catch (error) {
        console.error('ERROR SUBMITTING FORM:', error);
        showToast('error', 'SOMETHING WENT WRONG', 5000, 'right-bottom');
    } finally {
        loading.value = false;
    }
};

// LIFECYCLE
onMounted(async () => {
    validateLocationData();
    loadSavedFormData();
    await retrieveLicenseKey();
    if (retrievedKey.value && retrievedKey.value !== 'FAILED TO RETRIEVE LICENSE KEY') {
        await getDefaultData();
    } else {
        console.error('NO VALID LICENSE KEY AVAILABLE TO FETCH DEFAULT DATA');
        showToast('error', 'FAILED TO LOAD DEFAULT DATA: INVALID LICENSE KEY', 5000, 'right-bottom');
    }
});
</script>