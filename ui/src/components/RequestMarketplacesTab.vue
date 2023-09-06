<template lang="pug">
.request-marketplaces-tab
  c-data-table(
    v-model="marketplaces",
    :headers="headers",
    :prepare-row="prepareRow",
    :show-loader="loading",
    hide-all-pagination-sections,
  )
    template(#items="{ row, visibleHeaders }")
      tr.table__row.hoverable(:id="row.id")
        template(v-for="header in visibleHeaders")
          //- Marketplace column
          td.nowrap-cell(
            v-if="header.value === 'marketplace'",
            :key="header.value",
          )
            detail-item(:assistive-text="row.marketplace.id")
              template(#body-text="")
                .truncate-text {{ row.marketplace.name }}

              template(#image="")
                pic.object-image(
                  :src="row.marketplace.icon",
                  :width="32",
                  :height="32",
                  size="contain",
                  :class="{'picture-placeholder': !row.marketplace.icon }",
                )

          //- External ID column
          td.nowrap-cell(
            v-if="header.value === 'externalId'",
            :key="header.value",
          )
            span(v-if="row.externalId") {{ row.externalId }}
            span.assistive-text(v-else) –

</template>

<script>
import cDataTable from '~components/cDataTable.vue';
import DetailItem from '~components/DetailItem.vue';
import Pic from '~components/Pic.vue';

import {
  getDeploymentRequestMarketplaces,
} from '@/utils';


export default {
  components: {
    cDataTable,
    DetailItem,
    Pic,
  },

  props: {
    requestId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    loading: true,
    marketplaces: [],

    headers: [
      { text: 'Marketplace', value: 'marketplace' },
      { text: 'External ID', value: 'externalId' },
    ],
  }),

  methods: {
    prepareRow(item) {
      return {
        externalId: item.external_id,
        marketplace: {
          id: item.id,
          name: item.name,
          icon: item.icon,
        },
      };
    },
  },

  async created() {
    this.marketplaces = await getDeploymentRequestMarketplaces(this.requestId);
    this.loading = false;
  },
};

</script>
