<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, computed } from 'vue'
import { useIndexStore } from '@/stores'

const indexStore = useIndexStore()
const { fetchGetTransactionHistory } = indexStore
const transactionHistoryData = computed(() => [...indexStore.transactionHistoryData.values()])
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
const lineChart = ref()
const option = computed(() => {
  return {
    title: {
      text: 'Transaction History IN 14 DAYS',
      textStyle: {
        fontSize: 8
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      data: transactionHistoryData.value.map((item) => item.MMM + ' ' + item.DD + ' ' + item.Price)
    },

    xAxis: [
      {
        type: 'category',
        data: transactionHistoryData.value.map((item) => item.MMM + ' ' + item.DD)
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
        data: transactionHistoryData.value.map((item) => item.Price),
        type: 'line',
        smooth: true
      }
    ]
  }
})
onMounted(async () => {
  await fetchGetTransactionHistory()
  console.log(transactionHistoryData.value)

  setTimeout(() => {
    const myChart = echarts.init(lineChart.value)
    myChart.setOption(option.value)
  }, 0)
})
</script>
<template>
  <div ref="lineChart" :style="sizeStyle"></div>
</template>
