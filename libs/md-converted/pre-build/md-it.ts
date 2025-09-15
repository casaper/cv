import MarkdownIt from 'markdown-it';

import { attrs } from '@mdit/plugin-attrs';
import { abbr } from '@mdit/plugin-abbr';
import { dl } from '@mdit/plugin-dl';
import { footnote } from '@mdit/plugin-footnote';
import { sup } from '@mdit/plugin-sup';
import { tasklist } from '@mdit/plugin-tasklist';
import { sub } from '@mdit/plugin-sub';

export const mdIt = MarkdownIt({
  breaks: true,
  linkify: false,
})
  .use(abbr)
  .use(attrs, {})
  .use(dl)
  .use(footnote)
  .use(sub)
  .use(sup)
  .use(tasklist, {});
