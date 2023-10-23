<template lang="pug">
.c-radio(@click.capture.prevent="select")
  c-icon.c-radio__box(
    :icon="radioIcon",
    :color="localValue ? '#2C98F0' : ''",
  )
  label.c-radio__label(:class="{ 'c-radio__label_empty': !label || !hint }")
    input.c-radio__input(
      v-model="localValue",
      type="radio",
    )
    p.c-radio__label-text {{ label }}
    p.c-radio__hint.assistive-text {{ hint }}

</template>

<script>
import {
  googleRadioButtonCheckedBaseline,
  googleRadioButtonUncheckedBaseline,
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
    radioIcon: ({ localValue }) => (
      localValue
        ? googleRadioButtonCheckedBaseline
        : googleRadioButtonUncheckedBaseline
    ),
  },

  methods: {
    select() {
      this.localValue = true;
    },
  },
};

</script>

<style lang="stylus" scoped>
.c-radio {
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
