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

  template(#description="{ row }")
    .truncate-text(v-if="row.description") {{ row.description }}
    span.assistive-text(v-else) —

</template>

<script>
import {
  googleDescriptionBaseline,
} from '@cloudblueconnect/material-svg';

import removeMarkdown from 'remove-markdown';

import cIcon from '~components/cIcon.vue';
import RadioTable from '~components/RadioTable.vue';

import sync from '~mixins/sync';

import {
  getPPRs,
} from '@/utils';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
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

    icons: { googleDescriptionBaseline },
  }),

  methods: {
    prepareRow(item) {
      return {
        id: item.id,
        version: item.version,
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
      this.pprs = await getPPRs(this.deploymentId);
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
.products-tab__detail {
  margin-top: 0;
}
</style>
