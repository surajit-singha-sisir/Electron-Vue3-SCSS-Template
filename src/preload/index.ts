import { contextBridge, ipcRenderer } from 'electron'
import type { SystemInfo } from '../renderer/src/composables/SystemInfo'

contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => ipcRenderer.invoke('window:close') as Promise<void>,
  getSystemInfo: () => ipcRenderer.invoke('system-info'),
  minimizeWindow: () => ipcRenderer.invoke('window:minimize') as Promise<void>,
  maximizeWindow: () => ipcRenderer.invoke('window:maximize') as Promise<void>,
  getMotherboardSerial: () => ipcRenderer.invoke('get-motherboard-serial') as Promise<void>
})

declare global {
  interface Window {
    electronAPI: {
      closeWindow: () => Promise<void>
      minimizeWindow: () => Promise<void>
      maximizeWindow: () => Promise<void>
      getSystemInfo: () => Promise<SystemInfo>
      getMotherboardSerial: () => Promise<void>
    }
  }
}
