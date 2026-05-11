import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { Form } from 'vee-validate'

import NameField from '@/components/fields/NameField.vue'
import { checkVolumeName } from '@/services/volumeService'

vi.mock('@/services/volumeService', () => ({
  checkVolumeName: vi.fn(),
}))

describe('NameField', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function mountField() {
    return mount({
      components: {
        Form,
        NameField,
      },

      template: `
        <Form>
          <NameField />
        </Form>
      `,
    })
  }

  it('renders input field', () => {
    const wrapper = mountField()

    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('updates value on user input', async () => {
    const wrapper = mountField()

    const input = wrapper.find('input')

    await input.setValue('fast-storage')

    expect((input.element as HTMLInputElement).value)
      .toBe('fast-storage')
  })

  it('calls API for uniqueness check on input', async () => {
    ;(checkVolumeName as any).mockResolvedValue({
      unique: true,
    })

    const wrapper = mountField()

    const input = wrapper.find('input')

    await input.setValue('unique-name')

    await vi.advanceTimersByTimeAsync(400)

    expect(checkVolumeName)
      .toHaveBeenCalledWith('unique-name')
  })

  it('handles non-unique name response', async () => {
    ;(checkVolumeName as any).mockResolvedValue({
      unique: false,
    })

    const wrapper = mountField()

    const input = wrapper.find('input')

    await input.setValue('existing-name')

    await vi.advanceTimersByTimeAsync(400)

    expect(checkVolumeName)
      .toHaveBeenCalledWith('existing-name')
  })

  it('handles API error gracefully', async () => {
    ;(checkVolumeName as any).mockRejectedValue(
      new Error('Internal Error'),
    )

    const wrapper = mountField()

    const input = wrapper.find('input')

    await input.setValue('any-name')

    await vi.advanceTimersByTimeAsync(400)

    expect(checkVolumeName)
      .toHaveBeenCalledWith('any-name')
  })
})