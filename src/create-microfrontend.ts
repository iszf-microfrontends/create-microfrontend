import path from 'path';
import { fileURLToPath } from 'url';

import chalk from 'chalk';
import { Listr } from 'listr2';

import { gitIgnoreTemplate } from './file-templates';
import { copyPackageJson, copyTemplateFiles, installDeps, initGit, createFileByTemplate } from './utils';

import type { Options } from './types';

export const createMicrofrontend = async (options: Options) => {
  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(decodeURI(fileURLToPath(currentFileUrl)), '../../templates', options.template.toLowerCase());

  const tasks = new Listr(
    [
      {
        title: 'Copy template files',
        task: async () => {
          await copyTemplateFiles(templateDir, options.targetDir);
          await copyPackageJson(`${templateDir}/package.json`, options.targetDir);
        },
      },
      {
        title: 'Create other config files',
        task: () => createFileByTemplate(gitIgnoreTemplate, {}, options.targetDir, '.gitignore'),
      },
      {
        title: 'Initialize git',
        task: () => initGit(options.targetDir),
        enabled: options.git,
      },
      {
        title: 'Install dependencies',
        task: () => installDeps(options.targetDir),
        skip: () => (options.install ? false : 'Pass --install or -i to automatically install dependencies'),
      },
    ],
    { concurrent: false, exitOnError: true },
  );

  try {
    await tasks.run();
    console.log(`${chalk.green.bold('DONE')} Microfrontend is ready`);
  } catch (err) {
    console.error(err);
  }
};
