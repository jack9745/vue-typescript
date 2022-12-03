import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
// import { getCookie } from '@/utils'
import { getUserInfo as getLocalUser } from '@/api/user'
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
   * @remarks 用户已经登录标识
   */
  const loginFlag = ref(false)

  const setLogin = (flag: boolean) => {
    //
    loginFlag.value = flag
    sessionStorage.setItem('loginFlag', String(flag))
  }

  /**
   * @remarks get userInfo
   */
  const getUserInfo = async () => {
    try {
      const result = await getLocalUser()
      userInfo.value = result
      console.log(userInfo)
    } catch (error) {}
  }
  return { userInfo, getUserInfo, setLogin, loginFlag }
})
