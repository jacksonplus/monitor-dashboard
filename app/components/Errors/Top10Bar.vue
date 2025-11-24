<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { ECOption } from './types'
import VChart from 'vue-echarts';
import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { use } from 'echarts/core'

// 注册必须的组件
use([GridComponent, BarChart, CanvasRenderer])

interface ErrorItem {
  message: string
  count: number
}

const props = defineProps<{
  data: ErrorItem[]
  title?: string
}>()

// 对 message 做截断（防止太长导致布局难看）
const maxLabelLength = 40
function shortenMessage(msg: string) {
  return msg.length > maxLabelLength ? msg.slice(0, maxLabelLength) + '…' : msg
}

// 处理图表数据
const categories = computed(() =>
  props.data.map(item => shortenMessage(item.message))
)

const fullMessages = computed(() =>
  props.data.map(item => item.message)
)

const values = computed(() =>
  props.data.map(item => item.count)
)

// 图表配置
const chartOptions = ref<ECOption>({
  title: {
    text: props.title || 'Top 10 Errors',
    left: 'left',
    top: 10,
    textStyle: { fontSize: 14, fontWeight: 'bold' }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter: (params: any) => {
      const index = params[0].dataIndex
      return `
        <div style="max-width: 300px; white-space: normal;">
          <strong>${fullMessages.value[index]}</strong><br/>
          Count: ${values.value[index]}
        </div>
      `
    }
  },
  grid: {
    left: 180,
    right: 30,
    top: 60,
    bottom: 20
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: categories.value,
    axisLabel: {
      width: 150,
      overflow: 'truncate',
      color: '#666'
    }
  },
  series: [
    {
      type: 'bar',
      data: values.value,
      barWidth: 14,
      label: {
        show: true,
        position: 'right',
        formatter: '{c}'
      }
    }
  ]
})

// 当 props.data 更新时刷新图表
watch(
  () => props.data,
  () => {
    chartOptions.value = {
      ...chartOptions.value,
      yAxis: { ...chartOptions.value.yAxis, data: categories.value },
      series: Array.isArray(chartOptions.value.series) ? [{ ...chartOptions.value.series[0], data: values.value }] : []
    }
  },
  { deep: true }
)
</script>

<template>
  <v-chart class="chart" :option="chartOptions" autoresize />
</template>

<style scoped>
.chart {
  height: 350px;
}
</style>
