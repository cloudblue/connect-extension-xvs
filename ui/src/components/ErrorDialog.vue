<template lang="pug">
c-dialog.error-details(
  v-model="localValue",
  :title="title",
)
  p.error-details__heaader Error Message
  code.error-details__message {{ errorMessage }}

</template>

<script>
import cDialog from '~components/cDialog.vue';

import sync from '~mixins/sync';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    cDialog,
  },

  props: {
    value: Boolean,
    errorMessage: String,
    type: String,
  },

  data: () => ({
    localValue: Boolean,
  }),

  computed: {
    title: vm => (vm.type ? `${vm.type} Error Details` : 'Error Details'),
  },
};

</script>

<style lang="stylus">
.error-details {
  &__header {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
  }

  &__message {
    font-family: 'Roboto Mono';
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }
}

</style>
