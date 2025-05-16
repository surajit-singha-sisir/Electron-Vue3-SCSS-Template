<template>

</template>
<script setup lang="ts">

// // MOTHERBOARD ID
// const motherboardID = ref < string > ('')
// // Store motherboard ID
// const saveMotherboardID = async (id: string) => {
//     await window.electronAPI.storeMotherboardID(id)
// }

// // Get motherboard ID
// const loadMotherboardID = async () => {
//     motherboardID.value = await window.electronAPI.getMotherboardID()
// }



// TOAST
// import { useToast } from '../../composables/Toast';
// const { showToast } = useToast();
// showToast('success', "You are now 🟢 online", 5000);



// USEAPI
// import { useApi } from '../composables/useApi'
// const response = ref<any>(null)
// let apiClient: any
//     // Immediately-invoked async function expression
//     ; (async () => {
//         const api = await useApi()
//         apiClient = api.apiClient

//         // Optionally, you can manually set token/ID
//         // api.setToken('manual-token')
//         // api.setSerialID('manual-id')
//     })()

// const fetchData = async () => {
//     if (!apiClient) return

//     // Define your JSON payload
//     const payload = {
//         name: 'My Project',
//         description: 'This is a test project',
//         status: 'active'
//     }

//     try {
//         const res = await apiClient.post('/api/create_project', payload)
//         response.value = res.data
//     } catch (err) {
//         console.error('API Error:', err)
//     }
// }

</script>