<template>
    <DefaultLayouts class="d-block relative">
        <section class="f-center h-100 w-100">
            <div class="main-screen w-95"><br>
                <div class="g-res-3-col-container gap-10">
                    <aside>
                        <!-- PROJECT NAME -->
                        <div class="onuman-input-box">
                            <label for="projectName">Project Name</label>
                            <input type="text" class="onuman-input3" id="projectName" name="projectName"
                                placeholder="Enter your project name">
                        </div><br>

                        <!-- PROJECT DURATION -->
                        <div class="onuman-input-box">
                            <fieldset class="f gap-10">
                                <legend id="office-address-legend">Project Duration</legend>
                                <div class="sub-input">
                                    <label for="startDate">Start Date</label>
                                    <DatePicker v-model:selectedDate="selectedDate" />
                                </div>
                                <div class="sub-input">
                                    <label for="endDate">End Date</label>
                                    <DatePicker v-model:selectedDate="selectedEndDate" />
                                </div>
                            </fieldset>
                        </div><br>

                        <!-- CLIENT DETAILS -->
                        <div class="onuman-input-box">
                            <fieldset class="f gap-05 f-col">
                                <legend id="office-address-legend">Client Details</legend>
                                <div class="sub-input">
                                    <label for="clientName">Client Name</label>
                                    <input type="text" placeholder="Enter the client name" class="onuman-input2"
                                        name="clientName">
                                </div>
                                <div class="sub-input">
                                    <label for="clientAddress">Client Address</label>
                                    <input type="text" placeholder="Enter the client address" class="onuman-input2"
                                        name="clientAddress">
                                </div>
                                <div class="sub-input">
                                    <label for="clientPhone">Client Phone No.</label>
                                    <input type="tel" placeholder="+1-123-456-7890" class="onuman-input2"
                                        name="clientPhone" v-model="clientPhoneNumber"
                                        @input="formatPhoneNumber(clientPhoneNumber)" maxlength="17"
                                        aria-describedby="client-phone-error"
                                        :aria-invalid="!isValidPhone && !!clientPhoneNumber">
                                    <span v-if="!isValidPhone && clientPhoneNumber" class="error-message"
                                        id="client-phone-error">
                                        Please enter a valid phone number (e.g., +1-123-456-7890)
                                    </span>
                                </div>
                            </fieldset>
                        </div><br>

                        <!-- PROJECT DESCRIPTION -->
                        <div class="onuman-input-box">
                            <label for="projectDescription">Project Description</label>
                            <textarea type="text" class="onuman-input3" id="projectDescription"
                                name="projectDescription" placeholder="Enter your project description" />
                        </div><br>
                    </aside>

                    <aside>
                        <!-- BUILDING DETAILS -->
                        <div class="onuman-input-box">
                            <fieldset class="f gap-05 f-col">
                                <legend id="office-address-legend">Building Details</legend>
                                <Tooltip content="Add a proper type of the building" position="top"
                                    id="country-tooltip">
                                    <OnumanCombobox id="onuman-combobox-country" name="buildingType"
                                        :options="buildingType.sort()" placeholder="Select Building type"
                                        v-model:selected="selectedBuildingType" role="combobox" />
                                </Tooltip>
                                <div class="sub-input">
                                    <label for="totalFloor">Total Floors</label>
                                    <input type="text" placeholder="Enter total floor of the building"
                                        class="onuman-input2" name="totalFloor" id="totalFloor">
                                </div>
                                <div class="sub-input">
                                    <label for="totalUnit">Total Units</label>
                                    <input type="text" placeholder="Enter total Units of the building"
                                        class="onuman-input2" name="totalUnit" id="totalUnit">
                                </div>
                            </fieldset>
                        </div><br>

                        <!-- SET MIX RATIO -->
                        <div class="f-center gap-10 bordered-all relative">
                            <!-- POPUP FORM -->
                            <form class="setMixRatioPopup" :class="{ show: setMixRatioPopup }"
                                @submit.prevent="setMixRatioForm" method="post" autocomplete="off">
                                <div class="w-100 f-end-center" style="padding: 0.2rem 0;" @click="setMixRatioOut"><i
                                        class="m-cross1 bordered-circle w-10"></i>
                                </div>
                                <table class='short-table'>
                                    <thead>
                                        <tr>
                                            <th class="full-inline" colspan="2">Set New Mix Ratio</th>
                                        </tr>
                                        <tr>
                                            <th>Material</th>
                                            <th>Ratio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Cement</td>
                                            <td>
                                                <input type="number" class="onuman-input3" name="mixRatioCement"
                                                    v-model.number="formData.mixRatioCement" placeholder="Add Cement"
                                                    required min="0" step="0.1">
                                                <span v-if="errors.mixRatioCement" class="error-message">
                                                    {{ errors.mixRatioCement }}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Brick</td>
                                            <td>
                                                <input type="number" class="onuman-input3" name="mixRatioBrick"
                                                    v-model.number="formData.mixRatioBrick" placeholder="Add Brick"
                                                    required min="0" step="0.1">
                                                <span v-if="errors.mixRatioBrick" class="error-message">
                                                    {{ errors.mixRatioBrick }}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sand</td>
                                            <td>
                                                <input type="number" class="onuman-input3" name="mixRatioSand"
                                                    v-model.number="formData.mixRatioSand" placeholder="Add Sand"
                                                    required min="0" step="0.1">
                                                <span v-if="errors.mixRatioSand" class="error-message">
                                                    {{ errors.mixRatioSand }}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Stone</td>
                                            <td>
                                                <input type="number" class="onuman-input3" name="mixRatioStone"
                                                    v-model.number="formData.mixRatioStone" placeholder="Add Stone"
                                                    required min="0" step="0.1">
                                                <span v-if="errors.mixRatioStone" class="error-message">
                                                    {{ errors.mixRatioStone }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="d-block">
                                    <strong class=""><i class="m-bubble1"></i> Add Comment</strong>
                                    <textarea name="comment" class="m-tb-05 onuman-input3" v-model="formData.comment"
                                        placeholder="Optional comment"></textarea>
                                </div>
                                <button type="submit" class="button project-btn m-b-05">Submit</button>
                            </form>

                            <Tooltip content="Edit Mix Ratio" position="top" id="country-tooltip">
                                <button type="button" class="button project-btn" @click="setMixRatio">Set Mix
                                    Ratio</button>
                            </Tooltip>
                            <div class="w-10i">
                                <Tooltip
                                    content="<strong><u>Default Mix Ratio</u></strong><br><table class='short-table new-bg'><thead><tr><th>Material</th><th>Ratio</th></tr></thead><tbody><tr><td>Cement</td><td>1</td></tr><tr><td>Brick</td><td>3</td></tr><tr><td>Sand</td><td>1.5</td></tr><tr><td>Stone</td><td>3</td></tr></tbody></table>"
                                    position="top">
                                    <i class="m-info3 bordered-circle"></i>
                                </Tooltip>
                            </div>
                        </div><br>

                    </aside>
                </div>
            </div>
        </section>
        
    </DefaultLayouts>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayouts from '../../layouts/DefaultLayouts.vue';
import DatePicker from '../../components/UI/DatePicker.vue';
import { useValidators } from '../../composables/useValidators';
import OnumanCombobox from '../../components/OnumanCombobox.vue';
import Tooltip from '../../components/ToolTip.vue';
import axios from 'axios';
import { useNetworkStatus } from '../../composables/useNetworkStatus';
import { useToast } from '../../composables/Toast';
const { isOnline } = useNetworkStatus();

// Router setup
const router = useRouter();
const goBack = () => {
    router.push('/dashboard');
};

// Date setup
const selectedDate = ref<Date | null>(new Date()); // TODAY
const selectedEndDate = ref<Date | null>(null);

// Phone number setup
const clientPhoneNumber = ref<string>('');
const { usePhoneValidator } = useValidators();
const { isValidPhone, formatPhoneNumber } = usePhoneValidator(clientPhoneNumber);


// BUILDING DETAILS
const selectedBuildingType = ref<string>('');


// ALL BUILDING TYPES
const buildingType = [
    'Bungalow',
    'Apartment',
    'Condominium',
    'Townhouse',
    'Villa',
    'Cottage',
    'Mansion',
    'Skyscraper',
    'Duplex',
    'Triplex',
    'Loft',
    'Penthouse',
    'Rowhouse',
    'Modular Home',
    'Tiny House',
    'Ranch House',
    'Colonial',
    'Victorian',
    'Tudor',
    'Cape Cod',
    'Contemporary',
    'Traditional',
    'Farmhouse',
    'Chalet',
    'Log Cabin',
    'Split-Level',
    'Mobile Home',
    'Geodesic Dome',
    'A-Frame',
    'Courtyard House',
    'Terraced House',
    'Brownstone',
    'Shotgun House',
    'Yurt',
    'Treehouse',
    'Houseboat',
    'High-Rise',
    'Mid-Rise',
    'Low-Rise',
    'Office Building',
    'Retail Store',
    'Shopping Mall',
    'Warehouse',
    'Factory',
    'School',
    'Hospital',
    'Library',
    'Museum',
    'Theater',
    'Stadium',
    'Airport Terminal',
    'Train Station',
    'Mosque',
    'Church',
    'Temple',
    'Synagogue',
    'Community Center',
    'Civic Center',
    'Courthouse',
    'Prison',
    'Fire Station',
    'Police Station',
    'Hotel',
    'Motel',
    'Resort',
    'Spa',
    'Barn',
    'Silo',
    'Greenhouse',
    'Pavilion',
    'Pagoda',
    'Castle',
    'Fortress',
    'Lighthouse',
    'Windmill',
    'Observatory'
];

// SET MIX RATIO
const setMixRatioPopup = ref(false);
const setMixRatio = () => {
    setMixRatioPopup.value = true;
}
const setMixRatioOut = () => {
    setMixRatioPopup.value = !setMixRatioPopup.value;
}


// Reactive form data
const formData = reactive({
    mixRatioCement: null as number | null,
    mixRatioBrick: null as number | null,
    mixRatioSand: null as number | null,
    mixRatioStone: null as number | null,
    comment: '',
});

// Reactive errors for validation
const errors = reactive({
    mixRatioCement: '',
    mixRatioBrick: '',
    mixRatioSand: '',
    mixRatioStone: '',
});


const setMixRatioForm = async () => {
    // Reset errors
    errors.mixRatioCement = '';
    errors.mixRatioBrick = '';
    errors.mixRatioSand = '';
    errors.mixRatioStone = '';

    // Validate required fields
    let isValid = true;
    if (!formData.mixRatioCement || formData.mixRatioCement < 0) {
        errors.mixRatioCement = 'Cement ratio is required and must be non-negative.';
        isValid = false;
    }
    if (!formData.mixRatioBrick || formData.mixRatioBrick < 0) {
        errors.mixRatioBrick = 'Brick ratio is required and must be non-negative.';
        isValid = false;
    }
    if (!formData.mixRatioSand || formData.mixRatioSand < 0) {
        errors.mixRatioSand = 'Sand ratio is required and must be non-negative.';
        isValid = false;
    }
    if (!formData.mixRatioStone || formData.mixRatioStone < 0) {
        errors.mixRatioStone = 'Stone ratio is required and must be non-negative.';
        isValid = false;
    }

    if (!isValid) {
        return; // Stop if validation fails
    }

    try {
        const formDataToSend = new FormData();
        formDataToSend.append('mixRatioCement', formData.mixRatioCement!.toString());
        formDataToSend.append('mixRatioBrick', formData.mixRatioBrick!.toString());
        formDataToSend.append('mixRatioSand', formData.mixRatioSand!.toString());
        formDataToSend.append('mixRatioStone', formData.mixRatioStone!.toString());
        if (formData.comment) {
            formDataToSend.append('comment', formData.comment);
        }

        const response = await axios.post('http://192.168.0.111:8000/api/setMixRatio', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Form submitted successfully:', response.data);
        setMixRatioPopup.value = false;
        alert('Mix ratio submitted successfully!');

        // Reset form
        formData.mixRatioCement = null;
        formData.mixRatioBrick = null;
        formData.mixRatioSand = null;
        formData.mixRatioStone = null;
        formData.comment = '';
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit mix ratio. Please try again.');
    }
};

</script>







<style scoped lang="scss">
input {
    height: 2.1rem;
}

.tooltip-container {
    width: 100%;
}

.bordered-circle {
    font-size: 0.8rem;
    min-width: 1.5rem;
    cursor: pointer;

    &:hover {
        background-color: #364f53;
    }
}

.bordered-all {
    padding: 0.8rem;
}

.onuman-input-box {
    padding: 0;
}

.error-message {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.2rem;
    display: block;
}
</style>