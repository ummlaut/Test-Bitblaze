<template>
<!-- Я разделил на два поля, отдельно числовое, отдельно выбор единиц
 чтобы проще было валидировать -->
  <div class="field">
    <label>
      Size
    </label>

    <div class="size-row">
      <Field
        name="sizeValue"
        v-slot="{ field }"
      >
        <input
          class="field__input"
          v-bind="field"
          type="number"
          min="1"
          :value="value"
          @input="onInput"
        />
      </Field>

      <Field
        name="sizeUnit"
        as="select"
        :model-value="unit"
        @update:model-value="setUnit"
      >
        <option
          v-for="unit in units"
          :key="unit"
          :value="unit"
        >
          {{ unit }}
        </option>
      </Field>
    </div>
  <div class="field__message">
    <ErrorMessage name="sizeValue" />
  </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { Field, ErrorMessage, useField } from 'vee-validate'
import { useSizeModel } from '@/composables/useSizeModel'
import { useMeasurementSystem } from '@/composables/useMeasurementSystem'
import type { SizeUnit } from '@/types/volume'

const {
  value,
  unit,
  setUnit,
} = useSizeModel(1, 'GB')
const { units, convertUnit, measurementSystem } = useMeasurementSystem()

const { value: sizeUnit } = useField<SizeUnit>('sizeUnit')

function onInput(e: Event) {
  value.value = Number(
    (e.target as HTMLInputElement).value,
  )
}

watch(measurementSystem, () => {
  sizeUnit.value = convertUnit(sizeUnit.value)
})
</script>
<style scoped lang="scss">
@import "@/assets/scss/field.scss";

.size-row {
  display: grid;
  grid-template-columns: 1fr 140px;
  gap: 12px;
}

@media (max-width: 640px) {
  .size-row {
    grid-template-columns: 1fr;
  }
}
</style>

