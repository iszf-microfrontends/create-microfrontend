import { promisify } from 'util';
import path from 'path';
import ncp from 'ncp';

const copy = promisify(ncp);

export const copyTemplateFiles = async (templateDir: string, targetDir: string) => {
  try {
    await copy(templateDir, targetDir, {
      clobber: false,
      filter: (file) => !['package.json', 'node_modules', 'dist'].includes(path.basename(file)),
    });
  } catch {
    throw new Error('Failed to copy template files');
  }
};
