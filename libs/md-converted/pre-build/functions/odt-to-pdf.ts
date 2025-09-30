import { spawn } from 'child_process';

import {
  odtRenderTargetPath,
  pdfDir,
  projectRoot,
  projectRootRelative,
} from './paths';
import { Lang } from './types';
import { fullLocale } from './utils';

export const odtToPdf = (lang: Lang = 'en') =>
  new Promise((resolve, reject) => {
    const args = [
      '--headless',
      `--language='${fullLocale(lang)}'`,
      `--convert-to pdf '${projectRootRelative(odtRenderTargetPath(lang))}'`,
      `--outdir '${projectRootRelative(pdfDir)}'`,
    ];
    const commandString = `libreoffice ${args.join(' ')}`;
    console.log(`Running command: ${commandString}`);
    const docProcess = spawn('libreoffice', args, {
      shell: true,
      cwd: projectRoot,
    });
    docProcess.on('error', error => {
      const message = `Libreoffice process closed with error: ${error}\nArgs: ${commandString}`;
      console.error(message);
      reject(error);
    });
    docProcess.on('close', (code, signal) => {
      if (code === 0) {
        return resolve(true);
      }
      const message = `Libreoffice process closed with code ${code} and signal ${signal}\nArgs: ${args.join(' ')}`;
      console.error(message);
      reject(new Error(message));
    });
  });
