import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer!: typeof ipcRenderer;
  webFrame!: typeof webFrame;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
    }
  }

  isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  closeApp() {
    if (this.isElectron()) {
      this.ipcRenderer.send('close-app');
    }
  }
}
