export const templates = ['react-ts'] as const;

export type Argv = string[];

export type Template = (typeof templates)[number];

export type RawOptions = {
  skipPrompts: boolean;
  git: boolean;
  install: boolean;
  targetDir?: string;
  template?: Template;
};

export type Options = Omit<RawOptions, 'skipPrompts'> & {
  template: Template;
  targetDir: string;
};
