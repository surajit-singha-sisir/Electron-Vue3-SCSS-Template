<template>
    <DefaultLayouts class="d-block relative">
        <section class="f-center h-100">
            <div class="main-screen w-95">
                <!-- WELCOME USER (DATE & TIME) -->
                <div v-if="welcomeData" class="welcome-data">
                    <p class="user-name">Howdy, Shuvo !</p>
                    <div class="onuman-date-time">
                        <time :datetime="new Date(welcomeData.date).toISOString()">{{ welcomeData.date }}</time>
                        <time :datetime="'T' + welcomeData.time">{{ welcomeData.time }}</time>
                    </div>
                </div>

                <div class="short-menus" v-if="shortmenus">
                    <button type="button" class="button short-menu" @click="newProject">
                        New Project
                    </button>
                </div>
            </div>
        </section>


    </DefaultLayouts>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'; 
import DefaultLayouts from '../../layouts/DefaultLayouts.vue';
import dashboardJSON from '../../assets/jsons/dashboardJSON.json';
import NewProject from '../../components/Dashboard/NewProject.vue';
import ModalBox from '../../components/UI/ModalBox.vue';

const router = useRouter();

// JSON FETCH
interface WelcomeData {
    date: string;
    time: string;
}

const welcomeData = ref<WelcomeData>({
    date: '',
    time: ''
});

// UPDATE TIME
const updateDateTime = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = now.toLocaleString('en-GB', { month: 'short' });
    const year = now.getFullYear();
    welcomeData.value.date = `${day} ${month}, ${year}`;

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    welcomeData.value.time = `${hours}:${minutes} ${ampm}`;
};

updateDateTime();

let intervalId: NodeJS.Timeout | null = null;
onMounted(() => {
    intervalId = setInterval(updateDateTime, 1000);
});

onUnmounted(() => {
    if (intervalId !== null) {
        clearInterval(intervalId);
    }
});

// SHORT MENUS
const shortmenus = [
    'New Project',
    'Materials',
    'Analyzer',
    'Chat',
    'FTP File Transfer',
    'How to Use ?'
];

// MODAL MANAGEMENT
const newProject =()=> {
    router.push('/addNewProject')
}
</script>