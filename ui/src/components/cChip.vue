<!-- cChip Component

  Usage:

  c-chip(
    type="pale",                     // String (solid|pale|outline), default is solid
    text="New version available",    // Text
    icon="warning",                  // Icon name
    small=false,                     // Makes it small
    color="#123456"                  // (primary|accent|hex color (#123123)) - stylize the
                                        component depending on the type
    text-color="#123456"              // HEX String - sets text color
    icon-color="#123456"              // HEX String - sets icon color
    close=false                      // makes it closable
    rounded=true                     // border-radius height / 2
  )

-->

<template lang="pug">
.c-chip(
  :class="computedClasses",
  :style="computedColors",
)
  slot(name="icon")
    c-icon.c-chip__icon(
      v-if="icon",
      :icon="icon",
    )

  .c-chip__text(
    v-if="text || $slots.text",
    :class="cChipTextClasses",
  )
    slot(name="text") {{ text }}

  c-icon.c-chip__close-icon(
    v-if="close",
    :icon="googleCloseBaseline",
    @click="$emit('on-close-click')",
  )

  slot
</template>


<script>
import {
  googleCloseBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  F,
  T,
  __,
  always,
  cond,
  equals,
  flip,
  ifElse,
  includes,
  mergeAll,
  objOf,
  pick,
  pickBy,
  pipe,
  prop,
  propEq,
  test,
  values,
  where,
} from 'ramda';


import cIcon from '~components/cIcon.vue';


import {
  checkVarColor,
  colorToRGB,
  hexRegExp,
  validateColor,
  validateHexColor,
} from '~tools/colors';

import {
  alt,
  hexBrightness,
  hexToRGB,
  isBright,
  isNotNilOrEmpty,
  isString,
  notProp,
  obj,
  pathTo,
  propsTo,
  template,
} from '~utils';


import {
  colorVars,
} from '~constants';


export const cChipTypesDict = {
  solid: 'solid',
  pale: 'pale',
  outline: 'outline',
};
const cChipTypes = values(cChipTypesDict);

export const checkForDefaultContrastColor = where({
  color: includes(__, colorVars),
  type: equals('solid'),
});

export const setContrastColorForTypeSolid = ifElse(
  propEq('solid', 'type'),
  pipe(
    prop('color'),
    ifElse(
      isBright,
      hexBrightness(-192),
      hexBrightness(192),
    ),
    hexToRGB,
  ),
  F,
);

const computedStyle = (propName, cssVar) => pipe(
  cond([
    [prop(propName), pipe(prop(propName), hexToRGB)],
    [checkForDefaultContrastColor, always('var(--theme_contrast_rgb)')],
    [pipe(prop('color'), test(hexRegExp)), setContrastColorForTypeSolid],
    [T, F],
  ]),
  ifElse(
    Boolean,
    objOf(cssVar),
    obj,
  ),
);

export default {
  components: {
    cIcon,
  },

  props: {
    text: [String, Number],

    icon: Object,

    small: {
      type: Boolean,
      default: false,
    },

    capitalizeFirstLetter: {
      type: Boolean,
      default: true,
    },

    rounded: {
      type: Boolean,
      default: true,
    },

    close: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: cChipTypesDict.pale,
      validator: flip(includes)(cChipTypes),
    },

    color: {
      type: String,
      default: '',
      validator: validateColor,
    },

    textColor: {
      type: String,
      validator: validateHexColor,
    },

    iconColor: {
      type: String,
      validator: validateHexColor,
    },
  },

  data() {
    return {
      googleCloseBaseline,
    };
  },

  computed: {
    isVarColor: pathTo(['color'], checkVarColor),
    computedColor: vm => cond([
      [notProp('color'), obj],
      [prop('isVarColor'), always({ '--c-chip-color': `var(--theme_${vm.color}_rgb)` })],
      [T, pipe(prop('color'), colorToRGB, objOf('--c-chip-color'))],
    ])(vm),

    classNameByType: ({ type }) => `c-chip_${type}`,

    classNameBySize: alt(
      'c-chip_small',
      '',
      prop('small'),
    ),

    classNameByStyle: alt(
      '',
      'c-chip_non-rounded',
      prop('rounded'),
    ),

    computedClasses: pipe(
      pick(['classNameByType', 'classNameBySize', 'classNameByStyle']),
      pickBy(isNotNilOrEmpty),
      values,
    ),

    cChipTextClasses: template({ 'capitalize-first-letter': ['capitalizeFirstLetter'] }),

    computedTextColor: computedStyle('textColor', '--c-chip-text-color'),

    computedIconColor: computedStyle('iconColor', '--c-chip-icon-color'),

    computedColors: propsTo(
      ['computedColor', 'computedTextColor', 'computedIconColor'],
      mergeAll,
    ),
  },

  methods: {
    isString,
  },
};
</script>

<style lang="stylus">
@import '~styles/common.styl';

.c-chip {
  --c-chip-color: 66, 66, 66;
  --c-chip-text-color: var(--c-chip-color);
  --c-chip-icon-color: var(--c-chip-color);

  display: inline-flex;
  overflow: hidden;
  align-items: center;
  box-sizing: border-box;
  height: $module * 6;
  padding-right: $module;
  padding-left: $module * 2;
  border-radius: 12px;
  vertical-align: middle;

  &__text {
    overflow: hidden;
    flex: 1 1 auto;
    min-width: 0;

    font-size: 13px;
    line-height: 16px;
    font-weight: normal;
    color: _rgb(var(--c-chip-text-color));
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: $module;
    margin-right: $module * 2;
  }

  &__icon {
    width: 16px;
    height: 16px;
    font-size: 16px;

    &.c-icon,
    &.v-icon {
      color: _rgb(var(--c-chip-icon-color));
    }
  }

  &__close-icon {
    margin: 0;
    color: _rgb(var(--c-chip-text-color)) !important;
    width: 14px;
    height: 14px;

    &:hover {
      background-color: _rgba(var(--c-chip-icon-color), 0.15);
      border-radius: 50%;
    }
  }

  &_small {
    height: $module * 4;
    padding-left: $module;
    padding-right: $module;
    border-radius: 8px;
  }

  &_small &__text {
    font-size: 11px;
    font-weight: 500;
    line-height: 12px;
    margin-left: $module;
    margin-right: $module;
  }

  &_small &__icon {
    width: 12px;
    height: 12px;
    font-size: 12px;
  }

  &_small &__close-icon {
    width: 10px;
    height: 10px;
  }

  &_solid {
    background-color: _rgb(var(--c-chip-color));
    --c-chip-text-color: 255, 255, 255;
    --c-chip-icon-color: 255, 255, 255;
  }

  &_outline {
    border: 1px solid _rgb(var(--c-chip-color));
  }

  &_pale {
    background-color: _rgba(var(--c-chip-color), 0.1);
  }

  &_non-rounded {
    border-radius: 2px;
  }
}
</style>
