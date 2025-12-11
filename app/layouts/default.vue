<template>
  <div class="default-layout">
    <header class="h-14 flex items-center px-6 fixed inset-x-0 top-0 z-10 bg-white dark:bg-gray-950">
      <Logo />
      <MonitorTabs />
      <Search />
      <span v-if="showUserName" class="ml-4">{{ showUserName }}</span>
    </header>
    <div class="px-10 mt-14 overflow-auto">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUser } from '~/types/user'

const showUserName = computed(() => {
  return data.value?.user?.name
})

const { data } = await useFetch<{ user: IUser }>('/api/user')
</script>