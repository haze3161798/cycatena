import { randomTask, randomTime } from './container'
import { getBuyTasks, getStatus } from './tasks'
import dayjs from 'dayjs'
export const getPaymentHistory = () => {
  const tasks = []
  for (let i = 0; i < 10; i++) {
    tasks.push({
      Description: randomTask(getBuyTasks()),
      Time: randomTime(),
      Status: randomTask(getStatus()),
      Price: Math.floor(Math.random() * 2000) + 1,
      Id: crypto.randomUUID()
    })
  }
  return tasks
}

export const getTransactionHistory = () => {
  const tasks = []
  for (let i = 0; i < 14; i++) {
    const now = dayjs()
    tasks.push({
      Date: now.add(i, 'day').format('YYYY-MMMM-DD-dddd'),
      Price: Math.floor(Math.random() * 20000000),
      Id: crypto.randomUUID()
    })
  }
  return tasks
}
