import { execa } from 'execa';

export const installDeps = async (targetDir: string) => {
  try {
    await execa('pnpm', ['install'], {
      cwd: targetDir,
      stdio: 'inherit',
    });
  } catch {
    throw new Error(`Failed to install dependencies`);
  }
};
