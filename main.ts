import { app, BrowserWindow, ipcMain } from 'electron';
import * as remoteMain from '@electron/remote/main';
import * as childProcess from 'child_process';

remoteMain.initialize();

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      sandbox: false,
    },
  });

  mainWindow.loadURL('http://localhost:4200');
  mainWindow?.on('closed', () => {
    mainWindow = null;
    // Intentamos llamar a app.quit() después de que la ventana se cierre
    app.quit();
  });

  remoteMain.enable(mainWindow.webContents);
}

// Evento para cerrar la aplicación cuando el renderer lo solicite
ipcMain.on('close-app', () => {
  if (mainWindow) {
    mainWindow.close();
  }
  app.quit();
});

app.on('ready', createWindow);

app.on('before-quit', () => {
  // Aquí también podemos intentar matar procesos secundarios manualmente
  childProcess.spawn('pkill', ['-f', 'electron']); // Esto matará procesos asociados a Electron
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Matamos los procesos de electron después de que todas las ventanas se cierren
    childProcess.spawn('pkill', ['-f', 'electron']);
    app.quit();
    process.exit(0);  // Forzar el cierre de todos los procesos
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
