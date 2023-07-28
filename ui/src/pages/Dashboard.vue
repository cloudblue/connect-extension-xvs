<template lang="pug">
  c-view.dashboard(
    title="XVS Extension",
    :tabs="tabs",
    :current-tab.sync="currentTab",
    no-padded,
  )
    deployments-table(v-if="currentTab?.value === 'deployments'")
    .subscriptions-tab(v-else-if="currentTab?.value === 'requests'") Requests

</template>

<script>
import cView from '~components/cView.vue';
import DeploymentsTable from '~components/DeploymentsTable.vue';


export default {
  components: {
    cView,
    DeploymentsTable,
  },

  data: () => ({
    currentTab: null,
  }),

  computed: {
    tabs: () => [
      { label: 'Deployments', value: 'deployments' },
      { label: 'Requests', value: 'requests' },
    ],
  },
};
</script>
