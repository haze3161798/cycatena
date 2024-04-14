import { ref } from 'vue'
import { defineStore } from 'pinia'
import { mockApi } from '@/utils'
import { getPaymentHistory, getTransactionHistory } from '../mockApi'
// import dayjs from 'dayjs'
export const useIndexStore = defineStore('index', () => {
  const tradeData = ref(new Map())
  const setTradeData = (data: any[]) => {
    data.forEach((item) => {
      tradeData.value.set(item.Id, item)
    })
  }
  const fetchGetTradeData = async () => {
    const res = await mockApi(getPaymentHistory())
    setTradeData(res.Data)
  }

  const transactionHistoryData = ref(new Map())
  const setTransactionHistoryData = (data: any[]) => {
    console.log(data)
    data.forEach((item) => {
      transactionHistoryData.value.set(item.Id, item)
    })
  }
  const fetchGetTransactionHistory = async () => {
    const res = await mockApi(getTransactionHistory())
    const result = res.Data.map((item) => {
      const date = item.Date.split('-')
      return {
        ...item,
        YYYY: date[0],
        MMM: date[1],
        DD: date[2],
        ddd: date[3]
      }
    })
    setTransactionHistoryData(result)
  }
  return {
    tradeData,
    fetchGetTradeData,

    transactionHistoryData,
    fetchGetTransactionHistory
  }
})
