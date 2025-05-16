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

  // MOTHERBOARD ID (New methods to store and retrieve motherboard serial)
  storeMotherboardID: (motherboardID: string) =>
    ipcRenderer.invoke('store-motherboard-id', motherboardID) as Promise<void>,
  getMotherboardID: () => ipcRenderer.invoke('get-motherboard-id') as Promise<string>
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
      getLicenseKey: () => Promise<string>

      // New methods for motherboard serial
      storeMotherboardID: (motherboardID: string) => Promise<void>
      getMotherboardID: () => Promise<string>
    }
  }
}
