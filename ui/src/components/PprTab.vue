<template lang="pug">
.ppr-tab
  c-data-table.ppr-table(
    v-model="localValue",
    :headers="headers",
    :prepare-row="prepareRow",
    :updating="loading",
    :update="load",
    show-manage-panel,
    hide-go-to-page-section,
  )
    template(#buttons="")
      c-button.ppr-table__upload-btn(
        :icon="icons.googleFileUploadBaseline",
        color="accent",
        mode="solid",
        label="Upload PPR",
        small,
        @click="openUploadPPRDialog",
      )
      actions-menu(
        outline,
        small,
      )
        c-button.list-item(
          :icon="icons.googleRefreshBaseline",
          :loading="isRegeneratingPPR",
          :upper-case="false",
          label="Regenerate PPR",
          @click="regeneratePPR",
        )

    template(#items="{ row, visibleHeaders}")
      tr.table__row.hoverable(:id="row.id")
        template(v-for="header in visibleHeaders")
          //- PPR Version column
          td.nowrap-cell(
            v-if="header.value === 'ppr'",
            :key="header.value",
          )
            .ppr-version
              c-icon(
                :icon="icons.googleDescriptionBaseline",
                size="16px",
              )
              span Version {{ row.ppr }}

          //- Created At column
          td.nowrap-cell(
            v-if="header.value === 'createdAt'",
            :key="header.value",
          )
            span {{ row.createdAt | utcToLocal }}

          //- File Size column
          td.nowrap-cell(
            v-if="header.value === 'fileSize'",
            :key="header.value",
          )
            template(v-if="row.fileSize") {{ row.fileSize }}
            span.assistive-color(v-else) —

          //- Description column
          td.nowrap-cell(
            v-if="header.value === 'description'",
            :key="header.value",
          )
            .truncate-text(v-if="row.description") {{ row.description }}
            span.assistive-color(v-else) —

          //- Status column
          td.nowrap-cell(
            v-if="header.value === 'status'",
            :key="header.value",
          )
            .ppr-status
              c-status(:status="row.status")
              template(v-if="row.status === 'failed'")
                span.ppr-status__dot •
                a(@click="openPPRSummary(row)") Details

          td.nowrap-cell(
            v-else-if="header.value === 'actions'",
            :key="header.value",
          )
            c-button(
              :icon="icons.googleDownloadBaseline",
              :upper-case="false",
              size="18px",
              @click="downloadPPR(row)",
            )
            c-button(
              :icon="icons.googleInfoOutlineBaseline",
              :upper-case="false",
              size="18px",
              @click="openPPRSummary(row)",
            )

  ppr-summary-dialog(
    v-model="isPPRSummaryDialogOpen",
    :ppr="currentPPR",
  )

  ppr-upload-dialog(
    v-model="isUploadPPRDialogOpen",
    :account-id="accountId",
    :deployment-id="deploymentId",
    @uploaded="loadPPRs",
  )

  error-snackbar(
    v-model="showErrorSnackbar",
    :text="errorSnackbarText",
  )

</template>

<script>
import {
  googleDescriptionBaseline,
  googleDownloadBaseline,
  googleFileUploadBaseline,
  googleInfoOutlineBaseline,
  googleRefreshBaseline,
} from '@cloudblueconnect/material-svg';

import removeMarkdown from 'remove-markdown';

import ActionsMenu from '~components/ActionsMenu.vue';
import cButton from '~components/cButton.vue';
import cDataTable from '~components/cDataTable.vue';
import cIcon from '~components/cIcon.vue';
import cStatus from '~components/cStatus.vue';
import PprSummaryDialog from '~components/PprSummaryDialog.vue';
import PprUploadDialog from '~components/PprUploadDialog.vue';
import ErrorSnackbar from '~components/ErrorSnackbar.vue';

import {
  downloader,
  getFileSize,
} from '~helpers';

import {
  pathTo,
  propTo,
  template,
} from '~utils';

import {
  getPPRs,
  regeneratePPR,
} from '@/utils';


const prepareRow = template({
  id: ['id'],
  ppr: ['version'],
  createdAt: ['events', 'created', 'at'],
  fileSize: pathTo(['file', 'size'], getFileSize),
  description: propTo('description', removeMarkdown),
  status: ['status'],
});

export default {
  components: {
    ActionsMenu,
    PprUploadDialog,
    cButton,
    cDataTable,
    cIcon,
    cStatus,
    PprSummaryDialog,
    ErrorSnackbar,
  },

  props: {
    accountId: String,
    deploymentId: String,
  },

  data() {
    return {
      localValue: [],
      currentPPR: null,
      isPPRSummaryDialogOpen: false,
      isUploadPPRDialogOpen: false,

      isRegeneratingPPR: false,

      loading: true,
      icons: {
        googleDescriptionBaseline,
        googleDownloadBaseline,
        googleFileUploadBaseline,
        googleInfoOutlineBaseline,
        googleRefreshBaseline,
      },

      headers: [
        {
          text: 'PPR',
          value: 'ppr',
          align: 'left',
          width: 135,
        },
        {
          text: 'created',
          value: 'createdAt',
          align: 'left',
          width: 142,
        },
        {
          text: 'file size',
          value: 'fileSize',
          align: 'left',
          width: 99,
        },
        {
          text: 'description',
          value: 'description',
          align: 'left',
        },
        {
          text: 'status',
          value: 'status',
          align: 'left',
          width: 139,
        },
        {
          notResizable: true,
          text: '',
          value: 'actions',
          width: 80,
        },
      ],

      showErrorSnackbar: false,
      errorSnackbarText: '',
      localParams: { limit: 10, offset: 0 },
    };
  },

  methods: {
    prepareRow,
    downloadPPR({ id }) {
      this.currentPPR = this.localValue.find(ppr => ppr.id === id);
      downloader({ url: this.currentPPR.file.location });
    },

    openPPRSummary({ id }) {
      this.currentPPR = this.localValue.find(ppr => ppr.id === id);
      this.isPPRSummaryDialogOpen = true;
    },

    async regeneratePPR() {
      try {
        this.isRegeneratingPPR = true;
        await regeneratePPR(this.deploymentId);
        await this.loadPPRs();
      } catch (e) {
        this.showErrorSnackbar = true;
        this.errorSnackbarText = e.message;
      } finally {
        this.isRegeneratingPPR = false;
      }
    },

    async loadPPRs() {
      try {
        this.loading = true;
        const pprs = await getPPRs(this.deploymentId, this.localParams);
        this.localValue = pprs.collection;
      } catch (e) {
        this.showErrorSnackbar = true;
        this.errorSnackbarText = e.message;
      } finally {
        this.loading = false;
      }
    },

    openUploadPPRDialog() {
      this.isUploadPPRDialogOpen = true;
    },

    load(params) {
      this.localParams = params;

      return getPPRs(this.deploymentId, params);
    },
  },
};
</script>

<style lang="stylus">
.ppr-tab {
  .ppr-version {
    display: flex;
    align-items: center;

    :first-child {
      margin-right: 4px;
    }
  }

  .ppr-status {
    display: flex;
    align-items: center;

    &__dot {
      margin: 0 8px;
    }
  }

  .ppr-table__upload-btn {
    margin-right: 12px;
  }
}
</style>
