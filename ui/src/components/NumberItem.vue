<template lang="pug">
.number(v-if="value")
  span(v-if="prependIcon" v-html="prependIcon")
  span.number__item(
    v-for="(digit, index) in integer",
    :key="`${digit}-${index}`",
  ) {{ digit }}
  span.assistive-color(v-if="decimalPoint[1]") .{{ decimalPoint[1] }}
.text--disabled(v-else) —
</template>


<script>
import {
  head,
  length,
  pipe,
  replace,
} from 'ramda';


import {
  toFixed,
} from '~utils';


// getPrecision returns precision by number
// getPrecision :: Number -> Number
// getPrecision :: 0.0001 -> 4
const getPrecision = pipe(
  toFixed(10),
  replace(/(^[0-9]*\.)|(0*$)/g, ''),
  length,
);

const getFormattedNumber = replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export default {
  props: {
    value: {
      type: Number,
      required: true,
    },

    precision: {
      type: Number,
      default: 0,
    },

    prependIcon: String,
  },

  computed: {
    decimalPoint: (vm) => {
      const precision = getPrecision(vm.precision);
      const number = vm.value.toFixed(precision);

      return (number.toString()).split('.');
    },

    integer: vm => getFormattedNumber(head(vm.decimalPoint)).split(' '),
  },
};
</script>


<style lang="stylus" scoped>
.number {
  &__item + &__item {
    margin-left: 0.25em;
  }
}
</style>
