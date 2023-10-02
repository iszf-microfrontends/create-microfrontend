import { readFile, writeFile } from 'fs/promises';

export const copyPackageJson = async (packageJsonPath: string, targetDir: string) => {
  try {
    const packageJsonContent = await readFile(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    packageJson.name = targetDir;
    await writeFile(`${targetDir}/package.json`, JSON.stringify(packageJson, null, 2));
  } catch {
    throw new Error('Failed to create package.json');
  }
};
