<template>
  <div class="grid grid-cols-3 gap-4">
    <MyChart class="border rounded-md" />
    <div v-for="item in 10" :key="item" class="h-[400px] border rounded-md hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-fg:var(--color-black)]/5 md:block dark:[--pattern-fg:var(--color-white)]/10" :class="{ 'col-span-2': item === 3 }">{{ item }}</div>
  </div>
</template>