import fs from 'node:fs';
import { bannerPath } from './const.js';
import { Parser } from './filters/parser.js';
import { Transformer } from './filters/transformer.js';

const fileContent = fs.readFileSync(bannerPath).toString();

const config = {
  text: {
    initX: 15,
    initY: 30,
    incY: 20,
    customAttr: 'opacity="0"'
  },
  animation: {
    enabled: true,
    dur: 0.2,
    begin: 0,
    attributeName: 'opacity',
    values: '0;1',
    fill: 'freeze',
    calcMode: 'discrete'
  }
};

const parsedFile = new Parser().process(fileContent);
const transformer = new Transformer(config).process(parsedFile);

console.log(transformer);

// console.log(
//   lines
//     .map((line: string, index: number) =>
//       line
//         ? `<text x="${initX}" y="${(initY + incrementY * index).toFixed(1)}" opacity="0">${line}
// <animate attributeName="opacity" values="0;1" dur="${animationDur}s" begin="${(animationDur * index).toFixed(1)}s" fill="freeze" calcMode="discrete" />
// </text>`
//         : ''
//     )
//     .join(LINE_FEED)
// );
