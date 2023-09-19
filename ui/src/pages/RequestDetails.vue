<template lang="pug">
c-view.request-details(
  :title="requestId",
  assistive-title="Request Details",
  :back-route="{ name: 'Dashboard', params: { tab: 'requests' } }",
  :current-tab.sync="currentTab",
  :loading="loading",
  :show-alert="isFailedRequest",
)
  template(
    #actions="",
    v-if="isAnyActionVisible",
  )
    actions-menu(outline)
      c-button.list-item(
        v-if="canAbort",
        :icon="icons.googleCancelBaseline",
        :loading="isAbortingRequest",
        :upper-case="false",
        color="red",
        label="Abort",
        @click="abortRequest",
      )
      c-button.list-item(
        v-if="canRetry",
        :icon="icons.googleRefreshBaseline",
        :loading="isRetryingRequest",
        :upper-case="false",
        label="Retry",
        @click="retryRequest",
      )

  template(#alert="")
    p.request-details__error
      | An error occurred while processing this deployment request. Try restarting the deployment
      | request. If the issue persists, contact your Support team.
      a(
        v-if="hasErrorDetails",
        @click="openErrorDetailsDialog",
      ) Error details


  .info-container
    .info-column
      grid-item(
        :column-width="50",
        label="Status",
      )
        template(#value="")
          .request-details__status
            c-status(:status="request.status")
            template(v-if="hasErrorDetails")
              span.request-details__dot •
              a(@click="openErrorDetailsDialog") Details

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
      request-tasks-tab(
        :request-id="requestId",
        :updating.sync="areTasksUpdating",
      )

  error-dialog(
    v-model="isErrorDialogOpen",
    :error-message="errorMessages",
    type="Deployment Request",
  )

</template>

<script>
import {
  googleCancelBaseline,
  googleCheckCircleBaseline,
  googleDescriptionBaseline,
  googleRefreshBaseline,
  googleRemoveCircleBaseline,
  googleSyncBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import ActionsMenu from '~components/ActionsMenu.vue';
import cButton from '~components/cButton.vue';
import cIcon from '~components/cIcon.vue';
import cStatus from '~components/cStatus.vue';
import cTabs from '~components/cTabs.vue';
import cView from '~components/cView.vue';
import DetailItem from '~components/DetailItem.vue';
import ErrorDialog from '~components/ErrorDialog.vue';
import GridItem from '~components/GridItem.vue';
import Pic from '~components/Pic.vue';
import RequestMarketplacesTab from '~components/RequestMarketplacesTab.vue';
import RequestTasksTab from '~components/RequestTasksTab.vue';

import {
  abortDeploymentRequest,
  getDeploymentRequestFailedTasks,
  getDeploymentsRequest,
  getPPR,
  retryDeploymentRequest,
} from '@/utils';

import {
  downloader,
} from '~helpers';


export default {
  components: {
    ActionsMenu,
    cButton,
    cIcon,
    cStatus,
    cTabs,
    cView,
    DetailItem,
    ErrorDialog,
    GridItem,
    Pic,
    RequestMarketplacesTab,
    RequestTasksTab,
  },

  data: () => ({
    currentTab: null,
    loading: true,
    request: null,
    isAbortingRequest: false,
    isRetryingRequest: false,
    areTasksUpdating: false,

    isErrorDialogOpen: false,
    errorMessages: '',
  }),

  computed: {
    icons: () => ({
      googleCancelBaseline,
      googleCheckCircleBaseline,
      googleDescriptionBaseline,
      googleRefreshBaseline,
      googleRemoveCircleBaseline,
      googleSyncBaseline,
    }),

    requestId: vm => vm.$route.params.id,

    tabs: () => [
      { label: 'Marketplaces', value: 'marketplaces' },
      { label: 'Tasks', value: 'tasks' },
    ],

    canAbort: vm => ['pending', 'processing'].includes(vm.request?.status),
    canRetry: vm => vm.request?.status === 'error',
    isAnyActionVisible: vm => vm.canAbort || vm.canRetry,

    isFailedRequest: vm => vm.request?.status === 'error',
    hasErrorDetails: vm => Boolean(vm.errorMessages),
  },

  methods: {
    async getRequest() {
      this.request = await getDeploymentsRequest(this.requestId);
      if (this.isFailedRequest) {
        const tasksWithErrors = await getDeploymentRequestFailedTasks(this.requestId);
        this.errorMessages = tasksWithErrors.map(task => task.error_message).join('\n');
      } else {
        this.errorMessages = '';
      }
    },

    async getPprFileUrl() {
      const ppr = await getPPR(this.request.deployment.id, this.request.ppr.id);
      this.pprFileUrl = ppr.file.location;
    },

    downloadPPR() {
      downloader({ url: this.pprFileUrl });
    },

    async abortRequest() {
      this.request = await abortDeploymentRequest(this.requestId);
      this.areTasksUpdating = true;
    },

    async retryRequest() {
      this.request = await retryDeploymentRequest(this.requestId);
      this.areTasksUpdating = true;
    },

    openErrorDetailsDialog() {
      this.isErrorDialogOpen = true;
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

  &__error {
    margin: 0;
    padding: 0 4px;
    white-space: initial;

    a {
      margin-left: 12px;
    }
  }

  &__status {
    display: flex;
    align-items: center;
  }

  &__dot {
    margin: 0 8px;
  }
}
</style>
