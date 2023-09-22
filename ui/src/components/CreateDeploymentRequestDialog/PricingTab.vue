<template lang="pug">
.pricing-tab
  p.pricing-tab__title Link Pricing Stream Batches to Marketplaces

  c-data-table.pricing-tab__table(
    :value="marketplacesWithPriceLists",
    :headers="headers",
    :prepare-row="prepareRow",
    :updating="loading",
    hide-all-pagination-sections,
    fix-layout,
  )
    template(#items="{ row, visibleHeaders }")
      tr.table__row.hoverable
        td(
          v-for="header in visibleHeaders"
          :key="header.value",
        )
          template(v-if="header.value === 'marketplace'")
            detail-item.pricing-tab__detail
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

          template(v-else-if="header.value === 'pricing'")

            c-menu(
              v-if="row.batches.length > 0",
              locator="batches-list",
              outline,
              small,
              :min-width="266",
            )
              template(#trigger="")
                c-button.c-menu-list__open(
                  locator="c-menu-list_open-button",
                  small,
                  :upperCase="false",
                  :icon-right="icons.googleArrowDropDownBaseline"
                  mode="outlined",
                )
                  .pricing-tab__pricelist.truncate-text {{ selectedPricelist(row) }}

              template(#default="")
                c-button(
                  small,
                  :upper-case="false",
                  fluid,
                  @click="resetBatch(row)",
                )
                  .assistive-color —

                div(
                  v-for="batch in row.batches",
                  :key="batch.id",
                )
                  c-button(
                    small,
                    :upper-case="false",
                    @click="setBatch(batch, row)",
                  )
                    .truncate-text {{ batch.name }}

            .assistive-color(v-else) —
      </template>

<script>
import {
  googleArrowDropDownBaseline,
} from '@cloudblueconnect/material-svg/baseline';


import {
  filter,
  findIndex,
  map,
  pathEq,
  pick,
  propEq,
} from 'ramda';

import cButton from '~components/cButton.vue';
import cDataTable from '~components/cDataTable.vue';
import cMenu from '~components/cMenu.vue';
import DetailItem from '~components/DetailItem.vue';
import Pic from '~components/Pic.vue';

import sync from '~mixins/sync';

import {
  getDeploymentBatches,
} from '@/utils';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    cButton,
    cDataTable,
    cMenu,
    DetailItem,
    Pic,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },

    marketplaces: {
      type: Array,
      required: true,
    },

    deploymentId: String,
  },

  data: () => ({
    localValue: [],
    marketplacesWithPriceLists: [],
    loading: false,
    icons: {
      googleArrowDropDownBaseline,
    },

    headers: [
      {
        text: 'Marketplace',
        value: 'marketplace',
        align: 'left',
      },
      {
        text: 'Pricing stream batch',
        value: 'pricing',
        align: 'left',
        width: 266,
      },
    ],
  }),

  methods: {
    prepareRow(item) {
      return {
        id: item.id,
        name: item.name,
        icon: item.icon,
        batches: item.batches,
        pricelist: item.pricelist,
      };
    },

    findMarketplaceInList(id) {
      return findIndex(propEq(id, 'id'), this.localValue);
    },

    setBatch(batch, marketplace) {
      const index = this.findMarketplaceInList(marketplace.id);
      this.localValue[index].pricelist = pick(['id', 'name'], batch);
    },

    resetBatch(marketplace) {
      const index = this.findMarketplaceInList(marketplace.id);
      this.localValue[index].pricelist = undefined;
    },

    selectedPricelist(marketplace) {
      const index = this.findMarketplaceInList(marketplace.id);

      return this.localValue[index].pricelist
        ? this.localValue[index].pricelist.name : '—';
    },
  },

  async created() {
    this.localValue = this.marketplaces;
    try {
      this.loading = true;
      const batchesList = await getDeploymentBatches(this.deploymentId);
      const getBatchesForMarketplace = item => ({
        ...item,
        batches: filter(pathEq(item.id, ['stream', 'context', 'marketplace', 'id']))(batchesList),
      });
      this.marketplacesWithPriceLists = map(getBatchesForMarketplace, this.marketplaces);
    } catch (e) {
      this.$emit('error', e);
    } finally {
      this.loading = false;
    }
  },
};

</script>

<style lang="stylus">
.pricing-tab {
  &__title {
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 24px;
  }

  &__detail {
    margin-top: 0;
  }

  &__pricelist {
    min-width: 226px;
    max-width: 226px;
  }
}
</style>
