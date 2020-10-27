import { promises as fs, PathLike } from 'fs';

export function chdir(directory: string): void {
  if (directory === '') {
    return;
  }
  process.chdir(directory);
}

export async function update(
  rc: PathLike,
  callback: (lines: string[]) => Promise<void> | void,
): Promise<void> {
  let lines: string[];
  try {
    lines = (await fs.readFile(rc, 'utf-8'))
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0);
  } catch {
    lines = [];
  }
  await callback(lines);
  fs.writeFile(rc, lines.join('\n'));
}

export function replace(lines: string[], prefix: string, input: string): void {
  const index = lines.findIndex((line) => line.startsWith(prefix));
  if (index === -1) {
    lines.push(input);
  } else {
    lines[index] = input;
  }
}
