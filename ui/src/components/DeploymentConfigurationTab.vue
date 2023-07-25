<template lang="pug">
c-data-table(
  v-if="localValue",
  v-model="localValue",
  :headers="headers",
  hide-go-to-page-section,
  :prepare-row="prepareRow",
)
  template(#items="{ row, visibleHeaders}")
    tr.table__row.hoverable(:id="row.id")
      template(v-for="header in visibleHeaders")
        //- file column
        td.nowrap-cell(
          v-if="header.value === 'file'",
          :key="header.value",
        )
          a.text-decoration-none(@click="downloadFile(row.fileLocation)", download) {{ row.fileName }}
          c-chip._ml_8.color_border-radius(
            text="Active",
            color="orange",
          )

        //- fileSize column
        td.nowrap-cell(
          v-if="header.value === 'fileSize'",
          :key="header.value",
        )
          span {{ getFileSize(row.fileSize) }}

        //- addedAt column
        td.nowrap-cell(
          v-if="header.value === 'addedAt'",
          :key="header.value",
        )
          span {{ row.addedAt | utcToLocal }}

        //- addedBy column
        td.nowrap-cell(
          v-if="header.value === 'addedBy'",
          :key="header.value",
        )
          detail-item(:assistive-text="row.addedById")
            template(#body-text="")
              .truncate-text {{ row.addedByName }}

        //- Actions
        td.nowrap-cell(
          v-if="header.value === 'actions'",
          :key="header.value",
        )
          table-actions-list._ml_4
            c-button.list-item(
              color="red",
              label="Delete",
              :upper-case="false",
            )
</template>

<script>
import cDataTable from '~components/cDataTable.vue';
import DetailItem from '~components/DetailItem.vue';
import cButton from '~components/cButton.vue';
import TableActionsList from '~components/ActionsMenu.vue';
import cChip from '~components/cChip.vue';

import {
  template,
} from '~utils';

import {
  getDeploymentConfigurations,
} from '@/utils';

import {
  getFileSize,
  downloader,
} from '~helpers';


const prepareRow = template({
  fileName: ['file', 'name'],
  fileLocation: ['file', 'location'],
  fileSize: ['file', 'size'],
  addedAt: ['events', 'created', 'at'],
  addedByName: ['events', 'created', 'by', 'name'],
  addedById: ['events', 'created', 'by', 'id'],
});


export default {
  components: {
    TableActionsList,
    cButton,
    cChip,
    cDataTable,
    DetailItem,
  },
  props: {
    deploymentId: String,
    accountId: String,
  },
  data() {
    return {
      localValue: null,
      headers: [
        {
          text: 'file',
          value: 'file',
          align: 'left',
        },
        {
          text: 'file size',
          value: 'fileSize',
          align: 'left',
        },
        {
          text: 'added at',
          value: 'addedAt',
          align: 'left',
        },
        {
          text: 'added by',
          value: 'addedBy',
          align: 'left',
        },
        {
          text: '',
          value: 'actions',
          align: 'left',
          width: 76,
        },
      ],
    };
  },

  methods: {
    prepareRow,
    getFileSize,
    downloadFile(url) {
      const downloadUrl = `https://vendor.cnct.info/public/v1/media/folders/accounts/${this.accountId}/${this.deploymentId}/pprs/files/MFL-9618-6980-7316`;

      downloader({ url: downloadUrl });
    },
    downloader,
  },

  async created() {
    getDeploymentConfigurations(this.deploymentId).then(data => {
      this.localValue = data;
    });
  },
};
</script>
