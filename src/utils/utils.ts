import { SPACE } from '../const.js';

export function objectToAttributes(
  object: Record<string, string | number>
): string {
  return Object.entries(object)
    .map(([k, v]) => `${k}="${v}"`)
    .join(SPACE);
}
