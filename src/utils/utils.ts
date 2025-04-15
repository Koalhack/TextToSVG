import fs from 'node:fs';
import { SPACE } from '../const.js';
import { ensureError } from './errors.js';
import type { Config } from '../types.js';

export function loadFile(path: string): string {
  try {
    return fs.readFileSync(path, 'utf-8').toString();
  } catch (err) {
    const error = ensureError(err);
    console.error(`Cannot load file "${path}", Error: "${error.message}"`);
    process.exit(1);
  }
}

export function writeFile(path: string, data: string) {
  try {
    fs.writeFileSync(path, data);
  } catch (err) {
    const error = ensureError(err);
    console.error(`Cannot write file "${path}", Error: "${error.message}"`);
    process.exit(1);
  }
}

export function parseConfig(config: string): Config {
  try {
    return JSON.parse(config);
  } catch (err) {
    const error = ensureError(err);
    console.error(`Cannot parse config file, Error: "${error.message}"`);
    process.exit(1);
  }
}

export function objectToAttributes(
  object: Record<string, string | number>
): string {
  return Object.entries(object)
    .map(([k, v]) => `${k}="${v}"`)
    .join(SPACE);
}

export function stringRangeReplace(
  input: string,
  content: string,
  start: string,
  end: string
): string {
  const NOT_FOUND = -1;
  let startPos = input.indexOf(start);
  let endPos = input.indexOf(end);

  if (startPos === NOT_FOUND || endPos === NOT_FOUND)
    throw new Error(`Search terms not found (${start} ${end})`);

  return (
    input.slice(0, input.indexOf(start) + start.length) +
    content +
    input.slice(input.indexOf(end))
  );
}
