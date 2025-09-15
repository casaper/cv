import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'en',
    pathMatch: 'full',
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
