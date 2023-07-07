<template lang="pug">
.c-tooltip(
  @mouseover="openTooltipAsync",
  @mouseleave="closeTooltipAsync",
  ref="elm",
)
  slot

  portal(
    v-if="showTooltip",
    to="destination",
  )
    .c-tooltip__content(:style="computeStyle()")
      slot(name="message")
        span {{ message }}
</template>

<script>
import {
  whereEq,
} from 'ramda';


import {
  debounce,
} from '~utils';


export default {
  props: {
    message: {
      type: String,
      default: '',
    },

    closeDelay: {
      type: Number,
      default: 200,
    },

    openDelay: {
      type: Number,
      default: 200,
    },

    disabled: Boolean,

    top: Boolean,
    right: Boolean,
    left: Boolean,
    capitalize: Boolean,
  },

  data: () => ({
    show: false,
  }),

  computed: {
    showTooltip: whereEq({
      show: true,
      isTooltipDisabled: false,
    }),

    isMessageEmpty: vm => !vm.message && !vm.$slots.message,
    isTooltipDisabled: vm => vm.disabled || vm.isMessageEmpty,
    openTooltipAsync: vm => debounce(vm.openDelay, vm.openTooltip),
    closeTooltipAsync: vm => debounce(vm.closeDelay, vm.closeTooltip),
  },

  methods: {
    computeStyle() {
      // eslint-disable-next-line prefer-const
      let { top, left, height, width } = this.$refs.elm.getBoundingClientRect();
      const offset = 12;
      const yOffset = height + offset;
      const xOffset = width + offset;

      if (this.top) {
        top -= yOffset;
      } else {
        top += yOffset;
      }

      if (this.right) {
        left += xOffset;
      } else if (this.left) {
        left -= xOffset;
      }
      const style = {
        left: `${left}px`,
        top: `${top}px`,
      };

      if (this.capitalize) {
        style['text-transform'] = 'capitalize';
      }

      return style;
    },

    openTooltip() {
      this.show = true;
    },

    closeTooltip() {
      this.show = false;
    },
  },
};
</script>

<style scoped lang="stylus">
.c-tooltip {
  display: inline-block;
  &__content{
    z-index: 301 !important;
    background: #616161;
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    padding: 5px 8px;
    position: absolute;
    text-transform: initial;
    display: inline-block;
    width: auto;
    box-shadow:
      0px 3px 1px -2px rgba(0, 0, 0, .2),
      0px 2px 2px 0px rgba(0, 0, 0, .14),
      0px 1px 5px 0px rgba(0, 0, 0, .12);
  }
}
</style>
