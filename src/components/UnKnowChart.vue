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
    height: props.height - 2 + 'px'
  }
})
const unKnowChart = ref()
const option = {
  xAxis: [
    {
      type: 'category',
      data: ['T', 'F', 'S', 'S', 'M', 'T', 'W']
    }
  ],
  yAxis: [
    {
      type: 'value',
      show: false
    }
  ],
  series: [
    {
      name: 'Incoming',
      type: 'bar',
      stack: 'Ad',
      showBackground: true,
      data: [120, 132, 101, 134, 90, 230, 210]
    }
  ]
}
onMounted(() => {
  setTimeout(() => {
    const myChart = echarts.init(unKnowChart.value)
    myChart.setOption(option)
  }, 0)
})
</script>
<template>
  <div class="flex items-center">
    <div class="w-1/2 pl-2">
      <div>last 7 days</div>
      <div>$52,658</div>
    </div>
    <div ref="unKnowChart" class="w-1/2" :style="sizeStyle"></div>
  </div>
</template>
