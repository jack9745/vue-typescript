/**
 * @remarks 学习一下axios 的配置 和相关知识
 *
 */
import { getCookie } from './index'
import axios, { isAxiosError, isCancel } from 'axios'
import { useUserStore } from '@/stores/user'
// 这里不能使用useRouter 只能在setup中使用
// import { useRouter } from 'vue-router'
import router from '@/router'
const instance = axios.create({
  // baseURL: 'http://abc.com',
  headers: {
    'x-csrf-token': getCookie('csrfToken'),
  },
})

// 设置请求和响应拦截

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    console.log(response)
    const data = response.data
    // 没有登录态
    if (data.code === 401) {
      const userStore = useUserStore()
      userStore.setLogin(false)
      router.push({
        path: '/login',
        query: {
          redirectURI: encodeURIComponent(location.href),
        },
      })
    }
    return response.data
  },
  (error) => {
    Promise.reject(error)
  }
)

export default instance
