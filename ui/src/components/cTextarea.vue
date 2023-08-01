<template lang="pug">
.c-textarea(:class="classes")
  label.c-textarea__label
    p.c-textarea__label-text {{ label }}
    textarea.c-textarea__textarea(
      v-model="localValue",
      :disabled="disabled",
      :maxlength="counter || undefined",
      :placeholder="placeholder",
      :rows="rows",
      autocomplete="off",
    )
  .c-textarea__counter(v-if="counter")
    span {{ computedCount }}

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
    value: String,
    label: String,
    placeholder: String,
    counter: Number,
    disabled: Boolean,
    resizable: Boolean,
    rows: {
      type: Number,
      default: 3,
    },
  },

  data: () => ({
    localValue: '',
  }),

  computed: {
    computedCount: vm => {
      if (!vm.counter) return '';

      return `${vm.localValue.length}/${vm.counter}`;
    },

    classes: vm => ({
      'c-textarea_disabled': vm.disabled,
      'c-textarea_resizable': vm.resizable,
    }),
  },
};

</script>

<style lang="stylus">
.c-textarea {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__textarea {
    padding: 8px;
    width: calc(100% - 16px);
    border: 1px solid #D8D8D8;
    background-color: #FBFBFB;
    color: #212121;
    font-family: inherit;
    font-size: 14px;
    line-height: 20px;

    resize: none;

    &:focus, &:active {
      outline: none;
    }
  }

  &_resizable .c-textarea__textarea {
    resize: vertical;
  }

  &__label {
    &-text {
      line-height: 20px;
      font-size: 14px;
      font-weight: 500;
      margin: 0 0 8px 0;
      color: #212121;
    }
  }

  &__counter {
    font-size: 12px;
    line-height: 16px;
    color: #707070;
    text-align: right;
  }
}
</style>
