import { exportVariable, getInput, setFailed } from '@actions/core';
import * as npmrc from './npmrc';
import { samver } from './version';
import { chdir } from './utils';

async function main(): Promise<void> {
  chdir(getInput('working-directory'));

  const token = getInput('token');
  const registry = Boolean(getInput('registry'));
  await npmrc.configure(token, registry);

  exportVariable('BUILD_VERSION', samver());
}

main().catch((error: Error) => setFailed(error.message));
