<template>
    <DefaultLayouts class="d-block relative">
        <section class="f-center h-100 w-100"><br><br>
        <br><br>
            <form method="post" @submit.prevent="submitAddProject" class="main-screen w-95 h-100 onuman-scrollbar">
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
                                <button type="button" class="button project-btn m-b-05">Submit</button>
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
                                accept="image/*" @change="handleImageChange" />
                            <div class="project-image-preview" v-if="imageFileAvailable">
                                <img :src="imagePreviewUrl" alt="Project image preview" />
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


                    </aside>
                </div>
                <button type="submit" class="button project-btn m-b-05">Create Project</button>
            </form>
        </section>
    </DefaultLayouts>
</template>


<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayouts from '../../layouts/DefaultLayouts.vue';
import DatePicker from '../../components/UI/DatePicker.vue';
import { useValidators } from '../../composables/useValidators';
import OnumanCombobox from '../../components/OnumanCombobox.vue';
import Tooltip from '../../components/ToolTip.vue';
import axios from 'axios';
import { useNetworkStatus } from '../../composables/useNetworkStatus';
import { useToast } from '../../composables/Toast';

const retrievedKey = ref<string>('');
const retrieveLicenseKey = async () => {
    try {
        retrievedKey.value = await window.electronAPI.getLicenseKey();
    } catch (error) {
        console.error('FAILED TO RETRIEVE LICENSE KEY:', error);
        retrievedKey.value = 'FAILED TO RETRIEVE LICENSE KEY';
        showToast('error', "YOU HAVEN'T ANY LICENSE KEY");
    }
};

// Toast and network status
const { showToast } = useToast();
const { isOnline } = useNetworkStatus();

watch(isOnline, (newStatus) => {
    if (newStatus) {
        showToast('success', "You are now 🟢 online");
        console.log(newStatus);
    } else {
        showToast('error', "You are now 🔴 offline");
    }
});

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

// Building details
const selectedBuildingType = ref<string>('');

// All building types
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

function onNumberInputOld(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 3);
}

// Set mix ratio
const setMixRatioPopup = ref(false);
const setMixRatio = () => {
    setMixRatioPopup.value = true;
};
const setMixRatioOut = () => {
    setMixRatioPopup.value = !setMixRatioPopup.value;
};

// Reactive form data for mix ratio
const formData = reactive({
    mixRatioCement: null as number | null,
    mixRatioBrick: null as number | null,
    mixRatioSand: null as number | null,
    mixRatioStone: null as number | null,
    comment: '',
});

// Reactive errors for mix ratio validation
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
        showToast('success', 'Mix ratio submitted successfully!');
        // Reset form
        formData.mixRatioCement = null;
        formData.mixRatioBrick = null;
        formData.mixRatioSand = null;
        formData.mixRatioStone = null;
        formData.comment = '';
    } catch (error) {
        console.error('Error submitting form:', error);
        showToast('error', 'Failed to submit mix ratio. Please try again.');
    }
};

// Materials
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

// Add new material
const addNewMaterial = () => {
    const newId = `material-${Date.now()}`;
    materials.value.push({
        id: newId,
        name: `Material ${materials.value.length + 1}`,
        price: '',
        isEditing: false,
    });
};

const onNumberInput = (event: Event, id: string) => {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, '');
    const material = materials.value.find((m) => m.id === id);
    if (material) {
        material.price = value;
    }
};

// Delete material
const deleteCurrentMaterial = (id: string) => {
    const index = materials.value.findIndex((material) => material.id === id);
    if (index !== -1) {
        materials.value.splice(index, 1);
    }
};

// Toggle edit mode for material name
const toggleEditName = (id: string) => {
    const material = materials.value.find((m) => m.id === id);
    if (material) {
        material.isEditing = !material.isEditing;
    }
};

// Update material name
const updateMaterialName = (id: string, newName: string) => {
    const material = materials.value.find((m) => m.id === id);
    if (material && newName.trim()) {
        material.name = newName.trim();
        material.isEditing = false;
    }
};

// Handle blur to save name
const handleBlur = (id: string, event: Event) => {
    const input = event.target as HTMLInputElement;
    updateMaterialName(id, input.value);
};

// Handle Enter key to save name
const handleKeydown = (id: string, event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        const input = event.target as HTMLInputElement;
        updateMaterialName(id, input.value);
    }
};

// Project profile
const imageFileAvailable = ref(false);
const imagePreviewUrl = ref<string | undefined>(undefined);
const projectImageFile = ref<File | null>(null);

function handleImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file && file.type.startsWith('image/')) {
        projectImageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result;
            if (typeof result === 'string') {
                imagePreviewUrl.value = result;
                imageFileAvailable.value = true;
            } else {
                imagePreviewUrl.value = undefined;
                imageFileAvailable.value = false;
            }
        };
        reader.onerror = () => {
            console.error('Error reading file');
            imagePreviewUrl.value = undefined;
            imageFileAvailable.value = false;
        };
        reader.readAsDataURL(file); // Convert file to Base64
    } else {
        imagePreviewUrl.value = undefined;
        imageFileAvailable.value = false;
        projectImageFile.value = null;
    }
}

// Main form submission
interface MaterialSubmission {
    name: string;
    price: string;
}

interface ProjectFormData {
    projectName: string;
    startDate: string;
    endDate: string;
    clientName: string;
    clientAddress: string;
    clientPhone: string;
    projectDescription: string;
    buildingType: string;
    totalFloor: number;
    totalUnit: number;
    mixRatio: {
        cement: number | null;
        brick: number | null;
        sand: number | null;
        stone: number | null;
        comment: string;
    };
    materials: MaterialSubmission[];
    projectImage: File | null;
    onumanStart: string;
}

const projectFormData = ref<ProjectFormData>({
    projectName: '',
    startDate: '',
    endDate: '',
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    projectDescription: '',
    buildingType: '',
    totalFloor: 0,
    totalUnit: 0,
    mixRatio: {
        cement: null,
        brick: null,
        sand: null,
        stone: null,
        comment: ''
    },
    materials: [],
    projectImage: null,
    onumanStart: ''
});

const submitAddProject = async () => {
    if (!isOnline.value) {
        showToast('error', 'You are offline. Please connect to the internet.');
        return;
    }

    try {
        projectFormData.value.projectName = (document.querySelector('input[name="projectName"]') as HTMLInputElement)?.value || '';
        projectFormData.value.startDate = selectedDate.value ? selectedDate.value.toISOString().split('T')[0] : '';
        projectFormData.value.endDate = selectedEndDate.value ? selectedEndDate.value.toISOString().split('T')[0] : '';
        projectFormData.value.clientName = (document.querySelector('input[name="clientName"]') as HTMLInputElement)?.value || '';
        projectFormData.value.clientAddress = (document.querySelector('input[name="clientAddress"]') as HTMLInputElement)?.value || '';
        projectFormData.value.clientPhone = clientPhoneNumber.value;
        projectFormData.value.projectDescription = (document.querySelector('textarea[name="projectDescription"]') as HTMLTextAreaElement)?.value || '';
        projectFormData.value.buildingType = selectedBuildingType.value;
        projectFormData.value.totalFloor = parseInt((document.querySelector('input[name="totalFloor"]') as HTMLInputElement)?.value) || 0;
        projectFormData.value.totalUnit = parseInt((document.querySelector('input[name="totalUnit"]') as HTMLInputElement)?.value) || 0;
        projectFormData.value.mixRatio = {
            cement: formData.mixRatioCement,
            brick: formData.mixRatioBrick,
            sand: formData.mixRatioSand,
            stone: formData.mixRatioStone,
            comment: formData.comment
        };
        projectFormData.value.materials = materials.value.map(({ name, price }) => ({ name, price }));
        projectFormData.value.projectImage = projectImageFile.value;
        projectFormData.value.onumanStart = (document.querySelector('input[name="onumanStart"]:checked') as HTMLInputElement)?.value || '';

        // Validate required fields
        if (!projectFormData.value.projectName) throw new Error('Project name is required');
        if (!projectFormData.value.startDate || !projectFormData.value.endDate) throw new Error('Project duration is required');
        if (!projectFormData.value.clientName) throw new Error('Client name is required');
        if (!isValidPhone.value) throw new Error('Valid phone number is required (e.g., +1-123-456-7890)');
        if (!projectFormData.value.buildingType) throw new Error('Building type is required');

        // Create FormData for API submission
        const apiFormData = new FormData();
        apiFormData.append('projectName', projectFormData.value.projectName);
        apiFormData.append('startDate', projectFormData.value.startDate);
        apiFormData.append('endDate', projectFormData.value.endDate);
        apiFormData.append('clientName', projectFormData.value.clientName);
        apiFormData.append('clientAddress', projectFormData.value.clientAddress);
        apiFormData.append('clientPhone', projectFormData.value.clientPhone);
        apiFormData.append('projectDescription', projectFormData.value.projectDescription);
        apiFormData.append('buildingType', projectFormData.value.buildingType);
        apiFormData.append('totalFloor', projectFormData.value.totalFloor.toString());
        apiFormData.append('totalUnit', projectFormData.value.totalUnit.toString());
        apiFormData.append('mixRatio', JSON.stringify(projectFormData.value.mixRatio));
        apiFormData.append('materials', JSON.stringify(projectFormData.value.materials));
        apiFormData.append('onumanStart', projectFormData.value.onumanStart);
        if (projectFormData.value.projectImage) {
            apiFormData.append('projectImage', projectFormData.value.projectImage);
        }

        // Submit to API
        const response = await axios.post('http://192.168.0.111:8000/api/create_project', apiFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: retrievedKey.value
            }
        });

        showToast('success', 'Project created successfully!');
        console.log('Project submitted successfully:', response.data);

        // Reset form
        // selectedDate.value = new Date();
        // selectedEndDate.value = null;
        // clientPhoneNumber.value = '';
        // selectedBuildingType.value = '';
        // materials.value = [
        //     { id: 'cement', name: 'Cement', price: '', isEditing: false },
        //     { id: 'rod', name: 'Rod', price: '', isEditing: false },
        //     { id: 'brick', name: 'Brick', price: '', isEditing: false },
        //     { id: 'sand', name: 'Sand', price: '', isEditing: false },
        //     { id: 'stone', name: 'Stone', price: '', isEditing: false },
        //     { id: 'readymix', name: 'ReadyMix', price: '', isEditing: false },
        // ];
        // imageFileAvailable.value = false;
        // imagePreviewUrl.value = undefined;
        // projectImageFile.value = null;

        // Redirect to dashboard
        // router.push('/dashboard');

    } catch (error) {
        console.error('Error submitting project:', error);
        showToast('error', 'Failed to create project. Please try again.');
    }
};

// LIFECYCLE
onMounted(async () => {
    await retrieveLicenseKey();
});
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