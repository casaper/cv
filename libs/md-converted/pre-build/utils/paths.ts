import { join, resolve } from 'path/posix';

import { Lang } from './types';

export const projectRoot = resolve(__dirname, '../../');

export const libDir = join(projectRoot, 'src/lib');
export const mdsDir = join(projectRoot, 'src/mds');

export const markdownSourcePath = (lang: Lang = 'en') =>
  join(mdsDir, `${lang}.md`);
export const markdownRenderTargetPath = (lang: Lang = 'en') =>
  join(libDir, `${lang}.component.html`);
