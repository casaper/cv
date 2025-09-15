import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { resolve, join } from 'path';
import prettier from 'prettier';

import { mdIt } from './md-it';

type Lang = 'de' | 'en';

const libRoot = resolve(__dirname, '../');

const sourcePath = (lang: Lang = 'en') =>
  join(libRoot, 'src/mds', `${lang}.md`);

const targetPath = (lang: Lang = 'en') =>
  join(libRoot, 'src/lib', `${lang}.component.html`);

const convertMdToTemplate = async ({ lang = 'en' }: { lang?: Lang } = {}) => {
  if (!existsSync(sourcePath(lang))) {
    throw new Error(`Source file does not exist: ${sourcePath(lang)}`);
  }
  const markdownSource = await readFile(sourcePath(lang), {
    encoding: 'utf-8',
  });
  const templateHtml = mdIt.render(markdownSource);
  const formattedTemplateHtml = await prettier.format(templateHtml, {
    parser: 'html',
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    printWidth: 80,
  });
  await writeFile(targetPath(lang), formattedTemplateHtml, {
    encoding: 'utf-8',
  });
};

const convertMdForAllLangs = async () => {
  await convertMdToTemplate({ lang: 'en' });
  await convertMdToTemplate({ lang: 'de' });
};

convertMdForAllLangs().catch(console.error);
