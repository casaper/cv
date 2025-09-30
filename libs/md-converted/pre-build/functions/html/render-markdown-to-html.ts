import { abbr } from '@mdit/plugin-abbr';
import { attrs } from '@mdit/plugin-attrs';
import { dl } from '@mdit/plugin-dl';
import { footnote } from '@mdit/plugin-footnote';
import { include } from '@mdit/plugin-include';
import { sub } from '@mdit/plugin-sub';
import { sup } from '@mdit/plugin-sup';
import { tasklist } from '@mdit/plugin-tasklist';
import MarkdownIt from 'markdown-it';

import { htmlAnchorLinksWithPrefix } from './html-anchor-links-with-prefix';
import { htmlExternalLinksInNewTab } from './html-external-links-in-new-tab';
import { htmlFormatWithPrettier } from './html-format-with-prettier';

const mdIt = MarkdownIt({
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

const mdItIncludePlugin = ({ filePath }: { filePath?: string }) =>
  filePath?.length ? mdIt.use(include, { currentPath: () => filePath }) : mdIt;

export const renderMarkdownToHtml = async (
  markdownDocument: string,
  { filePath, anchorPrefix }: { filePath?: string; anchorPrefix?: string } = {}
) => {
  const htmlDocument = mdItIncludePlugin({ filePath: filePath }).render(
    markdownDocument,
    { filePath }
  );
  const linksSanitized = htmlAnchorLinksWithPrefix(
    htmlExternalLinksInNewTab(htmlDocument),
    anchorPrefix
  );
  return htmlFormatWithPrettier(linksSanitized);
};
