/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */

// @flow

import { app, ipcMain } from 'electron'
import MenuBuilder from './node-src/builders/MenuBuilder'
import WindowBuilder from './node-src/builders/WindowBuilder'
import './node-src/ipc'

const appUrl = `file://${__dirname}/app.html`

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')()
  const path = require('path')
  const p = path.join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
  ]

  return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log) // eslint-disable-line no-console
}

const windowBuilder = new WindowBuilder(appUrl)
let menuBuilder = new MenuBuilder()

const buildWindows = () => {
  windowBuilder.buildSplashWindow(null, true).then(() => {
    setTimeout(() => {
      windowBuilder.buildMainWindow().then(() => {
        windowBuilder.destroySplashWindow()
      })
    }, 2000)
  })
}

/**
 * Add event listeners...
 */

menuBuilder.on('item-click', (item: string) => {
  if (item === 'about' && !windowBuilder.splashWindow) {
    windowBuilder.buildSplashWindow({
      parent: windowBuilder.mainWindow,
      modal: true,
      height: 495,
    })
  }
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions()
  }
  buildWindows()
  menuBuilder.buildMenu()
})

ipcMain.on('close-about', () => {
  windowBuilder.destroySplashWindow()
})
