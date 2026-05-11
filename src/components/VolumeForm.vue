<template>
  <Form
    :validation-schema="validationSchema"
    :initial-values="{
      type: 'block',
      sizeValue: 1,
      sizeUnit: 'GB',
    }"
    @submit="onSubmit"
    v-slot="{ meta }"
  >
    <section class="volume-form">
      <div class="volume-form__card">
        <h1 class="volume-form__title">
          Создать Volume
        </h1>

        <div class="volume-form__fields">
          <NameField />
          <TypeField />
          <SizeField />

          <div class="volume-form__actions">
            <button
              type="submit"
              class="volume-form__submit"
              :disabled="isSubmitDisabled(meta)"
            >
              Сохранить
            </button>

            <p
              v-if="isSaved"
              class="volume-form__success-message"
            >
              Volume успешно сохранён
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="submittedData"
        class="volume-form__result"
      >
        <h2 class="volume-form__result-title">
          Превью Volume
        </h2>

        <pre>{{ submittedData }}</pre>
      </div>
    </section>
  </Form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import type { FormMeta } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import NameField from '@/components/fields/NameField.vue'
import TypeField from '@/components/fields/TypeField.vue'
import SizeField from '@/components/fields/SizeField.vue'
import { volumeSchema } from '@/schemas/volumeSchema'
import { toBytes } from '@/utils/bytes'
import { useNameValidation } from '@/composables/useNameValidation'

const validationSchema = toTypedSchema(volumeSchema)
const submittedData = ref(null)
const isSaved = ref(false)
const isCheckingName = ref(false)
const { state: nameValidationState } = useNameValidation()

function isSubmitDisabled(meta: FormMeta<any>) {
  return (
    !meta.valid ||
    !meta.dirty ||
    isCheckingName.value ||
    nameValidationState.value === 'invalid' ||
    nameValidationState.value === 'checking' ||
    nameValidationState.value === 'error'
  )
}

function onSubmit(values: any, { resetForm }: any) {
  submittedData.value = {
    ...values,
    sizeBytes: toBytes(values.sizeValue, values.sizeUnit),
  }

  isSaved.value = true

  resetForm()

  setTimeout(() => {
    isSaved.value = false
  }, 1000)
}
</script>
<style scoped lang="scss">
.volume-form {
  &__card {
    background: var(--color-surface);
    border-radius: 16px;
    padding: 24px;
    box-shadow: var(--shadow-card);
  }

  &__title {
    margin: 0 0 24px;
    font-size: 24px;
    font-weight: 700;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__actions {
    margin-top: 24px;
  }

  &__submit {
    width: 100%;
    border: none;
    border-radius: 12px;
    background: var(--color-primary);
    color: white;
    padding: 14px 18px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.15s ease;

      &:hover {
        background: var(--color-primary-hover);
      }

      &:active {
        transform: translateY(1px);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
  }

  &__result {
    margin-top: 20px;
    background: #111827;
    color: #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    box-shadow: var(--shadow-card);
    overflow: auto;
    
    &-title {
      margin: 0 0 16px;
      font-size: 18px;
      font-weight: 600;
    }

    &pre {
      margin: 0;
      font-size: 14px;
      line-height: 1.6;
    }
  }

  &__success-message {
    margin-top: 12px;
    font-size: 14px;
    color: var(--color-success);
    font-weight: 600;
  }
}

@media (max-width: 900px) {
  .volume-form {
    grid-template-columns: 1fr;
  }
}
</style>