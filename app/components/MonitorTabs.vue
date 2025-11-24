<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { name: 'Dashboard', path: '/' },
  { name: 'Errors', path: '/errors' },
  { name: 'Performance', path: '/performance' },
  { name: 'Network', path: '/network' },
  { name: 'Runtime', path: '/runtime' },
  { name: 'Behavior', path: '/behavior' },
]

// 检查当前路由是否匹配tab路径
const isActiveTab = (tabPath: string) => {
  // 对于根路径，需要精确匹配
  if (tabPath === '/') {
    return route.path === '/'
  }
  // 对于其他路径，检查当前路径是否以tab路径开头
  return route.path.startsWith(tabPath)
}
</script>

<template>
  <NavigationMenu :viewport="false" class="h-12 ml-2">
    <NavigationMenuList>
      <NavigationMenuItem v-for="tab in tabs" :key="tab.path">
        <NavigationMenuLink 
          as-child 
          :class="[
            navigationMenuTriggerStyle(),
            {
              'bg-primary/10 text-primary font-medium': isActiveTab(tab.path),
            }
          ]"
        >
          <a :href="tab.path">{{ tab.name }}</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
