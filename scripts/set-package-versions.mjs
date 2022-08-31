import { execSync } from 'node:child_process';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';
import pkg from '../package.json' assert { type: 'json' };

const rl = readline.createInterface({ input, output });

console.log(`Current version: ${pkg.version}`);
const newVersion = await rl.question('New version: ');
if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
  console.error("Version doesn't match semver pattern. Aborting.");
}
execSync(`yarn version --no-git-tag-version --new-version ${newVersion}`);
execSync(`yarn workspace mantine-datatable version --no-git-tag-version --new-version ${newVersion}`);
execSync(`yarn workspace mantine-datatable-docs version --no-git-tag-version --new-version ${newVersion}`);
process.exit(0);
