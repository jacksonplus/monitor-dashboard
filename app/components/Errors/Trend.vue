<template>
  <div class="rounded-md">
    <div class="flex items-center h-12 px-4 overflow-x-auto overflow-y-hidden">
      <div class="font-bold text-center shrink-0">错误趋势</div>
      <Tabs v-model="activeTab" class="ml-2">
        <TabsList>
          <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
            {{ tab.label }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Popover v-slot="{ close }">
        <PopoverTrigger as-child v-if="activeTab === 'custom'" class="ml-2">
          <Button
            id="date"
            variant="outline"
            class="w-48 justify-between font-normal"
          >
            {{ date ? date.toDate(getLocalTimeZone()).toLocaleDateString() : "Select date" }}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto overflow-hidden p-0" align="start">
          <Calendar
            :model-value="date"
            layout="month-and-year"
            @update:model-value="(value) => {
              if (value) {
                date = value
                close()
              }
            }"
          />
        </PopoverContent>
      </Popover>
    </div>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, today } from '@internationalized/date'
import { ChevronDownIcon } from 'lucide-vue-next'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const activeTab = ref('30')

const date = ref(today(getLocalTimeZone())) as Ref<DateValue>

const tabs = ref([
  {
    value: '30',
    unit: 'm',
    label: '30m',
  },
  {
    value: '60',
    unit: 'm',
    label: '60m',
  },
  {
    value: '12',
    unit: 'h',
    label: '12h',
  },
  {
    value: '24',
    unit: 'h',
    label: '24h',
  },
  {
    value: 'custom',
    unit: 'custom',
    label: '自定义',
  },
])

use([CanvasRenderer, GridComponent, LineChart])

provide(THEME_KEY, 'light');

// 生成从当前时间前30分钟开始、每2分钟一个点的15条数据
const generateTimeSeriesData = () => {
  const now = new Date();
  const timePoints = [];
  const values = [];
  
  // 生成15个时间点和对应数据
  for (let i = 14; i >= 0; i--) {
    // 计算时间点（前30分钟开始，每2分钟一个点）
    const timePoint = new Date(now.getTime() - (14 - i) * 2 * 60 * 1000 - 30 * 60 * 1000);
    // 格式化时间为 HH:mm
    const formattedTime = timePoint.getHours().toString().padStart(2, '0') + ':' + timePoint.getMinutes().toString().padStart(2, '0');
    timePoints.unshift(formattedTime);
    
    // 生成随机数据值，在一个合理范围内波动
    const baseValue = 5 + Math.random() * 10;
    values.unshift(Math.round(baseValue));
  }
  
  return { timePoints, values };
};

const { timePoints, values } = generateTimeSeriesData();

const option = ref({
  xAxis: {
    type: 'category',
    data: timePoints
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: values,
      type: 'line',
      smooth: true
    }
  ]
});
</script>

<style scoped>
.chart {
  height: 350px;
}
</style>