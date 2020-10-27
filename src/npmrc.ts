import { update, replace } from './utils';

const rc = '.npmrc';

export async function configure(
  token: string,
  registry: boolean,
): Promise<void> {
  return update(rc, (lines) => {
    const prefix = '//npm.pkg.github.com';
    replace(lines, prefix, `${prefix}/:_authToken=${token}`);
    if (registry) {
      setRegistry(lines, process.env.GITHUB_REPOSITORY?.split('/')?.[0]);
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
