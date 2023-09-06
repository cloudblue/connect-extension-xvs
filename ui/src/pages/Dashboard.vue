<template lang="pug">
c-view.dashboard(
  title="XVS Extension",
  :tabs="tabs",
  :current-tab.sync="currentTab",
  no-padded,
)
  template(
    #actions="",
    v-if="currentTab?.value === 'requests'",
  )
    c-button(
      mode="solid",
      color="accent",
      label="Create Request",
      :icon="icons.googleAddBaseline",
      @click="openCreateDeploymentRequestDialog",
    )

  deployments-table(v-if="currentTab?.value === 'deployments'")
  template(v-else-if="currentTab?.value === 'requests'")
    deployment-requests-table(:updating.sync="refreshRequests")
    create-deployment-request-dialog(
      v-model="isCreateDeploymentRequestDialogOpen",
      @request-created="refreshRequests = true",
    )

</template>

<script>
import {
  googleAddBaseline,
} from '@cloudblueconnect/material-svg';

import cButton from '~components/cButton.vue';
import CreateDeploymentRequestDialog from '~components/CreateDeploymentRequestDialog/index.vue';
import cView from '~components/cView.vue';
import DeploymentsTable from '~components/DeploymentsTable.vue';
import DeploymentRequestsTable from '~components/DeploymentRequestsTable.vue';


export default {
  components: {
    cButton,
    CreateDeploymentRequestDialog,
    cView,
    DeploymentsTable,
    DeploymentRequestsTable,
  },

  data: () => ({
    currentTab: null,
    isCreateDeploymentRequestDialogOpen: false,
    icons: { googleAddBaseline },
    refreshRequests: false,
  }),

  computed: {
    tabs: () => [
      { label: 'Deployments', value: 'deployments' },
      { label: 'Requests', value: 'requests' },
    ],
  },

  methods: {
    openCreateDeploymentRequestDialog() {
      this.isCreateDeploymentRequestDialogOpen = true;
    },
  },
};
</script>
