import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: any;

  constructor() {
    if ((window as any).require) {
      try {
        this.ipcRenderer = (window as any).require('electron').ipcRenderer;
        console.log('ipcRenderer cargado con éxito');
      } catch (e) {
        console.error('Electron no está disponible', e);
      }
    } else {
      console.warn('Electron no está disponible - ejecutando en navegador');
    }
  }

  resizeWindow(width: number, height: number): void {
    console.log('Enviando evento de redimensionamiento a Electron...', { width, height });
    if (this.ipcRenderer) {
      this.ipcRenderer.send('resize-window', { width, height });
    }
  }


  closeApp(): void {
    if (this.ipcRenderer) {
      this.ipcRenderer.send('close-app');
    }
  }
}
