<template lang="pug">
radio-table.products-tab(
  v-model="selectedPprVersion",
  :headers="headers",
  :items="pprs",
  :loading="loading",
  :prepare-row="prepareRow",
  title="Select PPR",
  hide-search,
)
  template(#version="{ row }")
    .ppr-tab__version
      c-icon(
        :icon="icons.googleDescriptionBaseline",
        size="16px",
      )
      span Version {{ row?.version }}
      c-chip.ppr-tab__chip(
        v-if="row.isFailed",
        :icon="icons.googleWarningBaseline",
        color="orange",
        text="PPR failed",
        small,
      )

  template(#description="{ row }")
    .truncate-text(v-if="row.description") {{ row.description }}
    span.assistive-color(v-else) —

</template>

<script>
import {
  googleDescriptionBaseline,
  googleWarningBaseline,
} from '@cloudblueconnect/material-svg';

import removeMarkdown from 'remove-markdown';

import cChip from '~components/cChip.vue';
import cIcon from '~components/cIcon.vue';
import RadioTable from '~components/RadioTable.vue';

import sync from '~mixins/sync';

import {
  getPPRs,
} from '@/utils';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    cChip,
    cIcon,
    RadioTable,
  },

  props: {
    value: {
      type: Object,
      default: () => ({}),
    },

    deploymentId: String,
  },

  data: () => ({
    localValue: {},
    selectedPprVersion: '',
    pprs: [],
    loading: false,
    headers: [
      {
        text: 'PPR',
        value: 'version',
        align: 'left',
      },
      {
        text: 'Description',
        value: 'description',
        align: 'left',
      },
    ],

    icons: {
      googleDescriptionBaseline,
      googleWarningBaseline,
    },
  }),

  methods: {
    prepareRow(item) {
      return {
        id: item.id,
        version: item.version,
        isFailed: item.status === 'failed',
        description: item.description ? removeMarkdown(item.description) : '',
      };
    },
  },

  watch: {
    selectedPprVersion(val) {
      this.localValue = this.pprs.find(({ id }) => id === val);
    },
  },

  async created() {
    try {
      this.loading = true;
      const pprs = await getPPRs(this.deploymentId);
      this.pprs = pprs.collection;
      if (this.localValue?.id) this.selectedPprVersion = this.localValue.id;
    } catch (e) {
      this.pprs = [];
      this.$emit('error', e);
    } finally {
      this.loading = false;
    }
  },
};

</script>

<style lang="stylus">
.ppr-tab {
  &__chip {
    margin-left: 8px;
  }

  &__version {
    :first-child {
      margin-right: 4px;
    }
  }
}

</style>
