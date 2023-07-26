import {
  T,
  __,
  anyPass,
  has,
  ifElse,
  includes,
  isEmpty,
  path,
  pipe,
  test,
  when,
} from 'ramda';


import {
  hexToRGB,
} from '~utils';


import {
  colorVars,
  colorsValues as predefinedColors,
} from '~tools/constants';


export const hexRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const validateHexColor = ifElse(
  Boolean,
  test(hexRegExp),
  T,
);

export const checkVarColor = includes(__, colorVars);

export const validateColor = anyPass([
  isEmpty,
  test(hexRegExp),
  checkVarColor,
  has(__, predefinedColors),
]);

export const hexColor = when(
  has(__, predefinedColors),
  colorName => path([colorName, 'color'], predefinedColors),
);

export const colorToRGB = pipe(
  hexColor,
  hexToRGB,
);
