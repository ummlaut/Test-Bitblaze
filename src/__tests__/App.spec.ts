import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('renders main layout', () => {
    const wrapper = mount(App)

    expect(wrapper.find('main').exists()).toBe(true)
  })

  it('renders MeasurementSwitcher', () => {
    const wrapper = mount(App)

    expect(wrapper.findComponent({ name: 'MeasurementSwitcher' }).exists())
      .toBe(true)
  })

  it('renders VolumeForm', () => {
    const wrapper = mount(App)

    expect(wrapper.findComponent({ name: 'VolumeForm' }).exists())
      .toBe(true)
  })
})