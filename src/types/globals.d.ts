declare global {
  interface Window {
    electronAPI: {
      getMotherboardSerial: () => Promise<string>
      storeLicenseKey: (licenseKey: string) => Promise<void>
      getLicenseKey: () => Promise<string>

      // New methods for motherboard serial
      storeMotherboardID: (motherboardID: string) => Promise<void>
      getMotherboardID: () => Promise<string>

      closeWindow: () => void
      minimizeWindow: () => void
      maximizeWindow: () => void
      getSystemInfo: () => void
      store: {
        set: (key: string, value: any) => void
        get: (key: string) => Promise<any>
      }
    }
    api: {
      getSystemInfo: () => Promise<any>
    }
    electron: {
      electron: {
        store: {
          get: (key: string) => any
          set: (key: string, val: any) => void
        }
      }
    }
  }
}
