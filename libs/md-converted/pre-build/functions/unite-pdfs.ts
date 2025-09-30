import { spawn } from 'child_process';
import { glob } from 'glob';
import { join } from 'path';

import {
  pdfConcatinatedRenderPath,
  pdfDir,
  pdfRenderTargetPath,
  projectRoot,
  projectRootRelative,
} from './paths';
import { Lang } from './types';

const runPdfuniteCommand = (concatDocPaths: string[], outputPath: string) =>
  new Promise((resolve, reject) => {
    const args = [
      ...concatDocPaths.map(p => `'${projectRootRelative(p)}'`),
      `'${projectRootRelative(outputPath)}'`,
    ];
    const commandString = `pdfunite ${args.join(' ')}`;
    console.log(`Running command: ${commandString}`);
    const docProcess = spawn('pdfunite', args, {
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

export const unitePdfs = async (lang: Lang = 'en') => {
  const concatPdfs = await glob(`${join(pdfDir, 'concat_docs')}/*.pdf`);
  const inputPdf = pdfRenderTargetPath(lang);
  const concatDocs = [inputPdf, ...concatPdfs.sort()];
  await runPdfuniteCommand(concatDocs, pdfConcatinatedRenderPath(lang));
};
