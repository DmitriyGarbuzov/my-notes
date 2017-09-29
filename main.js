const {
  app,
  Menu,
  BrowserWindow
} = require('electron')

const path = require('path')
const url = require('url')

let win

function createWindow() {

  // Create the general window
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon : path.join(__dirname, 'views/assets/icons/notes-icon.png')
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'views/main.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools
  win.webContents.openDevTools()

  win.on('closed', () => {
    win == null
  })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
});
app.on('browser-window-created', function(e, window) {
  window.setMenu(null);
});
