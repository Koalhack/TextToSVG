import fs from 'node:fs';
import { bannerPath } from './const.js';
import { Parser } from './filters/parser.js';

const fileContent = fs.readFileSync(bannerPath).toString();

console.log(new Parser().process(fileContent));

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
