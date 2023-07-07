<template lang="pug">
.app(:style="styleCustomizations")
  .title XVS Extension
  ui-tabs
    ui-tab(default tab="Deployments") Deployments
    ui-tab(tab="Requests") Requests
    ui-pad(pad="Deployments")
      .summary-tab uno
      c-data-table(
        v-model="localValue",
        :headers="headers",
        hide-go-to-page-section,
      )
        template(#items="{ row, visibleHeaders}")
          tr.table__row.hoverable(:id="row.id")
            template(v-for="header in visibleHeaders")
              //- ID column
              td.nowrap-cell(
                v-if="header.value === 'customer'",
                :key="header.value",
              )
                span {{ row.id }}
    ui-pad(pad="Requests")
      .subscriptions-tab dos
      c-data-table(
        v-model="localValue",
        :headers="headers",
        hide-go-to-page-section,
      )
        template(#items="{ row, visibleHeaders}")
          tr.table__row.hoverable(:id="row.id")
            template(v-for="header in visibleHeaders")
              //- ID column
              td.nowrap-cell(
                v-if="header.value === 'customer'",
                :key="header.value",
              )
                span {{ row.id }}
</template>

<script>
import cDataTable from '~components/cDataTable.vue';

export default {
  components: {
    cDataTable
  },
   data() {
    return {
      localValue: [{ id: 45 }],
      headers: [ {
        text: 'Customer',
        value: 'customer',
        align: 'left',
      }],
    };
  },

  methods: {
  },
};
</script>
