<template lang="pug">
c-dialog.ppr-summary-dialog(
  v-model="localValue",
  title="PPR Summary",
)
  div(v-if="ppr")
    grid-item(label="PPR")
      template(#value="")
        .ppr-summary-dialog__version
          c-icon(
            :icon="icons.googleDescriptionBaseline",
            size="16px",
          )
          span Version {{ ppr.version }}
          span.ppr-summary-dialog__dot •
          a(@click="downloadPPR") Download

    grid-item(
      label="Created",
      :value="ppr.events.created_at | utcToLocal",
    )

    grid-item(
      label="File Size",
      :value="ppr?.file?.size",
    )

    grid-item(label="Status")
      template(#value="")
        c-status(:status="ppr.status")

    .ppr-summary-dialog__divider.divider

    markdown(
      v-if="ppr.description",
      :content="ppr.description",
    )
    .assistive-text(v-else) —

</template>

<script>
import {
  googleDescriptionBaseline,
} from '@cloudblueconnect/material-svg';

import cDialog from '~components/cDialog.vue';
import cIcon from '~components/cIcon.vue';
import cStatus from '~components/cStatus.vue';
import GridItem from '~components/GridItem.vue';
import Markdown from '~components/Markdown.vue';

import {
  downloader,
  getFileSize,
} from '~helpers';

import sync from '~mixins/sync';


export default {
  mixins: [
    sync([{ prop: 'value', local: 'localValue' }]),
  ],

  components: {
    cDialog,
    cIcon,
    cStatus,
    GridItem,
    Markdown,
  },

  props: {
    ppr: {
      type: Object,
      default: () => null,
    },

    value: Boolean,
  },

  data: () => ({
    localValue: false,
    icons: {
      googleDescriptionBaseline,
    },
  }),

  methods: {
    getFileSize,

    downloadPPR() {
      downloader({ url: this.ppr.file.location });
    },
  },
};
</script>

<style lang="stylus">
.ppr-summary-dialog {
  &__version {
    display: flex;
    align-items: center;
  }

  &__dot {
    margin: 0 4px;
  }

  &__divider {
    margin: 24px 0;
  }
}
</style>
