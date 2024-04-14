<script setup lang="ts">
import { ref, computed, onMounted, type Ref } from 'vue'
import { useIndexStore } from '@/stores'
import BarChart from '@/components/BarChart.vue'
import LineChart from '@/components/LineChart.vue'
import PieChart from '@/components/PieChart.vue'
import UnKnowChart from '@/components/UnKnowChart.vue'
const activeNames = ref('')
const indexStore = useIndexStore()
const { fetchGetTradeData } = indexStore
const handleChange = (val: string[]) => {
  console.log(val)
}
const tradeTableData = computed(() => {
  return [...indexStore.tradeData.values()]
})
const infinityScroll = ref()
const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio <= 0) return
  fetchGetTradeData()
})
const rightBarChart = ref()
const LineChartWrapper = ref()
const PieChartWrapper = ref()
const UnKnowChartWrapper = ref()
const LineChartWrapperSize = ref({ width: 0, height: 0 })
const PieChartWrapperSize = ref({ width: 0, height: 0 })
const UnKnowChartWrapperSize = ref({ width: 0, height: 0 })
const rightBarChartSize = ref({ width: 0, height: 0 })
const setChartSize = (target: HTMLElement, data: Ref<{ width: number; height: number }>) => {
  if (!target || !data) return
  const { width, height } = target.getBoundingClientRect()
  data.value.width = width
  data.value.height = height
}
const isFirstLoading = ref(true)
onMounted(async () => {
  setChartSize(rightBarChart.value, rightBarChartSize)
  setChartSize(LineChartWrapper.value, LineChartWrapperSize)
  setChartSize(PieChartWrapper.value, PieChartWrapperSize)
  setChartSize(UnKnowChartWrapper.value, UnKnowChartWrapperSize)
  setTimeout(() => {
    isFirstLoading.value = false
  }, 3000)
  await fetchGetTradeData()

  intersectionObserver.observe(infinityScroll.value)
})
</script>
<template>
  <div class="relative flex-grow" v-loading="isFirstLoading">
    <div class="absolute inset-0 overflow-auto flex flex-col">
      <div class="flex flex-grow mt-10">
        <div class="w-3/4 flex">
          <div class="flex-grow">
            <div class="flex flex-grow h-20 mb-60">
              <div ref="LineChartWrapper" class="w-1/3 mr-2 border border-black">
                <LineChart
                  :width="LineChartWrapperSize.width"
                  :height="LineChartWrapperSize.height"
                ></LineChart>
              </div>
              <div class="w-1/3 mx-2 border border-black" ref="UnKnowChartWrapper">
                <UnKnowChart
                  :width="UnKnowChartWrapperSize.width"
                  :height="UnKnowChartWrapperSize.height"
                ></UnKnowChart>
              </div>
              <div ref="PieChartWrapper" class="w-1/3 ml-2 border border-black">
                <PieChart
                  :width="PieChartWrapperSize.width"
                  :height="PieChartWrapperSize.height"
                ></PieChart>
              </div>
            </div>
            <div>
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="Payment History" name="1">
                  <el-table
                    :data="tradeTableData"
                    style="width: 100%; height: 300px"
                    infinite-scroll-immediate="false"
                    v-infinite-scroll="fetchGetTradeData"
                  >
                    <el-table-column prop="Time" label="Date" width="180" />
                    <el-table-column prop="Description" label="Name" width="180" />
                    <el-table-column prop="Price" label="Amount">
                      <template #default="scope">{{ '$' + scope.row.Price }}</template>
                    </el-table-column>
                    <el-table-column prop="Status" label="Status">
                      <template #default="scope">
                        <el-tag
                          round
                          effect="dark"
                          :color="scope.row.Status === 'Success' ? '#0CA789' : '#F24726'"
                        >
                          {{ scope.row.Status }}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <template v-slot:append>
                      <div class="py-7">
                        <div v-loading="true" ref="infinityScroll"></div>
                      </div>
                    </template>
                  </el-table>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
        <div ref="rightBarChart" class="w-1/4 ml-32 border border-black">
          <BarChart :width="rightBarChartSize.width" :height="rightBarChartSize.height" />
        </div>
      </div>
      <div class="h-20"></div>
    </div>
  </div>
</template>
