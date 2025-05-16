<template>
    <DefaultLayouts class="d-block relative">
        <section class="f-center onuman-main-scrollbar"><br><br>
            <br><br>
            <form method="post" @submit.prevent="submitAddProject" class="main-screen w-95" ref="mainForm">
                <br>
                <h1 class="text-center">CREATE A PROJECT</h1><br>
                <hr>
                <br><br>
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
                                    <input type="text" maxlength="3" placeholder="Enter total floors of the building"
                                        class="onuman-input2" name="totalFloor" id="totalFloor" inputmode="numeric"
                                        pattern="[0-9]*" @input="onNumberInputOld" />
                                </div>

                                <div class="sub-input">
                                    <label for="totalUnit">Total Units</label>
                                    <input type="text" maxlength="3" placeholder="Enter total units of the building"
                                        class="onuman-input2" name="totalUnit" id="totalUnit" inputmode="numeric"
                                        pattern="[0-9]*" @input="onNumberInputOld" />
                                </div>
                            </fieldset>
                        </div><br>

                        <!-- SET MIX RATIO -->
                        <div class="f-center gap-10 bordered-all relative">
                            <!-- POPUP FORM -->
                            <section class="setMixRatioPopup" :class="{ show: setMixRatioPopup }">
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
                                <button type="button" class="button project-btn m-b-05"
                                    @click="setMixRatioOut">Submit</button>
                            </section>

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

                        <!-- SET MATERIAL COST -->
                        <div class="onuman-input-box">
                            <fieldset class="f gap-05 f-col relative">
                                <legend>Set Materials Cost</legend>

                                <button type="button" class="plus-button" @click="addNewMaterial">
                                    <Tooltip content="Add new <b style='color: #24e4eb'>Material</b>" position="top">
                                        <i class="m-plus"></i>
                                    </Tooltip>
                                </button>

                                <div v-for="material in materials" :key="material.id"
                                    class="sub-input sub-input-wrapper hover-maker">
                                    <label :for="material.id" @dblclick="toggleEditName(material.id)">
                                        <i class="m-meteor">&nbsp;</i>
                                        <span v-if="!material.isEditing">{{ material.name }}</span>
                                        <input v-else type="text" :value="material.name" :name="material.name"
                                            class="onuman-input-project" @blur="handleBlur(material.id, $event)"
                                            @keydown="handleKeydown(material.id, $event)" autofocus />
                                    </label>

                                    <Tooltip content="Set Price per unit" position="top">
                                        <input type="text" maxlength="5" :placeholder="`Ex: 30 taka`"
                                            class="onuman-input2" :name="material.id" :id="material.id"
                                            inputmode="numeric" pattern="[0-9]*" :value="material.price"
                                            @input="onNumberInput($event, material.id)" />
                                    </Tooltip>
                                    <div class="relative w--10" title="Delete Material">
                                        <i @click="deleteCurrentMaterial(material.id)"
                                            class="m-cross1 abs-center material-icon"></i>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <br>


                    </aside>

                    <aside>
                        <div class="project-image">
                            <label for="projectImage">Set Project Image</label>
                            <input type="file" name="projectImage" id="projectImage" class="onuman-input2"
                                accept="image/*" @change="handleFileChange" />
                            <div class="project-image-preview" v-if="imageUrl">
                                <img :src="imageUrl" alt="Project image preview" name="image" />
                            </div>
                        </div><br>
                        <div class="onuman-start-with">
                            <p><b>Onuman</b> starts with ...</p>
                            <div class="checkbox">
                                <input type="radio" name="onumanStart" id="exterior" value="exterior">
                                <label for="exterior">Exterior</label>
                            </div>
                            <div class="checkbox">
                                <input type="radio" name="onumanStart" id="finish" value="finish">
                                <label for="finish">Finish</label>
                            </div>
                            <div class="checkbox">
                                <input type="radio" name="onumanStart" id="interior" value="interior">
                                <label for="interior">Interior</label>
                            </div>
                        </div>
                        <br>
                        <hr>
                        <div class="f-end-center">
                            <button type="submit" class="btn btn-primary m-t-10" @click="GoToPile">Create
                                Project</button>
                        </div>

                    </aside>
                </div>
            </form>
        </section>
    </DefaultLayouts>
</template>


<script setup lang="ts">
/* ----------------------------------------
| IMPORTS
---------------------------------------- */
import { ref, reactive, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayouts from '../../layouts/DefaultLayouts.vue';
import DatePicker from '../../components/UI/DatePicker.vue';
import OnumanCombobox from '../../components/OnumanCombobox.vue';
import Tooltip from '../../components/ToolTip.vue';

import { useToast } from '../../composables/Toast';
import { useApi } from '../../composables/useApi';
import { useValidators } from '../../composables/useValidators';
import { useImageUploader } from '../../composables/useImageUploader';
import { useNetworkStatus } from '../../composables/useNetworkStatus';

/* ----------------------------------------
| CONSTANTS AND REFS
---------------------------------------- */

// TOAST & NETWORK
const { showToast, dismissToast } = useToast();
const { isOnline } = useNetworkStatus();
const networkStatus = ref<boolean>(true);
// watch(isOnline, (val) => { networkStatus.value = val; console.log(isOnline.value); });

// ROUTER
const router = useRouter();

// USE API (Composable)
let apiClient: any;

// IMAGE UPLOAD
const { uploadImage } = useImageUploader();
const imageUrl = ref<string | null>(null);

// LICENSE KEY
const retrievedKey = ref<string>('');

// DATE SELECTION
const selectedDate = ref<Date | null>(new Date());
const selectedEndDate = ref<Date | null>(null);

// PHONE VALIDATION
const clientPhoneNumber = ref<string>('');
const { usePhoneValidator } = useValidators();
const { isValidPhone, formatPhoneNumber } = usePhoneValidator(clientPhoneNumber);

// BUILDING SELECTION
const selectedBuildingType = ref<string>('');
const buildingType = [
    'Bungalow', 'Apartment', 'Condominium', 'Townhouse', 'Villa', 'Cottage', 'Mansion', 'Skyscraper',
    'Duplex', 'Triplex', 'Loft', 'Penthouse', 'Rowhouse', 'Modular Home', 'Tiny House', 'Ranch House',
    'Colonial', 'Victorian', 'Tudor', 'Cape Cod', 'Contemporary', 'Traditional', 'Farmhouse', 'Chalet',
    'Log Cabin', 'Split-Level', 'Mobile Home', 'Geodesic Dome', 'A-Frame', 'Courtyard House', 'Terraced House',
    'Brownstone', 'Shotgun House', 'Yurt', 'Treehouse', 'Houseboat', 'High-Rise', 'Mid-Rise', 'Low-Rise',
    'Office Building', 'Retail Store', 'Shopping Mall', 'Warehouse', 'Factory', 'School', 'Hospital', 'Library',
    'Museum', 'Theater', 'Stadium', 'Airport Terminal', 'Train Station', 'Mosque', 'Church', 'Temple', 'Synagogue',
    'Community Center', 'Civic Center', 'Courthouse', 'Prison', 'Fire Station', 'Police Station', 'Hotel', 'Motel',
    'Resort', 'Spa', 'Barn', 'Silo', 'Greenhouse', 'Pavilion', 'Pagoda', 'Castle', 'Fortress', 'Lighthouse',
    'Windmill', 'Observatory'
];

// MIX RATIO POPUP
const setMixRatioPopup = ref(false);
const setMixRatio = () => {
    setMixRatioPopup.value = true;
};
const setMixRatioOut = () => {
    setMixRatioPopup.value = !setMixRatioPopup.value;
};
// MIX RATIO ERRORS
const errors = reactive({
    mixRatioCement: '',
    mixRatioBrick: '',
    mixRatioSand: '',
    mixRatioStone: '',
});

// MATERIALS
interface Material {
    id: string;
    name: string;
    price: string;
    isEditing: boolean;
}

const materials = ref<Material[]>([
    { id: 'cement', name: 'Cement', price: '', isEditing: false },
    { id: 'rod', name: 'Rod', price: '', isEditing: false },
    { id: 'brick', name: 'Brick', price: '', isEditing: false },
    { id: 'sand', name: 'Sand', price: '', isEditing: false },
    { id: 'stone', name: 'Stone', price: '', isEditing: false },
    { id: 'readymix', name: 'ReadyMix', price: '', isEditing: false },
]);

// FORM DATA
const mainForm = ref<HTMLFormElement | null>(null);
const localStorageKey = 'onumanFormData';

/* ----------------------------------------
| IMAGE HANDLING
---------------------------------------- */
const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    imageUrl.value = URL.createObjectURL(file);

    try {
        const uploadedUrl = await uploadImage(file);
        if (uploadedUrl) {
            imageUrl.value = 'http://192.168.0.111:8000' + uploadedUrl;
        }
    } catch (error) {
        console.error('Image upload failed:', error);
    }
};


/* ----------------------------------------
| NUMBER INPUT HANDLER OLD
---------------------------------------- */
function onNumberInputOld(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 3);
}

/* ----------------------------------------
| MATERIAL HANDLING
---------------------------------------- */
const addNewMaterial = () => {
    materials.value.push({
        id: `material-${Date.now()}`,
        name: `Material ${materials.value.length + 1}`,
        price: '',
        isEditing: false,
    });
};

const onNumberInput = (event: Event, id: string) => {
    const input = event.target as HTMLInputElement;
    const material = materials.value.find((m) => m.id === id);
    if (material) {
        material.price = input.value.replace(/[^0-9]/g, '');
    }
};

const deleteCurrentMaterial = (id: string) => {
    const index = materials.value.findIndex((m) => m.id === id);
    if (index !== -1) materials.value.splice(index, 1);
};

const toggleEditName = (id: string) => {
    const material = materials.value.find((m) => m.id === id);
    if (material) material.isEditing = !material.isEditing;
};

const updateMaterialName = (id: string, newName: string) => {
    const material = materials.value.find((m) => m.id === id);
    if (material && newName.trim()) {
        material.name = newName.trim();
        material.isEditing = false;
    }
};

const handleBlur = (id: string, event: Event) => updateMaterialName(id, (event.target as HTMLInputElement).value);
const handleKeydown = (id: string, event: KeyboardEvent) => {
    if (event.key === 'Enter') handleBlur(id, event);
};

/* ----------------------------------------
| MIX RATIO
---------------------------------------- */
const formData = ref({
    mixRatioCement: 1,
    mixRatioBrick: 3,
    mixRatioSand: 1.5,
    mixRatioStone: 3,
    comment: '',
});

const mixRatio = computed(() => ({
    cement: formData.value.mixRatioCement,
    brick: formData.value.mixRatioBrick,
    sand: formData.value.mixRatioSand,
    stone: formData.value.mixRatioStone,
    comment: formData.value.comment || '',
}));

/* ----------------------------------------
| FORM PERSISTENCE (LOCAL STORAGE)
---------------------------------------- */
const saveFormToLocalStorage = () => {
    if (!mainForm.value) return;
    const formData = new FormData(mainForm.value);
    const formObject: Record<string, string> = {};

    formData.forEach((value, key) => {
        if (typeof value === 'string') formObject[key] = value;
    });

    localStorage.setItem(localStorageKey, JSON.stringify(formObject));
};

const loadFormFromLocalStorage = () => {
    if (!mainForm.value) return;
    const saved = localStorage.getItem(localStorageKey);
    if (!saved) return;

    try {
        const savedData: Record<string, string> = JSON.parse(saved);
        Object.entries(savedData).forEach(([key, value]) => {
            const input = mainForm.value?.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLTextAreaElement | null;
            if (input) {
                input.value = value;
                input.dispatchEvent(new Event('input'));
            }
        });
    } catch (e) {
        console.warn('Failed to parse saved form:', e);
    }
};

const attachFormAutoSave = () => {
    if (!mainForm.value) return;
    mainForm.value.addEventListener('input', saveFormToLocalStorage);
    mainForm.value.addEventListener('change', saveFormToLocalStorage);
};

/* ----------------------------------------
| LIFECYCLE
---------------------------------------- */
onMounted(async () => {
    const api = await useApi();
    apiClient = api.apiClient;

    loadFormFromLocalStorage();
    attachFormAutoSave();
});

/* ----------------------------------------
| NAVIGATION
---------------------------------------- */
const GoToPile = () => router.push('/pile');

/* ----------------------------------------
| SUBMIT HANDLER
---------------------------------------- */
const submitAddProject = async () => {
    if (!mainForm.value || !apiClient) return;

    const raw = new FormData(mainForm.value);
    const formObject: Record<string, any> = {};
    raw.forEach((value, key) => (formObject[key] = value));

    Object.assign(formObject, {
        startDate: selectedDate.value?.toISOString().split('T')[0] || '',
        endDate: selectedEndDate.value?.toISOString().split('T')[0] || '',
        buildingType: selectedBuildingType.value || '',
        clientPhone: clientPhoneNumber.value || '',
        materials: materials.value.map((m) => ({ name: m.name, price: m.price })),
        mixRatio: mixRatio.value,
        projectImage: imageUrl.value || '',
        totalFloor: parseInt(formObject.totalFloor, 10) || 0,
        totalUnit: parseInt(formObject.totalUnit, 10) || 0,
    });

    ['cement', 'rod', 'brick', 'sand', 'stone', 'readymix'].forEach((key) => delete formObject[key]);

    if (!formObject.projectName || !formObject.clientName || !formObject.startDate || !formObject.endDate) {
        showToast('reminder', 'Missing required fields', 10000);
        return;
    }

    try {
        await apiClient.post('/api/create_project', formObject);
        showToast('success', 'Project created successfully', 10000, 'right-bottom');
        localStorage.removeItem(localStorageKey);
    } catch (error) {
        showToast('error', 'Encountered an error', 5000, 'right-bottom');
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

.material-icon {
    display: none;
    cursor: pointer;
    color: #969696;
    font-size: 1.1rem;
    margin-top: 3px;

    &:hover {
        color: #ff3f3f;
    }
}

.hover-maker:hover {
    .material-icon {
        display: block;
    }
}
</style>