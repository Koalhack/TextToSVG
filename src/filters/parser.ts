import { LINES_SEPARTOR, NOTHING, TAG, TAG_NAME, TAG_VALUE } from '../const.js';
import type { Filter } from './interface.js';

type part = {
  name?: string;
  value: string;
};

export class Parser implements Filter<string, part[][]> {
  process(input: string): part[][] {
    const lines = input.trim().split(LINES_SEPARTOR);
    const nonEmptyLines = this.removeEmptyLines(lines);

    return nonEmptyLines.map(line => this.tagParser(line));
  }

  private removeEmptyLines(lines: string[]): string[] {
    return lines.filter(line => line.trim() !== NOTHING);
  }

  private tagParser(line: string): part[] {
    const parts = line.split(TAG);
    return parts.map(part => {
      const name = part.match(TAG_NAME)?.[0] ?? '';
      const value = part.match(TAG_VALUE)?.[0] ?? part;
      return { name: name, value: value };
    });
  }
}
