<template lang="pug">
c-table-control-menu(
  v-if="showSelector",
  text="Columns",
  :active="!areAllHeadersVisible",
  :icon="icons.googleViewColumnBaseline",
  min-width="170px",
  :control-buttons="false",
  :disabled="disabled",
)
  .headers-selector
    c-tooltip.selector-option(
      v-for="header in hideableHeaders",
      :key="header.value",
      message="At least one column must be selected",
      :disabled="!isDisableHeader(header)",
    )
        v-checkbox(
          v-model="localValue",
          :value="header.value",
          :label="header.text",
          :disabled="isDisableHeader(header)",
          hide-details,
          multiple,
        )
</template>

<script>
import {
  googleViewColumnBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  all,
  both,
  complement,
  curry,
  either,
  equals,
  filter,
  includes,
  not,
  where,
} from 'ramda';


import sync from '~mixins/sync';


import cTableControlMenu from '~components/cTable/cTableControlMenu.vue';
import cTooltip from '~components/cTooltip.vue';


import {
  notEmpty,
  notProp,
  pathTo,
  snapshot,
} from '~utils';


export const isHideableHeader = where({
  text: Boolean,
  value: Boolean,
  hidden: not,
});

const isPersistentHeader = complement(isHideableHeader);

export const isHeaderVisible = curry((visibleValues, header) => both(
  notProp('hidden'),
  either(
    isPersistentHeader,
    h => includes(h.value, visibleValues),
  ),
)(header));


export default {
  mixins: [
    sync([
      { prop: 'value', local: 'localValue' },
    ]),
  ],

  components: {
    cTooltip,
    cTableControlMenu,
  },

  props: {
    value: {
      type: Array,
      required: true,
    },

    headers: {
      type: Array,
      required: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localValue: snapshot(this.value),
      icons: {
        googleViewColumnBaseline,
      },
    };
  },

  computed: {
    hideableHeaders: pathTo(['headers'], filter(isHideableHeader)),

    areAllHeadersVisible: ({ hideableHeaders, localValue }) => all(
      isHeaderVisible(localValue),
      hideableHeaders,
    ),

    showSelector: pathTo(['hideableHeaders'], notEmpty),
  },

  methods: {
    isDisableHeader(header) {
      return equals([header.value], this.localValue);
    },
  },
};
</script>

<style lang="stylus" scoped>
.headers-selector{
  padding: 8px 0px;
  :deep(.c-tooltip:first-child  .v-input--selection-controls) {
    margin-top: 0px;
  }
}

.selector-option {
  display: block;
}

</style>
