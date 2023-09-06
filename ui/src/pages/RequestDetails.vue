<template lang="pug">
c-view.request-details(
  :title="requestId",
  assistive-title="Request Details",
  :back-route="{ name: 'Dashboard', params: { tab: 'requests' } }",
  :current-tab.sync="currentTab",
  :loading="loading"
)
  .info-container
    .info-column
      grid-item(
        :column-width="50",
        label="Status",
      )
        template(#value="")
          c-status(:status="request.status")

      grid-item(
        :column-width="50",
        label="Product",
      )
        template(#value="")
          detail-item(
            :body-text="request.deployment?.product?.name",
            dense,
          )
            template(#image="")
              pic(
                :src="request.deployment?.product?.icon",
                :width="16",
                :height="16",
              )

    .info-column
      grid-item(
        :column-width="28",
        label="Hub",
      )
        template(#value="")
          span {{ request.deployment?.hub?.name }}

      grid-item(
        :column-width="28",
        label="PPR",
      )
        template(#value="")
          .request-details__ppr
            c-icon(
              :icon="icons.googleDescriptionBaseline",
              size="16px",
            )
            span Version {{ request.ppr?.version }}
            span.request-details__dot •
            a(@click="downloadPPR") Download

    .info-column
      grid-item(
        :column-width="78",
        label="L2 Resellers",
      )
        template(#value="")
          .request-details__delegate
            c-icon(
              :icon=`request.delegate_l2
                ? icons.googleCheckCircleBaseline
                : icons.googleRemoveCircleBaseline`,
              size="16px",
            )
            span {{ request.delegate_l2 ? 'Delegated' : 'Not delegated' }}

  c-tabs(
    :current-tab.sync="currentTab",
    :tabs="tabs",
  )
    template(#marketplaces="")
      request-marketplaces-tab(:request-id="requestId")

    template(#tasks="")
      request-tasks-tab(:request-id="requestId")

</template>

<script>
import {
  googleCheckCircleBaseline,
  googleDescriptionBaseline,
  googleRemoveCircleBaseline,
  googleSyncBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import cIcon from '~components/cIcon.vue';
import cStatus from '~components/cStatus.vue';
import cTabs from '~components/cTabs.vue';
import cView from '~components/cView.vue';
import DetailItem from '~components/DetailItem.vue';
import GridItem from '~components/GridItem.vue';
import Pic from '~components/Pic.vue';
import RequestMarketplacesTab from '~components/RequestMarketplacesTab.vue';
import RequestTasksTab from '~components/RequestTasksTab.vue';

import {
  getDeploymentsRequest,
  getPPR,
} from '@/utils';

import {
  downloader,
} from '~helpers';


export default {
  components: {
    cIcon,
    cStatus,
    cTabs,
    cView,
    DetailItem,
    GridItem,
    Pic,
    RequestMarketplacesTab,
    RequestTasksTab,
  },

  data: () => ({
    currentTab: null,
    loading: true,
    request: null,
  }),

  computed: {
    icons: () => ({
      googleCheckCircleBaseline,
      googleDescriptionBaseline,
      googleRemoveCircleBaseline,
      googleSyncBaseline,
    }),

    requestId: vm => vm.$route.params.id,

    tabs: () => [
      { label: 'Marketplaces', value: 'marketplaces' },
      { label: 'Tasks', value: 'tasks' },
    ],
  },

  methods: {
    async getRequest() {
      this.request = await getDeploymentsRequest(this.requestId);
    },

    async getPprFileUrl() {
      const ppr = await getPPR(this.request.deployment.id, this.request.ppr.id);
      this.pprFileUrl = ppr.file.location;
    },

    downloadPPR() {
      downloader({ url: this.pprFileUrl });
    },
  },

  async created() {
    await this.getRequest();
    await this.getPprFileUrl();
    this.loading = false;
  },
};
</script>

<style lang="stylus">
.request-details {
  .info-container {
    display: grid;
    grid-template-columns: minmax(auto, 376px) minmax(auto, 376px) minmax(auto, 376px);
    grid-column-gap: 48px;
    margin-bottom: 32px;
  }

  &__delegate,
  &__ppr {
    display: flex;
    flex-direction: row;
    align-items: center;

    :first-child {
      margin-right: 4px;
    }
  }

  &__dot {
    margin: 0 4px;
  }
}
</style>
