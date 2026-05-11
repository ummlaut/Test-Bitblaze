import { describe, it, expect } from 'vitest'
import { volumeSchema } from '@/schemas/volumeSchema'

describe('volume schema', () => {
  it('valid payload passes', () => {
    const result = volumeSchema.safeParse({
      name: 'volume1',
      type: 'block',
      sizeValue: 10,
      sizeUnit: 'GB',
    })

    expect(result.success).toBe(true)
  })

  it('rejects invalid name', () => {
    const result = volumeSchema.safeParse({
      name: 'INVALID NAME!',
      type: 'block',
      sizeValue: 10,
      sizeUnit: 'GB',
    })

    expect(result.success).toBe(false)
  })

  it('rejects empty name', () => {
    const result = volumeSchema.safeParse({
      name: '',
      type: 'file',
      sizeValue: 1,
      sizeUnit: 'MB',
    })

    expect(result.success).toBe(false)
  })

  it('rejects invalid type', () => {
    const result = volumeSchema.safeParse({
      name: 'valid-name',
      type: 'database', 
      sizeValue: 10,
      sizeUnit: 'GB',
    })

    expect(result.success).toBe(false)
  })

  it('rejects zero size', () => {
    const result = volumeSchema.safeParse({
      name: 'valid-name',
      type: 'block',
      sizeValue: 0,
      sizeUnit: 'GB',
    })

    expect(result.success).toBe(false)
  })

  it('rejects negative size', () => {
    const result = volumeSchema.safeParse({
      name: 'valid-name',
      type: 'block',
      sizeValue: -5,
      sizeUnit: 'GB',
    })

    expect(result.success).toBe(false)
  })

  it('rejects invalid unit', () => {
    const result = volumeSchema.safeParse({
      name: 'valid-name',
      type: 'block',
      sizeValue: 10,
      sizeUnit: 'TB',
    })

    expect(result.success).toBe(false)
  })
})