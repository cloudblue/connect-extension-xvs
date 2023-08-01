<template lang="pug">
c-dialog.ppr-upload-dialog(
  v-model="localValue",
  title="Upload PPR",
  :actions="actions",
)
  upload-file.ppr-upload-dialog__upload(
    ref="fileUpload",
    message-text="Drag file here or&nbsp;<a>browse</a>",
    accepted-files=".xlsx",
    label="Upload file",
    @upload-success="onFileUploadSuccess",
  )

  c-textarea(
    v-model="description",
    :counter="256",
    label="Description (Optional)"
  )

</template>

<script>
import cDialog from '~components/cDialog.vue';
import cTextarea from '~components/cTextarea.vue';
import UploadFile from '~components/UploadFile.vue';

import sync from '~mixins/sync';

import {
  uploadPPR,
} from '@/utils';


export default {
  mixins: [
    sync([{ prop: 'value', local: 'localValue' }]),
  ],

  components: {
    cDialog,
    cTextarea,
    UploadFile,
  },

  props: {
    accountId: String,
    deploymentId: String,

    ppr: {
      type: Object,
      default: () => null,
    },

    value: Boolean,
  },

  data: () => ({
    localValue: false,
    description: '',
    isUploadingPPR: false,
  }),

  computed: {
    actions: vm => [
      {
        label: 'Cancel',
        color: 'black',
        closeAfterHandle: true,
      },
      {
        label: 'Upload',
        handler: vm.uploadPPR,
        closeAfterHandle: false,
        loading: vm.isUploadingPPR,
      },
    ],
  },

  methods: {
    uploadPPR() {
      const uri = `media/folders/accounts/${this.accountId}/${this.deploymentId}/pprs/files`;
      this.$refs.fileUpload.startUploadFile(uri);
      this.isUploadingPPR = true;
    },

    async onFileUploadSuccess({ response }) {
      await uploadPPR(this.deploymentId, {
        id: response.id,
        location: response.file,
        size: response.size,
        name: response.name,
        mimeType: response.mime_type,
        description: this.description,
      });

      this.isUploadingFile = false;
      this.localValue = false;
      this.$emit('uploaded');
    },
  },
};
</script>

<style lang="stylus">
.ppr-upload-dialog {
  &__upload {
    margin-bottom: 24px;
  }
}
</style>
