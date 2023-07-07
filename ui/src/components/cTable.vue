<template lang="pug">
.c-table(
  ref="c-table",
  :style="style",
  :locator="locator",
  :class="{'c-table-loading': loading}",
  v-overflow-hint="'.c-table__overflow'",
)
  transition(:name="placeholderTransitionName")
    slot(
      v-if="showPlaceholder",
      name="placeholder",
    )

  template(v-if="isTableVisible")
    slot(name="panel")
      .c-table__panel(v-if="manageable")
        .c-table__panel-actions

        .c-table_buttons
          slot(name="buttons")
            c-table-pagination.c-table__pagination.c-table__pagination_top(
              v-if="showPagination",
              :pagination.sync="localPagination",
              :options="paginationOptions",
              :total="totalItems",
              :count="localValue.length",
              :all-option="allowDisplayAll",
              only-right-part,
              position="top",
            )

    .table-relative
      .c-table__overflow
        table(
          ref="table",
          :locator="locator",
          :class=`{
            'c-table_layout_fixed': fixLayout,
            'c-table_loading': loading,
            'c-table_dense': dense,
          }`,
        )
          thead(v-if="headers.length")
            tr
              c-table-header(
                v-for="header in visibleHeaders",
                :key="header.value",
                :locator="`${header.value}-header`",
                :align="header.align",
                :value="header.value",
                :text="header.text",
                :manageable="manageable",
                :width="localHeadersWidths[header.value]",
                v-bind="header.props",
                :class="{ 'c-table-header_disabled-resize': !isInteractiveState }",
                :min-width="header.minWidth",
                :not-resizable="header.notResizable",
                :loading="loading",
                :icon="header.icon",
              )
                template(#append-header-item="")
                  slot(name="append-header-item", v-bind="header")
          tbody
            template(v-if="localValue.length")
              template(v-for="(item, index) in localValue")
                template(v-if="!hideLoader && (loading || !item)")

                slot(
                  v-else,
                  name="items",
                  :visible-headers="visibleHeaders",
                  :item="item",
                  :row="prepareRow(item)",
                  :after-item="localValue[index + 1]",
                  :before-item="localValue[index - 1]",
                  :index="index",
                )

            template(v-else-if="!hideLoader && !isInteractiveState")
              tr.c-table__loader(
                v-for="row in 10",
                :key="row",
              )
                td(
                  v-for="(header, headerIndex) in headers",
                  :key="header.value",
                )
                  span(v-if="skeletonsWidths[row]")
                    div.c-table__loader_skeleton(
                      :style="`width: ${skeletonsWidths[row][headerIndex]}%;`",
                    )
            tr(v-else)
              td.text-xs-center(:colspan="visibleHeaders.length") No data available

          tfoot
            slot(name="footer")

    .c-table__panel_bottom(v-if="showPagination")
      c-table-pagination.c-table__pagination.c-table__pagination_bottom(
        v-if="showPagination",
        :pagination.sync="localPagination",
        :options="paginationOptions",
        :total="totalItems",
        :count="localValue.length",
        :all-option="allowDisplayAll",
        :hide-go-to-page-section="hideGoToPageSection",
        :hide-rows-per-page-section="hideRowsPerPageSection",
        :hide-all-sections="hideAllPaginationSections",
        :class="{ disabled: !isInteractiveState }",
      )
</template>

<script>
import {
  googleRefreshBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  anyPass,
  clone,
  complement,
  filter,
  identity,
  ifElse,
  includes,
  is,
  isEmpty,
  not,
  pipe,
  pluck,
  prop,
  where,
  whereEq,
} from 'ramda';


import overflowHint from '~directives';

import {
  sync,
} from '~mixins';

import cTableHeader from '~components/cTable/cTableHeader.vue';

import {
  isHeaderVisible,
  isHideableHeader,
} from '~components/cTable/cTableHeadersSelector.vue';

import cTablePagination, {
  defaultPaginationOptions,
} from '~components/cTable/cTablePagination.vue';


import {
  getSkeletonsArray,
} from '~helpers';

import {
  arr,
  notEquals,
  pathAlt,
  pathTo,
  propTo,
  template,
} from '~utils';


export default {
  $module: 'c-table',

  mixins: [
    sync([
      { prop: 'value', local: 'localValue' },
      { prop: 'pagination', local: 'localPagination' },
      {
        prop: 'headers',
        local: 'localHeaders',
        propImmediate: false,
      },
      {
        prop: 'headersWidths',
        local: 'localHeadersWidths',
        propImmediate: false,
      },
    ]),
  ],

  directives: {
    overflowHint,
  },

  components: {
    cTableHeader,
    cTablePagination,
  },

  props: {
    value: {
      type: Array,
      required: true,
    },

    padding: {
      type: String,
      default: '8px',
    },

    headers: {
      type: Array,
      default: arr,
    },

    itemKey: String,
    pagination: {
      type: Object,
      default: null,
    },

    paginationOptions: {
      type: Array,
      default: defaultPaginationOptions,
    },

    allowDisplayAll: Boolean,
    hideGoToPageSection: Boolean,
    hideRowsPerPageSection: Boolean,
    hideAllPaginationSections: Boolean,
    totalItems: {
      type: Number,
      default: 0,
    },

    hideHeaders: {
      type: Boolean,
      default: false,
    },

    hideActions: {
      type: Boolean,
      default: false,
    },

    fixLayout: Boolean,

    isFirstColumnFixed: {
      type: Boolean,
      default: null,
    },

    locator: {
      type: String,
      default: 'data-table',
    },

    noDataText: {
      type: String,
    },

    refreshable: {
      type: Boolean,
      default: true,
    },

    showPlaceholder: {
      type: Boolean,
      default: false,
    },

    manageable: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    hideLoader: {
      type: Boolean,
      default: false,
    },

    prepareRow: {
      type: Function,
      default: identity,
    },

    resizable: {
      type: Boolean,
      default: true,
    },

    headersWidths: Object,
    hideEmptyTable: {
      type: Boolean,
      default: false,
    },

    dense: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    const localHeadersWidths = {};
    const localHeaders = clone(this.headers);
    localHeaders.forEach((header) => {
      localHeadersWidths[header.value] = null;
      // eslint-disable-next-line no-prototype-builtins
      if (header.hasOwnProperty('width')) localHeadersWidths[header.value] = header.width;
    });

    return {
      localValue: [],
      localPagination: null,
      localHeaders,
      visibleHeadersValues: pipe(
        filter(isHideableHeader),
        filter(({ defaultVisibility = true }) => defaultVisibility),
        pluck('value'),
      )(this.headers),

      table: null,
      localHeadersWidths,
      isTableResized: false,
      addedHeaders: [],
      skeletonsWidths: getSkeletonsArray(localHeaders.length),
      icons: {
        googleRefreshBaseline,
      },
    };
  },

  computed: {
    /** Preprocess row items. By default using identity function. */
    rows: vm => vm.localValue.map(vm.prepareRow),

    isAnyItemPresent: pathTo(['localValue'], complement(isEmpty)),

    showPagination: where({
      pagination: Boolean,
      isAnyItemPresent: Boolean,
      hideActions: not,
    }),

    visibleHeaders: ({ localHeaders, visibleHeadersValues }) => pipe(
      filter(isHeaderVisible(visibleHeadersValues)),
    )(localHeaders),

    fixFirstColumnWidth: ifElse(
      propTo('isFirstColumnFixed', is(Boolean)),
      prop('isFirstColumnFixed'),
      pipe(
        propTo('localHeaders', pluck('value')),
        anyPass([includes('expander'), includes('dragHandle')]),
      ),
    ),

    style: template({
      '--padding': ['padding'],
    }),

    isInteractiveState: whereEq({
      loading: false,
      showPlaceholder: false,
    }),

    isTableVisible: vm => not(vm.showPlaceholder && vm.hideEmptyTable),

    placeholderTransitionName: pathAlt(['hideEmptyTable'], 'snap', 'fade'),
  },

  watch: {
    showPlaceholder: {
      immediate: true,
      // async
      handler(newVal, prevVal) {
        if (prevVal && !newVal) {
          // this.initSortable();
        }
      },
    },

    async visibleHeadersValues(cur, prev) {
      if (this.resizable) {
        if (cur.length > prev.length) {
          await this.$nextTick();
          const [firstRow, ...tableRows] = this.table.getElementsByTagName('tr');

          firstRow.appendChild(firstRow.querySelector('.empty_header'));

          tableRows.forEach((tr) => {
            tr.appendChild(tr.querySelector('.emptyTd'));
          });
        }
      }
    },

    localHeaders(cur, prev) {
      if (notEquals(cur.length, prev.length)) {
        this.skeletonsWidths = getSkeletonsArray(cur.length);
      }

      let addedHeaderValue;
      cur.forEach((header) => {
        const width = Number(header.width) ? header.width : null;
        // eslint-disable-next-line no-prototype-builtins
        if (!this.localHeadersWidths.hasOwnProperty(header.value)) {
          addedHeaderValue = header.value;
          this.$set(this.localHeadersWidths, addedHeaderValue, width);
          this.addedHeaders.push(addedHeaderValue);
        }
      });

      this.visibleHeadersValues = this.visibleHeadersValues.concat(this.addedHeaders);
    },
  },
};
</script>

<style lang="stylus">
@import '~styles/variables';

.fade-enter-active {
  transition: opacity .4s ease-out;
}
.fade-leave-active {
  transition: opacity .4s ease-in;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.c-table {
  position: relative;

  &_layout_fixed {
    table-layout: fixed;
  }

  &_loading tr:hover {
    background: none !important;
  }

  &_dense tbody tr td {
    height: 32px;
  }

  &__overflow{
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    max-width: 100%;
  }

  &__loader {
    &_skeleton {
      border-radius: 8px;
      background: #d9d9d9;
      height: 12px;
      max-width: 100%;
    }

    animation: aniVertical 3s ease;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    opacity: 1;

    &:nth-child(2) {
      animation-delay: .5s;
    }

    &:nth-child(3) {
      animation-delay: 1s;
    }
    &:nth-child(4) {
      animation-delay: 1.5s;
    }

    &:nth-child(5) {
      animation-delay: 2s;
    }

    &:nth-child(6) {
      animation-delay: 2.5s;
    }

    &:nth-child(7) {
      animation-delay: 3s;
    }

    &:nth-child(8) {
      animation-delay: 3.5s;
    }

    &:nth-child(9) {
      animation-delay: 4s;
    }

    &:nth-child(10) {
      animation-delay: 4.5s;
    }
  }

  &__pagination.disabled {
    pointer-events: none;
    opacity: 0.3;
    filter: grayscale(100%);
  }

  th,td {
    box-sizing: content-box;
  }

  td {
    height: 48px;
    font-size: 14px;
    padding-right: 12px;
    padding-left: 12px;

    .date-item {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .detail-item {
      &__assistive-text, &__text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    a, .status-mark {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .assistive-text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  th {
    &:first-child {
      border-left: none;
      padding-left: var(--padding);
    }

    &:last-child {
      border-right: none;
      padding-right: var(--padding);
    }
  }

  thead {
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f5f5f5;

    th {
      overflow: hidden;
      height: 32px;
      min-height: 32px;
      padding-right: $module * 3;
      padding-left: $module * 3;
      font-size: 12px;
      line-height: 20px;
      letter-spacing: 0.5px;
      color: $assistive-text-color;
      text-transform: uppercase;
    }
  }


  thead tr th:first-child,
  tbody tr td:first-child {
    padding-left: var(--padding) !important;
  }

  thead tr th:last-child,
  tbody tr td:last-child{
    padding-right: var(--padding) !important;
  }

  tbody > tr {
    &:not(:last-child) {
      border-bottom: 1px solid $light-grey;
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  &__panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding-left: var(--padding);
    padding-right: var(--padding);

    &.disabled {
      pointer-events: none;
      opacity: 0.3;
      filter: grayscale(100%);
    }

    &_bottom {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 48px;
      padding-left: var(--padding);
      padding-right: var(--padding);
      border-top: 1px solid #e0e0e0;
    }
  }
  &__panel-actions{
    margin-left: -8px;
    display: flex;
    align-items: center;
  }
  &__panel-button {
    margin: 0 12px 0 0;

    .c-table_buttons &:last-child {
      margin: 0;
    }

    &_active.c-button {
      color: $accent;
      caret-color: $accent;
      &:before {
        background-color: currentColor;
      }
    }
  }

  &_dragging {
    user-select: none;
  }
}
.table-relative {
  position: relative;
}
.semi-transparent-overlay {
  tbody {
    opacity: 0.5;
    pointer-events: none;
  }
}

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

.splitpane {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 8px !important;
  padding-top: 4px;
  padding-bottom: 4px;
  cursor: col-resize;

  &:after {
    content: "";
    display: block;
    width: 1px;
    height: 100%;
    margin-left: auto;
    margin-right: auto;

    border-radius: 2px;
    background-color: #e0e0e0;
  }

  &_hovered:after,
  &:hover:after {
    width: 4px;
    background-color: $accent;
  }
}

@keyframes aniVertical {
  0% {
    opacity: 1;
  }

  50% {
    opacity: .6;
  }

  100% {
    opacity: 1;
  }
}
</style>
