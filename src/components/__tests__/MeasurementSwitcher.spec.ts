import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import MeasurementSwitcher from '@/components/MeasurementSwitcher.vue'

describe('MeasurementSwitcher', () => {
  it('renders both measurement systems', () => {
    const wrapper = mount(MeasurementSwitcher)

    expect(wrapper.text()).toContain('Десятичная')
    expect(wrapper.text()).toContain('Двоичная')
  })
})