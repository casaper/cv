import { join, resolve } from 'path/posix';

import { Lang } from './types';

export const projectRoot = resolve(__dirname, '../../');
export const workspaceRoot = resolve(projectRoot, '../../');

export const projectRootRelative = (subjectPath: string) =>
  resolve(subjectPath).replace(`${projectRoot}/`, '');

export const libDir = join(projectRoot, 'src/lib');
export const mdsDir = join(projectRoot, 'src/mds');
export const odtDir = join(projectRoot, 'src/odts');
export const pdfDir = join(projectRoot, 'src/pdfs');
export const translationsDir = join(workspaceRoot, 'src/assets/i18n');

export const markdownSourcePath = (lang: Lang = 'en') =>
  join(mdsDir, `${lang}.md`);

export const markdownRenderTargetPath = (lang: Lang = 'en') =>
  join(libDir, `${lang}.component.html`);

export const odtTemplatePath = (lang: Lang = 'en') =>
  join(odtDir, `template-${lang}.odt`);

const cvNameBase = 'CV_Kaspar_Vollenweider';

export const odtRenderTargetPath = (lang: Lang = 'en') =>
  join(odtDir, `${cvNameBase}_${lang}.odt`);

export const pdfRenderTargetPath = (lang: Lang = 'en') =>
  join(pdfDir, `${cvNameBase}_${lang}.pdf`);

export const pdfConcatinatedRenderPath = (lang: Lang = 'en') =>
  join(pdfDir, `${cvNameBase}_${lang}_with_certs.pdf`);

export const translationPath = (lang: Lang = 'en') =>
  join(translationsDir, `${lang}.json`);
