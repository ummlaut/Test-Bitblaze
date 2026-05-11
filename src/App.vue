<template>
  <main>
    <MeasurementSwitcher />
    <VolumeForm />
  </main>
</template>

<script setup lang="ts">
import MeasurementSwitcher from '@/components/MeasurementSwitcher.vue'
import VolumeForm from '@/components/VolumeForm.vue'
</script>

<style scoped lang="scss">
main {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>