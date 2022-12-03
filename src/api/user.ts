import instance from '@/utils/request'
import type { AxiosResponse } from 'axios'
/**
 * @remarks getUserInfo
 * @returns promise
 */
const getUserInfo = (): Promise<AxiosResponse['data']> => {
  return instance.request({
    url: '/api/user/query',
    method: 'post',
  })
}

export { getUserInfo }
