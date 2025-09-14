import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NameTitleLeadComponent } from './components/name-title-lead/name-title-lead.component';

@Component({
  imports: [RouterModule, HeaderComponent, NameTitleLeadComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
}
