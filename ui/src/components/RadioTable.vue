<template lang="pug">
.radio-table
  p.radio-table__title {{ title }}

  c-search.radio-table__search(
    v-if="!hideSearch",
    v-model="localSearch",
  )

  c-data-table.radio-table__table(
    :value="items",
    :headers="processedHeaders",
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
          template(v-if="header.value === 'radio'")
            c-radio(
              :value="row[valueProp] === localValue",
              @input="localValue = row[valueProp]",
            )
          slot(
            v-else,
            :name="header.value",
            :row="row",
          )

</template>

<script>
import cDataTable from '~components/cDataTable.vue';
import cRadio from '~components/cRadio.vue';
import cSearch from '~components/cSearch.vue';

import sync from '~mixins/sync';


export default {
  mixins: [sync([
    { prop: 'value', local: 'localValue' },
    { prop: 'search', local: 'localSearch' },
  ])],

  components: {
    cDataTable,
    cRadio,
    cSearch,
  },

  props: {
    value: String,
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

    items: {
      type: Array,
      default: () => [],
    },

    search: String,
    hideSearch: Boolean,
  },

  data: () => ({
    localValue: false,
    localSearch: '',
  }),

  computed: {
    processedHeaders: ({ headers }) => [
      ...headers,
      {
        notResizable: true,
        text: '',
        value: 'radio',
        width: 80,
      },
    ],
  },
};

</script>

<style lang="stylus" scoped>
.radio-table {
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
