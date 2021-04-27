import { exportVariable, getInput, setFailed } from '@actions/core';
import * as npmrc from './npmrc';
import { samver } from './version';

async function main(): Promise<void> {
  const token = getInput('token');
  const registry = Boolean(getInput('registry'));
  const global = Boolean(getInput('global'));
  await npmrc.configure({ token, global, registry });

  exportVariable('BUILD_VERSION', samver());
}

main().catch((error: Error) => setFailed(error.message));
