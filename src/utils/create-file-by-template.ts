import { writeFile } from 'fs/promises';

type GetTemplateCallback<T> = (args: T) => string;

export const createFileByTemplate = async <T>(
  getTemplate: GetTemplateCallback<T>,
  args: T,
  targetDir: string,
  filename: string,
): Promise<void> => {
  try {
    const template = getTemplate(args);
    await writeFile(`${targetDir}/${filename}`, template);
  } catch {
    throw new Error(`Failed to create ${filename}`);
  }
};
