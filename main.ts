import { app, BrowserWindow, ipcMain } from 'electron';
import * as remoteMain from '@electron/remote/main';
import * as childProcess from 'child_process';

remoteMain.initialize();

let mainWindow: BrowserWindow | null;

console.log("Electron app starting..."); // Log al inicio

function createWindow() {
  console.log("Creando la ventana...");
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      sandbox: false,
    },
    frame: true,
  });

  mainWindow.loadURL('http://localhost:4200');

  // Abre DevTools para ver logs del proceso principal
  mainWindow.webContents.openDevTools();

  mainWindow?.on('closed', () => {
    mainWindow = null;
    app.quit();
  });

  remoteMain.enable(mainWindow.webContents);

  // Escuchar evento de redimensionamiento de la ventana
  ipcMain.on('resize-window', (event, args) => {
    console.log('🟢 Evento resize-window recibido en main:', args);
  
    if (mainWindow) {
      console.log(`🔄 Redimensionando ventana a ${args.width}x${args.height}`);
      mainWindow.setSize(args.width, args.height);
  
      const [newWidth, newHeight] = mainWindow.getSize();
      console.log(`✅ Ventana redimensionada a ${newWidth}x${newHeight}`);
    } else {
      console.log('❌ mainWindow es null, no se puede redimensionar');
    }
  });
  
}

app.on('ready', () => {
  console.log("App is ready, creating window..."); // Verifica si este log se imprime
  createWindow();
});

app.on('before-quit', () => {
  childProcess.spawn('pkill', ['-f', 'electron']);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    childProcess.spawn('pkill', ['-f', 'electron']);
    app.quit();
    process.exit(0);
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
