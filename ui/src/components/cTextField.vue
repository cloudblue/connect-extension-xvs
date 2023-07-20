<template lang="pug">
.c-text-field(
  :ref="fieldComponent",
  :class="fieldClasses",
  :style="computedColors",
  :locator="locators.container",
  @focusin="setFocus",
  @focusout="removeFocus",
)
  label.c-text-field__label(
    :ref="fieldLabel",
    v-if="showLabel",
    :for="fieldID",
    :locator="locators.label"
  )
    slot(
      name="label",
      v-bind="slotProps",
    )
      span {{ label }}

    .c-text-field__label-icon(
      v-if="showLabelIcon",
      :style="inheritedButtonsStyling",
      :locator="locators.labelIcon",
    )
      slot(
        name="label-icon",
        v-bind="slotProps",
      )
        c-icon(
          :icon="labelIcon",
          :size="`${computedLabelIconSize}`",
          color="var(--ctf-color-current)",
        )

  .c-text-field__wrapper(:locator="locators.wrapper")
    .c-text-field__prepend(
      v-if="showPrepend",
      :style="inheritedButtonsStyling",
      :locator="locators.prepend",
    )
      slot(
        name="prepend",
        v-bind="slotProps",
      )
        c-icon(
          :icon="prependIcon",
          :size="`${computedIconSize}`",
          color="var(--ctf-color-current)",
        )

    // NOTE: __body is visible input box, which should reflect input validity state
    .c-text-field__body(
      :ref="fieldBody",
      :locator="locators.body",
      @click="onBodyClick",
    )
      .c-text-field__prepend-inner(
        v-if="showPrependInner",
        :style="inheritedButtonsStyling",
        :locator="locators.prependInner",
      )
        slot(
          name="prepend-inner",
          v-bind="slotProps",
        )
          c-icon(
            :icon="prependInnerIcon",
            :size="`${computedIconSize}`",
            color="var(--ctf-color-current)",
          )

      span.c-text-field__prefix(
        v-if="prefix",
        :locator="locators.prefix",
      ) {{ prefix }}
      input.c-text-field__input(
        v-model="localValue",
        :ref="fieldID",
        :id="fieldID",
        :type="currentType",
        :placeholder="disabled ? false : placeholder",
        :disabled="disabled",
        :readonly="readonly",
        :required="required",
        :max="max",
        :min="min",
        :step="step",
        :autofocus="autofocus"
        :pattern="pattern",
        :autocomplete="browserAutocomplete ? 'on' : 'off'",
        :locator="locators.input",
        v-facade="mask",
      )
      span.c-text-field__suffix(
        v-if="suffix",
        :locator="locators.suffix",
      ) {{ suffix }}

      c-button.c-text-field__toggle-visibility(
        v-if="showVisibilityToggle",
        :icon="visibilityIcon",
        :disabled="disabled",
        :size="`${computedIconSize}`",
        :small="size === fieldSizesDict.small",
        :locator="locators.toggleVisibility",
        @click="toggleVisibility",
      )
      c-button.c-text-field__clearable(
        v-if="clearable",
        :icon="icons.googleRefreshBaseline",
        :disabled="disabled",
        :size="`${computedIconSize}`",
        :small="size === fieldSizesDict.small",
        :locator="locators.clearable",
        @click="clearInput",
      )

      .c-text-field__append-inner(
        v-if="showAppendInner",
        :style="inheritedButtonsStyling",
        :locator="locators.appendInner",
        )
        slot(
          name="append-inner"
          v-bind="slotProps",
        )
          c-icon(
            :icon="appendInnerIcon",
            :size="`${computedIconSize}`",
            color="var(--ctf-color-current)",
          )
    .c-text-field__append(
      v-if="showAppend",
      :style="inheritedButtonsStyling",
        :locator="locators.append",
    )
      slot(
        name="append",
        v-bind="slotProps",
      )
        c-icon(
          :icon="appendIcon",
          :size="`${computedIconSize}`",
          color="var(--ctf-color-current)",
        )

  .c-text-field__underline(
    v-show="showUnderline",
    :locator="locators.underline",
  )
    .c-text-field__underline-icon(
      v-if="showUnderlineIcon",
      :style="inheritedButtonsStyling",
      :locator="locators.underlineIcon",
    )
      slot(
        name="underline-icon",
        v-bind="slotProps",
      )
        c-icon(
          :icon="underlineIcon",
          size="12",
          color="var(--ctf-color-current)",
        )
    ul.c-text-field__errors(
      v-if="shownErrors.length",
      :locator="locators.errors",
    )
      li.c-text-field__error(
        v-for="e in shownErrors",
        :key="e",
      ) {{ e }}
    ul.c-text-field__warnings(
      v-if="shownWarnings.length",
      :locator="locators.errors",
    )
      li.c-text-field__warning(
        v-for="w in shownWarnings",
        :key="w",
      ) {{ w }}
    .c-text-field__helper(
      v-else,
      :locator="locators.hint",
    )
      slot(
        name="helper",
        v-bind="slotProps",
      )
        span(v-if="showUnderlineHelper") {{ hint }}
    .c-text-field__counter(
      v-if="showCounter",
      :locator="locators.counter",
    )
      slot(
        name="counter",
        v-bind="slotProps",
      ) {{ counterValue }}

</template>


<script>
import {
  googleCloseBaseline,
  googleRefreshBaseline,
  googleVisibilityBaseline,
  googleVisibilityOffBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  T,
  __,
  allPass,
  always,
  anyPass,
  concat,
  cond,
  defaultTo,
  dissoc,
  equals,
  ifElse,
  includes,
  keys,
  mergeAll,
  not,
  objOf,
  path,
  pick,
  pickBy,
  pipe,
  prop,
  propEq,
  slice,
  toString,
  values,
  when,
} from 'ramda';

import {
  facade,
} from 'vue-input-facade';


import sync from '~mixins/sync';
import validate from '~mixins/validate';


import cButton from '~components/cButton.vue';
import cIcon from '~components/cIcon.vue';


import {
  checkVarColor,
  colorToRGB,
  hexColor,
  validateColor,
} from '~helpers';

import {
  assocComputed,
  isNotNilOrEmpty,
  obj,
  pathTo,
  propTo,
  propsTo,
  rhx,
  template,
} from '~utils';


export const cTextFieldModesDict = {
  default: 'default',
  'single-line': 'single-line',
  solo: 'solo',
  dense: 'dense',
  outlined: 'outlined',
  filled: 'filled',
  'full-width': 'full-width',
  box: 'box',
};

export const cTextFieldModes = values(cTextFieldModesDict);

export const cTextFieldSizesDict = {
  large: 'large',
  small: 'small',
};

export const cTextFieldSizes = values(cTextFieldSizesDict);

export const cTextFieldIconSizesDict = {
  large: 24,
  small: 18,
};

export const cTextFieldLabelIconSizesDict = {
  large: 20,
  small: 16,
};

export const generateID = () => `ctf-${rhx(9)}`;

export const makeLocatorWith = str => when(defaultTo(''), concat(__, str));


export default {
  mixins: [
    sync([{
      prop: 'value',
      local: 'localValue',
      propImmediate: false,
    }]),
    validate({
      rules: 'rules',
      observed: 'localValue',
      externalErrors: 'errorMessages',
      localErrors: 'validationErrors',
      status: 'isValid',
      processing: 'isValidating',
    }),
  ],

  directives: {
    facade,
  },

  components: {
    cButton,
    cIcon,
  },

  props: {
    value: [String, Number],
    locator: String,
    label: String,
    labelIcon: Object,
    labelIconLeft: Boolean,

    type: {
      type: String,
      default: 'text',
    },

    size: {
      type: String,
      default: cTextFieldSizesDict.large,
      validator: includes(__, cTextFieldSizes),
    },

    placeholder: String,
    required: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    pattern: String,

    errorCount: {
      type: [Number, String],
      default: 1,
    },

    warningMessages: {
      type: Array,
      default: () => [],
    },

    warningCount: {
      type: [Number, String],
      default: 1,
    },

    clearable: Boolean,
    passwordToggle: {
      type: Boolean,
      default: true,
    },

    hint: String,
    persistentHint: {
      type: Boolean,
      default: true,
    },

    // NOTE: for design cases when we want to reserve space for underline even
    //       though it's empty for now, requested by Max T.
    persistentUnderline: Boolean,

    counter: [Number, String],

    prefix: String,
    suffix: String,
    prependIcon: Object,
    prependInnerIcon: Object,
    appendInnerIcon: Object, // NOTE: vuetify has `appendIcon` instead
    appendIcon: Object, // NOTE: vuetify has `appendOuterIcon` instead
    underlineIcon: Object,

    min: {
      type: [Number, String],
      default: 0,
    },

    max: {
      type: [Number, String],
      default: Infinity,
    },

    step: {
      type: [Number],
      default: 1,
    },

    color: {
      type: String,
      default: '',
      validator: validateColor,
    },

    // TODO: need to discuss it with Max T.
    // height: {
    //   type: [String, Number],
    //   default: null,
    // },

    browserAutocomplete: Boolean,

    mask: String,

    mode: {
      type: String,
      default: cTextFieldModesDict.default,
      validator: includes(__, cTextFieldModes),
    },
  },

  data() {
    return {
      localValue: null,
      fieldID: generateID(9),
      icons: {
        googleCloseBaseline,
        googleRefreshBaseline,
        googleVisibilityBaseline,
        googleVisibilityOffBaseline,
      },

      focused: false,
      currentType: this.type,
      popupItem: true,

      fieldSizesDict: cTextFieldSizesDict,
      iconSizesDict: cTextFieldIconSizesDict,
      labelIconSizesDict: cTextFieldLabelIconSizesDict,

      inheritedButtonsStyling: {
        '--button-custom-color': 'var(--ctf-color-current)',
      },
    };
  },

  computed: {
    locators: propTo('locator', template({
      container: makeLocatorWith('--container'),
      label: makeLocatorWith('--label'),
      labelIcon: makeLocatorWith('--label-icon'),
      wrapper: makeLocatorWith('--wrapper'),
      prepend: makeLocatorWith('--prepend'),
      body: makeLocatorWith('--body'),
      prependInner: makeLocatorWith('--prepend-inner'),
      prefix: makeLocatorWith('--prefix'),
      input: defaultTo(''),
      suffix: makeLocatorWith('--suffix'),
      toggleVisibility: makeLocatorWith('--toggle-visibility'),
      clearable: makeLocatorWith('--clearable'),
      appendInner: makeLocatorWith('--append-inner'),
      append: makeLocatorWith('--append'),
      underline: makeLocatorWith('--underline'),
      underlineIcon: makeLocatorWith('--underline-icon'),
      errors: makeLocatorWith('--errors'),
      hint: makeLocatorWith('--hint'),
      counter: makeLocatorWith('--counter'),
    })),

    fieldComponent: vm => `${vm.fieldID}-component`,
    fieldLabel: vm => `${vm.fieldID}-label`,
    fieldBody: vm => `${vm.fieldID}-body`,
    customClasses: pipe(
      template({
        'c-text-field_required': prop('required'),
        'c-text-field_optional': pipe(prop('required'), not),
        'c-text-field_focused': prop('focused'),
        'c-text-field_disabled': prop('disabled'),
        'c-text-field_error': anyPass([
          path(['validationErrors', 'length']),
          propEq(false, 'isValid'),
        ]),
        'c-text-field_warning': pipe(
          path(['warningMessages', 'length']),
          Boolean,
        ),
        'c-text-field_label-left-icon': prop('labelIconLeft'),
      }),
      pickBy(equals(true)),
      keys,
    ),

    classNameByMode: ifElse(
      propEq('default', 'mode'),
      always(''),
      pipe(
        prop('mode'),
        concat('c-text-field_'),
      ),
    ),

    classNameBySize: ifElse(
      anyPass([
        propEq('large', 'size'),
        propEq('', 'size'),
      ]),
      always(''),
      pipe(
        prop('size'),
        concat('c-text-field_'),
      ),
    ),

    computedClasses: pipe(
      pick(['classNameByMode', 'classNameBySize']),
      pickBy(isNotNilOrEmpty),
      values,
    ),

    fieldClasses: vm => [...vm.customClasses, ...vm.computedClasses],

    visibilityIcon: ifElse(
      propEq('password', 'currentType'),
      path(['icons', 'googleVisibilityOffBaseline']),
      path(['icons', 'googleVisibilityBaseline']),
    ),

    showLabel: anyPass([
      path(['$slots', 'label']),
      path(['$scopedSlots', 'label']),
      prop('label'),
      path(['$slots', 'label-icon']),
      path(['$scopedSlots', 'label-icon']),
      prop('labelIcon'),
    ]),

    showLabelIcon: anyPass([
      path(['$slots', 'label-icon']),
      path(['$scopedSlots', 'label-icon']),
      prop('labelIcon'),
    ]),

    showPrepend: anyPass([
      path(['$slots', 'prepend']),
      path(['$scopedSlots', 'prepend']),
      prop('prependIcon'),
    ]),

    showPrependInner: anyPass([
      path(['$slots', 'prepend-inner']),
      path(['$scopedSlots', 'prepend-inner']),
      prop('prependInnerIcon'),
    ]),

    showVisibilityToggle: allPass([
      prop('passwordToggle'),
      propEq('password', 'type'),
    ]),

    showAppendInner: anyPass([
      path(['$slots', 'append-inner']),
      path(['$scopedSlots', 'append-inner']),
      prop('appendInnerIcon'),
    ]),

    showAppend: anyPass([
      path(['$slots', 'append']),
      path(['$scopedSlots', 'append']),
      prop('appendIcon'),
    ]),

    showUnderline: anyPass([
      path(['shownErrors', 'length']),
      path(['shownWarnings', 'length']),
      prop('showUnderlineHelper'),
      prop('showCounter'),
      prop('persistentUnderline'),
    ]),

    showUnderlineIcon: anyPass([
      path(['$slots', 'underline-icon']),
      path(['$scopedSlots', 'underline-icon']),
      prop('underlineIcon'),
    ]),

    shownErrors: vm => slice(0, parseInt(vm.errorCount, 10), vm.validationErrors),
    shownWarnings: vm => slice(0, parseInt(vm.warningCount, 10), vm.warningMessages),

    showUnderlineHelper: allPass([
      anyPass([
        prop('focused'),
        prop('persistentHint'),
      ]),
      anyPass([
        path(['$slots', 'helper']),
        path(['$scopedSlots', 'helper']),
        prop('hint'),
      ]),
    ]),

    showCounter: anyPass([
      prop('counter'),
      path(['$slots', 'counter']),
      path(['$scopedSlots', 'counter']),
    ]),

    counterValue: vm => `${vm.localValue?.length || 0} / ${parseInt(vm.counter, 10)}`,

    initialFieldColor: cond([
      [prop('color'), pathTo(['color'], hexColor)],
      [T, always('accent')],
    ]),

    isVarColor: pathTo(['initialFieldColor'], checkVarColor),

    computedColor: vm => cond([
      [prop('disabled'), obj],
      [prop('isVarColor'), always({ '--ctf-color-accent': `var(--theme_${vm.initialFieldColor}_rgb)` })],
      [T, pipe(prop('initialFieldColor'), colorToRGB, objOf('--ctf-color-accent'))],
    ])(vm),

    computedColors: propsTo(
      ['computedColor'],
      mergeAll,
    ),

    computedIconSize: pipe(
      cond([
        [propEq('small', 'size'), path(['iconSizesDict', 'small'])],
        [T, path(['iconSizesDict', 'large'])],
      ]),
      toString,
    ),

    computedLabelIconSize: pipe(
      cond([
        [propEq('small', 'size'), path(['labelIconSizesDict', 'small'])],
        [T, path(['labelIconSizesDict', 'large'])],
      ]),
      toString,
    ),

    slotProps: pipe(
      template({
        value: prop('localValue'),
        // NOTE: for cButtons:
        disabled: prop('disabled'),
        small: propEq('small', 'size'),
        // NOTE: for cIcons:
        size: prop('computedIconSize'),
        // NOTE: don't need `sizes` in the options object, which used for v-bind
        //       of slot-props defaults (and `sizes` are not)
        sizes: {
          default: prop('computedIconSize'),
          label: prop('computedLabelIconSize'),
          underline: '12',
        },
      }),
      assocComputed('options', dissoc('sizes')),
    ),
  },

  methods: {
    onBodyClick(e) {
      this.$refs[this.fieldID].focus();
      this.$emit('click', e);
    },

    setFocus(e) {
      if (this.focused) return;

      this.focused = true;
      this.$emit('focus', e);
    },

    removeFocus(e) {
      if (this.focused) {
        this.focused = false;
        this.$emit('blur', e);
      }
    },

    clearInput() {
      this.localValue = '';
    },

    toggleVisibility() {
      this.currentType = (this.currentType === 'password') ? 'text' : 'password';
    },
  },
};
</script>


<style lang="stylus" scoped>
@import '~styles/common.styl';

.c-text-field {
  // Color variables:
  --ctf-color-default-text: 33, 33, 33;           // #212121 // $base-text-color;
  --ctf-color-border: #D8D8D8;                    // #D8D8D8
  --ctf-color-accent: var(--theme_accent);        // theme accent from JS
  --ctf-color-warning: $orange-dimmed;            // #F2994A
  --ctf-color-error: $nice-red;                   // #FF6A6A
  --ctf-color-background: #FBFBFB;                // #FBFBFB
  --ctf-color-disabled: 189, 189, 189;            // #BDBDBD
  --ctf-color-icon: 102, 102, 102;                // #666666 // $theme-grey-1;
  --ctf-color-assistive-text: $assistive-text-color; // #707070

  --ctf-color-current: var(--ctf-color-default-text);

  // Main units:
  --ctf-unit: 4;
  --ctf-unit-x2: calc(var(--ctf-unit) * 2);       // 8
  --ctf-unit-x3: calc(var(--ctf-unit) * 3);       // 12
  --ctf-unit-x4: calc(var(--ctf-unit) * 4);       // 16
  --ctf-unit-x5: calc(var(--ctf-unit) * 5);       // 20
  --ctf-unit-x6: calc(var(--ctf-unit) * 6);       // 24

  --ctf-unit-px: calc(var(--ctf-unit) * 1px);     // 4px
  --ctf-unit-px2: calc(var(--ctf-unit-x2) * 1px); // 8px
  --ctf-unit-px3: calc(var(--ctf-unit-x3) * 1px); // 12px
  --ctf-unit-px4: calc(var(--ctf-unit-x4) * 1px); // 16px
  --ctf-unit-px5: calc(var(--ctf-unit-x5) * 1px); // 20px
  --ctf-unit-px6: calc(var(--ctf-unit-x6) * 1px); // 24px

  // Size variables:
  --ctf-label-offset: var(--ctf-unit-px2);         // 8px
  --ctf-buttons-offset: var(--ctf-unit-px2);       // 8px
  --ctf-wrapper-offset: var(--ctf-unit-px);        // 4px
  --ctf-wrapper-parts-offset: var(--ctf-unit-px3); // 12px
  --ctf-body-parts-offset: var(--ctf-unit-px3);    // 12px
  --ctf-border-width: 1px;
  --ctf-input-padding: var(--ctf-unit-px3);        // 12px
  --ctf-input-padding-fixed: calc(var(--ctf-input-padding) - var(--ctf-border-width)) // 11px
  --ctf-input-padding-sm: calc(var(--ctf-unit-px3) / 2);  // 6px
  --ctf-input-padding-fixed-sm: calc(var(--ctf-input-padding-sm) - var(--ctf-border-width));  // 5px
  // NOTE: because on small buttons we have different X and Y paddings by design:
  --ctf-input-padding-x-sm: var(--ctf-unit-px2)    // 8px
  --ctf-input-padding-x-fixed-sm:                  // 7px
    calc(var(--ctf-input-padding-x-sm) - var(--ctf-border-width));

  // Font variables:
  --ctf-font-family: $theme-font-family;          // Roboto
  --ctf-font-size: $general-font-size;            // 14px
  --ctf-line-height: 20px;                        // 20px
  --ctf-font-size-sm: 12px;                       // 12px
  --ctf-line-height-sm: 16px;                     // 16px
  --crf-font-weight-main: $font-weight-normal;    // 400
  --ctf-font-weight-label: $font-weight-bold;     // 500

  // Anatomy variables:
  --ctf-body-max-height: calc(var(--ctf-input-padding) * 2 + var(--ctf-line-height));
  --ctf-body-max-height-sm: calc(var(--ctf-input-padding-sm) * 2 + var(--ctf-line-height));

  // c-button & c-icon size variables (for aligning them well):
  --cb-width: 36px;
  --ci-width: 24px;
  --cb-width-sm: 28px;
  --ci-width-sm: 18px;
  --cb-offset: calc((var(--cb-width) - var(--ci-width)) / 2);          // 6px
  --cb-offset-sm: calc((var(--cb-width-sm) - var(--ci-width-sm)) / 2); // 5px


  font-family: var(--ctf-font-family, 'Roboto');
  font-size: var(--ctf-font-size, 14px);
  line-height: var(--ctf-line-height, 20px);
  font-weight: var(--ctf-font-weight-main, 400);

  display: flex;
  flex-flow: column nowrap;

  color: _rgb(var(--ctf-color-default-text));

  &.c-text-field_disabled {}

  &.c-text-field_focused,
  &.c-text-field_warning,
  &.c-text-field_error {
    --ctf-border-width: 2px;
    --ctf-input-padding-fixed: calc(var(--ctf-input-padding) - var(--ctf-border-width)) // 10px
  }

  &.c-text-field_small {
    --ctf-wrapper-parts-offset: var(--ctf-unit-px2); // 8px
    --ctf-body-parts-offset: var(--ctf-unit-px2);    // 8px

    &.c-text-field_focused,
    &.c-text-field_warning,
    &.c-text-field_error {
      --ctf-input-padding-fixed-sm: calc(var(--ctf-input-padding-sm) - var(--ctf-border-width));
      --ctf-input-padding-x-fixed-sm: calc(var(--ctf-input-padding-x-sm) - var(--ctf-border-width));
    }
  }
}

.c-text-field__label { // label
  font-size: var(--ctf-font-size);
  line-height: var(--ctf-line-height);
  font-weight: var(--ctf-font-weight-label);

  flex-grow: 1;
  position:relative;
  max-height: 20px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: var(--ctf-label-offset);

  .c-text-field_disabled & {
    color: _rgb(var(--ctf-color-disabled));
  }

  span {
    flex-grow: 1;
    margin-right: var(--ctf-unit-px2);

    .c-text-field_label-left-icon & {
      flex-grow: 0;
    }

    .c-text-field_required &::after {
      // content: '*';
      content: '(required)';
      display: inline-block;
      margin-left: 3px;
      // color: var(--ctf-color-error);
      text-decoration: none;

      .c-text-field_disabled& {
        color: _rgb(var(--ctf-color-disabled));
      }
    }

    .c-text-field_optional &::after {
      content: '(optional)';
      display: inline-block;
      margin-left: 3px;
      color: _rgb(var(--ctf-color-default-text));
      text-decoration: none;

      .c-text-field_disabled& {
        color: _rgb(var(--ctf-color-disabled));
      }
    }
  }
}

.c-text-field__label-icon {
  --ctf-color-current: var(--ctf-color-icon);

  position: absolute;
  right: 0;
  top: 0;

  color: _rgb(var(--ctf-color-current));

  .c-text-field_disabled & {
    --ctf-color-current: var(--ctf-color-disabled);
  }

  .c-text-field_label-left-icon & {
    position: static;
  }
}

.c-text-field__wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.c-text-field__prepend {
  --ctf-color-current: var(--ctf-color-icon);

  margin-right: var(--ctf-wrapper-parts-offset);
  color: _rgb(var(--ctf-color-current));

  .c-text-field_disabled & {
    --ctf-color-current: var(--ctf-color-disabled);
  }
}

.c-text-field__body {
  flex-grow: 1;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  max-height: var(--ctf-body-max-height);
  padding: var(--ctf-input-padding-fixed);
  border: var(--ctf-border-width) solid var(--ctf-color-border);
  border-radius: 2px;

  background-color: var(--ctf-color-background);

  cursor: pointer;

  .c-text-field_disabled &,
  [disabled] &,
  :disabled & {
    border-style: dashed;
    cursor: default;
  }

  .c-text-field_focused & {
    border-color: _rgb(var(--ctf-color-accent));
  }

  .c-text-field_warning & {
    border-color: var(--ctf-color-warning);
  }

  .c-text-field_error & {
    border-color: var(--ctf-color-error);
  }

  input + svg,
  button + svg {
    // NOTE: need to increase left icons padding to align single icon with buttons
    margin-left: var(--cb-offset);

    .c-text-field_small & {
      margin-left: var(--cb-offset-sm);
    }
  }

  svg + svg {
    // NOTE: we need to add twice padding size between two icons, to align
    //       them with buttons
    margin-left: calc(2 * var(--cb-offset));

    .c-text-field_small & {
      margin-left: calc(2 * var(--cb-offset-sm));
    }
  }

  input + button,
  button + button,
  svg + button {
    // margin-left: var(--ctf-buttons-offset);
  }

  // NOTE: Max T. asked to align icons & buttons by the right side
  //       so, we need to shift buttons to the right by their horizontal padding
  button:last-child {
    // shift formula: (36px - 24px) / 2
    // where 36 is .c-button width, and 24 is inner .c-icon width
    margin-right: calc(-1 * var(--cb-offset));

    .c-text-field_small & {
      // (28px - 18px) / 2  (same for .c-button_small)
      margin-right: calc(-1 * var(--cb-offset-sm));
    }
  }

  svg:last-child {
    margin-right: 0;
  }

  .c-text-field_small & {
    max-height: var(--ctf-body-max-height-sm);
    padding-top: var(--ctf-input-padding-fixed-sm);
    padding-bottom: var(--ctf-input-padding-fixed-sm);
    padding-left: var(--ctf-input-padding-x-fixed-sm);
    padding-right: var(--ctf-input-padding-x-fixed-sm);
  }
}

.c-text-field__prepend-inner {
  --ctf-color-current: var(--ctf-color-icon);

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  max-height: var(--ctf-line-height);

  color: _rgb(var(--ctf-color-current));

  .c-text-field_disabled & {
    --ctf-color-current: var(--ctf-color-disabled);
  }

  svg:last-child {
    margin-right: var(--ctf-body-parts-offset);
  }

  button:last-child {
    margin-right: var(--ctf-buttons-offset);
  }
}

.c-text-field__prefix {
  margin-right: var(--ctf-body-parts-offset);
  color: var(--ctf-color-assistive-text);

  .c-text-field_disabled & {
    color: _rgb(var(--ctf-color-disabled));
  }
}

.c-text-field__input { // input
  flex-grow: 1;
  outline: none;

  &:hover,
  &:focus {
    outline: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px var(--ctf-color-background) inset !important;
  }

  &::placeholder {
    color: var(--ctf-color-assistive-text);
  }

  .c-text-field_disabled & {
    color: _rgb(var(--ctf-color-disabled));
  }
}

.c-text-field__suffix {
  margin-left: var(--ctf-body-parts-offset);
  color: var(--ctf-color-assistive-text);

  .c-text-field_disabled & {
    color: _rgb(var(--ctf-color-disabled));
  }

  & + button {
    margin-left: var(--ctf-body-parts-offset);
  }
}

.c-text-field__toggle-visibility { // c-button
  color: _rgb(var(--ctf-color-icon));

  .c-text-field_disabled & {
    color: _rgb(var(--ctf-color-disabled));
  }

  .c-text-field__input + & {
    margin-left: var(--ctf-buttons-offset);
  }
}

.c-text-field__clearable { // c-button
  color: _rgb(var(--ctf-color-icon));

  .c-text-field_disabled & {
    color: _rgb(var(--ctf-color-disabled));
  }

  .c-text-field__input + & {
    margin-left: var(--ctf-buttons-offset);
  }
}

.c-text-field__append-inner {
  --ctf-color-current: var(--ctf-color-icon);

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  max-height: var(--ctf-line-height);

  color: _rgb(var(--ctf-color-current));

  .c-text-field_disabled & {
    --ctf-color-current: var(--ctf-color-disabled);
  }

  .c-button {
    overflow: visible;
  }

  .c-text-field__input + & button:first-child {
    margin-left: var(--ctf-buttons-offset);
  }
  .c-text-field__input + & svg:first-child {
    margin-left: var(--ctf-body-parts-offset);
  }

  button + & > svg:first-child {
    margin-left: var(--cb-offset);

    .c-text-field_small & {
      margin-left: var(--cb-offset-sm);
    }
  }

  svg + button {
    margin-left: var(--cb-offset);

    .c-text-field_small & {
      margin-left: var(--cb-offset-sm);
    }
  }
}

.c-text-field__append {
  --ctf-color-current: var(--ctf-color-icon);

  margin-left: var(--ctf-wrapper-parts-offset);
  color: _rgb(var(--ctf-color-current));

  .c-text-field_disabled & {
    --ctf-color-current: var(--ctf-color-disabled);
  }
}

.c-text-field__underline {
  font-size: var(--ctf-font-size-sm);
  line-height: var(--ctf-line-height-sm);

  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  margin-top: var(--ctf-wrapper-offset);

  color: var(--ctf-color-assistive-text);

  .c-text-field_disabled & {
    color: _rgb(var(--ctf-color-disabled));
  }
}

.c-text-field__underline-icon {
  --ctf-color-current: var(--ctf-color-icon);

  position: absolute;
  left: 0;
  top: 0;
  max-height: var(--ctf-line-height-sm);
  margin-right: var(--ctf-unit-px);

  color: _rgb(var(--ctf-color-current));

  .c-text-field_warning & {
    --ctf-color-current: var(--ctf-color-warning);
  }

  .c-text-field_error & {
    --ctf-color-current: var(--ctf-color-error);
  }

  .c-text-field_disabled & {
    --ctf-color-current: var(--ctf-color-disabled);
  }
}

.c-text-field__errors,
.c-text-field__warnings { //ul
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  padding: 0;

  .c-text-field__underline-icon + & {
    padding-left: 16px;
  }
}

.c-text-field__errors {
  color: var(--ctf-color-error);
}
.c-text-field__warnings {
  color: var(--ctf-color-warning);
}

.c-text-field__error,
.c-text-field__warning { // li
  list-style-type: none;
}

.c-text-field__helper {
  flex-grow: 1;

  .c-text-field_warning & {
    color: var(--ctf-color-warning);
  }

  .c-text-field_error & {
    color: var(--ctf-color-error);
  }

  .c-text-field__underline-icon + & {
    padding-left: 16px;
  }
}
</style>
