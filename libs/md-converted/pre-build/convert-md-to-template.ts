import { langs, renderMarkdownToComponentTemplate } from './utils';

const convertMdForAllLangs = async () => {
  for (const lang of langs) {
    console.log(`Rendering markdown for lang: ${lang}`);
    await renderMarkdownToComponentTemplate({ lang });
  }
};

convertMdForAllLangs().catch(console.error);
