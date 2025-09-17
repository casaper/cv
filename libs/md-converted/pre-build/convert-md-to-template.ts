import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { libDir, mdsDir } from './fs-paths';
import { renderMarkdown } from './md-it';

type Lang = 'de' | 'en';

const sourcePath = (lang: Lang = 'en') => join(mdsDir, `${lang}.md`);

const targetPath = (lang: Lang = 'en') =>
  join(libDir, `${lang}.component.html`);

const convertMdToTemplate = async ({ lang = 'en' }: { lang?: Lang } = {}) => {
  if (!existsSync(sourcePath(lang))) {
    throw new Error(`Source file does not exist: ${sourcePath(lang)}`);
  }
  const markdownSource = await readFile(sourcePath(lang), {
    encoding: 'utf-8',
  });

  const renderedHtml = await renderMarkdown(markdownSource, {
    filePath: sourcePath(lang),
    anchorPrefix: lang,
  });
  await writeFile(targetPath(lang), renderedHtml, {
    encoding: 'utf-8',
  });
};

const convertMdForAllLangs = async () => {
  await convertMdToTemplate({ lang: 'en' });
  await convertMdToTemplate({ lang: 'de' });
};

convertMdForAllLangs().catch(console.error);
