import path from 'path';
import { homedir } from 'os';
import { update, replace } from './utils';

interface Options {
  token: string;
  global: boolean;
  registry: boolean;
}

export async function configure(options: Options): Promise<void> {
  const rcPath = path.join(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    options.global ? homedir() : process.env.GITHUB_WORKSPACE!,
    '.npmrc',
  );
  return update(rcPath, (lines) => {
    const prefix = '//npm.pkg.github.com';
    replace(lines, prefix, `${prefix}/:_authToken=${options.token}`);
    if (options.registry) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setRegistry(lines, process.env.GITHUB_REPOSITORY!.split('/')![0]);
    }
  });
}

const setRegistry = (lines: string[], name?: string) => {
  if (name === undefined) {
    return;
  }
  const prefix = `@${name.toLowerCase()}:registry`;
  replace(lines, prefix, `${prefix}=https://npm.pkg.github.com/${name}`);
};
