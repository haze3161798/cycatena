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
const pieChart = ref()
const option = {
  legend: {
    bottom: 'bottom',
    left: 'left'
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      label: {
        show: false,
        position: 'left'
      },

      left: '66.6667%',
      right: 0,
      top: 0,
      bottom: 0,
      data: [
        { value: 1048, name: 'USDC' },
        { value: 735, name: 'ETH' },
        { value: 580, name: 'BTC' },
        { value: 484, name: 'Other' }
      ]
    }
  ]
}
onMounted(async () => {
  await fetchGetTransactionHistory()
  console.log(transactionHistoryData.value)

  setTimeout(() => {
    const myChart = echarts.init(pieChart.value)
    myChart.setOption(option)
  }, 0)
})
</script>
<template>
  <div ref="pieChart" :style="sizeStyle"></div>
</template>
