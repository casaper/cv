import { Component } from '@angular/core';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [TranslatePipe, TranslateDirective],
})
export class HeaderComponent {}
