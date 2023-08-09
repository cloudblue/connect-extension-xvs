import {
  googleCancelBaseline,
  googleCheckCircleBaseline,
  googleErrorBaseline,
  googleFiberManualRecordBaseline,
  googleLabelBaseline,
  googleLabelOffBaseline,
  googleLockBaseline,
  googleLockOpenBaseline,
  googlePauseCircleFilledBaseline,
  googleRemoveCircleBaseline,
  googleVisibilityOffBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  connectOptimizedClockAnimated, // Regular: googleWatchLaterBaseline
} from '@cloudblueconnect/material-svg/animated';


/* COLORS */
/* eslint padding-line-between-statements: 0 */
export const baseTextColor = '#212121';
export const assistiveTextColor = '#707070';
export const cGreyDarken1 = '#757575';
export const cGreyDarken2 = '#616161';
export const cGreyDarken3 = '#424242';
export const disabledColor = '#bdbdbd';
export const niceGreen = '#0bb071';
export const niceRed = '#ff6a6a';
export const orangeDimmed = '#f2994a';
export const paleOrange = '#fff2e6';
export const themeGrey1 = '#666666';
export const themeLight1 = '#e0e0e0';
export const yellow = '#F2C94C';
export const white = '#ffffff';
export const whiteSmoke = '#f5f5f5';

export const defaultEchartsColorPalette = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
];

export const colorsDict = {
  black: 'black',
  blue: 'blue',
  green: 'green',
  grey: 'grey',
  lightBlue: 'light blue',
  lime: 'lime',
  orange: 'orange',
  pink: 'pink',
  red: 'red',
  violet: 'violet',
  white: 'white',
};

// Hex only
export const colorsValues = {
  [colorsDict.blue]: {
    color: '#3150bc',
    label: 'blue',
  },
  [colorsDict.green]: {
    color: '#0bb071',
    label: 'green',
  },
  [colorsDict.grey]: {
    color: '#666666',
    label: 'grey',
  },
  [colorsDict.lightBlue]: {
    color: '#2c98f0',
    label: 'light blue',
  },
  [colorsDict.lime]: {
    color: '#2fb11a',
    label: 'lime',
  },
  [colorsDict.orange]: {
    color: '#f2994a',
    label: 'orange',
  },
  [colorsDict.pink]: {
    color: '#f70076',
    label: 'pink',
  },
  [colorsDict.red]: {
    color: '#ff6a6a',
    label: 'red',
  },
  [colorsDict.violet]: {
    color: '#8133ff',
    label: 'violet',
  },
  [colorsDict.white]: {
    color: '#ffffff',
    label: 'white',
  },
  [colorsDict.black]: {
    color: '#000000',
    label: 'black',
  },
};

export const colorVars = [
  'primary',
  'accent',
  'contrast',
];


/* REST */
export const responseTypes = {
  BLOB: 'blob',
  JSON: 'json',
  FORM_DATA: 'formData',
  TEXT: 'text',
};

/* STATUSES */

export const icons = {
  done: googleCheckCircleBaseline,
  dot: googleFiberManualRecordBaseline,
  error: googleErrorBaseline,
  failed: googleCancelBaseline,
  hidden: googleVisibilityOffBaseline,
  label_off: googleLabelOffBaseline,
  label: googleLabelBaseline,
  lock: googleLockBaseline,
  open: googleLockOpenBaseline,
  paused: googlePauseCircleFilledBaseline,
  skip: googleRemoveCircleBaseline,
  waiting: connectOptimizedClockAnimated,
};

export const statusesColors = {
  attention: '#f2994a',
  default: '#424242',
  disabled: '#b1b1b1',
  done: '#0bb071',
  negative: '#ff6a6a',
};

export const statuses = {
  deleted: {
    text: 'deleted',
    icon: icons.failed,
    color: statusesColors.negative,
  },
  active: {
    text: 'active',
    icon: icons.done,
    color: statusesColors.done,
  },
  reconfiguring: {
    text: 'reconfiguring',
    icon: icons.waiting,
    color: statusesColors.attention,
  },
  reviewing: {
    text: 'reviewing',
    icon: icons.waiting,
    color: statusesColors.disabled,
  },
  pending: {
    text: 'pending',
    icon: icons.waiting,
    color: statusesColors.disabled,
  },
  processing: {
    text: 'processing',
    icon: icons.waiting,
    color: statusesColors.disabled,
  },
  suspended: {
    text: 'suspended',
    icon: icons.paused,
    color: statusesColors.attention,
  },
  terminated: {
    text: 'terminated',
    icon: icons.failed,
    color: statusesColors.negative,
  },
  terminating: {
    text: 'terminating',
    icon: icons.waiting,
    color: statusesColors.negative,
  },
  ready: {
    text: 'ready',
    icon: icons.done,
    color: statusesColors.done,
  },
  failed: {
    text: 'error',
    icon: icons.error,
    color: statusesColors.negative,
  },
  done: {
    text: 'done',
    icon: icons.done,
    color: statusesColors.done,
  },
  synced: {
    text: 'synced',
    icon: icons.done,
    color: statusesColors.done,
  },
  error: {
    text: 'error',
    icon: icons.error,
    color: statusesColors.negative,
  },
  aborted: {
    text: 'aborted',
    icon: icons.failed,
    color: statusesColors.negative,
  },
  aborting: {
    text: 'aborting',
    icon: icons.waiting,
    color: statusesColors.negative,
  },
  delegated: {
    text: 'delegated',
    icon: icons.done,
    color: statusesColors.done,
  },
  not_delegated: {
    text: 'not delegated',
    icon: icons.skip,
    color: statusesColors.disabled,
  },
};

export const animationTime = 300;


export const timeFormats = {
  TIME: 'LT',
  TIME_WITH_SECONDS: 'LTS',
};

export const discountLevels = {
  '01A12': 'Level 1',
  '02A12': 'Level 2',
  '03A12': 'Level 3',
  '04A12': 'Level 4',
};
