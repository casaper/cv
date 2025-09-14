import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  imports: [RouterModule, HeaderComponent, MarkdownComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
