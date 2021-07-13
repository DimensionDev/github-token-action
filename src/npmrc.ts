import { execFile as _execFile } from 'child_process';
import { promisify } from 'util';

interface Options {
  token: string;
  global: boolean;
  registry: boolean;
}

export async function configure(options: Options): Promise<void> {
  await setToken(options.token, options.global);
  if (options.registry) {
    await setRepistry(options.global);
  }
}

async function setToken(token: string, global: boolean) {
  await push('//npm.pkg.github.com/:_authToken', token, global);
}

async function setRepistry(global: boolean) {
  const repository = process.env.GITHUB_REPOSITORY ?? '';
  const index = repository.indexOf('/');
  const name = repository.slice(0, index);
  const registry = `@${name.toLowerCase()}:registry`;
  await push(registry, `https://npm.pkg.github.com/${name}`, global);
}

function push(key: string, value: string, global: boolean) {
  const execFile = promisify(_execFile);
  const argv = ['config', 'set', `${key}=${value}`];
  if (global) {
    argv.push('--global');
  }
  return execFile('npm', argv);
}
