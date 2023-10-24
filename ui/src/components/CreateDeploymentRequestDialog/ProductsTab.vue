<template lang="pug">
radio-table.products-tab(
  v-model="selectedProductId",
  :headers="headers",
  :items="filteredProducts",
  :loading="loading",
  :prepare-row="prepareRow",
  :search.sync="searchValue",
  title="Select Product",
)
  template(#product="{ row }")
    detail-item.products-tab__detail
      template(#image="")
        pic.object-image(
          :src="row?.icon",
          :width="32",
          :height="32",
          size="contain",
        )
      template(#body-text="")
        .truncate-text
          span {{ row?.name }}
      template(#assistive-text="")
        span {{ row?.id }}

  template(#vendor="{ row }")
    detail-item.products-tab__detail
      template(#image="")
        pic.object-image(
          :src="row.vendorIcon",
          :width="32",
          :height="32",
          size="contain",
        )
      template(#body-text="")
        .truncate-text
          span {{ row.vendorName }}
      template(#assistive-text="")
        span {{ row.vendorId }}

</template>

<script>
import DetailItem from '~components/DetailItem.vue';
import Pic from '~components/Pic.vue';
import RadioTable from '~components/RadioTable.vue';

import sync from '~mixins/sync';

import {
  getProducts,
} from '@/utils';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    DetailItem,
    Pic,
    RadioTable,
  },

  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    localValue: {},
    selectedProductId: '',
    searchValue: '',
    products: [],
    loading: false,
    headers: [
      {
        text: 'Product',
        value: 'product',
        align: 'left',
      },
      {
        text: 'Vendor',
        value: 'vendor',
        align: 'left',
      },
    ],
  }),

  computed: {
    filteredProducts: ({ products, searchValue }) => {
      const lowerCaseSearch = searchValue.toLowerCase();

      return products.filter(({ id, name }) => name.toLowerCase().includes(lowerCaseSearch)
        || id.toLowerCase().includes(lowerCaseSearch));
    },
  },

  methods: {
    prepareRow(item) {
      return {
        id: item.id,
        name: item.name,
        icon: item.icon,
        /*
          TODO: Pending fix in https://github.com/cloudblue/connect-extension-xvs/pull/83
           When that PR is merged, remove ORs below
        */
        vendorId: item.owner?.id || 'foo',
        vendorName: item.owner?.name || 'bar',
        vendorIcon: item.owner?.icon || '',
      };
    },
  },

  watch: {
    selectedProductId(val) {
      this.localValue = this.products.find(({ id }) => id === val);
    },
  },

  async created() {
    try {
      this.loading = true;
      this.products = await getProducts();
      if (this.localValue?.id) this.selectedProductId = this.localValue.id;
    } catch (e) {
      this.products = [];
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
