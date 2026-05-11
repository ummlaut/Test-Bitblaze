import type { SizeUnit } from '@/types/volume'

// множители для перевода в байты
const multipliers: Record<SizeUnit, number> = {
  KB: 1000,
  MB: 1000 ** 2,
  GB: 1000 ** 3,
  KiB: 1024,
  MiB: 1024 ** 2,
  GiB: 1024 ** 3,
}

// функция для перевода различных единиц (множителей) в байты
export function toBytes(value: number, unit: SizeUnit) {
  return Math.round(value * multipliers[unit])
}

// функция для перевода в байтов в различные единицы (множители)
export function fromBytes(bytes: number, unit: SizeUnit) {
  return bytes / multipliers[unit]
}