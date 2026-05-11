import { z } from 'zod'
import { SIZE_UNITS } from '@/types/volume'

export const volumeSchema = z.object({
  name: z
    .string()
    .min(1, 'Поле обязательно для заполнения')
    .regex(
      /^[a-zA-Z0-9-]+$/,
      'Разрешены только латиница, цифры и дефис',
    ),

  type: z.enum(['block', 'file']),

  sizeValue: z
    .number({
      invalid_type_error: 'Поле обязательно для заполнения',
    })
    .positive('Размер должен быть больше 0'),

  sizeUnit: z.enum(SIZE_UNITS),
})