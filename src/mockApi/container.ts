export const randomTime = () => {
  // 隨機生成 3 月到 6 月的月份
  const month = Math.floor(Math.random() * 4) + 3
  // 隨機生成 1 日到 30 日之間的日期
  const date = Math.floor(Math.random() * 30) + 1
  // 隨機生成 0 到 23 之間的小時
  const hours24 = Math.floor(Math.random() * 24)
  // 隨機生成 0 到 59 之間的分鐘
  const minutes = Math.floor(Math.random() * 60)
  // 轉換小時為 AM/PM 格式
  const ampm = hours24 >= 12 ? 'PM' : 'AM'
  // 如果是 PM，將小時減去 12
  const hours12 = hours24 % 12 || 12
  // 格式化成字串
  const timeString = `${month}/23/${date} ${hours12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`
  return timeString
}

export const randomTask = (tasks: string[]) => {
  const randomIndex = Math.floor(Math.random() * tasks.length)
  return tasks[randomIndex]
}
