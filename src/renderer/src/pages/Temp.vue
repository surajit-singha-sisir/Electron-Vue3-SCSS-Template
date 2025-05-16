<template>
  <div class="w-80 m-auto">
    <h1>API Example</h1>
    <button @click="fetchData" class="btn btn-primary">Call API</button>
    <button @click="backTo" class="btn btn-secondary">Back</button>
    <pre>{{ response }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApi } from '../composables/useApi'
import { useRouter } from 'vue-router';
const response = ref<any>(null)
let apiClient: any
  // Immediately-invoked async function expression
  ; (async () => {
    const api = await useApi()
    apiClient = api.apiClient

    // Optionally, you can manually set token/ID
    // api.setToken('manual-token')
    // api.setSerialID('manual-id')
  })()

const fetchData = async () => {
  if (!apiClient) return

  // Define your JSON payload
  const payload = {
    name: 'My Project',
    description: 'This is a test project',
    status: 'active'
  }

  try {
    const res = await apiClient.post('/api/create_project', payload)
    response.value = res.data
  } catch (err) {
    console.error('API Error:', err)
  }
}

const router = useRouter();
const backTo = () => {
  router.push('/dashboard');
}
</script>
