import fs from 'node:fs';
import { bannerPath } from './const.js';
import { Parser } from './filters/parser.js';
import { Transformer } from './filters/transformer.js';
import { Pump } from './pump.js';

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

const pump = new Pump<string, string>()
  .addFilter(new Parser())
  .addFilter(new Transformer(config));

const output = pump.process(fileContent);

console.log(output);
