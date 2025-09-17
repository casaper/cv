import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withRouterConfig,
  // withDebugTracing,
} from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { appRoutes } from './app.routes';
import { FALLBACK_LANG } from './constants/i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(
      appRoutes,
      // withDebugTracing(),
      withRouterConfig({
        urlUpdateStrategy: 'eager', // default is 'deferred'
      }),
      withHashLocation(), // hash location for GitHub Pages
      withComponentInputBinding() // enable @Input binding from route data
    ),
    provideClientHydration(withEventReplay()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: 'i18n/',
        suffix: '.json',
      }),
      fallbackLang: FALLBACK_LANG,
      useDefaultLang: true,
    }),
  ],
};
