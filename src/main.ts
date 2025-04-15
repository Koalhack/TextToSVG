#!/usr/bin/env node

import { Command } from 'commander';
import { Parser } from './filters/parser.js';
import { Transformer } from './filters/transformer.js';
import { Pump } from './pump.js';
import {
  loadFile,
  parseConfig,
  stringRangeReplace,
  writeFile
} from './utils/utils.js';
import { CONTENT_END, CONTENT_START, LINE_FEED } from './const.js';
import infos from '../package.json' with { type: 'json' };

// ─── Program ─────────────────────────────────────────────────────────────────────────
const program = new Command();
program.version(infos.version);

// ─── Options ─────────────────────────────────────────────────────────────────────────
program
  .requiredOption('-c, --config <.json>', 'JSON config file path')
  .requiredOption('-i, --input <.txt>', 'TXT input file path')
  .requiredOption('-o, --output <.svg>', 'SVG output file path');

program.parse();

const { config, input, output } = program.opts();

// ─── Load ────────────────────────────────────────────────────────────────────────────
const inputData = loadFile(input);
const outputData = loadFile(output);

const configData = loadFile(config);
const configObject = parseConfig(configData);

// ─── process ─────────────────────────────────────────────────────────────────────────
const pump = new Pump<string, string>()
  .addFilter(new Parser())
  .addFilter(new Transformer(configObject));

const pumpProcess = pump.process(inputData);

// ─── output ──────────────────────────────────────────────────────────────────────────
const newOutputData = stringRangeReplace(
  outputData,
  LINE_FEED + pumpProcess + LINE_FEED,
  CONTENT_START,
  CONTENT_END
);

writeFile(output, newOutputData);
console.log('Output file updated');
