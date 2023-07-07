<template lang="pug">
svg.c-icon(
  :class="classes",
  :view-box="icon.viewBox",
  :style="styles",
  @click="$emit('click', $event)",
)
  use(:xlink:href="`#${icon.id}`")
</template>

<script>
import {
  pathOr,
} from 'ramda';


import {
  addUnits,
} from '~helpers';

import {
  pathOrPath,
  pathTo,
  template,
} from '~utils';


export default {
  props: {
    icon: {
      type: Object,
      required: true,
    },

    color: String,

    disabled: Boolean,
    size: [Number, String],
  },

  computed: {
    classes: template({
      'c-icon_disabled': ['disabled'],
      'c-icon_link': pathOrPath(['$listeners', 'click'], ['$listeners', '!click']),
    }),

    actualColor: ({ $vuetify, color }) => pathOr(color, ['theme', color], $vuetify),

    styles: template({
      color: ['actualColor'],
      height: ['actualSize'],
      width: ['actualSize'],
    }),

    actualSize: pathTo(['size'], addUnits),
  },
};
</script>

<style lang="stylus">
@import '~styles/variables';

.c-icon {
  color: #757575;
  caret-color: currentColor;

  vertical-align: text-bottom;
  fill: currentColor;

  height: 24px;
  width: 24px;

  &_disabled {
    pointer-events: none;
    color: #c5c5c5 !important;
  }

  &_link {
    cursor: pointer;
    outline: none;
  }

  button & {
    color: inherit;
  }
}
</style>
