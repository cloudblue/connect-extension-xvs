<template lang="pug">
c-menu(
  v-model="show",
  :close-on-click-inside="false",
  position="left",
)
  template(#trigger="")
    c-button.ma-0(
      small,
      :locator="locator",
      :disabled="disabled",
      :icon="icon"
      :label="text",
      :class="{'c-table__panel-button_active': active}",
    )

  .scrollable
    form.c-table-control-menu(
      @keyup.enter="$emit('submit')",
      :style="style",
    )
      slot

      .c-table-control-menu__buttons(v-if="controlButtons")
        c-tooltip(
          :message="tooltipAddButtonMessage",
          :disabled="!addButtonDisabled",
        )
          c-button(
            :disabled="addButtonDisabled",
            color="accent",
            @click="$emit('click-add')",
            small,
            locator="add-filter-button",
            :icon="addButtonIcon",
            :label="addButtonText",
          )

        c-button.ml-1(
          :disabled="resetButtonDisabled",
          @click="$emit('click-reset')",
          locator="reset-button",
          small,
          :icon="resetButtonIcon",
          :label="resetButtonText",
        )

        c-button(
          small,
          @click="show = false",
          locator="close-button",
          label="Close",
        )
</template>

<script>
import {
  googleAddBaseline,
  googleCloseBaseline,
} from '@cloudblueconnect/material-svg/baseline';


import sync from '~mixins/sync';


import cButton from '~components/cButton.vue';
import cMenu from '~components/cMenu.vue';
import cTooltip from '~components/cTooltip.vue';


import {
  template,
} from '~utils';


export default {
  mixins: [
    sync([{ prop: 'value', local: 'show' }]),
  ],

  components: {
    cButton,
    cMenu,
    cTooltip,
  },

  props: {
    value: Boolean,
    icon: Object,
    active: Boolean,
    addButtonText: String,
    resetButtonText: String,
    addButtonDisabled: Boolean,
    resetButtonDisabled: Boolean,
    tooltipAddButtonMessage: String,
    locator: {
      type: String,
      default: 'panel-button',
    },

    text: {
      required: true,
      type: String,
    },

    addButtonIcon: {
      default: () => googleAddBaseline,
      type: Object,
    },

    resetButtonIcon: {
      default: () => googleCloseBaseline,
      type: Object,
    },

    minWidth: {
      type: String,
      default: '525px',
    },

    controlButtons: {
      type: Boolean,
      default: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    style: template({
      minWidth: ['minWidth'],
    }),
  },
};
</script>

<style lang="stylus">
.c-table-control-menu {
  background white;
  max-height: 600px;
  padding: 8px 16px;
  &__buttons {
    display: flex;
    height: 56px;
    align-items: center;
    .c-button{
      margin: 0;
      &:last-child {
        margin-left: auto;
      }
    }
  }
}
</style>
