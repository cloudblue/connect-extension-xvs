import {
  googleLanguageBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  T,
  __,
  allPass,
  anyPass,
  both,
  complement,
  concat,
  cond,
  converge,
  curry,
  has,
  head,
  ifElse,
  includes,
  is,
  isEmpty,
  isNil,
  join,
  map,
  none,
  objOf,
  path,
  pipe,
  prop,
  propEq,
  reject,
  replace,
  split,
  tail,
  test,
  toPairs,
  toUpper,
  when,
  zipObj,
} from 'ramda';

import {
  biarg,
  ensureArray,
  ensureString,
  isNotNilOrEmpty,
  isObjectStrict,
} from '~utils';

import convert from 'color-convert';

import {
  colorVars,
  colorsValues as predefinedColors,
} from '~constants';

import {
  filesize,
} from 'filesize';


/**
 * Convert HEX to RGB.
 *
 * @function
 * @param {string} hex Hex string
 * @returns {array} Color in RGB color space
 *
 * @example
 * hexToRGB('ffffff') //=> [255, 255, 255]
 */
export const hexToRGB = hex => convert.hex.rgb(hex);

/**
 * Returns a object with a given key as property in format `--{key}` and
 * RGB components with comma delimiter as value.
 *
 * @function
 * @param {string} key
 * @param {string} hexVal
 * @returns {object}
 *
 * @example
 * hexToStyleVar('color', '#00FF00') //=> { --color: '0, 255, 0' }
 */
export const hexToStyleVar = curry((key, hex) => pipe(
  hexToRGB,
  join(', '),
  objOf(`--${key}`),
)(hex));

/**
 * If the input has no units, adds px to it, otherwise returns the input.
 *
 * @function
 * @param {string|number} value
 *
 * @example
 * ```javascript
 * addUnits(20) // '20px';
 * addUnits('20px') // '20px';
 * ```
 */
export const addUnits = when(
  test(/^-?\d+$/),
  v => `${v}px`,
);

export const checkVarColor = includes(__, colorVars);

export const hexColor = when(
  has(__, predefinedColors),
  colorName => path([colorName, 'color'], predefinedColors),
);

export const colorToRGB = pipe(
  hexColor,
  hexToRGB,
);

/**
 * Convert RGB to HEX.
 *
 * @function
 * @param {string} rgb rgb string
 * @returns {string} hex color string
 *
 * @example
 * hexToRGB('255, 255, 255') //=> 'ffffff'
 */
export const rgbToHEX = pipe(
  split(','),
  map(Number),
  convert.rgb.hex,
);

export const hexRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const validateColor = anyPass([
  isEmpty,
  test(hexRegExp),
  checkVarColor,
  has(__, predefinedColors),
]);

/**
 * Check is color bright or not.
 * https://www.w3.org/TR/AERT/#color-contrast
 *
 * @function
 * @param {string} color Color in hex (supports `#` at start)
 * @returns {boolean} Is color bright or not
 */
export const isBright = pipe(
  replace('#', ''),
  convert.hex.rgb,
  ([r, g, b]) => r * 0.299 + g * 0.587 + b * 0.114 > 180,
);

export const validateHexColor = ifElse(
  Boolean,
  test(hexRegExp),
  T,
);

/**
 * Add delta value to each RGB components and returns hex value with `#` at start.
 * If value out of range, round to nearest.
 *
 * @function
 * @param {number} delta Delta value
 * @param {string} color Color in hex format
 * @returns {string} Color in hex with `#` at start.
 *
 * @example
 * hexBrightness(10)('00ffff') //=> '#0AFFFF'
 */
export const hexBrightness = curry((delta, color) => pipe(
  convert.hex.rgb,
  map((v) => {
    const val = v + delta;

    if (val < 0) {
      return 0;
    }

    if (val > 255) {
      return 255;
    }

    return val;
  }),
  convert.rgb.hex,
  concat('#'),
)(color));

/**
 * Capitalize string.
 *
 * @function
 * @param {string} str
 * @returns {string} Capitalized string.
 *
 * @example
 * toUpperFirstLetter('text') //=> 'Text'
 */
export const toUpperFirstLetter = pipe(
  ensureString,
  converge(concat, [
    pipe(head, toUpper),
    tail,
  ]),
);

/**
 * Represent object to array of objects.
 *
 * @function
 * @param {array} keys Pair of keys.
 * @param {object} source
 * @returns {array}
 *
 * @example
 * hydrateObj(['k', 'v'], { k1: v1, k2: v2 }) //=> [{ k: k1, v: v1 }, { k: k2, v: v2 }]
 * hydrateObj(['k', 'v', 'd'], { k1: v1, k2: v2 }) //=> [{ k: k1, v: v1 }, { k: k2, v: v2 }]
 */
export const hydrateObj = biarg(k => pipe(toPairs, map(zipObj(k))));

/**
 * Returns array of items with fields `value`, `text`.
 *
 * @function
 * @param {*} value
 * @returns {array} Prepared items.
 */
export const prepareSelectItems = cond([
  [both(is(Array), none(is(Object))), map(value => ({ value, text: toUpperFirstLetter(value) }))],
  [isObjectStrict, hydrateObj(['value', 'text'])],
  [T, ensureArray],
]);

/** Drops object with hide prop
 * @type {Function}
 * @param {Array} objs - objects
 * @return {Any}
 *
 * @summary Array -> Array
 * @example
 * Input:: dropHidden([{v: '1', hide: true}, {v: '2'}])
 * Output:: [{v: '2'}]
 */
export const dropHidden = reject(propEq(true, 'hide'));

/**
 * Returns value based on condition.
 * If truthy returns first, otherwise second.
 * Condition could be function, in this case returns a function that after call
 * invokes condition function with actual arguments and apply to `alt`.
 *
 * @function
 * @param {*} a Value if condition is true
 * @param {*} b Value if condition is false
 * @param {*} cond Condition
 * @returns {*}
 */
export const alt = curry((t, f, c) => {
  if (is(Function, c)) {
    return (...v) => alt(t, f, c(...v));
  }

  return c ? t : f;
});

export const getSkeletonsArray = number => (new Array(10)).fill(null)
  .map(() => (new Array(number)).fill(null)
    .map(() => Math.floor(Math.random() * 51) + 50));


/**
 * Checks if a given value is empty, null or undefined.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 */
export const isNilOrEmpty = anyPass([isEmpty, isNil]);

/**
 * Returns default alt-icon for pic component
 *
 * @function
 * @param {*} v
 * @returns {string}
 *
 * @example
 * altIcon('') //=> googleLanguageBaseline
 * altIcon(null) //=> googleLanguageBaseline
 * altIcon('abc') //=> ''
 */
export const altIcon = v => (isNilOrEmpty(v) ? googleLanguageBaseline : '');

/**
 * Returns human-readable filesize from bytes count
 *
 * @function
 * @param {number} bytes
 * @param {object} options - See https://github.com/avoidwork/filesize.js#optional-settings
 * @returns {string}
 */
export const getFileSize = (bytes = 0, options = {}) => filesize(
  bytes,
  {
    base: 2,
    locale: 'en',
    standard: 'jedec',
    ...options,
  },
);

export const isNotEmptyString = allPass([complement(isEmpty), is(String)]);

export const downloader = options => {
  // eslint-disable-next-line no-console
  console.log('options', options);
  const link = document.createElement('a');
  document.body.appendChild(link);

  const name = prop('name', options);
  const url = prop('url', options);

  if (isNotEmptyString(name)) link.download = name;
  else link.rel = 'noopener noreferrer';

  if (isNotNilOrEmpty(url)) {
    link.href = url;
  }

  link.click();
  document.body.removeChild(link);
};

export default {
  isNotEmptyString,
  downloader,
};

