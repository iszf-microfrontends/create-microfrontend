import chalk from 'chalk';
import yargs from 'yargs';

import { templates } from '../types';

import type { Argv, RawOptions, Template } from '../types';

const checkTemplateValidity = (template: any): template is Template => typeof template === 'undefined' || templates.includes(template);

export const parseArgvIntoOptions = async (argv: Argv): Promise<RawOptions> => {
  const options = await yargs(argv.slice(2))
    .options({
      template: {
        alias: 't',
        type: 'string',
        describe: `Specify the template to use: ${templates.join(', ')}`,
      },
      yes: {
        alias: 'y',
        type: 'boolean',
        describe: 'Skip prompts and use default options',
      },
      git: {
        alias: 'g',
        type: 'boolean',
        describe: 'Initialize a git repository',
      },
      install: {
        alias: 'i',
        type: 'boolean',
        describe: 'Install dependencies after generating the microfrontend',
      },
    })
    .parse();

  const template = options.template && options.template.toLowerCase();
  const isTemplateValid = checkTemplateValidity(template);
  if (!isTemplateValid) {
    console.log(
      `%s You passed incorrect template: ${options.template}. List of supported templates: ${templates.join(', ')}`,
      chalk.yellow.bold('WARNING'),
    );
  }

  return {
    targetDir: typeof options._[0] === 'undefined' ? options._[0] : `${options._[0]}`,
    skipPrompts: options.yes || false,
    git: options.git || false,
    install: options.install || false,
    template: isTemplateValid ? template : undefined,
  };
};
