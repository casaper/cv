import { spawn } from 'child_process';

import {
  markdownSourcePath,
  odtDir,
  odtRenderTargetPath,
  odtTemplatePath,
  projectRoot,
  projectRootRelative,
} from './paths';
import { Lang } from './types';
import { fullLocale, getAppTranslations } from './utils';

export const pandocMarkdownToOdt = (lang: Lang = 'en') =>
  new Promise((resolve, reject) => {
    const translations = getAppTranslations(lang);
    const args = [
      projectRootRelative(markdownSourcePath(lang)),
      `--reference-doc='${projectRootRelative(odtTemplatePath(lang))}'`,
      `--resource-path='${projectRootRelative(odtDir)}'`,
      `--metadata title="${translations.title}"`,
      `--metadata subtitle="${translations.subtitle}"`,
      `--metadata lang="${fullLocale(lang)}"`,
      `-o '${projectRootRelative(odtRenderTargetPath(lang))}'`,
    ];
    const commandString = `pandoc ${args.join(' ')}`;
    console.log(`Running command: ${commandString}`);
    const docProcess = spawn('pandoc', args, { shell: true, cwd: projectRoot });
    docProcess.on('error', error => {
      const message = `Pandoc process closed with error: ${error}\nArgs: ${commandString}`;
      console.error(message);
      reject(error);
    });
    docProcess.on('close', (code, signal) => {
      if (code === 0) {
        return resolve(true);
      }
      const message = `Pandoc process closed with code ${code} and signal ${signal}\nArgs: ${args.join(' ')}`;
      console.error(message);
      reject(new Error(message));
    });
  });
