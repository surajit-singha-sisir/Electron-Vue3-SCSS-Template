import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const Store = require('electron-store')
const store = new Store.default()

const si = require('systeminformation')
const os = require('os')

// STORE LICENSE KEY
ipcMain.handle('store-license-key', async (_event, licenseKey: string) => {
  store.set('licenseKey', licenseKey)
})

// GET LICENSE KEY
ipcMain.handle('get-license-key', async () => {
  return store.get('licenseKey') || ''
})

// STORE MOTHERBOARD ID
ipcMain.handle('store-motherboard-id', async (_event, motherboardID: string) => {
  store.set('motherboardID', motherboardID)
})

// GET MOTHERBOARD ID (FROM STORED VALUE)
ipcMain.handle('get-motherboard-id', async () => {
  return store.get('motherboardID') || ''
})

ipcMain.handle('store:set', (_event, key, value) => {
  store.set(key, value)
})

ipcMain.handle('store:get', (_event, key) => {
  return store.get(key)
})

// GET SYSTEM INFO
function getSystemInfo() {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpus: os.cpus(),
    networkInterfaces: os.networkInterfaces()
  }
}

// CREATE MAIN WINDOW
function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true // FOR DEV ONLY
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.on('context-menu', (e) => e.preventDefault())

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// FETCH AND STORE REAL MOTHERBOARD ID
async function updateStoredMotherboardID() {
  try {
    const baseboard = await si.baseboard()
    const realID = baseboard.serial || 'Unknown'
    store.set('motherboardID', realID)
    console.log('Updated motherboard ID:', realID)
  } catch (err) {
    console.error('Failed to fetch motherboard serial:', err)
  }
}

// ELECTRON APP READY
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Window control handlers
  ipcMain.handle('window:close', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) window.close()
  })

  ipcMain.handle('window:minimize', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) window.minimize()
  })

  ipcMain.handle('window:maximize', () => {
    const window = BrowserWindow.getFocusedWindow()
    if (window) {
      if (window.isMaximized()) window.unmaximize()
      else window.maximize()
    }
  })

  ipcMain.handle('system-info', async () => {
    return getSystemInfo()
  })

  // Start motherboard ID updater
  updateStoredMotherboardID() // Run immediately
  setInterval(updateStoredMotherboardID, 10 * 60 * 1000) // Every 10 minutes

  // Create the main window
  createWindow()
})

// QUIT APP
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
