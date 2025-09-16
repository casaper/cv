import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { SUPPORTED_LANGS } from './constants/i18n';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: `<router-outlet />`,
})
export class App {
  private readonly translate = inject(TranslateService);
  constructor() {
    this.translate.addLangs(SUPPORTED_LANGS);
  }
}
