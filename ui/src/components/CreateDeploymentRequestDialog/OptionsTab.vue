<template lang="pug">
.options-tab
  c-checkbox(
    v-model="localValue.manual",
    label="Mark this request as manually processed",
    :hint="hints.manual",
  )
  c-checkbox(
    v-model="localValue.delegate",
    label="Delegate to L2 Resellers",
    :hint="hints.delegate",
  )

</template>

<script>
import cCheckbox from '~components/cCheckbox.vue';

import sync from '~mixins/sync';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    cCheckbox,
  },

  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    localValue: {
      delegate: false,
      manual: false,
    },

    hints: {
      manual: 'The Deployment Request will be marked as \'Done\' without real updates on the Hubs and Marketplaces. It should be used in case if the update was proceeded manually on the Hubs and Marketplaces and it is required to sync the status with the XVS Products extension',
      delegate: 'The Deployment Request will execute the procedure of the delegation of Service Plans to all L2 Resellers.',
    },
  }),
};

</script>
