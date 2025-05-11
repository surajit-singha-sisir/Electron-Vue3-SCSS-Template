import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const Store = require('electron-store')
const store = new Store.default()

// IPC handler for storing license key
ipcMain.handle('store-license-key', async (_event, licenseKey: string) => {
  store.set('licenseKey', licenseKey)
})

// IPC handler for retrieving license key
ipcMain.handle('get-license-key', async () => {
  return store.get('licenseKey') || ''
})

const os = require('os')
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

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    frame: false, // Disable the native title bar
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true, // Enable sandbox for security
      contextIsolation: true, // Enable context isolation for security
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.on('context-menu', (e) => {
    e.preventDefault()
  })

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

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC handlers for window controls
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
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    }
  })
  ipcMain.handle('system-info', async () => {
    return getSystemInfo()
  })
  // IPC handler to fetch motherboard serial number
  const si = require('systeminformation')
  ipcMain.handle('get-motherboard-serial', async () => {
    try {
      const motherboard = await si.baseboard()
      return motherboard.serial || 'Unknown' // Returns serial number or 'Unknown' if not available
    } catch (error) {
      console.error('Error fetching motherboard serial:', error)
      return 'Error'
    }
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
