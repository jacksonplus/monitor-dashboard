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
  confirmPassword: '123456',
})

const handleRegister = () => {
  if (!formState.email || !formState.password || !formState.confirmPassword) {
    toast.error('请输入邮箱、密码和确认密码')
    return
  }
  if (formState.password !== formState.confirmPassword) {
    toast.error('两次输入的密码不一致')
    return
  }
  toast.success('注册成功')
  
}

const router = useRouter()

const toLogin = (e: Event) => {
  e.preventDefault()
  router.push('/login')
}
</script>

<template>
  <div class="flex items-center h-screen">
    <Card class="mx-auto w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          注册
        </CardTitle>
        <CardDescription>
          请输入您的邮箱以注册您的账号
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <!-- 加个验证码功能 ing -->
          <div class="grid gap-2">
            <Label for="email">邮箱</Label>
            <Input id="email" v-model="formState.email" type="email" placeholder="m@example.com" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">密码</Label>
            </div>
            <Input id="password" v-model="formState.password" type="password" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">确认密码</Label>
            </div>
            <Input id="confirmPassword" v-model="formState.confirmPassword" type="password" required />
          </div>
          <Button type="submit" class="w-full" @click="handleRegister">
            注册
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          已有账号?
          <a class="underline cursor-pointer" @click="toLogin($event)">
            登录
          </a>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
