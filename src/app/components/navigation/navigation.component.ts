import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title = "Rentas";

  constructor(private breakpointObserver: BreakpointObserver,
    @Inject(ElectronService) private electronService: ElectronService
  ) { }

  ngOnInit(): void { }

  updateTitle(title: string) {
    this.title = title;
  }

  closeWindow() {
    console.log('Cerrando aplicación...');
    this.electronService.closeApp();
  }

  resizeWindow() {
    console.log('Redimensionando ventana...');
    // Verificar los valores antes de enviarlos
    this.electronService.resizeWindow(1024, 768);  // Ajusta el tamaño que desees
    console.log('Evento resizeWindow enviado a Electron');
  }

}
