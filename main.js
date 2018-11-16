const process = require('process')
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { autoUpdater } = require('electron-updater')


const feedUrl = `http://127.0.0.1:5000/download`
autoUpdater.setFeedURL(feedUrl)

let win = null
let updateWin = null

function isDev() {
    return !process.env.NODE_ENV || process.env.NODE_ENV == "development"
}

ipcMain.on('update-dialog-mounted', (e, arg) => {
    console.debug("update");
    //checkForUpdates()
})

autoUpdater.on('error', (error) =>{
    console.log(error)
})

autoUpdater.on('checking-for-update', () => {
    console.log('start update')

})

function createWindow () {
    //win = new BrowserWindow({ width: 800, height: 600 })
    updateWin = new BrowserWindow({ width: 600, height: 300 })
    
    updateWin.webContents.openDevTools()

    if (!isDev()) {
        updateWin.loadURL(`file://${__dirname}/dist/update_dialog.html`)
    } else {
        updateWin.loadURL('http://127.0.0.1:8080/update_dialog.html')
    }
    
    autoUpdater.checkForUpdates()
}
  
app.on('ready', createWindow)


autoUpdater.on('error', function(message) {
    //sendUpdateMessage('error', message)
})

// function sendUpdateMessage(message, data) {
//     console.log({ message, data });
//     win.webContents.send('message', { message, data })
// }

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})