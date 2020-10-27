import git from '@nice-labs/git-rev';

export function samver(): string {
  const date = git.commitDate();
  const timestamp = [
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ];
  const displayTime = timestamp
    .map((_) => _.toString().padStart(2, '0'))
    .join('');
  return [displayTime, git.commitHash(true)].join('-');
}
