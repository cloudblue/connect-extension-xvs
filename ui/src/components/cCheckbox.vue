<template lang="pug">
.c-checkbox(@click.capture.prevent="toggleValue")
  c-icon.c-checkbox__box(
    :icon="checkboxIcon",
    :color="localValue ? '#2C98F0' : ''",
  )
  label.c-checkbox__label(:class="{ 'c-checkbox__label_empty': !label || !hint }")
    input.c-checkbox__input(
      v-model="localValue",
      type="checkbox",
    )
    p.c-checkbox__label-text {{ label }}
    p.c-checkbox__hint.assistive-text {{ hint }}

</template>

<script>
import {
  googleCheckBoxBaseline,
  googleCheckBoxOutlineBlankBaseline,
} from '@cloudblueconnect/material-svg';

import cIcon from '~components/cIcon.vue';

import sync from '~mixins/sync';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    cIcon,
  },

  props: {
    value: Boolean,
    label: String,
    hint: String,
  },

  data: () => ({
    localValue: false,
  }),

  computed: {
    checkboxIcon: ({ localValue }) => (
      localValue
        ? googleCheckBoxBaseline
        : googleCheckBoxOutlineBlankBaseline
    ),
  },

  methods: {
    toggleValue() {
      this.localValue = !this.localValue;
    },
  },
};

</script>

<style lang="stylus" scoped>
.c-checkbox {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  &__box {
    flex-shrink: 0;
    cursor: pointer;
  }

  &__input {
    display: none;
  }

  &__label {
    display: block;
    margin-left: 8px;
    user-select: none;

    &_empty {
      display: none;
    }
  }

  &__label-text {
    margin: 0;
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
