export default defineNuxtRouteMiddleware((to, from) => {
  if (whiteList.includes(to.path)) {
    return
  }

  const { isLogin } = useUserStore()
  if (!isLogin.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})