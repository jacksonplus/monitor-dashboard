<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="border rounded-md h-[400px]">
      <ErrorsTrend />
    </div>
    <div class="border rounded-md h-[400px]">
      <ErrorsTypeDistribution />
    </div>
    <div class="border rounded-md h-[400px]">
      <ErrorsTop10Bar :data="top10Errors" title="Top 10 Errors (Last 1h)" />
    </div>
    <div class="border rounded-md h-[400px]">Top 10 页面（bar）</div>
    <div class="border rounded-md h-[400px]">浏览器分布（pie）</div>
    <div class="border rounded-md h-[400px]">错误率（line）</div>
    <div class="border rounded-md h-[400px] col-span-2">错误列表（table）</div>
  </div>
</template>
<script setup lang="ts">
const top10Errors = ref([
  { message: 'Cannot read property xxx of undefined', count: 2231 },
  { message: 'Unhandled Promise Rejection', count: 602 },
  { message: 'Vue warn: Failed to resolve component', count: 231 }
])
</script>