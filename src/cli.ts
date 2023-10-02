import { createMicrofrontend } from './create-microfrontend';
import { parseArgvIntoOptions, promptForMissingOptions } from './utils';

import type { Argv } from './types';

export const cli = async (argv: Argv) => {
  const rawOptions = await parseArgvIntoOptions(argv);
  const options = await promptForMissingOptions(rawOptions);
  await createMicrofrontend(options);
};
