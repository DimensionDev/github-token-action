import { execFile } from 'child_process';
import { promisify } from 'util';

interface Options {
  token: string;
  global: boolean;
  registry: boolean;
}

export async function configure(options: Options): Promise<void> {
  await setToken(options.token);
  if (options.registry) {
    await setRepistry();
  }
}

async function setToken(token: string) {
  await push('//npm.pkg.github.com/:_authToken', token);
}

async function setRepistry() {
  const repository = process.env.GITHUB_REPOSITORY ?? '';
  const index = repository.indexOf('/');
  const name = repository.slice(0, index);
  const registry = `@${name.toLowerCase()}:registry`;
  await push(registry, `https://npm.pkg.github.com/${name}`);
}

function push(key: string, value: string) {
  return promisify(execFile)('npm', ['config', 'set', key, value]);
}
