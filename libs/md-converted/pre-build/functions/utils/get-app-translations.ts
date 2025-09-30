import translationsDe from '../../../src/i18n/de.json';
import translationsEn from '../../../src/i18n/en.json';
import { Lang } from '../types';

/**
 * The benefit of this is that the json translations are typed like this.
 */
export const getAppTranslations = (lang: Lang) => {
  if (lang === 'de') {
    return translationsDe;
  }
  if (lang === 'en') {
    return translationsEn;
  }
  throw new Error(`Unsupported language: ${lang}`);
};
