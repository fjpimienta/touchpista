import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
  win = new BrowserWindow({
    resizable: true,
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false,
      sandbox: false,
    },
    frame: true,
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();
    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    let pathIndex = './index.html';
    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      pathIndex = '../dist/index.html';
    }
    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  win.on('closed', () => {
    win = null;
  });

  win.setFullScreen(true);

  return win;
}

// Evento para manejar el redimensionamiento desde Angular
ipcMain.on('resize-window', (event, args) => {
  if (win) {
    win.setSize(args.width, args.height);
    // Confirmar el nuevo tamaño después del cambio
    const [newWidth, newHeight] = win.getSize();
  }
});

try {
  app.on('ready', () => setTimeout(createWindow, 400));

  ipcMain.on('minimize-window', () => {
    if (win) win.minimize();
  });

  ipcMain.on('maximize-window', () => {
    if (win) win.isMaximized() ? win.unmaximize() : win.maximize();
  });

  ipcMain.on('toggle-fullscreen', () => {
    if (win) win.setFullScreen(!win.isFullScreen());
  });

  ipcMain.on('resize-window', (event, args) => {
    if (win) win.setSize(args.width, args.height);
  });

  ipcMain.on('close-app', () => {
    if (win) win.close();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  console.error('❌ Error en la aplicación:', e);
}
