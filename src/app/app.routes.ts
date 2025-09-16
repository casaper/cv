import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Kaspar Vollenweider - CV',
    loadComponent: () =>
      import('./components/main-content/main-content.component').then(
        m => m.MainContentComponent
      ),
  },
  {
    path: ':lang',
    pathMatch: 'full',
    title: 'Kaspar Vollenweider - CV',
    loadComponent: () =>
      import('./components/main-content/main-content.component').then(
        m => m.MainContentComponent
      ),
  },
];
