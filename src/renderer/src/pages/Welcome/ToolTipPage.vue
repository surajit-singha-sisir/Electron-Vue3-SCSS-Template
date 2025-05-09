<script setup lang="ts">
import Tooltip from '../../components/ToolTip.vue'
</script>

<template>
    <div class="page-container">
        <h1>Tooltip Examples</h1>
        <div class="w-100 f-center">
            <!-- Example 1: Top tooltip with default trigger -->
            <Tooltip content="This is a top tooltip!" position="top">
                Top Tooltip
            </Tooltip>

        </div>
    </div>
</template>

<style scoped>
.page-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
}

.custom-trigger {
    color: #007bff;
    font-weight: bold;
    text-decoration: underline;
}

.trigger-button {
    padding: 8px 12px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.trigger-button:hover {
    background-color: #218838;
}

.icon {
    font-size: 20px;
    cursor: pointer;
}
</style>