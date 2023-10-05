import { execa } from 'execa';

export const initGit = async (targetDir: string): Promise<void> => {
  const result = await execa('git', ['init'], {
    cwd: targetDir,
  });
  if (result.failed) {
    throw new Error('Failed to initialize git');
  }
};
