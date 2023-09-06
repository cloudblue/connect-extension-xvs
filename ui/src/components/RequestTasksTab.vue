<template lang="pug">
.request-tasks-tab
  c-data-table(
    v-model="tasks",
    :headers="headers",
    :prepare-row="prepareRow",
    :show-loader="loading",
    hide-all-pagination-sections,
  )
    template(#items="{ row, visibleHeaders }")
      tr.table__row.hoverable(:id="row.id")
        template(v-for="header in visibleHeaders")
          //- ID column
          td.nowrap-cell(
            v-if="header.value === 'id'",
            :key="header.value",
          )
            span {{ row.id }}

          //- Event column
          td.nowrap-cell(
            v-if="header.value === 'event'",
            :key="header.value",
          )
            span {{ row.event }}

          //- Processed column
          td.nowrap-cell(
            v-if="header.value === 'processed'",
            :key="header.value",
          )
            span(v-if="row.processed") {{ row.processed | utcToLocal }}
            span.assistive-text(v-else) –

          //- Elapsed column
          td.nowrap-cell(
            v-if="header.value === 'elapsed'",
            :key="header.value",
          )
            span(v-if="row.elapsed") {{ row.elapsed }}
            span.assistive-text(v-else) –

          //- Status column
          td.nowrap-cell(
            v-if="header.value === 'status'",
            :key="header.value",
          )
            .request-tasks-tab__status
              c-status(:status="row.status")
              template(v-if="row.status === 'failed'")
                span.request-tasks-tab__dot •
                a(@click="openErrorDetails(row)") Details

          //- Actions column
          td.nowrap-cell(
            v-if="header.value === 'actions'",
            :key="header.value",
          )
            c-button(
              :icon="icons.googleInfoOutlineBaseline",
              size="18px",
              small,
              @click="openInfoDialog(row)",
            )

  request-task-info-dialog(
    v-model="isInfoDialogOpen",
    :item="currentItem",
  )

  error-dialog(
    v-model="isErrorDialogOpen",
    :error-message="currentError",
    type="Task",
  )

</template>

<script>
import moment from 'moment-timezone';

import {
  googleInfoOutlineBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import cButton from '~components/cButton.vue';
import cDataTable from '~components/cDataTable.vue';
import cStatus from '~components/cStatus.vue';

import ErrorDialog from '~components/ErrorDialog.vue';
import RequestTaskInfoDialog from '~components/RequestTaskInfoDialog.vue';

import {
  getDeploymentRequestTasks,
} from '@/utils';

import {
  readableTimeDiff,
} from '~helpers';


export default {
  components: {
    cButton,
    cDataTable,
    cStatus,
    ErrorDialog,
    RequestTaskInfoDialog,
  },

  props: {
    requestId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    loading: true,
    tasks: [],

    icons: { googleInfoOutlineBaseline },

    headers: [
      {
        text: 'ID',
        value: 'id',
        width: 180,
      },
      { text: 'Event', value: 'event' },
      {
        text: 'Processed',
        value: 'processed',
        width: 140,
      },
      {
        text: 'Elapsed',
        value: 'elapsed',
        width: 105,
      },
      {
        text: 'Status',
        value: 'status',
        width: 140,
      },
      { value: 'actions', width: 28 },
    ],

    currentItem: null,
    isInfoDialogOpen: false,
    currentError: '',
    isErrorDialogOpen: false,
  }),

  methods: {
    getElapsedTime({ events }) {
      if (events.finished?.at) {
        const msDiff = moment(events.finished.at).diff(moment(events.started.at));

        return readableTimeDiff(msDiff);
      }

      return '';
    },

    prepareRow(item) {
      return {
        id: item.id,
        event: item.title,
        status: item.status,
        processed: item.events.finished?.at,
        created: item.events.created?.at,
        elapsed: this.getElapsedTime(item),
        errorMessage: item.error_message,
      };
    },

    openInfoDialog(item) {
      this.currentItem = item;
      this.isInfoDialogOpen = true;
    },

    openErrorDetails(item) {
      this.currentError = item.errorMessage;
      this.isErrorDialogOpen = true;
    },
  },

  watch: {
    isInfoDialogOpen(v) {
      if (!v) this.currentItem = null;
    },
  },

  async created() {
    this.tasks = await getDeploymentRequestTasks(this.requestId);
    this.loading = false;
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
}

</style>
