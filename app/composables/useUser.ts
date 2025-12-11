import { ref } from 'vue'

const userInfo = ref(null)
const isLogin = ref(false)

export const useUserStore = () => {
  const setUserInfo = (info: any) => {
    userInfo.value = info
  }

  const setIsLogin = (login: boolean) => {
    isLogin.value = login
  }

  return {
    userInfo,
    isLogin,
    setUserInfo,
    setIsLogin,
  }
}