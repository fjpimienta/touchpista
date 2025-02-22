import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { ElectronService } from '../../providers/electron.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title = "Pista de Hielo";
  opened = true;

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    @Inject(ElectronService) private electronService: ElectronService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  

  updateTitle(title: string) {
    this.title = title;
  }

  closeWindow() {
    this.electronService.closeApp();
  }

  minimizeWindow() {
    this.electronService.minimizeWindow();
  }

  maximizeWindow() {
    this.electronService.maximizeWindow();
  }

  toggleFullScreen() {
    this.electronService.toggleFullScreen();
  }
}
