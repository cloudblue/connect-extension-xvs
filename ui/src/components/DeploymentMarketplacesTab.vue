<template lang="pug">
.marketplaces-tab
  c-data-table(
    v-model="marketplaces",
    :headers="headers",
    :prepare-row="prepareRow",
    :updating="loading",
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
            detail-item(:assistive-text="row.id")
              template(#body-text="")
                .truncate-text {{ row.name }}

              template(#image="")
                pic.object-image(
                  :class="{ 'picture-placeholder': !row.icon }",
                  :height="32",
                  :src="row.icon",
                  :width="32",
                  size="contain",
                )

          //- External ID column
          td.nowrap-cell(
            v-if="header.value === 'externalId'",
            :key="header.value",
          )
            span(v-if="row.externalId") {{ row.externalId }}
            .assistive-color(v-else) —

          //- Applied PPR column
          td.nowrap-cell(
            v-if="header.value === 'ppr'",
            :key="header.value",
          )
            span(v-if="row.appliedPprVersion") Version {{ row.appliedPprVersion }}
            span.assistive-color(v-else) —

          //- Pricing Batch column
          td.nowrap-cell(
            v-if="header.value === 'priceList'",
            :key="header.value",
          )
            detail-item(
              v-if="row.priceList",
              :assistive-text="row.priceList.id",
            )
              template(#body-text="")
                .truncate-text {{ row.priceList.name }}
            .assistive-color(v-else) —

</template>

<script>
import {
  getDeploymentBatches,
  getDeploymentMarketplaces,
} from '@/utils';

import cDataTable from '~components/cDataTable.vue';
import DetailItem from '~components/DetailItem.vue';
import Pic from '~components/Pic.vue';

import {
  enrich,
} from '~utils';


const enrichByBatchInfo = enrich('id', ['pricelist', 'id'], 'pricelist');

export default {
  components: {
    cDataTable,
    DetailItem,
    Pic,
  },

  props: {
    deploymentId: String,
  },

  data: () => ({
    loading: true,
    marketplaces: [],
    headers: [
      { text: 'Marketplace', value: 'marketplace' },
      { text: 'External ID', value: 'externalId' },
      { text: 'Pricing Batch', value: 'priceList' },
      { text: 'Applied PPR', value: 'ppr' },
    ],
  }),

  methods: {
    prepareRow(item) {
      return {
        id: item.id,
        name: item.name,
        icon: item.icon,
        externalId: item.external_id,
        appliedPprVersion: item.ppr?.version || 0,
        priceList: item.pricelist,
      };
    },
  },

  async created() {
    const marketplaces = await getDeploymentMarketplaces(this.deploymentId);
    const batches = await getDeploymentBatches(this.deploymentId);

    this.marketplaces = enrichByBatchInfo(batches, marketplaces);
    this.loading = false;
  },
};

</script>
