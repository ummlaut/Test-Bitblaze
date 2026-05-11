import { ref } from "vue"
import { checkVolumeName } from "@/services/volumeService"
import type { NameValidationState } from "@/types/volume"

const state = ref<NameValidationState>('empty')

// композа для проверки уникальности имени
export function useNameValidation() {
  // id запроса на случай race condition
  let requestId = 0

  async function validate(name: string) {
    const currentId = ++requestId

    state.value = 'checking'

    try {
      const result =
        await checkVolumeName(name)
      
      /** здесь защищаемся от ситуации, когда ответ на более ранний запрос 
       * приходит позже, чем ответ на более поздний */  
      if (currentId !== requestId) {
        return
      }

      state.value = result.unique
        ? 'valid'
        : 'invalid'
    } catch {
      if (currentId !== requestId) {
        return
      }

      state.value = 'error'
    }
  }

  function reset() {
    state.value = 'empty'
  }

  return {
    state,
    validate,
    reset,
  }
}