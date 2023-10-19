<template lang="pug">
c-view.deployment-details(
  :title="deploymentId",
  assistive-title="Deployment Details",
  :back-route="{ name: 'Dashboard', params: { tab: 'deployments' } }",
  :current-tab.sync="currentTab",
  :loading="loading",
)
  template(#actions="")
    c-button(
      :icon="icons.googleSyncBaseline",
      label="sync",
      color="accent",
      mode="solid",
    )

  .info-container
    .info-column
      grid-item(label="Status")
        template(#value="")
          c-status(:status="deployment.status")

      grid-item(label="Product")
        template(#value="")
          detail-item(
            :body-text="deployment.product.name",
            dense,
          )
            template(#image="")
              pic(
                :src="deployment.product.icon",
                :width="16",
                :height="16",
              )

      grid-item(label="Vendor")
        template(#value="")
          detail-item(
            :body-text="deployment.owner.name",
            dense,
          )
            template(#image="")
              pic(
                :src="deployment.owner.icon",
                :width="16",
                :height="16",
              )

    .info-column
      grid-item(
        :column-width="78",
        label="Hub",
      )
        template(#value="")
          span {{ deployment.hub.name }}

      grid-item(
        :column-width="78",
        label="Last Sync",
      )
        template(#value="")
          span {{ deployment.last_sync_at | utcToLocal }}

  c-tabs(
    :current-tab.sync="currentTab",
    :tabs="tabs",
  )
    template(#marketplaces="")
      deployment-marketplaces-tab(:deployment-id="deployment.id")

    template(#ppr="")
      ppr-tab(
        :deployment-id="deployment.id",
        :account-id="deployment.account_id",
      )

    template(#configuration="")
      deployment-configuration-tab(
        :deployment-id="deployment.id",
        :account-id="deployment.account_id",
      )

    template(#requests="")
      deployment-requests-tab(:deployment="deployment")

</template>

<script>
import {
  googleSyncBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import cButton from '~components/cButton.vue';
import cStatus from '~components/cStatus.vue';
import cTabs from '~components/cTabs.vue';
import cView from '~components/cView.vue';
import DetailItem from '~components/DetailItem.vue';
import GridItem from '~components/GridItem.vue';
import Pic from '~components/Pic.vue';

import PprTab from '~components/PprTab.vue';
import DeploymentConfigurationTab from '~components/DeploymentConfigurationTab.vue';
import DeploymentMarketplacesTab from '~components/DeploymentMarketplacesTab.vue';
import DeploymentRequestsTab from '~components/DeploymentRequestsTab.vue';

import {
  getDeployment,
} from '@/utils';


export default {
  components: {
    cButton,
    cStatus,
    cTabs,
    cView,
    DeploymentConfigurationTab,
    DeploymentMarketplacesTab,
    DeploymentRequestsTab,
    DetailItem,
    GridItem,
    Pic,
    PprTab,
  },

  data: () => ({
    currentTab: null,
    loading: true,
    deployment: null,
  }),

  computed: {
    icons: () => ({
      googleSyncBaseline,
    }),

    deploymentId: vm => vm.$route.params.id,

    tabs: () => [
      { label: 'Marketplaces', value: 'marketplaces' },
      { label: 'PPR', value: 'ppr' },
      { label: 'Configuration', value: 'configuration' },
      { label: 'Requests', value: 'requests' },
    ],
  },

  created() {
    getDeployment(this.deploymentId).then(deployment => {
      this.deployment = deployment;
      this.loading = false;
    });
  },
};
</script>

<style lang="stylus">
.deployment-details {
  .info-container {
    display: grid;
    grid-template-columns: minmax(auto, 376px) minmax(auto, 376px) minmax(auto, 376px);
    grid-column-gap: 48px;
    margin-bottom: 32px;
  }
}
</style>
