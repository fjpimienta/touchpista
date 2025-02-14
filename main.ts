import { app, BrowserWindow } from 'electron';
import * as remoteMain from '@electron/remote/main';

remoteMain.initialize();

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:4200');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  remoteMain.enable(mainWindow.webContents);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
    app.quit();
  // }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
