<template lang="pug">
.request-marketplaces-tab
  c-data-table(
    v-model="marketplacesWithBatchesInfo",
    :headers="headers",
    :prepare-row="prepareRow",
    :updating="loading",
    :update="load",
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
            .assistive-color(v-else) —

          //- Pricing Batch column
          td.nowrap-cell(
            v-if="header.value === 'pricelist'",
            :key="header.value",
          )
            detail-item(
              v-if="row.pricelist",
              :assistive-text="row.pricelist.id",
            )
              template(#body-text="")
                .truncate-text {{ row.pricelist.name }}

            .assistive-color(v-else) —


</template>

<script>
import {
  path,
} from 'ramda';


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
    request: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    loading: true,
    marketplaces: [],
    marketplacesWithBatchesInfo: [],

    headers: [
      { text: 'Marketplace', value: 'marketplace' },
      { text: 'External ID', value: 'externalId' },
      { text: 'Pricing Batch', value: 'pricelist' },
    ],
  }),

  computed: {
    requestId: path(['request', 'id']),
    deploymentId: path(['request', 'deployment', 'id']),
  },

  methods: {
    prepareRow(item) {
      return {
        externalId: item.external_id,
        marketplace: {
          id: item.id,
          name: item.name,
          icon: item.icon,
        },

        pricelist: item.pricelist,
      };
    },

    load(params) {
      return getDeploymentRequestMarketplaces(this.requestId, this.deploymentId, params);
    },
  },
};

</script>
