<template>
  <div class="field">
    <label
      for="name"
      class="field__label"
    >
      Name
    </label>

    <Field
      id="name"
      name="name"
      v-slot="{ field }"
    >
      <input
        v-bind="field"
        type="text"
        autocomplete="off"
        placeholder="Имя Volume"
        class="field__input"
        :class="{
          'field__input--error':
            meta.touched &&
            !meta,

          'field__input--success':
            state === 'valid',
        }"
      />
    </Field>

    <!-- Ошибка если не прошла валидация через zod -->
    <div class="field__message">
      <ErrorMessage
        name="name"
        v-slot="{ message }"
      >
        <p class="field__error">
          {{ message }}
        </p>
      </ErrorMessage>
    </div>
    <!-- Ошибка если не прошла валидацию через api 
      Не использую нативный компонент VeeValidate, так как отображение ошибки 
      предполагает получение результата запроса от api -->
    <template v-if="shouldShowAsyncState">
      <p
        v-if="state === 'checking'"
        class="field__hint"
      >
        Проверяем уникальность названия
      </p>

      <p
        v-else-if="state === 'invalid'"
        class="field__error"
      >
        Такое название уже существует
      </p>

      <p
        v-else-if="state === 'valid'"
        class="field__success"
      >
        Название свободно
      </p>

      <p
        v-else-if="state === 'error'"
        class="field__error"
      >
        Ошибка при валидации названия
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { ErrorMessage, Field, useField } from 'vee-validate'
import { debounce } from '@/utils/debounce'
import { useNameValidation } from '@/composables/useNameValidation'

const {
  value: name,
  meta,
} = useField<string>('name')

const {
  state,
  validate,
  reset,
} = useNameValidation()

const debouncedValidate = debounce(
  async (value: string) => {
    await validate(value)
  },
  400,
)

watch(name, (value) => {
  debouncedValidate.cancel()
  reset()

  if (!value) {
    return
  }
  
  if (!meta.valid) {
    return
  }

  debouncedValidate(value)
})

/** Если поле не трогали, то не показываем в UI подсказку
*/
const shouldShowAsyncState = computed(() => {
  return ['checking', 'valid', 'invalid', 'error'].includes(state.value)
})
</script>
<style scoped lang="scss">
@import "@/assets/scss/field.scss";

.field__input {
  background-image:
    linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,1));
}
</style>