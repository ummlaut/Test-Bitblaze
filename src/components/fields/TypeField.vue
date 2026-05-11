<template>
  <div class="field">
    <label for="type">
      Type
    </label>

    <Field id="type" name="type" as="select">
      <option value="block">
        block
      </option>

      <option value="file">
        file
      </option>
    </Field>

    <ErrorMessage name="type" />
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
</script>
<style scoped lang="scss">
@import "@/assets/scss/field.scss";

.type-select {
  appearance: none;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;
  padding-right: 42px;
}
</style>

