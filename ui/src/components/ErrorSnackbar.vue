<template lang="pug">
c-snackbar(
  v-model="localValue",
  :timeout="5000",
  :auto-height="isLongMessage",
)
  span {{ text }}
  c-button(
    color="contrast",
    @click.native="closeSnackbar",
    label="Close",
    small,
  )

</template>

<script>
import cButton from '~components/cButton.vue';
import cSnackbar from '~components/cSnackbar.vue';

import {
  sync,
} from '~mixins';


export default {
  mixins: [
    sync([{ prop: 'value', local: 'localValue' }]),
  ],

  components: {
    cButton,
    cSnackbar,
  },

  props: {
    value: Boolean,
    text: String,
  },

  data: () => ({
    localValue: false,
  }),

  computed: {
    isLongMessage: vm => vm.text.length > 120,
  },

  methods: {
    closeSnackbar() {
      this.localValue = false;
    },
  },
};

</script>
