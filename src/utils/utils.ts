import fs from 'node:fs';
import { SPACE } from '../const.js';

export function loadFile(path: string): string {
  return fs.readFileSync(path, 'utf-8').toString();
}

export function writeFile(path: string, data: string) {
  fs.writeFileSync(path, data);
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
