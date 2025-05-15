<template>
    <div>
        <h2>Add New Project</h2><br>
        <form method="post" @submit.prevent="submitNewProject" class="scrollbar h-100">


            <div class="g-res-3-col-container gap-10 w-100 h-100">
                <aside>
                    <div class="f f-col gap-06 m-b-10">
                        <p>Project Name</p>
                        <input type="text" class="onuman-input" v-model="formData.projectName"
                            placeholder="Enter project name" tabindex="9" aria-label="Project name" id="project-name"
                            :aria-invalid="!formData.projectName && formSubmitted"
                            aria-describedby="project-name-error">
                        <p v-if="!formData.projectName && formSubmitted" class="red" id="project-name-error"
                            role="alert">
                            Project name is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p>Project Start Date</p>
                        <input type="date" class="onuman-input" v-model="formData.projectStartDate"
                            placeholder="Select start date" tabindex="10" aria-label="Project start date"
                            id="project-start-date" :aria-invalid="!formData.projectStartDate && formSubmitted"
                            aria-describedby="project-start-date-error">
                        <p v-if="!formData.projectStartDate && formSubmitted" class="red" id="project-start-date-error"
                            role="alert">
                            Project start date is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p>Project End Date</p>
                        <input type="date" class="onuman-input" v-model="formData.projectEndDate"
                            placeholder="Select end date" tabindex="11" aria-label="Project end date"
                            id="project-end-date" :aria-invalid="!formData.projectEndDate && formSubmitted"
                            aria-describedby="project-end-date-error">
                        <p v-if="!formData.projectEndDate && formSubmitted" class="red" id="project-end-date-error"
                            role="alert">
                            Project end date is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Client Name</p>
                        <input type="text" class="onuman-input" v-model="formData.clientName"
                            placeholder="Enter client name" tabindex="12" aria-label="Client name" id="client-name"
                            :aria-invalid="false" aria-describedby="client-name-error">
                        <p v-if="false" class="red" id="client-name-error" role="alert">
                            Client name is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Client Address</p>
                        <input type="text" class="onuman-input" v-model="formData.clientAddress"
                            placeholder="Enter client address" tabindex="13" aria-label="Client address"
                            id="client-address" :aria-invalid="false" aria-describedby="client-address-error">
                        <p v-if="false" class="red" id="client-address-error" role="alert">
                            Client address is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Building Type</p>
                        <input type="text" class="onuman-input" v-model="formData.buildingType"
                            placeholder="Enter building type" tabindex="14" aria-label="Building type"
                            id="building-type" :aria-invalid="false" aria-describedby="building-type-error">
                        <p v-if="false" class="red" id="building-type-error" role="alert">
                            Building type is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Total Floors</p>
                        <input type="number" class="onuman-input" v-model="formData.buildingTotalFloors"
                            placeholder="Enter total floors" tabindex="15" aria-label="Total floors"
                            id="building-total-floors" :aria-invalid="false"
                            aria-describedby="building-total-floors-error">
                        <p v-if="false" class="red" id="building-total-floors-error" role="alert">
                            Total floors is required
                        </p>
                    </div>
                </aside>

                <aside>
                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Total Units</p>
                        <input type="number" class="onuman-input" v-model="formData.buildingTotalUnits"
                            placeholder="Enter total units" tabindex="16" aria-label="Total units"
                            id="building-total-units" :aria-invalid="false"
                            aria-describedby="building-total-units-error">
                        <p v-if="false" class="red" id="building-total-units-error" role="alert">
                            Total units is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Mix Ratio - Cement</p>
                        <input type="text" class="onuman-input" v-model="formData.mixRatioCement"
                            placeholder="Enter cement mix ratio" tabindex="17" aria-label="Mix ratio cement"
                            id="mix-ratio-cement" :aria-invalid="false" aria-describedby="mix-ratio-cement-error">
                        <p v-if="false" class="red" id="mix-ratio-cement-error" role="alert">
                            Cement mix ratio is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Mix Ratio - Brick</p>
                        <input type="text" class="onuman-input" v-model="formData.mixRatioBrick"
                            placeholder="Enter brick mix ratio" tabindex="18" aria-label="Mix ratio brick"
                            id="mix-ratio-brick" :aria-invalid="false" aria-describedby="mix-ratio-brick-error">
                        <p v-if="false" class="red" id="mix-ratio-brick-error" role="alert">
                            Brick mix ratio is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Mix Ratio - Sand</p>
                        <input type="text" class="onuman-input" v-model="formData.mixRatioSand"
                            placeholder="Enter sand mix ratio" tabindex="19" aria-label="Mix ratio sand"
                            id="mix-ratio-sand" :aria-invalid="false" aria-describedby="mix-ratio-sand-error">
                        <p v-if="false" class="red" id="mix-ratio-sand-error" role="alert">
                            Sand mix ratio is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Mix Ratio - Stone</p>
                        <input type="text" class="onuman-input" v-model="formData.mixRatioStone"
                            placeholder="Enter stone mix ratio" tabindex="20" aria-label="Mix ratio stone"
                            id="mix-ratio-stone" :aria-invalid="false" aria-describedby="mix-ratio-stone-error">
                        <p v-if="false" class="red" id="mix-ratio-stone-error" role="alert">
                            Stone mix ratio is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Material Cost - Cement</p>
                        <input type="number" class="onuman-input" v-model="formData.materialCostCement"
                            placeholder="Enter cement cost" tabindex="21" aria-label="Material cost cement"
                            id="material-cost-cement" :aria-invalid="false"
                            aria-describedby="material-cost-cement-error">
                        <p v-if="false" class="red" id="material-cost-cement-error" role="alert">
                            Cement cost is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Material Cost - Brick</p>
                        <input type="number" class="onuman-input" v-model="formData.materialBrick"
                            placeholder="Enter brick cost" tabindex="22" aria-label="Material cost brick"
                            id="material-brick" :aria-invalid="false" aria-describedby="material-brick-error">
                        <p v-if="false" class="red" id="material-brick-error" role="alert">
                            Brick cost is required
                        </p>
                    </div>
                </aside>

                <aside>


                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Material Cost - Sand</p>
                        <input type="number" class="onuman-input" v-model="formData.materialSand"
                            placeholder="Enter sand cost" tabindex="23" aria-label="Material cost sand"
                            id="material-sand" :aria-invalid="false" aria-describedby="material-sand-error">
                        <p v-if="false" class="red" id="material-sand-error" role="alert">
                            Sand cost is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Material Cost - Stone</p>
                        <input type="number" class="onuman-input" v-model="formData.materialStone"
                            placeholder="Enter stone cost" tabindex="24" aria-label="Material cost stone"
                            id="material-stone" :aria-invalid="false" aria-describedby="material-stone-error">
                        <p v-if="false" class="red" id="material-stone-error" role="alert">
                            Stone cost is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Material Cost - Ready Mix</p>
                        <input type="number" class="onuman-input" v-model="formData.materialReadyMix"
                            placeholder="Enter ready mix cost" tabindex="25" aria-label="Material cost ready mix"
                            id="material-ready-mix" :aria-invalid="false" aria-describedby="material-ready-mix-error">
                        <p v-if="false" class="red" id="material-ready-mix-error" role="alert">
                            Ready mix cost is required
                        </p>
                    </div>
                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Project Image</p>
                        <input type="file" class="onuman-input" accept="image/*" @change="handleImageUpload"
                            tabindex="26" aria-label="Project image" id="project-image" :aria-invalid="false"
                            aria-describedby="project-image-error">
                        <p v-if="false" class="red" id="project-image-error" role="alert">
                            Project image is required
                        </p>
                    </div>

                    <div class="f f-col gap-06 m-b-10">
                        <p class="text-md">Project Phases</p>
                        <label>
                            <input type="checkbox" v-model="formData.onumanStartsExterior" tabindex="27"
                                aria-label="Exterior phase">
                            Exterior
                        </label>
                        <label>
                            <input type="checkbox" v-model="formData.onumanStartsFinish" tabindex="28"
                                aria-label="Finish phase">
                            Finish
                        </label>
                        <label>
                            <input type="checkbox" v-model="formData.onumanStartsInterior" tabindex="29"
                                aria-label="Interior phase">
                            Interior
                        </label>
                    </div>
                </aside>
            </div>

            <div class="w-100 f-center">
                <button type="submit" class="btn btn-alert" tabindex="30" aria-label="Submit Add New Project"
                    @click="handleSubmit">
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from '../../composables/Toast';
const { showToast } = useToast();
const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', data: Record<string, any>): void;
}>();

const formSubmitted = ref(false);
const formData = ref({
    companyName: '',
    projectName: '',
    projectStartDate: '',
    projectEndDate: '',
    clientName: '',
    clientAddress: '',
    buildingType: '',
    buildingTotalFloors: '',
    buildingTotalUnits: '',
    mixRatioCement: '',
    mixRatioBrick: '',
    mixRatioSand: '',
    mixRatioStone: '',
    materialCostCement: '',
    materialBrick: '',
    materialSand: '',
    materialStone: '',
    materialReadyMix: '',
    projectImage: null as File | null,
    onumanStartsExterior: true,
    onumanStartsFinish: false,
    onumanStartsInterior: false,
});

const resetForm = () => {
    formSubmitted.value = false;
    formData.value = {
        companyName: '',
        projectName: '',
        projectStartDate: '',
        projectEndDate: '',
        clientName: '',
        clientAddress: '',
        buildingType: '',
        buildingTotalFloors: '',
        buildingTotalUnits: '',
        mixRatioCement: '',
        mixRatioBrick: '',
        mixRatioSand: '',
        mixRatioStone: '',
        materialCostCement: '',
        materialBrick: '',
        materialSand: '',
        materialStone: '',
        materialReadyMix: '',
        projectImage: null,
        onumanStartsExterior: true,
        onumanStartsFinish: false,
        onumanStartsInterior: false,
    };
};

const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        formData.value.projectImage = input.files[0]; // Store the File object
    }
};

const submitNewProject = () => {
    formSubmitted.value = true;
    if (!formData.value.companyName || !formData.value.projectName ||
        !formData.value.projectStartDate || !formData.value.projectEndDate) {
        return;
    }
    emit('submit', formData.value);
    // resetForm();
    emit('close');
};

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
const handleSubmit = async (data: Record<string, any>) => {
    try {
        const response = await fetch('http://192.168.0.111:8000/api/create_project', {
            method: 'POST',
            headers: {
                Authorization: retrievedKey.value
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Project created successfully:', result);
    } catch (error) {
        console.error('Error creating project:', error);
        alert('Failed to create project. Please try again.');
    }
};

// LIFECYCLE
onMounted(async () => {
    await retrieveLicenseKey();
});
</script>