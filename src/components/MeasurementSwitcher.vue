<template>
  <div class="switcher">
    <button
      :class="{ 'switcher__button--active': measurementSystem === 'decimal', 'switcher__button': true }"
      @click=" measurementSystem = 'decimal'"
    >
      Десятичная
    </button>

    <button 
        :class="{ 'switcher__button--active': measurementSystem === 'binary', 'switcher__button': true }" 
        @click="measurementSystem = 'binary'"
    >
      Двоичная
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMeasurementSystem } from '@/composables/useMeasurementSystem'

const { measurementSystem } = useMeasurementSystem()
</script>

<style scoped lang="scss">
.switcher {
  display: inline-flex;
  gap: 6px;
  padding: 6px;
  border-radius: 18px;
  background: white;
  box-shadow: var(--shadow-card);

  &__button {
    border: none;
    background: transparent;
    border-radius: 14px;
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
    cursor: pointer;

    transition:
      background 0.2s ease,
      color 0.2s ease;

    &:hover {
      background: rgba(24, 103, 192, 0.08);
    }

    &--active {
      background: rgba(24, 103, 192, 0.14);
      color: #1867c0;
    }
  }
}
</style>