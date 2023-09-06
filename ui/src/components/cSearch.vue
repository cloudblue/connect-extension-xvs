<template lang="pug">
.c-search(@click="focus")
  c-icon.c-search__icon(:icon="icons.googleSearchBaseline")
  input.c-search__input(
    v-model="localValue",
    ref="input",
    type="text",
    placeholder="Search",
  )

</template>

<script>
import {
  googleSearchBaseline,
} from '@cloudblueconnect/material-svg';

import cIcon from '~components/cIcon.vue';

import sync from '~mixins/sync';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    cIcon,
  },

  props: {
    value: String,
  },

  data: () => ({
    localValue: '',
    icons: {
      googleSearchBaseline,
    },
  }),

  methods: {
    focus() {
      this.$refs.input.focus();
    },
  },
};

</script>

<style lang="stylus" scoped>
.c-search {
  height: 44px;
  width: 100%;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #D8D8D8;
  background-color: #FBFBFB;

  &__icon {
    flex-shrink: 0;
    margin-right: 12px;
  }

  &__input {
    width: auto;
    flex-grow: 1;
    outline: none;
    border: none;
    background-color: inherit;
    color: #212121;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    &::placeholder {
      color: #707070;
    }
  }
}
</style>
