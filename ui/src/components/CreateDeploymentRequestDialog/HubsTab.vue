<template lang="pug">
radio-table.hub-tab(
  v-model="selectedHubId",
  :headers="headers",
  :items="filteredHubs",
  :loading="loading",
  :prepare-row="prepareRow",
  :search.sync="searchValue",
  title="Select Hub",
)
  template(#hub="{ row }")
    detail-item.hub-tab__detail
      template(#body-text="")
        .truncate-text
          span {{ row?.name }}
      template(#assistive-text="")
        span {{ row?.id }}

  template(#externalId="{ row }")
    .truncate-text(
      v-if="row.externalId",
      :title="row.externalId",
    ) {{ row.externalId }}
    span.assistive-text(v-else) –

</template>

<script>
import DetailItem from '~components/DetailItem.vue';
import RadioTable from '~components/RadioTable.vue';

import sync from '~mixins/sync';

import {
  getProductHubs,
} from '@/utils';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    DetailItem,
    RadioTable,
  },

  props: {
    productId: String,
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    localValue: {},
    selectedHubId: '',
    searchValue: '',
    hubs: [],
    loading: false,
    headers: [
      {
        text: 'Hub',
        value: 'hub',
        align: 'left',
      },
      {
        text: 'External ID',
        value: 'externalId',
        align: 'left',
      },
    ],
  }),

  computed: {
    filteredHubs: ({ hubs, searchValue }) => {
      const lowerCaseSearch = searchValue.toLowerCase();

      return hubs.filter(({ id, name }) => name.toLowerCase().includes(lowerCaseSearch)
        || id.toLowerCase().includes(lowerCaseSearch));
    },
  },

  methods: {
    prepareRow(item) {
      return {
        id: item.id,
        name: item.name,
        externalId: item.instance?.id,
      };
    },
  },

  watch: {
    selectedHubId(val) {
      this.localValue = this.hubs.find(({ id }) => id === val);
    },
  },

  async created() {
    try {
      this.loading = true;
      this.hubs = await getProductHubs(this.productId);
    } catch (e) {
      this.hubs = [];
      this.$emit('error', e);
    } finally {
      this.loading = false;
    }
  },
};

</script>

<style lang="stylus">
.hub-tab__detail {
  margin-top: 0;
}
</style>
