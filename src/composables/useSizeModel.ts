import { computed, ref } from 'vue'
import type { SizeUnit } from '@/types/volume'
import { toBytes, fromBytes } from '@/utils/bytes'

export function useSizeModel( initialValue = 0, initialUnit: SizeUnit = 'GB') {

  const bytes = ref(toBytes(initialValue, initialUnit))

  const unit = ref<SizeUnit>(initialUnit)

  // Здесь writable computed чтобы не писать несколько watch в компоненте
  const value = computed({
    get: () => fromBytes(bytes.value, unit.value),
    set: (val: number) => {
      bytes.value = toBytes(val, unit.value)
    },
  })

  /** Смена системы измерений с сохранением значения
   * Нужно чтобы юзер ввел число и потом мог менять единицы (множители) 
   * без потери значения */
  function setUnit(newUnit: SizeUnit) {
    const currentBytes = bytes.value

    unit.value = newUnit

    bytes.value = currentBytes
  }

  return {
    value,
    unit,
    bytes,
    setUnit,
  }
}