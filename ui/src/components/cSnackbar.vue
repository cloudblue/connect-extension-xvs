<template lang="pug">
.c-snackbar(v-if="localValue")
  .c-snackbar__wrapper(:class="{'c-snackbar__wrapper_no-max-width': noMaxWidth}")
    .c-snackbar__content(:class="{'c-snackbar__autoheight': autoHeight}")
      slot

</template>

<script>
import {
  sync,
} from '~mixins';


export default {
  mixins: [
    sync([{ prop: 'value', local: 'localValue' }]),
  ],

  props: {
    timeout: Number,
    value: Boolean,
    autoHeight: Boolean,
    noMaxWidth: Boolean,
  },

  data: () => ({
    localValue: false,
  }),

  methods: {
    hideSnackbar() {
      this.localValue = false;
    },
  },

  watch: {
    localValue(v) {
      if (v && this.timeout) setTimeout(this.hideSnackbar, this.timeout);
    },
  },
};
</script>

<style lang="stylus">
.c-snackbar {
  position: fixed;
  display: flex;
  align-items: center;
  color: #fff;
  pointer-events: none;
  z-index: 1000;
  font-size: 14px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 24px;

  &__wrapper {
    width: auto;
    max-width: 568px;
    min-width: 288px;
    margin: 0 auto;
    margin-right: 0;
    border-radius: 2px;

    display: flex;
    align-items: center;
    background-color: #323232;
    pointer-events: auto;
    box-shadow:
      0px 3px 5px -1px rgba(0 0 0 0.2),
      0px 6px 10px 0px rgba(0 0 0 0.14),
      0px 1px 18px 0px rgba(0 0 0 0.12);

    &_no-max-width {
      max-width: none;
    }
  }

  &__content {
    width: 100%;
    padding: 16px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
  }

  &__autoheight {
    height: auto;
  }
}
</style>
