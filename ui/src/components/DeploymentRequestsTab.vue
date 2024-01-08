<template lang="pug">
.request-tasks-tab
  c-data-table(
    v-model="requests",
    :headers="headers",
    :prepare-row="prepareRow",
    :updating="loading",
    fix-layout,
    show-manage-panel,
    :update="load",
  )
    template(#buttons="")
      c-button.ppr-table__upload-btn(
        :icon="icons.googleAddBaseline",
        color="accent",
        mode="solid",
        label="Create Request",
        small,
        @click="openUploadPPRDialog",
      )

    template(#items="{ row, visibleHeaders }")
      tr.table__row.hoverable(:id="row.id")
        template(v-for="header in visibleHeaders")
          //- ID column
          td.nowrap-cell(
            v-if="header.value === 'id'",
            :key="header.value",
          )
            router-link(
              :to="{ name: 'RequestDetails', params: { id: row.id } }"
            ) {{ row.id }}
            c-chip.request-tasks-tab__manual(
              v-if="row.manual",
              text="Manual",
              type="pale",
              small,
            )

          //- Event column
          td.nowrap-cell(
            v-if="header.value === 'ppr'",
            :key="header.value",
          )
            span Version {{ row.ppr }}

          //- Processed column
          td.nowrap-cell(
            v-if="header.value === 'created'",
            :key="header.value",
          )
            span(v-if="row.created") {{ row.created | utcToLocal }}
            span.assistive-color(v-else) —

          //- Status column
          td.nowrap-cell(
            v-if="header.value === 'status'",
            :key="header.value",
          )
            .request-tasks-tab__status
              c-status(:status="row.status")
              //template(v-if="row.status === 'failed'")
              //  span.request-tasks-tab__dot •
              //  a(@click="openErrorDetails(row)") Details

  create-deployment-request-dialog(
    v-model="isCreateRequestDialogOpen",
    :deployment="deployment",
    @request-created="loadRequests",
  )

</template>

<script>
import {
  googleAddBaseline,
} from '@cloudblueconnect/material-svg';

import cButton from '~components/cButton.vue';
import cChip from '~components/cChip.vue';
import cDataTable from '~components/cDataTable.vue';
import cStatus from '~components/cStatus.vue';
import CreateDeploymentRequestDialog from '~components/CreateDeploymentRequestDialog/index.vue';

import {
  getDeploymentRequests,
} from '@/utils';


export default {
  components: {
    cButton,
    cChip,
    cDataTable,
    cStatus,
    CreateDeploymentRequestDialog,
  },

  props: {
    deployment: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    loading: true,
    requests: [],

    icons: { googleAddBaseline },

    isCreateRequestDialogOpen: false,

    headers: [
      {
        text: 'Request',
        value: 'id',
      },
      {
        text: 'PPR',
        value: 'ppr',
        width: 105,
      },
      {
        text: 'Created',
        value: 'created',
        width: 137,
      },
      {
        text: 'Status',
        value: 'status',
        width: 140,
      },
    ],

    localParams: { limit: 10, offset: 0 },
  }),

  computed: {
    deploymentId: vm => vm.deployment.id,
  },

  methods: {
    prepareRow(item) {
      return {
        id: item.id,
        status: item.status,
        created: item.events.created?.at,
        ppr: item.ppr.version,
        manual: item.manually,
      };
    },

    openUploadPPRDialog() {
      this.isCreateRequestDialogOpen = true;
    },

    async loadRequests() {
      this.loading = true;
      const rq = await getDeploymentRequests(this.deploymentId, this.localParams);
      this.requests = rq.collection;
      this.loading = false;
    },

    load(params) {
      this.localParams = params;

      return getDeploymentRequests(this.deploymentId, params);
    },
  },
};

</script>

<style lang="stylus">
.request-tasks-tab {
  &__status {
    display: flex;
    align-items: center;
  }

  &__dot {
    margin: 0 8px;
  }

  &__manual {
    margin-left: 8px;
  }
}

</style>
