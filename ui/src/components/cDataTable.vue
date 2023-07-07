<template lang="pug">
.c-data-table(:class="{'c-data-table-loading': localUpdating}")
  c-table(
    ref="c-table"
    v-bind="$attrs"
    :loading="localUpdating"
    :show-placeholder="isPlaceholderShown"
    :headers.sync="localHeaders"
    :value="items"
    :total-items="localTotal"
    :pagination.sync="pagination"
    :hide-go-to-page-section="hideGoToPageSection",
    :hide-rows-per-page-section="hideRowsPerPageSection",
    :hide-all-pagination-sections="hideAllPaginationSections",
    v-on="listeners"
    @refresh="refresh"
    :headers-widths.sync="headersWidths",
    :padding="padding",
    :fix-layout="fixLayout",
    :hide-empty-table="hideEmptyTable",
    :no-data-text="noDataText",
    :fixed-first-column="fixedFirstColumn",
  )
    template(#buttons="props")
      slot(name="buttons" v-bind="props")

    template(#headers="props")
      slot(name="headers" v-bind="props")

    template(#append-header-item="header")
      slot(name="append-header-item", v-bind="header")

    template(#items="props")
      slot(name="items" v-bind="props")

    template(#placeholder="")
      slot(name="placeholder")

    template(#progress="")
      slot(name="progress")
        .progress-spinner
          c-icon.circle-loader(
            :size="34",
            :icon="icons.connectLoaderAnimated",
            color="accent",
            locator="loading-indicator",
          )
</template>

<script>
import {
  connectLoaderAnimated,
} from '@cloudblueconnect/material-svg/animated';

import {
  googleHourglassBottomBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import hashSum from 'hash-sum';

import {
  both,
  clone,
  complement,
  either,
  equals,
  head,
  identity,
  ifElse,
  isEmpty,
  map,
  not,
  pick,
  pipe,
  prop,
  propIs,
  where,
} from 'ramda';


import {
  sync,
} from '~mixins';

import cIcon from '~components/cIcon.vue';
import cTable from '~components/cTable.vue';


import {
  defaultPaginationOptions,
} from '~components/cTable/cTablePagination.vue';


import {
  calcOffset,
  isInvalidOffset,
} from '~tableHelpers';

import {
  pathTo,
  updateIndex,
} from '~utils';


const isNotEqualsTotal = (
  { totalItems: newTotal },
  { totalItems: oldTotal },
) => newTotal !== oldTotal;

const computeTotal = (
  total,
  oldCollection,
  newCollection,
) => total - oldCollection.length + newCollection.length;



const isValidResponse = both(
  propIs(Number, 'total'),
  either(
    propIs(Array, 'collection'),
    propIs(Array, 'requests'),
  ),
);

const invalidResponseError = response => 'Unexpected data returned from \'update\''
    + ' function. Must contain \'total\', \'collection\' or \'requests\' fields.'
    + `But got ${JSON.stringify(response)}`;


export default {
  $module: 'c-data-table',

  mixins: [
    sync([
      { prop: 'updating', local: 'localUpdating' },
      { prop: 'value', local: 'items' },
    ]),
  ],

  components: {
    cTable,
    cIcon,
  },

  inheritAttrs: false,

  props: {
    value: {
      type: Array,
      required: true,
    },

    update: {
      type: Function,
    },

    updating: Boolean,
    headers: {
      type: Array,
      default: () => [],
    },

    prepareItem: {
      type: Function,
      default: identity,
    },

    paginationOptions: {
      type: Array,
      default: defaultPaginationOptions,
    },

    hideGoToPageSection: Boolean,
    hideRowsPerPageSection: Boolean,
    hideAllPaginationSections: Boolean,

    totalItems: {
      type: Number,
      default: 0,
    },

    showLoader: Boolean,
    showPlaceholder: Boolean,
    padding: {
      type: String,
    },

    fixLayout: Boolean,
    hideEmptyTable: {
      type: Boolean,
      default: false,
    },

    noDataText: {
      type: String,
    },

    fixedFirstColumn: {
      type: Boolean,
      default: null,
    },
  },

  data() {
    const headersWidths = {};
    const localHeaders = clone(this.headers);
    localHeaders.forEach((header) => {
      headersWidths[header.value] = null;
      // eslint-disable-next-line no-prototype-builtins
      if (header.hasOwnProperty('width')) headersWidths[header.value] = header.width;
    });

    return {
      items: [],
      localTotal: 0,
      localUpdating: true,
      isInitialLoading: true,
      pagination: {
        page: 1,
        rowsPerPage: head(this.paginationOptions),
      },

      table: null,
      localHeaders,
      headersWidths,
      icons: {
        googleHourglassBottomBaseline,
        connectLoaderAnimated,
      },
    };
  },

  computed: {
    isAnyItemPresent: pathTo(['items'], complement(isEmpty)),

    isInvalidOffset: ({ totalItems, offset }) => isInvalidOffset(totalItems, offset),

    isPlaceholderShown: ifElse(
      prop('update'),
      where({
        isAnyItemPresent: not,
        localUpdating: not,
        isInitialLoading: not,
        $slots: prop('placeholder'),
      }),
      prop('showPlaceholder'),
    ),

    /**
     * Forward specific listeners to child table.
     * Don't introduce methods to just re-emit events.
     */
    listeners: pipe(prop('$listeners'), pick(['selected', 'sorted'])),

    isLoaderShown: ifElse(
      prop('update'),
      where({
        isInitialLoading: identity,
        update: identity,
      }),
      prop('showLoader'),
    ),

    offset: ({ pagination: { page, rowsPerPage } }) => calcOffset(page, rowsPerPage),

    needToUpdateAfterTotalItemsChange: ({
      localUpdating, localTotal, totalItems,
    }) => !localUpdating && (localTotal !== totalItems),

    needToUpdateAfterUpdatingChange: ({ localUpdating, updating }) => !localUpdating && updating,

    params: vm => ({
      limit: vm.pagination.rowsPerPage,
      offset: vm.offset,
    }),

    paramsHash: pathTo(['params'], hashSum),
  },

  methods: {
    refresh(opts = {}) {
      this.$emit('refresh');
      this.updateItems({ ...opts, forceUpdate: true });
    },

    prepareItems(items) {
      return pipe(
        map(this.prepareItem),
        clone,
      )(items);
    },

    checkResponse(response) {
      if (!isValidResponse(response)) {
        throw new Error(invalidResponseError(response));
      }
    },

    processError(e) {
      this.localUpdating = false;
      this.logger.logException(e);
    },

    processRequests({ total, requests }, oldParamsHash) {
      this.localTotal = total;
      let result = [];
      let doneRequestsCount = 0;
      const lastRequestsIndex = requests.length - 1;

      return requests.map((request, i) => request.then(items => {
        if (oldParamsHash !== this.paramsHash) return;
        doneRequestsCount += 1;

        // offset to insert in result
        const offset = i === lastRequestsIndex
          ? total - items.length
          : i * items.length;

        result = updateIndex(offset, items, result);

        // we should show data after first finished request
        if (doneRequestsCount === 1) {
          // add null to show loading instad of last row
          this.items = this.prepareItems(items).concat(null);
          this.localUpdating = false;


          // show data from other requests, when all requests finished
        } else if (doneRequestsCount === requests.length) {
          this.items = this.prepareItems(result);
        }
      }));
    },

    processCollection({ collection, total }) {
      this.items = this.prepareItems(collection);
      this.localTotal = computeTotal(total, collection, this.items);
    },

    async processResponse(response, oldParamsHash) {
      if (response.requests) await Promise.any(this.processRequests(response, oldParamsHash));
      else this.processCollection(response);
    },

    async fetchAndUpdateItems() {
      const oldParamsHash = this.paramsHash;
      let res;

      try {
        res = await this.update(this.params);
        this.checkResponse(res);
        await this.processResponse(res, oldParamsHash);
        if (oldParamsHash !== this.paramsHash) return;
      } catch (e) {
        if (oldParamsHash !== this.paramsHash) return;
        this.processError(e);

        return;
      }

      this.$emit('update:totalItems', this.localTotal);

      if (this.isInitialLoading) await this.setIsEmptyCollectionValue();
      this.localUpdating = false;
    },

    async updateItems(opts = {}) {
      if (this.update) {
        await this.fetchAndUpdateItems(opts);
      } else {
        this.items = clone(this.value);
        this.localTotal = this.totalItems;
      }

      if (this.isInitialLoading) {
        this.isInitialLoading = false;
      }
    },

    async checkForEmptyCollection() {
      const result = await this.update({ limit: 0 });

      return result.total === 0;
    },

    async setIsEmptyCollectionValue() {
      if (this.items.length) this.isEmptyCollectionWithoutFilters = false;
      else if (this.update) {
        this.isEmptyCollectionWithoutFilters = await this.checkForEmptyCollection();
      }
    },
  },

  watch: {
    pagination: {
      deep: true,
      handler(newPagination, oldPagination) {
        if (this.isInitialLoading || isNotEqualsTotal(newPagination, oldPagination)) return;
        this.updateItems();
      },
    },

    totalItems() {
      if (!this.needToUpdateAfterTotalItemsChange) return;

      // Correct page number to prevent displaying empty table
      // after deleting last item on last pagination page. Otherwise offset will be incorrect.
      if (this.isInvalidOffset && this.pagination.page > 1) {
        this.pagination.page -= 1;

        // Will trigger `pagination` watcher, so return.
        return;
      }

      this.updateItems();
    },

    updating() {
      if (!this.needToUpdateAfterUpdatingChange) return;
      this.updateItems({ forceUpdate: true });
    },

    isPlaceholderShown: {
      immediate: true,
      handler(newVal) {
        this.$emit('update:showPlaceholder', newVal);
      },
    },

    isLoaderShown: {
      immediate: true,
      async handler(newVal) {
        this.$emit('update:showLoader', newVal);

        if (equals(newVal, false)) {
          await this.$nextTick();

          this.table = this.$refs['c-table'].$el.querySelector('table');
        }
      },
    },

    headers(value) {
      this.localHeaders = clone(value);
    },

    localHeaders(value) {
      value.forEach((header) => {
        const width = Number(header.width) ? header.width : null;
        // eslint-disable-next-line no-prototype-builtins
        if (!this.headersWidths.hasOwnProperty(header.value)) {
          this.$set(this.headersWidths, header.value, width);
        }
      });
    },
  },

  async mounted() {
    if (!this.showManagePanel) {
      await this.$nextTick();
      this.updateItems();
    }
  },
};
</script>

<style lang="stylus" scoped>
.c-data-table {
  .progress-spinner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 2;
    margin: auto;
    width: 32px !important;
    height: 32px;
    padding: 6px;

    background-color: #ffffff;

    border-radius:50%;
    box-shadow: 0 0 15px 1px #888888;
  }

  & :deep(.v-snack__content) {
    padding: 16px;
    button {
      margin-left: 12px;
    }
  }
}
</style>