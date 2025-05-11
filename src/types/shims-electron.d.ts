declare module 'electron-store'

declare global {
  interface Window {
    electronAPI: {
      closeWindow: () => void
      minimizeWindow: () => void
      maximizeWindow: () => void
      getSystemInfo: () => void
    }
    electron: {
      store: {
        get: (key: string) => any
        set: (key: string, val: any) => void
        // any other methods you've defined...
      }
    }
  }
}
export {}