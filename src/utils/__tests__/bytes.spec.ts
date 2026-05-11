import { describe, it, expect } from 'vitest'
import { toBytes, fromBytes } from '@/utils/bytes'

describe('bytes utils', () => {
  // для десятичной системы
  describe('decimal (base 1000)', () => {
    it('KB → bytes', () => {
      expect(toBytes(1, 'KB')).toBe(1000)
    })

    it('MB → bytes', () => {
      expect(toBytes(1, 'MB')).toBe(1000 ** 2)
    })

    it('GB → bytes', () => {
      expect(toBytes(1, 'GB')).toBe(1000 ** 3)
    })

    it('round trip GB', () => {
      const bytes = toBytes(10, 'GB')
      expect(fromBytes(bytes, 'GB')).toBe(10)
    })
  })

  // для двоичной системы
  describe('binary (base 1024)', () => {
    it('KiB → bytes', () => {
      expect(toBytes(1, 'KiB')).toBe(1024)
    })

    it('MiB → bytes', () => {
      expect(toBytes(1, 'MiB')).toBe(1024 ** 2)
    })

    it('GiB → bytes', () => {
      expect(toBytes(1, 'GiB')).toBe(1024 ** 3)
    })

    it('round trip GiB', () => {
      const bytes = toBytes(5, 'GiB')
      expect(fromBytes(bytes, 'GiB')).toBe(5)
    })
  })

  // При переводе из системы в систему
  describe('cross-system behavior', () => {
    it('same bytes produce different values in different systems', () => {
      const bytes = toBytes(1, 'GB')

      const asGB = fromBytes(bytes, 'GB')
      const asGiB = fromBytes(bytes, 'GiB')

      expect(asGB).toBe(1)
      expect(asGiB).not.toBe(1)
    })
  })

  // edge кейсы
  describe('edge cases', () => {
    it('handles fractional values', () => {
      expect(toBytes(1.5, 'MB')).toBe(1.5 * 1000 ** 2)
    })

    it('returns integer bytes', () => {
      const result = toBytes(1.234, 'GB')
      expect(Number.isInteger(result)).toBe(true)
    })
  })
})