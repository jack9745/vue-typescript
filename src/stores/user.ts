import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { getCookie } from '@/utils'
/**
 * @remarks 定义用户信息
 * 第二个参数可以是个函数，来定义更高级的store
 */
export const useUserStore = defineStore('userStore', () => {
  //   推荐使用 完整类型推断的箭头函数
  //  不使用这种写法
  // state: () => {
  //   return {
  //     userInfo: {},
  //   }
  // },

  /**
   * @remarks userInfo
   */
  const userInfo = ref<{ account: string }>()

  /**
   * @remarks get userInfo
   */
  const getUserInfo = async () => {
    try {
      const response = await fetch('/api/user/query', {
        method: 'POST',
        headers: {
          'x-csrf-token': getCookie('csrfToken') as string,
        },
      })
      const result = await response.json()
      userInfo.value = result
      console.log(userInfo)
    } catch (error) {}
  }
  return { userInfo, getUserInfo }
})
