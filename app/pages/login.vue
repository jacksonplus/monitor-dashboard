<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'custom',
})

const formState = reactive({
  email: 'admin@example.com',
  password: '123456',
})

const handleLogin = () => {
  if (!formState.email || !formState.password) {
    toast.error('请输入邮箱和密码')
    return
  }
  
  const { setUserInfo, setIsLogin } = useUserStore()
  setUserInfo({ ...formState })
  setIsLogin(true)
  toast.success('登录成功')
  router.push('/')
}

const router = useRouter()

const toRegister = (e: Event) => {
  e.preventDefault()
  router.push('/register')
}
</script>

<template>
  <div class="flex items-center h-screen">
    <Card class="mx-auto w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          登录
        </CardTitle>
        <CardDescription>
          请输入您的邮箱以登录您的账号
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">邮箱</Label>
            <Input id="email" v-model="formState.email" type="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">密码</Label>
              <!-- <a href="#" class="ml-auto inline-block text-sm underline">
                忘记密码?
              </a> -->
            </div>
            <Input id="password" v-model="formState.password" type="password" required />
          </div>
          <Button type="submit" class="w-full" @click="handleLogin">
            登录
          </Button>
          <Button variant="outline" class="w-full">
            用 Google 登录
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          还没有账号?
          <a class="underline cursor-pointer" @click="toRegister($event)">
            注册
          </a>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
