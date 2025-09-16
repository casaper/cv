import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  MdConvertedDeComponent,
  MdConvertedEnComponent,
} from '@cv/md-converted';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-content',
  imports: [
    HeaderComponent,
    RouterModule,
    TranslatePipe,
    MdConvertedEnComponent,
    MdConvertedDeComponent,
    CommonModule,
  ],
  templateUrl: './main-content.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MainContentComponent implements OnInit {
  lang = input<string>();

  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  currentLang = signal<string>(this.translate.getCurrentLang());

  constructor() {
    this.translate.onLangChange
      .pipe(
        map(({ lang }) => lang),
        filter(Boolean)
      )
      .subscribe(lang => {
        console.log('lang changed to', lang);
        this.currentLang.set(lang);
        this.router.navigate([lang], { replaceUrl: true });
      });
  }

  ngOnInit() {
    const useLang =
      this.lang() ||
      this.translate.getBrowserLang() ||
      this.translate.getFallbackLang();
    const langToUse = this.translate.getLangs().includes(useLang)
      ? useLang
      : this.translate.getFallbackLang();
    if (langToUse) {
      this.translate.use(langToUse);
    }
  }
}
