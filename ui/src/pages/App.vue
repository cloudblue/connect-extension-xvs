<template lang="pug">
.app
  portal-target(name="destination", multiple)
  .title XVS Extension
  ui-tabs
    ui-tab(default tab="Deployments") Deployments
    ui-tab(tab="Requests") Requests
    ui-pad(pad="Deployments")
      .summary-tab uno
      c-data-table(
        v-if="localValue",
        v-model="localValue",
        :headers="headers",
        hide-go-to-page-section,
        :prepare-row="prepareRow",
      )
        template(#items="{ row, visibleHeaders}")
          tr.table__row.hoverable(:id="row.id")
            template(v-for="header in visibleHeaders")
              //- ID column
              td.nowrap-cell(
                v-if="header.value === 'deployment'",
                :key="header.value",
              )
                span {{ row.id }}

              //- ID column
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

              td.nowrap-cell(
                v-if="header.value === 'vendor'",
                :key="header.value",
              )
                detail-item(:assistive-text="row.vendorId")
                  template(#body-text="")
                    .truncate-text {{ row.vendorName }}

                  template(#image="")
                    pic.object-image(
                      :src="row.vendorIcon",
                      :width="32",
                      :height="32",
                      size="contain",
                      :class="{'picture-placeholder': !row.vendorIcon }",
                    )

              td.nowrap-cell(
                v-if="header.value === 'hub'",
                :key="header.value",
              )
                detail-item(:assistive-text="row.hubId")
                  template(#body-text="")
                    .truncate-text {{ row.hubName }}

              td.nowrap-cell(
                v-if="header.value === 'lastSync'",
                :key="header.value",
              )
                date-item(
                  :date="row.lastSync",
                  one-line,
                )

              td.nowrap-cell(
                v-if="header.value === 'status'",
                :key="header.value",
              )
                c-status(:status="row.status")
                  span {{ row.status }}

    ui-pad(pad="Requests")
      .subscriptions-tab dos
</template>

<script>
import cDataTable from '~components/cDataTable.vue';
import DetailItem from '~components/DetailItem.vue';
import DateItem from '~components/DateItem.vue';
import Pic from '~components/Pic.vue';
import cStatus from '~components/cStatus.vue';

import {
  template,
} from '~utils';

import {
  getDeployments,
} from '../utils';

const prepareRow = template({
  id: ['id'],
  productId: ['product', 'id'],
  productIcon: ['product', 'icon'],
  productName: ['product', 'name'],
  vendorId: ['owner', 'id'],
  vendorIcon: ['owner', 'icon'],
  vendorName: ['owner', 'name'],
  hubId: ['hub', 'id'],
  hubName: ['hub', 'name'],
  lastSync: ['last_sync_at'],
  status: ['status'],
});


export default {
  components: {
    cDataTable,
    DetailItem,
    Pic,
    cStatus,
    DateItem,
  },
   data() {
    return {
      localValue: null,
      headers: [{
        text: 'deployment',
        value: 'deployment',
        align: 'left',
      },
      {
        text: 'product',
        value: 'product',
        align: 'left',
      },
      {
        text: 'vendor',
        value: 'vendor',
        align: 'left',
      },
      {
        text: 'hub',
        value: 'hub',
        align: 'left',
      },
      {
        text: 'last sync',
        value: 'lastSync',
        align: 'left',
      },
      {
        text: 'status',
        value: 'status',
        align: 'left',
      },
    ],
    };
  },

  methods: {
    prepareRow,
  },

  async created() {
    const allDeployments = await getDeployments();
    console.log(allDeployments);
    this.localValue = allDeployments;
  },
};
</script>
