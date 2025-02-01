import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  styles: [],
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  `,
  imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
  title = 'catalogoEcommerce';
}
