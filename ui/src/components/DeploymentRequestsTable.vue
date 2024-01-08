<template lang="pug">
c-data-table(
  v-model="localValue",
  :headers="headers",
  hide-go-to-page-section,
  :prepare-row="prepareRow",
  :updating="localUpdating",
  :update="load",
)
  template(#items="{ row, visibleHeaders}")
    tr.table__row.hoverable(:id="row.id")
      template(v-for="header in visibleHeaders")
        //- ID column
        td.nowrap-cell(
          v-if="header.value === 'request'",
          :key="header.value",
        )
          router-link(
            :to="{ name: 'RequestDetails', params: { id: row.requestId } }"
          ) {{ row.requestId }}

        //- Product column
        td.nowrap-cell(
          v-if="header.value === 'product'",
          :key="header.value",
        )
          detail-item(:assistive-text="row.productId")
            template(#body-text="")
              .truncate-text {{ row.productName }}

            template(#image="")
              pic.object-image(
                :src="row.productIcon",
                :width="32",
                :height="32",
                size="contain",
                :class="{'picture-placeholder': !row.productIcon }",
              )

        //- Hub column
        td.nowrap-cell(
          v-if="header.value === 'hub'",
          :key="header.value",
        )
          detail-item(:assistive-text="row.hubId")
            template(#body-text="")
              .truncate-text {{ row.hubName }}

        //- PPR column
        td.nowrap-cell(
          v-if="header.value === 'ppr'",
          :key="header.value",
        )
          span Version {{ row.pprVersion }}

        //- L2 resellers column
        td.nowrap-cell(
          v-if="header.value === 'l2Resellers'",
          :key="header.value",
        )
          c-status(:status="row.l2Reseller")
            span {{ row.l2Reseller }}

        //- Created column
        td.nowrap-cell(
          v-if="header.value === 'created'",
          :key="header.value",
        )
          span {{ row.created | utcToLocal }}

        //- Status column
        td.nowrap-cell(
          v-if="header.value === 'status'",
          :key="header.value",
        )
          c-status(:status="row.status")
            span {{ row.status }}

</template>

<script>
import cDataTable from '~components/cDataTable.vue';
import DetailItem from '~components/DetailItem.vue';
import Pic from '~components/Pic.vue';
import cStatus from '~components/cStatus.vue';

import {
  sync,
} from '~mixins';

import {
  pathAlt,
  template,
} from '~utils';

import {
  getDeploymentsRequests,
} from '@/utils';


const prepareRow = template({
  requestId: ['id'],
  productId: ['deployment', 'product', 'id'],
  productIcon: ['deployment', 'product', 'icon'],
  productName: ['deployment', 'product', 'name'],
  hubId: ['deployment', 'hub', 'id'],
  hubName: ['deployment', 'hub', 'name'],
  pprVersion: ['ppr', 'version'],
  l2Reseller: pathAlt(['delegate_l2'], 'delegated', 'not_delegated'),
  created: ['events', 'created', 'at'],
  status: ['status'],
});


export default {
  mixins: [sync([{ prop: 'updating', local: 'localUpdating' }])],

  components: {
    cDataTable,
    DetailItem,
    Pic,
    cStatus,
  },

  props: {
    updating: Boolean,
  },

  data() {
    return {
      localUpdating: false,
      localValue: [],
      headers: [
        {
          text: 'request',
          value: 'request',
          align: 'left',
        },
        {
          text: 'product',
          value: 'product',
          align: 'left',
        },
        {
          text: 'hub',
          value: 'hub',
          align: 'left',
        },
        {
          text: 'ppr',
          value: 'ppr',
          align: 'left',
        },
        {
          text: 'L2 resellers',
          value: 'l2Resellers',
          align: 'left',
        },
        {
          text: 'created',
          value: 'created',
          align: 'left',
        },
        {
          text: 'status',
          value: 'status',
          align: 'left',
        },
      ],

      localParams: { limit: 10, offset: 0 },
    };
  },

  methods: {
    prepareRow,

    load(params) {
      this.localParams = params;

      return getDeploymentsRequests(params);
    },
  },

  watch: {
    async localUpdating(v) {
      if (v) {
        await getDeploymentsRequests(this.localParams);
        this.localUpdating = false;
      }
    },
  },

  created() {
    this.localUpdating = true;
  },
};
</script>
