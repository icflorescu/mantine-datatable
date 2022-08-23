import { readFile } from 'node:fs/promises';

export const readCodeFile = (path: string) => readFile(path, { encoding: 'utf8' });
export const readExampleCodeFile = (fileName: string) => readCodeFile(`examples/${fileName}`);
