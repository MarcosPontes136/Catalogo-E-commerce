import {Component, Input, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-vertical',
  imports: [MatButtonModule, MatMenuModule, MatIconModule, RouterLink],
  templateUrl: './menu-vertical.component.html',
  styleUrl: './menu-vertical.component.scss'
})
export class MenuVerticalComponent {
  @ViewChild('menu') menu!: MatMenu;

  //Muda para true caso estiver em conta admin (em Desenvolvimento)
  @Input() admin = false;

}
