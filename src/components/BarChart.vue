<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  }
})
const sizeStyle = computed(() => {
  return {
    width: props.width + 'px',
    height: props.height - 2 + 'px'
  }
})
const barChart = ref()
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Incoming',
      type: 'bar',
      stack: 'Ad',

      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Outgoing',
      type: 'bar',
      stack: 'Ad',
      data: [-120, -132, -101, -134, -90, -230, -210]
    },
    {
      name: 'balance',
      type: 'line',
      data: [-120, 132, -101, 134, -90, 230, -210],
      stack: 'Ad'
    }
  ]
}
onMounted(() => {
  setTimeout(() => {
    const myChart = echarts.init(barChart.value)
    myChart.setOption(option)
  }, 0)
})
</script>
<template>
  <div ref="barChart" :style="sizeStyle"></div>
</template>
