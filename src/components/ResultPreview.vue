<template>
  <pre v-if="payload">
    {{ JSON.stringify(payload, null, 2) }}
  </pre>
</template>
<script setup lang="ts">
import type { VolumePayload } from '@/types/volume'

interface Props {
  payload: VolumePayload | null
}

defineProps<Props>()
</script>

