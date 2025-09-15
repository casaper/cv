import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'en',
  },
  {
    path: 'en',
    loadComponent: () =>
      import('@cv/md-converted').then(m => m.MdConvertedEnComponent),
  },
  {
    path: 'de',
    loadComponent: () =>
      import('@cv/md-converted').then(m => m.MdConvertedDeComponent),
  },
];
