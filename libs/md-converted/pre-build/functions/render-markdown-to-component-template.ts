import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { renderMarkdownToHtml } from './html';
import { markdownRenderTargetPath, markdownSourcePath } from './paths';
import { Lang } from './types';

export const renderMarkdownToComponentTemplate = async ({
  lang = 'en',
}: { lang?: Lang } = {}) => {
  if (!existsSync(markdownSourcePath(lang))) {
    throw new Error(`Source file does not exist: ${markdownSourcePath(lang)}`);
  }
  const markdownSource = await readFile(markdownSourcePath(lang), {
    encoding: 'utf-8',
  });

  const renderedHtml = await renderMarkdownToHtml(markdownSource, {
    filePath: markdownSourcePath(lang),
    anchorPrefix: lang,
  });
  await writeFile(markdownRenderTargetPath(lang), renderedHtml, {
    encoding: 'utf-8',
  });
};
