<template>
  <div class="rounded-md">
    <div class="font-bold shrink-0 h-12 leading-12 px-4">错误类型分布</div>
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup lang="ts">
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

use([
  CanvasRenderer,
  PieChart,
  TooltipComponent,
  LegendComponent,
]);

const legendData = ['jsError', 'promiseError', 'resourceError', 'frameworkError', 'scriptError', 'networkError'];

const seriesData = [
  { value: 120, name: 'jsError' },
  { value: 45, name: 'promiseError' },
  { value: 32, name: 'resourceError' },
  { value: 18, name: 'frameworkError' },
  { value: 9, name: 'scriptError' },
  { value: 60, name: 'networkError' },
];

provide(THEME_KEY, 'light');

const option = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    left: 'left',
    data: legendData,
  },
  series: [
    {
      name: 'Traffic Sources',
      type: 'pie',
      radius: '55%',
      center: ['50%', '40%'],
      data: seriesData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 350px;
}
</style>