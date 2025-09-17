import { join, resolve } from 'path/posix';

export const projectRoot = resolve(__dirname, '../');

export const libDir = join(projectRoot, 'src/lib');
export const mdsDir = join(projectRoot, 'src/mds');
