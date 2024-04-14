export function mockApi<T = null>(data: T): Promise<{ Data: T }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        Data: data
      })
    }, 3000)
  })
}
