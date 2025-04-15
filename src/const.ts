import { fileURLToPath } from 'node:url';
import path from 'node:path';

// ┌           ┐
// │   Paths   │
// └           ┘

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootpath = path.resolve(__dirname, '..');

export const bannerPath = path.join(__rootpath, 'dist', 'banner.txt');
export const svgPath = path.join(__rootpath, 'dist', 'test.svg');

// ┌                   ┐
// │   Special Chars   │
// └                   ┘

export const NOTHING = '';
export const SPACE = ' ';
export const CARRIAGE_RETURN = '\r';
export const LINE_FEED = '\n';

// ┌           ┐
// │   REGEX   │
// └           ┘

export const LINES_SEPARTOR = new RegExp(
  `${CARRIAGE_RETURN}?${LINE_FEED}`,
  'g'
);

export const TAG = new RegExp('(?={#[a-zA-Z]*?})', 'g');
export const TAG_NAME = new RegExp('(?<={#)[a-zA-Z]*?(?=})');
export const TAG_VALUE = new RegExp('(?<={#[a-zA-Z]*?}).*');

// ┌             ┐
// │   PATTERN   │
// └             ┘

export const CONTENT_START = '<!--CONTENT_START-->';
export const CONTENT_END = '<!--CONTENT_END-->';
