import {Component, HostBinding, Inject} from '@angular/core';
import {CommonModule, DOCUMENT} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {
  GithubLogoComponent,
  UiuxLogoComponent
} from '@uiux/shared/ui-design-library';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Router} from '@angular/router';

@Component({
  selector: 'ng-patterns-app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    UiuxLogoComponent,
    GithubLogoComponent,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent {
  @HostBinding('class.mat-elevation-z4') elevation = true;

  logoName = 'uiux-with-angular-logo';

  githubLink = 'https://github.com/UIUXEngineering/ng-patterns';

  currentTheme = 'dark-theme';

  constructor(
    private _router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  selectTheme(theme: string) {
    if (theme === 'remove') {
      document.body.classList.remove('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.remove(this.currentTheme);
      this.currentTheme = theme;
      document.body.classList.add(theme);
    }
  }

  onNavigateHome() {
    this._router.navigate(['/']);
  }
}
