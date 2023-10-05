import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export const copyPackageJson = async (packageJsonPath: string, targetDir: string): Promise<void> => {
  try {
    const packageJsonContent = await readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    packageJson.name = targetDir === '.' ? path.basename(process.cwd()) : targetDir;
    await writeFile(`${targetDir}/package.json`, JSON.stringify(packageJson, null, 2));
  } catch {
    throw new Error('Failed to create package.json');
  }
};
