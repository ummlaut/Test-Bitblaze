export type VolumeType = 'block' | 'file'

export type NameValidationState =
  | 'empty'
  | 'checking'
  | 'valid'
  | 'invalid'
  | 'error'

export type MeasurementSystem = 'decimal' | 'binary'

export const DECIMAL_UNITS = ['KB', 'MB', 'GB'] as const
export const BINARY_UNITS = ['KiB', 'MiB', 'GiB'] as const

export const SIZE_UNITS = [
  ...DECIMAL_UNITS,
  ...BINARY_UNITS,
] as const

export type SizeUnit = typeof SIZE_UNITS[number]

export interface VolumePayload {
  name: string
  type: VolumeType
  sizeBytes: number
}