<template lang="pug">
.app
  portal-target(name="destination", multiple)
  .title XVS Extension
  ui-tabs
    ui-tab(default tab="Deployments") Deployments
    ui-tab(tab="Requests") Requests

    ui-pad(pad="Deployments")
      deployments-table

    ui-pad(pad="Requests")
      .subscriptions-tab Requests
</template>

<script>
import DeploymentsTable from '~components/DeploymentsTable.vue';

export default {
  components: {
    DeploymentsTable,
  },
   data() {
    return {};
  },
};
</script>
