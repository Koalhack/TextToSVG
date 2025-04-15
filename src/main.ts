import {
  bannerPath,
  svgPath,
  CONTENT_END,
  CONTENT_START,
  LINE_FEED
} from './const.js';
import { Parser } from './filters/parser.js';
import { Transformer } from './filters/transformer.js';
import { Pump } from './pump.js';
import { loadFile, stringRangeReplace, writeFile } from './utils/utils.js';

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

// ─── Load ────────────────────────────────────────────────────────────────────────────
const inputFile = loadFile(bannerPath);
const outputFile = loadFile(svgPath);

// ─── process ─────────────────────────────────────────────────────────────────────────
const pump = new Pump<string, string>()
  .addFilter(new Parser())
  .addFilter(new Transformer(config));

const output = pump.process(inputFile);

// ─── output ──────────────────────────────────────────────────────────────────────────
const newOutput = stringRangeReplace(
  outputFile,
  LINE_FEED + output + LINE_FEED,
  CONTENT_START,
  CONTENT_END
);

try {
  writeFile(svgPath, newOutput);
} catch (error) {
  console.error(`Unable to write file ${svgPath}, error: ${error}`);
} finally {
  console.log('Output file updated');
}
