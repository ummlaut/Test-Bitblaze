import { mockApi } from '@/mock/mock'

export async function checkVolumeName(name: string) {
  return mockApi.checkName(name)
}