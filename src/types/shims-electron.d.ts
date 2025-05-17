// preload/index.ts
import { contextBridge, ipcRenderer } from 'electron'
import type { SystemInfo } from '../renderer/src/composables/SystemInfo'

contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => ipcRenderer.invoke('window:close') as Promise<void>,
  minimizeWindow: () => ipcRenderer.invoke('window:minimize') as Promise<void>,
  maximizeWindow: () => ipcRenderer.invoke('window:maximize') as Promise<void>,
  getSystemInfo: () => ipcRenderer.invoke('system-info') as Promise<SystemInfo>,
  getMotherboardSerial: () => ipcRenderer.invoke('get-motherboard-serial') as Promise<string>,

  // LICENSE Key
  storeLicenseKey: (licenseKey: string) =>
    ipcRenderer.invoke('store-license-key', licenseKey) as Promise<void>,
  getLicenseKey: () => ipcRenderer.invoke('get-license-key') as Promise<string>,

  // MOTHERBOARD ID
  storeMotherboardID: (motherboardID: string) =>
    ipcRenderer.invoke('store-motherboard-id', motherboardID) as Promise<void>,
  getMotherboardID: () => ipcRenderer.invoke('get-motherboard-id') as Promise<string>,

  // ACCESS STORE
  store: {
    set: (key: string, value: any) => ipcRenderer.invoke('store:set', key, value),
    get: (key: string) => ipcRenderer.invoke('store:get', key)
  }
})

declare global {
  interface Window {
    electronAPI: {
      closeWindow: () => void
      minimizeWindow: () => void
      maximizeWindow: () => void
      getSystemInfo: () => Promise<SystemInfo>

      store: {
        set: (key: string, value: any) => void
        get: (key: string) => Promise<any>
      }

      getMotherboardSerial: () => Promise<string>
      storeLicenseKey: (licenseKey: string) => Promise<void>
      getLicenseKey: () => Promise<string>

      // New methods for motherboard serial
      storeMotherboardID: (motherboardID: string) => Promise<void>
      getMotherboardID: () => Promise<string>
    }
    electron: {
      store: {
        get: (key: string) => any
        set: (key: string, val: any) => void
      }
    }
  }
}
