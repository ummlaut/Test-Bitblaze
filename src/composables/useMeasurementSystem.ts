import type { MeasurementSystem, SizeUnit } from '@/types/volume'
import { computed, ref } from 'vue'

const measurementSystem = ref<MeasurementSystem>('decimal')
const unitMap: Record<MeasurementSystem, Partial<Record<SizeUnit, SizeUnit>>> = {
  decimal: {
    KiB: 'KB',
    MiB: 'MB',
    GiB: 'GB',
  },
  binary: {
    KB: 'KiB',
    MB: 'MiB',
    GB: 'GiB',
  },
}

export function useMeasurementSystem() {
  const units = computed<SizeUnit[]>(() => {
    return measurementSystem.value === 'decimal'
      ? ['KB', 'MB', 'GB']
      : ['KiB', 'MiB', 'GiB']
  })

  function toggleSystem(next: 'decimal' | 'binary') {
    measurementSystem.value = next
  }

  function convertUnit(unit: SizeUnit): SizeUnit {
    return unitMap[measurementSystem.value][unit] ?? unit
  }

  return {
    measurementSystem,
    units,
    toggleSystem,
    convertUnit,
  }
}