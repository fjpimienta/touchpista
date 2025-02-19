"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
let win = null;
const args = process.argv.slice(1), serve = args.some(val => val === '--serve');
function createWindow() {
    win = new electron_1.BrowserWindow({
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
    }
    else {
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
electron_1.ipcMain.on('resize-window', (event, args) => {
    if (win) {
        win.setSize(args.width, args.height);
        // Confirmar el nuevo tamaño después del cambio
        const [newWidth, newHeight] = win.getSize();
    }
});
try {
    electron_1.app.on('ready', () => setTimeout(createWindow, 400));
    electron_1.ipcMain.on('minimize-window', () => {
        if (win)
            win.minimize();
    });
    electron_1.ipcMain.on('maximize-window', () => {
        if (win)
            win.isMaximized() ? win.unmaximize() : win.maximize();
    });
    electron_1.ipcMain.on('toggle-fullscreen', () => {
        if (win)
            win.setFullScreen(!win.isFullScreen());
    });
    electron_1.ipcMain.on('resize-window', (event, args) => {
        if (win)
            win.setSize(args.width, args.height);
    });
    electron_1.ipcMain.on('close-app', () => {
        if (win)
            win.close();
    });
    electron_1.app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', () => {
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    console.error('❌ Error en la aplicación:', e);
}
//# sourceMappingURL=main.js.map