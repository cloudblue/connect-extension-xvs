<template lang="pug">
checkbox-table.marketplaces-tab(
  v-model="selectedMarketplaces",
  :headers="headers",
  :items="filteredMarketplaces",
  :loading="loading",
  :prepare-row="prepareRow",
  :search.sync="searchValue",
  :is-all-selected.sync="isAllSelected",
  title="Select Marketplaces",
  include-all,
  return-object,
)
  template(#marketplace="{ row }")
    detail-item.hub-tab__detail
      template(#image="")
        pic.object-image(
          :src="row.icon",
          :width="32",
          :height="32",
          size="contain",
        )
      template(#body-text="")
        .truncate-text
          span {{ row.name }}
      template(#assistive-text="")
        span {{ row.id }}

  template(#externalId="{ row }")
    span(v-if="row.externalId") {{ row.externalId }}
    span.assistive-color(v-else) —

  template(#appliedPpr="{ row }")
    span(v-if="row.appliedPprVersion") Version {{ row.appliedPprVersion }}
    span.assistive-color(v-else) —

</template>

<script>
import CheckboxTable from '~components/CheckboxTable.vue';
import DetailItem from '~components/DetailItem.vue';
import Pic from '~components/Pic.vue';

import sync from '~mixins/sync';

import {
  getDeploymentMarketplaces,
} from '@/utils';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    DetailItem,
    CheckboxTable,
    Pic,
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
    selectedMarketplaces: [],
    isAllSelected: false,
    searchValue: '',
    marketplaces: [],
    loading: false,
    headers: [
      {
        text: 'Marketplace',
        value: 'marketplace',
        align: 'left',
      },
      {
        text: 'External ID',
        value: 'externalId',
        align: 'left',
      },
      {
        text: 'Applied PPR',
        value: 'appliedPpr',
        align: 'left',
      },
    ],
  }),

  computed: {
    filteredMarketplaces: ({ marketplaces, searchValue }) => {
      const lowerCaseSearch = searchValue.toLowerCase();

      return marketplaces.filter(({ id, name }) => name.toLowerCase().includes(lowerCaseSearch)
        || id.toLowerCase().includes(lowerCaseSearch));
    },
  },

  methods: {
    prepareRow(item) {
      return {
        id: item.id,
        name: item.name,
        icon: item.icon,
        externalId: item.external_id,
        appliedPprVersion: item.ppr?.version || 0,
      };
    },
  },

  watch: {
    selectedMarketplaces: {
      deep: true,
      immediate: true,
      handler(val) {
        this.$set(this.localValue, 'choices', val);
      },
    },

    isAllSelected: {
      immediate: true,
      handler(val) {
        this.$set(this.localValue, 'all', val);
      },
    },
  },

  async created() {
    try {
      this.loading = true;
      this.marketplaces = await getDeploymentMarketplaces(this.deploymentId);
    } catch (e) {
      this.marketplaces = [];
      this.$emit('error', e);
    } finally {
      this.loading = false;
    }
  },
};

</script>

<style lang="stylus">
.marketplaces-tab__detail {
  margin-top: 0;
}
</style>
