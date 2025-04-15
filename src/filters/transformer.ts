import { LINE_FEED, NOTHING } from '../const.js';
import type { Config } from '../types.js';
import { objectToAttributes } from '../utils/utils.js';
import type { Filter } from './interface.js';
import type { part } from './parser.js';

export class Transformer implements Filter<part[][], string> {
  parameters: Config;
  constructor(config: Config) {
    this.parameters = config;
  }

  process(linesTags: part[][]): string {
    return linesTags
      .map((lineTags, lineIndex) => {
        const animate = this.formatAnimation(lineIndex);
        const styledLine = lineTags
          .map(tag => this.formatStyle(tag))
          .join(NOTHING);
        return this.formatLine(`${styledLine}${animate}`, lineIndex);
      })
      .join(LINE_FEED);
  }

  private formatAnimation(index: number): string {
    const { animation } = this.parameters;
    let { enabled, dur, begin, ...rest } = animation;

    const attributes = {
      dur: `${dur}s`,
      begin: `${(begin + dur * index).toFixed(1)}s`,
      ...rest
    };

    if (!enabled) return '';

    return `<animate ${objectToAttributes(attributes)} />`;
  }

  private formatStyle(part: part): string {
    return `<tspan class="${part.name}">${part.value}</tspan>`;
  }

  private formatLine(line: string, index: number): string {
    const { text } = this.parameters;
    const attributes = {
      x: text.initX ?? 0,
      y: (text.initY + text.incY * index).toFixed(1)
    };
    return `<text ${objectToAttributes(attributes)} ${text.customAttr}>${line}</text>`;
  }
}
