<template lang="pug">
.deployment-configuration-tab
  c-data-table(
    v-if="localValue",
    v-model="localValue",
    :headers="headers",
    hide-go-to-page-section,
    :prepare-row="prepareRow",
    showManagePanel,
  )
    template(#buttons="")
      c-button(
        mode="solid",
        color="accent",
        small,
        label="Upload configuration file",
        :icon="icons.googleFileUploadBaseline",
        @click="showUploadConfigurationDialog",
      )
    template(#items="{ row, visibleHeaders}")
      tr.table__row.hoverable(:id="row.id")
        template(v-for="header in visibleHeaders")
          //- file column
          td.nowrap-cell(
            v-if="header.value === 'file'",
            :key="header.value",
          )
            a.text-decoration-none(
              @click="downloadFile(row.fileId)",
              download,
            ) {{ row.fileName }}
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

  c-dialog(
    v-model="uploadConfigurationDialogIsShown",
    title="Upload Configuration File",
    width="500px",
    :actions="getUploadDialogActions",
  )
    p This file will become active after the upload is complete.
    upload-file(
      v-model="inputFile",
      ref="fileUpload",
      message-text="Drag files here or&nbsp;<a>browse</a>",
      accepted-files=".json",
      label="Upload file",

      @upload-success="uploadSuccess",
    )

</template>

<script>
import cDataTable from '~components/cDataTable.vue';
import DetailItem from '~components/DetailItem.vue';
import cButton from '~components/cButton.vue';
import TableActionsList from '~components/ActionsMenu.vue';
import cChip from '~components/cChip.vue';
import cDialog from '~components/cDialog.vue';
import UploadFile from '~components/UploadFile.vue';

import {
  template,
} from '~utils';

import {
  createDeploymentConfigurations,
  getDeploymentConfigurations,
} from '@/utils';

import {
  downloader,
  getFileSize,
} from '~helpers';

import {
  googleFileUploadBaseline,
} from '@cloudblueconnect/material-svg/baseline';


const prepareRow = template({
  fileName: ['file', 'name'],
  fileId: ['file', 'id'],
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
    cDialog,
    cDataTable,
    DetailItem,
    UploadFile,
  },

  props: {
    deploymentId: String,
    accountId: String,
  },

  data() {
    return {
      localValue: null,
      inputFile: null,
      icons: {
        googleFileUploadBaseline,
      },

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

      uploadConfigurationDialogIsShown: false,
      isUploadingFile: false,
    };
  },

  computed: {
    getUploadDialogActions: vm => [
      {
        label: 'Cancel',
        color: 'black',
        closeAfterHandle: true,
      }, {
        label: 'Upload',
        handler: vm.uploadFile,
        closeAfterHandle: false,
        loading: vm.isUploadingFile,
      },
    ],
  },

  methods: {
    prepareRow,
    getFileSize,
    downloadFile(name) {
      const downloadUrl = `https://vendor.cnct.info/public/v1/media/folders/accounts/${this.accountId}/${this.deploymentId}/pprs/files/${name}`;

      downloader({ url: downloadUrl });
    },

    showUploadConfigurationDialog() {
      this.uploadConfigurationDialogIsShown = true;
    },

    uploadFile() {
      this.isUploadingFile = true;
      const uri = `media/folders/accounts/${this.accountId}/${this.deploymentId}/pprs/files`;
      this.$refs.fileUpload.startUploadFile(uri);
    },

    uploadSuccess({ response }) {
      this.isUploadingFile = false;
      this.uploadConfigurationDialogIsShown = false;
      this.createConfig(response);
    },

    createConfig(response) {
      createDeploymentConfigurations(this.deploymentId, {
        file: {
          id: response.id,
          name: response.name,
          location: response.file,
          size: response.size,
          mime_type: 'application/json',
        },
      }).then(() => { this.getConfigs(); });
    },

    getConfigs() {
      getDeploymentConfigurations(this.deploymentId).then(data => {
        this.localValue = data;
      });
    },
  },

  created() {
    this.getConfigs();
  },
};
</script>
