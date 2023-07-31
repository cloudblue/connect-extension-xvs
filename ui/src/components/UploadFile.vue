<template lang="pug">
.file-upload(
  :class="fileUploadConditionalClasses",
  :style="styleCustomizations",
  locator="upload-file",
)
  .file-upload__label(v-if="!hideLabel") {{ label }}

  vue-dropzone.file-upload__dropzone(
    ref="fileDropzone",
    :id="id",
    :style="vueDropzoneStyles",
    :destroy-dropzone="false",
    :options="dropzoneOptions",
    use-custom-slot,
    @vdropzone-files-added="onFilesAdded",
    @vdropzone-removed-file="onFileRemove",
    @vdropzone-max-files-exceeded="onMaxFiles",
    @vdropzone-error="onError",
    @vdropzone-drag-over="addHover",
    @vdropzone-drag-enter="addHover",
    @vdropzone-drag-leave="removeHover",
    @vdropzone-drag-drop="removeHover",
    @vdropzone-drag-end="removeHover",
    @vdropzone-sending="sendFiles",
    @vdropzone-success="uploadSuccess",
    @vdropzone-complete="uploadComplete",
  )
    .dz-default.file-upload__message
      .file-upload__message-text(v-html="messageText")

  .assistive-text._mt_4 {{ uploadHintMessageText }}

  .file-upload__error(v-if="isErrorShown")
    | {{ errorMessages[0] }}
  .file-upload__error(v-else-if="remoteError")
    | Your file contains error

  c-alert._mt_24(
    v-if="remoteError",
    :message="remoteError",
    type="error",
    fluid,
  )
</template>


<script>
import {
  all,
  applyTo,
  equals,
  filter,
  head,
  identity,
  ifElse,
  isNil,
  length,
  map,
  not,
  pipe,
  prepend,
  unnest,
} from 'ramda';

import {
  hexToRGB,
} from '~helpers';

import vueDropzone from 'vue2-dropzone';

import cAlert from '~components/cAlert.vue';


import {
  alt,
  isNotNilOrEmpty,
  isString,
  obj,
  pathTo,
  template,
  textError,
} from '~utils';


import {
  googleInsertDriveFileBaseline,
} from '@cloudblueconnect/material-svg/baseline';


const getTemplate = () => `
<div class="file-preview" translate="no">
  <div class="file-preview__file-icon">
    <i class="material-icons" data-dz-thumbnail-bg>insert_drive_file</i>
  </div>
  <div class="file-preview__details">
      <div class="file-preview__file-name truncate-text" data-dz-name></div>
      <div class="file-preview__file-size assistive-text" data-dz-size></div>
  </div>
  <i class="material-icons file-preview__action-icon" data-dz-remove>delete_forever</i>
</div>
`;

const toPx = px => `${px}px`;

export default {
  inject: {
    form: { default: null },
  },

  components: {
    cAlert,
    vueDropzone,
  },

  props: {
    hint: String,
    placeholder: String,
    paramName: {
      type: String,
      default: 'file',
    },

    id: {
      type: String,
      default: 'dropzone',
    },

    rules: {
      type: Array,
      default: () => [],
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: 'Upload file',
    },

    hideLabel: {
      type: Boolean,
      default: false,
    },

    width: {
      type: Number,
    },

    height: {
      type: Number,
      default: 64,
    },

    acceptedFiles: {
      type: String,
      default: null,
    },

    messageText: {
      type: String,
      default: 'Drag file here or&nbsp;<a>browse</a>',
    },

    maxUploadfileSize: {
      type: String,
      default: '10',
    },

    maxUploadFiles: {
      type: Number,
      default: 1,
    },

    requestHeaders: {
      type: Object,
      default: obj,
    },
  },

  data() {
    return {
      googleInsertDriveFileBaseline,
      dropzoneOptions: {
        headers: this.requestHeaders,
        url: () => {},
        maxFiles: this.maxUploadFiles,
        maxFilesize: this.maxUploadfileSize,
        autoProcessQueue: false,
        acceptedFiles: this.acceptedFiles,
        previewTemplate: getTemplate(),
        paramName: this.paramName,
      },

      shouldValidate: true,
      internalValue: null,
      isValid: true,
      customError: '',
      isHovered: false,
      isTouched: false,
      remoteError: '',
      uploadCompleted: 0,
      dragEventListeners: [
        { event: 'dragenter', handler: this.addHover },
        { event: 'dragover', handler: this.addHover },
        { event: 'dragleave', handler: this.removeHover },
        { event: 'drag', handler: this.removeHover },
      ],

      primaryColor: '#4797f2',
      contrast: '#ffffff',
      accent: '#1565c0',
    };
  },

  computed: {
    uploadHintMessageText: vm => vm.hint || `Maximum upload file size: ${vm.maxUploadfileSize} MB`,

    validationResult: vm => ifElse(
      isNotNilOrEmpty,
      pipe(map(vm.validateItem), unnest),
      vm.validateItem,
    )(vm.internalValue),

    errorMessages: vm => pipe(
      filter(isString),
      alt(identity, prepend(vm.customError), equals('', vm.customError)),
    )(vm.validationResult),

    isInternalValid: pathTo(['validationResult'], all(equals(true))),
    hasError: pathTo(['isInternalValid'], not),
    isErrorShown: vm => vm.hasError && vm.isTouched,

    fileUploadConditionalClasses: template({
      'file-upload--disabled': ['disabled'],
      'file-upload--with-files': pathTo(['internalValue'], isNotNilOrEmpty),
      'file-upload--has-error': ['isErrorShown'],
      'file-upload--hovered': ['isHovered'],
    }),

    styleCustomizations() {
      return {
        theme_primary: this.primaryColor,
        theme_primary_rgb: hexToRGB(this.primaryColor),
        theme_accent: this.accent,
        theme_accent_rgb: hexToRGB(this.accent),
        theme_contrast: this.contrast,
        theme_contrast_rgb: hexToRGB(this.contrast),
      };
    },

    vueDropzoneStyles: template({
      width: pathTo(['width'], toPx),
      minHeight: pathTo(['height'], toPx),
    }),
  },

  methods: {
    validateItem(item) {
      return map(applyTo(item))(this.rules);
    },

    resetValidation() {
      this.isValid = true;
    },

    validate() {
      this.isValid = this.isInternalValid;
    },

    reset() {
      this.isTouched = false;
      this.internalValue = null;
      this.isValid = true;
    },

    onMaxFiles(addedFile) {
      this.$refs.fileDropzone.removeAllFiles();
      this.$refs.fileDropzone.addFile(addedFile);
    },

    async onFilesAdded() {
      this.customError = '';
      this.remoteError = '';
      await this.$nextTick();
      this.syncInternalValue();
      this.$emit('files-added', this.internalValue);
    },

    syncInternalValue() {
      this.internalValue = this.$refs.fileDropzone.getAcceptedFiles();
      this.$emit('files-modified');
    },

    onError(file, message, xhr) {
      this.isTouched = true;
      this.uploadHintMessageText = '';

      if (isNil(xhr)) {
        this.$refs.fileDropzone.removeAllFiles();
        this.syncInternalValue();
        this.customError = message;
      } else {
        this.remoteError = textError(message.errors[0]);
      }

      this.$emit('upload-error');
    },

    onFileRemove() {
      this.syncInternalValue();
      this.remoteError = '';
      this.customError = '';
    },

    async removeFiles() {
      this.$refs.fileDropzone.removeAllFiles();
      this.syncInternalValue();
      this.remoteError = '';
      this.customError = '';
      this.internalValue = [];
      await this.$nextTick();
      this.isTouched = false;
    },

    addHover() {
      this.isHovered = true;
    },

    removeHover() {
      this.isHovered = false;
    },

    startUploadFile(uri, method = 'post') {
      this.$refs.fileDropzone.setOption('method', method);
      this.$refs.fileDropzone.setOption('url', `/public/v1/${uri}`);
      this.$refs.fileDropzone.processQueue();
    },

    sendFiles(file, xhr, formData) {
      this.$emit('send', file, xhr, formData);
    },

    uploadSuccess(file, response) {
      this.$emit('upload-success', { file, response });
    },

    uploadComplete() {
      this.uploadCompleted += 1;
      if (this.uploadCompleted === length(this.internalValue)) {
        this.$emit('total-upload-success');
      }
    },
  },

  watch: {
    internalValue(v) {
      this.isTouched = true;

      if (length(v) < this.maxUploadFiles) {
        this.$refs.fileDropzone.setupEventListeners();
      } else {
        this.$refs.fileDropzone.removeEventListeners();
      }

      const preparedValue = (this.maxUploadFiles === 1) ? head(v) : v;

      this.$emit('input', preparedValue);
    },

    rules: {
      handler() {
        this.validate();
      },

      deep: true,
    },
  },

  created() {
    if (this.form) {
      this.form.register(this);
    }
  },

  mounted() {
    this.dragEventListeners.forEach(
      listener => window.addEventListener(listener.event, listener.handler),
    );
  },

  destroyed() {
    this.dragEventListeners.forEach(
      listener => window.removeEventListener(listener.event, listener.handler),
    );
  },

  beforeDestroy() {
    if (this.form) {
      this.form.unregister(this);
    }
  },
};
</script>


<style lang="stylus">
@import '~styles/common';

.file-upload {
  &--disabled {
    opacity: .5;
  }

  &--hovered .file-upload__dropzone,
  &:not(&--with-files) .file-upload__dropzone:hover {
    border-color: $accent;
    background-color: _rgba($accent-rgb, .05);

    .file-upload__message-text,
    .file-upload__message-text a {
      color: $accent;
    }
  }

  &--hovered&--has-error .file-upload__dropzone,
  &:not(&--with-files)&--has-error .file-upload__dropzone:hover {
    border-color: $nice-red;
    background-color: rgba($nice-red, .05);

    .file-upload__message-text,
    .file-upload__message-text a {
      color: $nice-red;
    }
  }

  &--with-files {
    .file-upload__dropzone {
      border: none;

      &.dropzone {
        .dz-message {
          display: none;
        }
      }
    }
  }

  &--has-error {
    .file-upload__dropzone {
      border-color: $nice-red;
    }

    .file-upload__message-text,
    .file-upload__message-text a {
      color: $nice-red;
    }
  }

  &__label {
    margin-bottom: $module * 2;

    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
  }

  &__error {
    margin-top: 4px;

    font-size: 12px;
    line-height: 16px;
    color: $nice-red;
  }

  &__message-text {
    margin: auto;
    color: $assistive-text-color;

    a {
      color: $accent;
      text-decoration: underline;
    }
  }

  &__file {
    margin-top: auto;
    margin-bottom: auto;
  }

  &__dropzone {
    border: 1px dashed $assistive-text-color;
    box-sizing: border-box;
    border-radius: 4px;
    min-height: 64px;
    display: flex;
    flex-direction: column;

    font-size: $general-font-size;

    &.dropzone {
      .dz-message {
        cursor: pointer;
      }

      .dz-message,
      .dz-default {
        flex-grow: 1;
        align-self: stretch;
        display: flex;
      }

      .dz-remove {
        display: inline-block;
        vertical-align: middle;
        text-decoration: none;

        i {
          margin-left: 12px;
          font-size: 18px;
          vertical-align: middle;
        }
      }

      .dz-details {
        span {
          vertical-align: middle;
        }
      }

      .dz-size {
        font-size: 12px;
        color: $assistive-text-color;

        strong {
          font-weight: normal;
        }
      }
    }
  }
}

.file-preview {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  min-height: $module * 16;
  padding: $module * 2 $module * 3 ;

  background-color: #f5f5f5;
  color: $base-text-color;

  border-radius: 4px;

  cursor: default;

  &__details {
    flex: 1 1 100%;
    min-width: 0;
  }

  &__file-name {
    color: $base-text-color;
    font-size: $general-font-size;
    line-height: $general-line-height;
  }

  &__file-size {
    strong {
      font-weight: normal;
    }
  }

  &__file-icon,
  &__action-icon {
    flex: 0 0 auto;
    color: $theme-grey-1;
  }

  &__file-icon {
    margin-right: $module * 2;

    i {
      vertical-align: top;
      color: inherit;
    }
  }

  &__action-icon {
    margin-left: $module * 8;
    font-size: 18px;
    vertical-align: top;
    cursor: pointer;
  }
}
</style>
