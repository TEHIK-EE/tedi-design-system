const { argv } = require('node:process');
const { format, normalize } = require('node:path');
const { writeFile } = require('node:fs/promises');

const IGNORE_KEY = [];
const SAVE_NAME = 'variables';

const tokensToCss = (object = {}, base = `-`) =>
  Object.entries(object).reduce((css, [key, value]) => {
    let newBase = base;

    if (!IGNORE_KEY.includes(key)) {
      newBase = base + `-${key}`;
    }

    if (typeof value !== 'object') {
      return css + newBase + `: ${value};\n`;
    }
    return css + tokensToCss(value, newBase);
  }, ``);

const saveTokens = async (name, tokens) => {
  try {
    await writeFile(`${name}.scss`, tokens);
  } catch (e) {
    console.log('There was an error while saving a file.\n', e);
  }
};

try {
  const args = argv.slice(2);
  const tokensPath = format({ root: './', base: normalize(args[0]) });
  const tokens = require(tokensPath);

  const cssVariables = tokensToCss(tokens);
  const cssClass = `:root {\n${cssVariables.replaceAll('--', '  --')}}\n`;
  saveTokens(SAVE_NAME, cssClass);
} catch (e) {
  console.log('Provide a correct argument - a relative path to design tokens.\n', e);
}
