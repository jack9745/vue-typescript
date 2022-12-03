import instance from '@/utils/request'
import type { AxiosResponse } from 'axios'

const loginOut = (): Promise<AxiosResponse['data']> => {
  return instance.request({
    method: 'get',
    url: '/api/user/loginOut',
  })
}

export { loginOut }
