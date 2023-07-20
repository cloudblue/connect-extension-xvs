<template lang="pug">
button.c-button(
  :type="type",
  :class="computedClasses",
  :style="computedColors",
  :disabled="calculatedDisabled",
  @click="$emit('click', $event)",
  ref="button",
)
  a.c-button__link(v-if="link && !disabled && !loading" :href="link")
  .c-button__icon-left(v-if="this.$slots.icon || icon")
    slot(name="icon")
      c-icon(
        v-if="showIconLoader",
        :icon="icons.connectLoaderAnimated",
        :size="iconSize",
        locator="loading-indicator",
      )

      c-icon(
        v-else-if="icon",
        :icon="icon",
        :size="iconSize",
      )

  slot
    template(v-if="label")
      c-icon(
        v-if="showLoader",
        :icon="icons.connectLoaderAnimated",
        :size="iconSize",
        locator="loading-indicator",
      )

      .c-button__label(
        :class="cButtonLabelClasses",
      ) {{ label }}

  .c-button__icon-right(v-if="this.$slots['right-icon'] || iconRight")
    slot(name="right-icon")
      c-icon(
        v-if="showRightIconLoader",
        :icon="icons.connectLoaderAnimated",
        :size="iconSize",
        locator="loading-indicator",
      )
      c-icon(
        v-else-if="iconRight",
        :icon="iconRight",
        :size="iconSize",
        :class="cButtonIconRightClasses",
      )
</template>

<script>
import {
  connectLoaderAnimated,
} from '@cloudblueconnect/material-svg/animated';

import {
  T,
  __,
  always,
  anyPass,
  both,
  cond,
  either,
  ifElse,
  includes,
  mergeAll,
  objOf,
  pick,
  pickBy,
  pipe,
  prop,
  propEq,
  values,
  where,
  whereEq,
} from 'ramda';


import cIcon from '~components/cIcon.vue';


import {
  checkVarColor,
  colorToRGB,
  hexColor,
  hexToRGB,
  isBright,
  rgbToHEX,
  validateColor,
} from '~helpers';

import {
  alt,
  isNilOrEmpty,
  isNotNilOrEmpty,
  notProp,
  obj,
  pathAlt,
  pathTo,
  propsTo,
  template,
} from '~utils';


export const cButtonModesDict = {
  solid: 'solid',
  flat: 'flat',
  outlined: 'outlined',
  rounded: 'rounded',
};

export const cButtonModes = values(cButtonModesDict);

const contrastHexColor = alt('#000000', '#FFFFFF', isBright);
const toContrastRGB = pipe(contrastHexColor, hexToRGB);


export default {
  components: {
    cIcon,
  },

  props: {
    active: Boolean,
    icon: Object,
    iconRight: Object,
    label: String,
    opener: Boolean,
    isOpen: Boolean,
    size: String,
    fluid: Boolean,

    loading: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: 'button',
      validator: includes(__, ['button', 'submit']),
    },

    mode: {
      type: String,
      default: cButtonModesDict.flat,
      validator: includes(__, cButtonModes),
    },

    color: {
      type: String,
      default: '',
      validator: validateColor,
    },

    small: {
      type: Boolean,
      default: false,
    },

    upperCase: {
      type: Boolean,
      default: true,
    },

    link: String,
  },

  data: () => ({
    buttonColor: '',
    icons: {
      connectLoaderAnimated,
    },
  }),

  computed: {
    calculatedDisabled: either(
      prop('loading'),
      prop('disabled'),
    ),

    isIconOnlyBtn: where({
      icon: isNotNilOrEmpty,
      label: isNilOrEmpty,
      iconRight: isNilOrEmpty,
    }),

    isTxtOnlyBtn: where({
      icon: isNilOrEmpty,
      label: isNotNilOrEmpty,
      iconRight: isNilOrEmpty,
    }),

    isIconsBtn: where({
      icon: isNotNilOrEmpty,
      iconRight: isNotNilOrEmpty,
    }),

    isSolidBtn: propEq(cButtonModesDict.solid, 'mode'),

    initialBtnColor: cond([
      [prop('color'), pathTo(['color'], hexColor)],
      [prop('isSolidBtn'), always('accent')],
      [T, always('#212121')],
    ]),

    isVarColor: pathTo(['initialBtnColor'], checkVarColor),

    classNameByMode: ({ mode }) => `c-button_${mode}`,
    classFluid: template({ 'c-button_fluid': ['fluid'] }),
    classActive: template({ 'c-button_active': ['active'] }),
    classNameBySize: pathAlt(['small'], 'c-button_small', ''),
    classNameByDisabled: pathAlt(['disabled'], 'c-button_disabled', ''),
    classNameByContent: cond([
      [prop('isIconOnlyBtn'), always('c-button_icon-only')],
      [prop('isTxtOnlyBtn'), always('c-button_txt-only')],
      [T, always('')],
    ]),

    computedClasses: pipe(
      pick([
        'classNameByMode', 'classNameBySize',
        'classNameByContent', 'classNameByDisabled',
        'classFluid', 'classActive',
      ]),
      pickBy(isNotNilOrEmpty),
      values,
    ),

    computedColor: vm => cond([
      [prop('disabled'), obj],
      [prop('isVarColor'), always({ '--button-computed-color': `var(--theme_${vm.initialBtnColor}_rgb)` })],
      [prop('color'), pipe(prop('color'), colorToRGB, objOf('--button-computed-color'))],
      [T, pipe(prop('initialBtnColor'), colorToRGB, objOf('--button-color'))],
    ])(vm),

    computedContentColor: ifElse(
      anyPass([prop('disabled'), notProp('isSolidBtn')]),
      obj,
      template({
        '--solid-content-color': pathTo(['buttonColor'], toContrastRGB),
      }),
    ),

    computedColors: propsTo(
      ['computedColor', 'computedContentColor'],
      mergeAll,
    ),

    showIconLoader: both(prop('loading'), anyPass([prop('icon'), prop('isIconsBtn')])),
    showLoader: whereEq({ loading: true, isTxtOnlyBtn: true }),
    showRightIconLoader: where({
      loading: Boolean,
      icon: isNilOrEmpty,
      iconRight: isNotNilOrEmpty,
    }),

    showIconOnly: anyPass([prop('showLoader'), prop('isIconOnlyBtn')]),

    iconSize: cond([
      [prop('size'), prop('size')],
      [both(prop('showIconOnly'), prop('small')), always('18')],
      [prop('showIconOnly'), always('24')],
      [prop('small'), always('14')],
      [T, always('18')],
    ]),

    cButtonLabelClasses: template({
      'c-button__label_uppercase': ['upperCase'],
      'c-button__label_loading': ['showLoader'],
    }),

    cButtonIconRightClasses: template({
      'opener-status': ['opener'],
      open: ['isOpen'],
    }),
  },

  mounted() {
    this.buttonColor = rgbToHEX(
      getComputedStyle(this.$refs.button).getPropertyValue('--button-color'),
    );
  },
};
</script>

<style lang="stylus">
@import '~styles/common.styl';
.c-button {
  // NOTE: define --button-custom-color on ancestor HTML nodes for overriding c-button defaults
  // - overriding order:
  // 1. cButton explicitly defined colors
  // 2. colors defined explicitly on external HTML elements via --button-custom-color
  // 3. cButton default colors

  --button-color: 33, 33, 33;
  --button-computed-color: var(--button-custom-color, var(--button-color));

  --button-border-color: #E0E0E0;
  --button-padding:  8px;
  --button-height: 36px;
  --button-min-width: 80px;
  --button-label-size: 14px;
  --button-label-margin: 8px;
  --button-label-letter-spacing: 0.6px;
  --button-icon-margin: 4px;

  border: none;
  font-family: $theme-font-family;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--button-height);
  min-width: var(--button-min-width);
  overflow: hidden;
  padding-left: var(--button-padding);
  padding-right: var(--button-padding);

  color: _rgb(var(--button-computed-color));
  background-color: transparent;

  border-radius: 2px;
  cursor: pointer;

  vertical-align: bottom;
  box-sizing: border-box;
  position: relative;

  &_fluid{
    display: flex;
    width: 100%;
  }

  &__link {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}

.c-button:hover,
.c-button_active {
  background-color: _rgba(var(--button-computed-color), 0.1);
}

.c-button_solid {
  background-color: _rgb(var(--button-computed-color)); /* given color */
  color: _rgb(var(--solid-content-color)); /* calculated */
}
.c-button_solid:hover,
.c-button_solid.c-button_active {
  background-image: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)),
    linear-gradient(_rgb(var(--button-computed-color)), _rgb(var(--button-computed-color)));
}

.c-button_outlined {
  --button-padding:  7px;

  border: 1px solid var(--button-border-color);

  background-color: #ffffff;
}
.c-button__label {
  margin-left: var(--button-label-margin);
  margin-right: var(--button-label-margin);
  font-size: var(--button-label-size);
  line-height: 20px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  flex-shrink: 1;
  flex-grow: 0;
}
.c-button__label_uppercase {
  text-transform: uppercase;
  letter-spacing: var(--button-label-letter-spacing);
}

.c-button__icon-left,
.c-button__icon-right {
  display: flex;
  flex: 0 0 auto;
}

.c-button__icon-left .c-icon,
.c-button__icon-right .c-icon {
  color: inherit;
}

.c-button__icon-left {
  margin-left: var(--button-icon-margin);
}
.c-button__icon-right {
  margin-right: var(--button-icon-margin);
}

.c-button_small {
  --button-height:  28px;
  --button-min-width:  64px;
  --button-padding: 6px;
  --button-label-size: 12px;
  --button-label-margin: 4px;
  --button-label-letter-spacing: 0.5px;
  --button-icon-margin: 2px;
}

.c-button_icon-only {
  --button-padding: 0;
  --button-icon-margin: 0;
  --button-min-width: var(--button-height);
  width: var(--button-height);
}

.c-button_txt-only .c-icon {
  position: absolute;
}

.c-button_rounded {
  border-radius: 50%;
}

.c-button_disabled {
  color: #BDBDBD;

  cursor: default;
  pointer-events: none;
}
.c-button_disabled.c-button_solid {
  background: #f2f2f2;
}

.c-button_fluid {
  display: flex;
}

.c-button__label_loading {
  visibility: hidden;
}

.c-button__label a {
  text-decoration: none;
  color: inherit;
}
</style>
