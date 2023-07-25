<template lang="pug">
c-menu(
  :disabled="disabled",
  :locator="locator",
  :small="small",
)
  template(#trigger="")
    c-button.ma-0(
      :icon="icon",
      :label="btnText",
      :small="small",
      :disabled="disabled",
      :mode="btnMode",
    )

  .list
    slot
</template>


<script>
import {
  googleArrowDropDownBaseline,
  googleMoreVertBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  T,
  always,
  cond,
  prop,
  propEq,
} from 'ramda';


import cButton, {
  cButtonModesDict,
} from '~components/cButton.vue';

import cMenu from '~components/cMenu.vue';


import {
  pathAlt,
} from '~utils';


export default {
  components: {
    cButton,
    cMenu,
  },

  props: {
    outline: Boolean,
    disabled: Boolean,
    small: Boolean,
    btnIcon: Object,
    btnText: {
      type: String,
      default: '',
    },

    locator: {
      type: String,
      default: 'actions_menu',
    },
  },

  data: () => ({
    cButtonModesDict,
  }),

  computed: {
    btnMode: pathAlt(['outline'], cButtonModesDict.outlined, cButtonModesDict.flat),
    icon: cond([
      [prop('btnIcon'), prop('btnIcon')],
      [propEq(cButtonModesDict.flat, 'btnMode'), always(googleMoreVertBaseline)],
      [T, always(googleArrowDropDownBaseline)],
    ]),
  },
};
</script>
