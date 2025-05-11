// preload/index.ts
import { contextBridge, ipcRenderer } from 'electron'
import type { SystemInfo } from '../renderer/src/composables/SystemInfo'

contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => ipcRenderer.invoke('window:close') as Promise<void>,
  minimizeWindow: () => ipcRenderer.invoke('window:minimize') as Promise<void>,
  maximizeWindow: () => ipcRenderer.invoke('window:maximize') as Promise<void>,
  getSystemInfo: () => ipcRenderer.invoke('system-info') as Promise<SystemInfo>,
  getMotherboardSerial: () => ipcRenderer.invoke('get-motherboard-serial') as Promise<string>,
  // LICENSE
  storeLicenseKey: (licenseKey: string) =>
    ipcRenderer.invoke('store-license-key', licenseKey) as Promise<void>,
  getLicenseKey: () => ipcRenderer.invoke('get-license-key') as Promise<string>
})

declare global {
  interface Window {
    electronAPI: {
      closeWindow: () => Promise<void>
      minimizeWindow: () => Promise<void>
      maximizeWindow: () => Promise<void>
      getSystemInfo: () => Promise<SystemInfo>
      getMotherboardSerial: () => Promise<string>
      storeLicenseKey: (licenseKey: string) => Promise<void>
      getLicenseKey: () => Promise<string> // Fixed return type
    }
  }
}
