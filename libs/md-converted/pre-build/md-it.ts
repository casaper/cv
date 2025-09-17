import { abbr } from '@mdit/plugin-abbr';
import { attrs } from '@mdit/plugin-attrs';
import { dl } from '@mdit/plugin-dl';
import { footnote } from '@mdit/plugin-footnote';
import { include } from '@mdit/plugin-include';
import { sub } from '@mdit/plugin-sub';
import { sup } from '@mdit/plugin-sup';
import { tasklist } from '@mdit/plugin-tasklist';
import MarkdownIt from 'markdown-it';
import prettier from 'prettier';

export const mdIt = MarkdownIt({
  breaks: true,
  linkify: false,
  html: true,
})
  .use(abbr)
  .use(attrs, {})
  .use(dl)
  .use(footnote)
  .use(sub)
  .use(sup)
  .use(tasklist, {});

export const mdItIncludePlugin = ({ currentPath }: { currentPath: string }) =>
  mdIt.use(include, {
    currentPath: () => currentPath,
  });

export const sanitizeRenderedLinks = (
  html: string,
  { anchorPrefix = '' }: { anchorPrefix?: string } = {}
) =>
  html
    .replaceAll(
      /<a href="http/g, // external links open in new tab
      '<a target="_blank" rel="noopener noreferrer" href="http'
    )
    .replaceAll(/<a href="#/g, `<a href="${anchorPrefix}#`);

export const formatRenderedHtml = (html: string): Promise<string> =>
  prettier.format(html, {
    parser: 'html',
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    printWidth: 80,
  });

export const renderMarkdown = async (
  markdown: string,
  { filePath, anchorPrefix }: { filePath?: string; anchorPrefix?: string } = {}
) => {
  const html = filePath?.length
    ? mdItIncludePlugin({ currentPath: filePath }).render(markdown, {
        filePath,
      })
    : mdIt.render(markdown);
  const linksSanitized = sanitizeRenderedLinks(html, { anchorPrefix });
  return formatRenderedHtml(linksSanitized);
};
