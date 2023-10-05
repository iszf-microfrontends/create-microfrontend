import { createMicrofrontend } from './create-microfrontend';
import { type Argv } from './types';
import { parseArgvIntoOptions, promptForMissingOptions } from './utils';

export const cli = async (argv: Argv): Promise<void> => {
  const rawOptions = await parseArgvIntoOptions(argv);
  const options = await promptForMissingOptions(rawOptions);
  await createMicrofrontend(options);
};
