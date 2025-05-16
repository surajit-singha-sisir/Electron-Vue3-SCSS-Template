<template>
    <DefaultLayouts class="d-block relative">
        <section class="f-center h-100 w-100"><br><br>
            <br><br>
            <form method="post" @submit.prevent="submitAddProject" class="main-screen w-95 h-100 onuman-scrollbar"
                ref="mainForm">
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

                        <div class="f-center">
                            <button type="submit" class="btn btn-primary m-t-10">Create Project</button>
                        </div>

                    </aside>
                </div>
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
import { useImageUploader } from '../../composables/useImageUploader'
import OnumanCombobox from '../../components/OnumanCombobox.vue';
import Tooltip from '../../components/ToolTip.vue';
import axios from 'axios';
import { useNetworkStatus } from '../../composables/useNetworkStatus';
import { useApi } from '../../composables/useApi'; let apiClient: any
import { useToast } from '../../composables/Toast';

// IMAGE UPLOAD

const { uploadImage } = useImageUploader()
const imageUrl = ref<string | null>(null)

const handleFileChange = async (event: Event) => {
    console.log('handleFileChange triggered')
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    // Optionally: show a local preview while uploading
    imageUrl.value = URL.createObjectURL(file)

    // Upload image and get server URL
    try {
        const uploadedUrl = await uploadImage(file)
        if (uploadedUrl) {
            imageUrl.value = 'http://192.168.0.111:8000' + uploadedUrl
            console.log('Image URL set to:', imageUrl.value)
        }

    } catch (error) {
        console.error('Image upload failed:', error)
    }
}

watch(imageUrl, (val) => {
    console.log('imageUrl changed:', val)
})


// LICENSE KEY
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
        showToast('success', "You are now online");
        console.log(newStatus);
    } else {
        showToast('error', "You are now offline");
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
// const formData = reactive({
//     mixRatioCement: null as number | null,
//     mixRatioBrick: null as number | null,
//     mixRatioSand: null as number | null,
//     mixRatioStone: null as number | null,
//     comment: '',
// });

// Reactive errors for mix ratio validation
const errors = reactive({
    mixRatioCement: '',
    mixRatioBrick: '',
    mixRatioSand: '',
    mixRatioStone: '',
});


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



// FORM DATA
const mainForm = ref<HTMLFormElement | null>(null)
const localStorageKey = 'onumanFormData'

// API
onMounted(async () => {
  const api = await useApi()
  apiClient = api.apiClient

  loadFormFromLocalStorage()
  attachFormAutoSave()
})

// SAVE FORM DATA TO LOCAL STORAGE
const saveFormToLocalStorage = () => {
  if (!mainForm.value) return

  const formData = new FormData(mainForm.value)
  const formObject: Record<string, string> = {}

  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      formObject[key] = value
    }
  })

  localStorage.setItem(localStorageKey, JSON.stringify(formObject))
}

// LOAD FORM DATA FROM LOCAL STORAGE
const loadFormFromLocalStorage = () => {
  if (!mainForm.value) return

  const saved = localStorage.getItem(localStorageKey)
  if (!saved) return

  try {
    const savedData: Record<string, string> = JSON.parse(saved)
    for (const [key, value] of Object.entries(savedData)) {
      const input = mainForm.value?.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLTextAreaElement | null
      if (input) {
        input.value = value
        input.dispatchEvent(new Event('input')) // Trigger v-model
      }
    }
  } catch (e) {
    console.warn('Failed to parse saved form:', e)
  }
}

// ATTACH AUTO-SAVE TO FORM INPUT
const attachFormAutoSave = () => {
  if (!mainForm.value) return
  mainForm.value.addEventListener('input', saveFormToLocalStorage)
  mainForm.value.addEventListener('change', saveFormToLocalStorage)
}

// MIX RATIO (computed from your formData object)
const formData = ref({
  mixRatioCement: 0,
  mixRatioBrick: 0,
  mixRatioSand: 0,
  mixRatioStone: 0,
  comment: '',
})

const mixRatio = computed(() => ({
  cement: formData.value.mixRatioCement,
  brick: formData.value.mixRatioBrick,
  sand: formData.value.mixRatioSand,
  stone: formData.value.mixRatioStone,
  comment: formData.value.comment || ''
}))

// SUBMIT FUNCTION
const submitAddProject = async () => {
  if (!mainForm.value || !apiClient) return

  const formDataRaw = new FormData(mainForm.value)
  const formObject: Record<string, any> = {}

  formDataRaw.forEach((value, key) => {
    formObject[key] = value
  })

  formObject.startDate = selectedDate.value ? selectedDate.value.toISOString().split('T')[0] : ''
  formObject.endDate = selectedEndDate.value ? selectedEndDate.value.toISOString().split('T')[0] : ''
  formObject.buildingType = selectedBuildingType.value || ''
  formObject.clientPhone = clientPhoneNumber.value || ''
  formObject.materials = materials.value.map((m) => ({ name: m.name, price: m.price }))
  formObject.mixRatio = mixRatio.value
  formObject.projectImage = imageUrl.value || ''
  formObject.totalFloor = parseInt(formObject.totalFloor, 10) || 0
  formObject.totalUnit = parseInt(formObject.totalUnit, 10) || 0

  // REMOVE MATERIAL KEYS IF THEY EXIST (already in mixRatio)
  const materialKeys = ['cement', 'rod', 'brick', 'sand', 'stone', 'readymix']
  materialKeys.forEach((key) => delete formObject[key])

  // VALIDATE REQUIRED
  if (!formObject.projectName || !formObject.clientName || !formObject.startDate || !formObject.endDate) {
    showToast('error', 'Missing required fields')
    return
  }

  try {
    const res = await apiClient.post('/api/create_project', formObject)
    showToast('success', 'Project created successfully', 10000, 'right-top')
    localStorage.removeItem(localStorageKey)
  } catch (error) {
    console.error('Submit error:', error)
    showToast('error', 'Encountered an error', 5000, 'right-top')
  }
}
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