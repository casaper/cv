import {
  langs,
  odtToPdf,
  pandocMarkdownToOdt,
  pdfPreCleanup,
  unitePdfs,
} from './functions';

async function main() {
  for (const lang of langs) {
    console.log(`Converting markdown to ODT and PDF for lang: ${lang}`);
    await pdfPreCleanup(lang);
    await pandocMarkdownToOdt(lang);
    await odtToPdf(lang);
    await unitePdfs(lang);
  }
}

main().catch(console.error);
