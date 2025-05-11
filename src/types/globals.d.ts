export {}

declare global {
  interface Window {
    api: {
      getSystemInfo: () => Promise<any>
    }
  }
}
