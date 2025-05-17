<template>
    <WelcomeLayout class="d-block relative">
        <section class="f-center h-vh-100">
            <div class="abs-center" ref="welcomeLoading">
                <h1 class="text-center animate-top-bottom">Welcome to</h1><br>
                <div class="onuman-logo w--150">
                    <img src="../../assets/images/Onuman-logo-full-white.svg" alt="Onuman Logo">
                </div>
                <div class="welcome-loader"></div>
            </div>
        </section>
    </WelcomeLayout>
</template>

<script setup lang="ts">
import WelcomeLayout from '../../layouts/WelcomeLayout.vue';
import { useApi } from '../../composables/useApi';
import { useElectronStore } from '../../composables/electronStore';
const { set: setOrganization, get: getOrganization } = useElectronStore()
import { useToast } from '../../composables/Toast'
import { useRouter } from 'vue-router';
const { showToast } = useToast()
const router = useRouter();
let apiClient: any;

; (async () => {
    const api = await useApi();
    apiClient = api.apiClient;
})();

// Get License Key
const getLicenseKey = async () => {
    await window.electronAPI.getLicenseKey();
};

if (!getLicenseKey) {
    router.push('/license');
} else {

    const fetchData = async () => {
        if (!apiClient) return;
        try {
            const res = await apiClient.get('/api/license');

            await setOrganization('organization', res.data);
            const getOrgJSON = await getOrganization('organization');
            console.log(getOrgJSON);


            // CHECK LICENSE VALIDATION
            if (getOrgJSON) {
                // LICENSE NOT FOUND
                if (getOrgJSON.license) {
                    console.log(getOrgJSON.license);
                } else {
                    console.log("No license found.");
                }
            } else {
                console.log("No organization found.");
            }



        } catch (err: string | any) {
            // console.log(err.response.data.license);

            // LICENSE NOT FOUND
            if (!err.response.data.license) {
                showToast('error', 'Organization not found. Please contact support.', 'infinite');
                // router.push('/license');
            }
            // ORGANIZATION NOT FOUND
            else if (!err.response.data.org) {
                showToast('error', 'Organization not found. Please contact support.', 'infinite');
            }
            // EMPLOYEE NOT FOUND
            else if (!err.response.data.employee) {
                showToast('error', 'Employee does not exist', 'infinite');
            }
            // EMPLOYEE NOT FOUND
            else if (!err.response.data.access) {
                showToast('error', 'Access Denied', 'infinite');
            }

            // LICENSE EXPIRED
            // else if (err.response.data.license === 'expired') {
            //     showToast('error', 'License expired. Please contact support.');
            // }
        }
    }
    setTimeout(() => {
        fetchData();
    }, 1000);
};


</script>
