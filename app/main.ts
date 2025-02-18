import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
  console.log("🟢 Creando la ventana...");
  console.log('__dirname:', __dirname);

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Crear la ventana principal
  win = new BrowserWindow({
    x: 800,
    y: 600,
    resizable: true,
    width: size.width,
    height: size.height,
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

  return win;
}

// Evento para manejar el redimensionamiento desde Angular
ipcMain.on('resize-window', (event, args) => {
  console.log('🟢 Evento resize-window recibido en main:', args);

  if (win) {
    console.log(`🔄 Redimensionando ventana a ${args.width}x${args.height}`);
    win.setSize(args.width, args.height);

    // Confirmar el nuevo tamaño después del cambio
    const [newWidth, newHeight] = win.getSize();
    console.log(`✅ Ventana redimensionada a ${newWidth}x${newHeight}`);
  } else {
    console.log('❌ win es null, no se puede redimensionar');
  }
});

try {
  app.on('ready', () => setTimeout(createWindow, 400));

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
