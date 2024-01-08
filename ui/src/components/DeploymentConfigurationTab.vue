<template lang="pug">
.deployment-configuration-tab
  c-data-table(
    v-model="localValue",
    :headers="headers",
    hide-go-to-page-section,
    :prepare-row="prepareRow",
    :updating="loading",
    show-manage-panel,
    :update="load",
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
            span {{ row.fileName }}
            c-chip._ml_8.color_border-radius(
              v-if="row.configState === 'active'",
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
            c-button(
              :icon="icons.googleDownloadBaseline",
              size="18px",
              @click="downloadFile(row)",
            )
            table-actions-list._ml_4
              c-button.list-item(
                color="red",
                label="Delete",
                @click="deleteConfig(row.configId)",
                :upper-case="false",
              )

  c-dialog(
    v-model="uploadConfigurationDialogIsShown",
    title="Upload Configuration File",
    width="500px",
    :actions="getUploadDialogActions",
    :error-text="uploadErrorText",
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

  error-snackbar(
    v-model="showErrorSnackbar",
    :text="errorSnackbarText",
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
import ErrorSnackbar from '~components/ErrorSnackbar.vue';

import {
  template,
} from '~utils';

import {
  createDeploymentConfigurations,
  deleteDeploymentConfiguration,
  getDeploymentConfigurations,
} from '@/utils';

import {
  downloader,
  getFileSize,
} from '~helpers';

import {
  googleDownloadBaseline,
  googleFileUploadBaseline,
} from '@cloudblueconnect/material-svg/baseline';


const prepareRow = template({
  configId: ['id'],
  fileName: ['file', 'name'],
  fileId: ['file', 'id'],
  fileLocation: ['file', 'location'],
  fileSize: ['file', 'size'],
  addedAt: ['events', 'created', 'at'],
  addedByName: ['events', 'created', 'by', 'name'],
  addedById: ['events', 'created', 'by', 'id'],
  configState: ['state'],
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
    ErrorSnackbar,
  },

  props: {
    deploymentId: String,
    accountId: String,
  },

  data() {
    return {
      localValue: [],
      inputFile: null,
      loading: true,
      icons: {
        googleFileUploadBaseline,
        googleDownloadBaseline,
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
          notResizable: true,
          text: '',
          value: 'actions',
          width: 80,
        },
      ],

      uploadConfigurationDialogIsShown: false,
      isUploadingFile: false,
      uploadErrorText: '',
      showErrorSnackbar: false,
      errorSnackbarText: '',
      localParams: { limit: 10, offset: 0 },
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
        disabled: !vm.inputFile,
        handler: vm.uploadFile,
        closeAfterHandle: false,
        loading: vm.isUploadingFile,
      },
    ],
  },

  methods: {
    prepareRow,
    getFileSize,
    downloadFile(item) {
      downloader({ url: item.fileLocation });
    },

    showUploadConfigurationDialog() {
      this.uploadConfigurationDialogIsShown = true;
    },

    uploadFile() {
      this.isUploadingFile = true;
      const uri = `media/folders/accounts/${this.accountId}/${this.deploymentId}/configurations/files`;
      this.$refs.fileUpload.startUploadFile(uri);
    },

    async uploadSuccess({ response }) {
      try {
        await this.createConfig(response);
        this.uploadConfigurationDialogIsShown = false;
      } catch (e) {
        this.uploadErrorText = e.message;
      } finally {
        this.isUploadingFile = false;
      }
    },

    createConfig(response) {
      return createDeploymentConfigurations(this.deploymentId, {
        file: {
          id: response.id,
          name: response.name,
          location: response.file,
          size: response.size,
          mime_type: 'application/json',
        },
      }).then(() => this.getConfigs());
    },

    async getConfigs() {
      this.loading = true;
      try {
        const conf = await getDeploymentConfigurations(this.deploymentId, this.localParams);
        this.localValue = conf.collection;
      } catch (e) {
        this.showErrorSnackbar = true;
        this.errorSnackbarText = e.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteConfig(configId) {
      try {
        await deleteDeploymentConfiguration(this.deploymentId, configId);
        await this.getConfigs();
      } catch (e) {
        this.showErrorSnackbar = true;
        this.errorSnackbarText = e.message;
      }
    },

    load(params) {
      this.localParams = params;

      return getDeploymentConfigurations(this.deploymentId, params);
    },
  },

  created() {
    this.getConfigs();
  },
};
</script>
