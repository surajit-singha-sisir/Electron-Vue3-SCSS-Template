import { ElectronAPI } from '@electron-toolkit/preload'
declare module 'electron-store'

declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any
        set: (key: string, val: any) => void
      }
    }
    api: unknown
  }
}
