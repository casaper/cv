import { Lang } from '../types';

export const fullLocale = (lang: Lang) =>
  `${lang}-${{ en: 'GB', de: 'CH' }[lang]}`;
