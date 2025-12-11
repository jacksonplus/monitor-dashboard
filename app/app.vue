<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <NuxtRouteAnnouncer />
  <Toaster position="top-center" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
