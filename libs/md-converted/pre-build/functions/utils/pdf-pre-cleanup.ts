import { existsSync } from 'fs';
import { rm } from 'fs/promises';

import {
  odtRenderTargetPath,
  pdfConcatinatedRenderPath,
  pdfRenderTargetPath,
} from '../paths';
import { Lang } from '../types';

export const pdfPreCleanup = async (lang: Lang = 'en') => {
  const deletePaths = [
    odtRenderTargetPath(lang),
    pdfRenderTargetPath(lang),
    pdfConcatinatedRenderPath(lang),
  ];
  for (const path of deletePaths) {
    if (existsSync(path)) {
      console.log(`Cleaning previous file: ${path}`);
      await rm(path);
    }
  }
};
