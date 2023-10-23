<template lang="pug">
.checkbox-table
  p.checkbox-table__title {{ title }}

  c-search.checkbox-table__search(v-model="localSearch")

  c-data-table.checkbox-table__table(
    :value="computedItems",
    :headers="processedHeaders",
    :prepare-row="prepareRow",
    :updating="loading",
    hide-all-pagination-sections,
    fix-layout,
  )
    template(#items="{ item, row, visibleHeaders }")
      tr.table__row.hoverable
        template(v-if="item.type === 'all'")
          td(
            v-for="(header, index) in visibleHeaders"
            :key="header.value",
          )
            span(v-if="index === 0") All
            c-checkbox(
              v-if="header.value === 'radio'"
              v-model="localIsAllSelected",
            )

        template(v-else)
          td(
            v-for="header in visibleHeaders"
            :key="header.value",
          )
            c-checkbox(
              v-if="header.value === 'radio'"
              :value="isChecked(item)",
              @input="toggleSelected(row)",
            )
            slot(
              v-else,
              :name="header.value",
              :row="row",
            )

</template>

<script>
import {
  equals,
  includes,
} from 'ramda';

import cDataTable from '~components/cDataTable.vue';
import cCheckbox from '~components/cCheckbox.vue';
import cSearch from '~components/cSearch.vue';

import sync from '~mixins/sync';


export default {
  mixins: [sync([
    { prop: 'value', local: 'localValue' },
    { prop: 'search', local: 'localSearch' },
    { prop: 'isAllSelected', local: 'localIsAllSelected' },
  ])],

  components: {
    cDataTable,
    cCheckbox,
    cSearch,
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },

    valueProp: {
      type: String,
      default: 'id',
    },

    loading: Boolean,
    title: String,
    prepareRow: Function,
    headers: {
      type: Array,
      required: true,
    },

    includeAll: Boolean,
    isAllSelected: Boolean,
    items: {
      type: Array,
      default: () => [],
    },

    search: String,
    returnObject: Boolean,
  },

  data: () => ({
    localValue: [],
    localSearch: '',
    localIsAllSelected: false,
  }),

  computed: {
    processedHeaders: ({ headers }) => [
      ...headers,
      {
        notResizable: true,
        text: '',
        value: 'radio',
        width: 24,
      },
    ],

    computedItems: ({ items, includeAll }) => {
      if (includeAll) return [{ type: 'all' }, ...items];

      return items;
    },
  },

  methods: {
    isChecked(item) {
      return this.returnObject
        ? includes(item, this.localValue)
        : includes(item[this.valueProp], this.localValue);
    },

    toggleSelected(value) {
      const currentValue = (this.returnObject) ? value : value[this.valueProp];

      const index = this.localValue.findIndex(equals(currentValue));

      if (index > -1) {
        this.localValue.splice(index, 1);
      } else {
        this.localValue.push(currentValue);
      }
    },
  },

  watch: {
    isAllSelected(v) {
      if (v) {
        this.localValue = (this.returnObject)
          ? this.items : this.items.map(item => item[this.valueProp]);
      } else {
        this.localValue = [];
      }
    },
  },
};

</script>

<style lang="stylus" scoped>
.checkbox-table {
  &__title {
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    margin-bottom: 24px;
  }

  &__search {
    margin-bottom: 12px;
  }
}
</style>
