<template lang="pug">
.pagination(:class="{ pagination_hidden: hideAllSections }")
  .pagination__part.pagination__part_left(v-if="showLeftPart")
    .pagination__navigation
      c-button.pagination__button(
        locator="prev-page",
        small,
        mode="outlined",
        :disabled="isFirstPage",
        :upperCase="false",
        label="Previous",
        @click="toPrevPage",
      )

      template(v-for="paginationElement in paginationElementsConfig")
        component(
          v-if="paginationElement.type === paginationElementsTypes.anotherPage"
          :key="paginationElement.locator",
          :is="paginationElement.type",
          :class="paginationElement.classes",
          :locator="paginationElement.locator",
          :label="paginationElement.label",
          :small="paginationElement.small",
          :mode="paginationElement.mode",
          :upperCase="paginationElement.upperCase",
          @click="validateInputAndGoTo(paginationElement.value)",
        )
        component(
          v-else,
          :key="paginationElement.locator",
          :is="paginationElement.type",
          :class="paginationElement.classes",
          :locator="paginationElement.locator",
        ) {{ paginationElement.innerText }}

      c-button.pagination__button(
        locator="next-page",
        small,
        mode="outlined",
        :upperCase="false",
        label="Next",
        :disabled="isLastPage",
        @click="toNextPage",
      )

    .pagination__go-to-page(v-if="showGoToPage")
      span.pagination__text Go to page:
      c-text-field.pagination__goto-page(
        size="small",
        type="number",
        :min="1",
        :max="lastPage",
        :value="localPagination.page",
        :placeholder="String(localPagination.page)",
        pattern="[0-9]",
        @input="validateInputAndGoTo",
      )

  .pagination__part.pagination__part_right
    .pagination__rows-per-page(v-if="showRowsPerPage")
      .pagination__text Rows per page

      c-menu.pagination__rows-selection._mr_16.c-menu-list(
        locator="c-menu-list",
        outline,
        small,
        :class="dynamicClassesMenu",
        :position-y="rowsMenuPositionY",
        :overlay="false",
      )
        template(#trigger="")
          c-button.c-menu-list__open(
            locator="c-menu-list_open-button",
            small,
            :upperCase="false",
            :icon-right="icons.googleArrowDropDownBaseline"
            :label="rowsPerPageBtnLabel",
            :mode="cButtonModesDict.outlined",
          )

        template(#default="")
          ul.c-menu-list__list
            li.c-menu-list__item(
              v-for="option in allOptions",
              :key="option.value",
            )
              c-button.pagination__rows-selection-btn(
                :class="getRowsBtnClass(option.value, localPagination.rowsPerPage)",
                :locator="`row-per-page-${option.text}`",
                small,
                :label="String(option.text)",
                :upper-case="false",
                :disabled="option.value === localPagination.rowsPerPage",
                @click="setRowPerPageTo(option.value)",
              )

      span.pagination__dot._mr_16 •

    .pagination__info
      | Total:&nbsp;
      number-item(:value="total")
      | &nbsp;rows
</template>

<script>
import {
  googleArrowDropDownBaseline,
  googleChevronLeftBaseline,
  googleChevronRightBaseline,
  googleMoreVertBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  always,
  both,
  clamp,
  dec,
  equals,
  head,
  ifElse,
  map,
  not,
  pathEq,
  propEq,
  range,
} from 'ramda';


import {
  sync,
} from '~mixins';


import cButton, {
  cButtonModesDict,
} from '~components/cButton.vue';

import cMenu from '~components/cMenu.vue';
import cTextField from '~components/cTextField.vue';
import NumberItem from '~components/NumberItem.vue';


import {
  alt,
  lessThan,
  moreThan,
  pathNotEq,
  pathTo,
  propTo,
  template,
} from '~utils';


export const defaultPaginationOptions = () => [
  10,
  20,
  50,
  100,
];

export const allOption = { value: Infinity, text: 'All' };

export const paginationPositions = {
  top: 'top',
  bottom: 'bottom',
};

export const paginationElementsTypes = {
  anotherPage: 'cButton',
  severalPagesMore: 'span',
  currentPage: 'div',
};


export default {
  mixins: [
    sync([
      { prop: 'pagination', local: 'localPagination' },
    ]),
  ],

  components: {
    NumberItem,
    cButton,
    cMenu,
    cTextField,
  },

  props: {
    count: Number,
    total: Number,

    options: {
      type: Array,
      default: defaultPaginationOptions,
    },

    pagination: {
      type: Object,
      required: true,
    },

    position: {
      type: String,
      default: paginationPositions.bottom,
    },

    allOption: Boolean,
    onlyRightPart: Boolean,
    hideGoToPageSection: {
      type: Boolean,
      default: false,
    },

    hideRowsPerPageSection: {
      type: Boolean,
      default: false,
    },

    hideAllSections: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localPagination: {
        page: 1,
        rowsPerPage: head(this.options),
      },

      icons: {
        googleChevronLeftBaseline,
        googleChevronRightBaseline,
        googleArrowDropDownBaseline,
        googleMoreVertBaseline,
      },

      paginationElementsTypes,
      cButtonModesDict,
    };
  },

  computed: {
    preparedOptions: pathTo(['options'], map(value => ({ value, text: value }))),
    previousItemsCount: vm => dec(vm.localPagination.page) * vm.localPagination.rowsPerPage,
    isFirstPage: pathEq(['localPagination', 'page'], 1),
    pageStart: vm => vm.previousItemsCount + 1,

    pageStop: vm => alt(
      vm.total,
      vm.previousItemsCount + vm.count,
      vm.isLastPage,
    ),

    isAllOptionSelected: pathEq(['localPagination', 'rowsPerPage'], allOption.value),

    allOptions: vm => alt(
      [...vm.preparedOptions, allOption],
      vm.preparedOptions,
      vm.allOption,
    ),

    showLeftPart: both(propTo('onlyRightPart', not), propTo('hideAllSections', not)),
    showGoToPage: both(propTo('hideGoToPageSection', not), pathNotEq(['lastPage'], 1)),
    showRowsPerPage: both(propTo('hideRowsPerPageSection', not), propTo('hideAllSections', not)),

    lastPage: vm => Math.ceil(vm.total / vm.localPagination.rowsPerPage),
    isLastPage: vm => vm.isAllOptionSelected || equals(
      vm.localPagination.page,
      vm.lastPage,
    ),

    beforePages: ({ makeBefore, makeSpanMore, localPagination }) => alt(
      [
        makeBefore(1),
        makeSpanMore({ locator: 'before-more' }),
        makeBefore(localPagination.page - 2),
        makeBefore(localPagination.page - 1),
      ],
      map(makeBefore, range(1, localPagination.page)),
      moreThan(4 + 1, localPagination.page),
    ),

    currentPage: ({ makeCurrentPage, localPagination }) => makeCurrentPage({ page: localPagination.page, locator: 'current-page' }),

    afterPages: ({ makeAfter, makeSpanMore, localPagination, lastPage }) => alt(
      [
        makeAfter(localPagination.page + 1),
        makeAfter(localPagination.page + 2),
        makeSpanMore({ locator: 'after-more' }),
        makeAfter(lastPage),
      ],
      map(makeAfter, range(localPagination.page + 1, lastPage + 1)),
      lessThan(lastPage - 4, localPagination.page),
    ),

    paginationElementsConfig:
      ({ beforePages, currentPage, afterPages }) => [...beforePages, currentPage, ...afterPages],

    rowsMenuPositionY: ifElse(
      propEq('position', paginationPositions.bottom),
      always('top'),
      always('bottom'),
    ),

    // NOTE: for c-menu-list

    dynamicClassesMenu: template({
      'c-menu-list_at-top': propEq('rowsMenuPositionY', 'top'),
      'c-menu-list_at-bottom': propEq('rowsMenuPositionY', 'bottom'),
    }),

    rowsPerPageBtnLabel: vm => String(
      (vm.localPagination.rowsPerPage === Infinity)
        ? 'All'
        : vm.localPagination.rowsPerPage,
    ),
  },

  methods: {
    toPrevPage() {
      this.localPagination.page -= 1;
    },

    toNextPage() {
      this.localPagination.page += 1;
    },

    validateInputAndGoTo(pageNumber) {
      const validatedNumber = clamp(1, this.lastPage, pageNumber);
      this.goToPage(validatedNumber);
    },

    goToPage(pageNumber) {
      this.localPagination.page = parseInt(pageNumber, 10);
    },

    setRowPerPageTo(value) {
      this.localPagination.rowsPerPage = value;
    },

    getRowsBtnClass: (rowsPerPage, btnValue) => ({
      'pagination__rows-selection-btn_current': btnValue === rowsPerPage,
    }),

    makeSpanMore: ({ locator }) => ({
      type: 'span',
      classes: ['pagination__more'],
      locator,
      innerText: '...',
    }),

    makeBefore: (i) => ({
      type: 'cButton',
      classes: ['pagination__button'],
      locator: `before-${i}-page`,
      label: String(i),
      value: i,
      small: true,
      mode: 'outlined',
      upperCase: false,
    }),

    makeCurrentPage: ({ page, locator }) => ({
      type: 'div',
      classes: ['pagination__button-current'],
      innerText: page,
      locator,
    }),

    makeAfter: (i) => ({
      type: 'cButton',
      classes: ['pagination__button'],
      locator: `after-${i}-page`,
      label: String(i),
      value: i,
      small: true,
      mode: 'outlined',
      upperCase: false,
    }),

  },

  watch: {
    'localPagination.rowsPerPage': {
      handler() {
        this.localPagination.page = 1;
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~styles/common.styl';

default-typography() {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
}

default-typography-bold() {
  default-typography();
  font-weight: 500;
}

.pagination {
  --pagination-text-color: $assistive-text-color;
  --pagination-text-color-current: $light-blue;

  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
}

.pagination_hidden {
  justify-content: flex-end;
}

.pagination_p24 {
  padding-left: 24px;
  padding-right: 24px;
}

.pagination__navigation {
  display: flex;
}

.pagination__part {
  display: inline-flex;
  flex-flow: row wrap;
  align-items: center;
}
.pagination__part_left {
  justify-content: flex-start;
  flex-grow: 1;
}
.pagination__part_right {
  justify-content: flex-end;
}

.pagination__button { // c-button
  min-width: 28px;
  margin-right: 4px;

  transition: background-color 0.15s ease-in;

  &:first-child {
    margin-right: 16px;
  }

  &:last-of-type {
    margin-left: 16px;
    margin-right: 16px;
  }
}

.pagination__button-current {
  default-typography-bold();

  padding: 4px 8px;
  min-width: 28px;
  margin-right: 4px;
  border-width: 0;
  color: var(--pagination-text-color-current);
  background-color: rgba(44, 152, 240, 0.2);
  border-radius: 2px;

  text-align: center;
}

.pagination__more { // span
  default-typography();

  // NOTE: display type is flex item
  width: 12px;
  margin-right: 4px;

  color: var(--pagination-text-color);
}

.pagination__goto-page { // c-text-field
  --ctf-input-padding-fixed-sm: 3px;

  :deep(&&.c-text-field_focused) {
    --ctf-input-padding-fixed-sm: 2px;
  }
}

.pagination__text {
  default-typography();

  display: inline-flex;
  align-items: center;
  margin-right: 8px;

  color: var(--pagination-text-color);
}

.pagination__rows-selection {
  margin-right: 16px;
}

.pagination__rows-selection-btn {
  justify-content: flex-start;
  padding-left: 18px;
}

.pagination__dot {
  default-typography();

  color: var(--pagination-text-color);
}

.pagination__info {
  default-typography();

  display: inline-flex;
  align-items: center;
  // margin-right: 10px;

  color: var(--pagination-text-color);
}

.pagination__go-to-page {
  display: flex;
}

// NOTE: for c-menu-list

.c-menu-list {
  position: relative;
}

.c-menu-list_at-top {
  --c-menu-offsetY: -2px;
}

.c-menu-list_at-bottom {
  --c-menu-offsetY: 2px;
}

.c-menu-list__open {
  font-weight: 500;
  letter-spacing: var(--button-label-letter-spacing);

  min-width: 51px;
  margin-right: 0;

  transition: background-color 0.15s ease-in;
}

.c-menu-list__list { // ul
  margin: 0;
  padding: 0;
  list-style: none;
}

.c-menu-list__item { // li
  padding: 0;
  text-align: left;

  // > :deep(button:hover),
  // > :deep(button:focus),
  > :deep(*:hover),
  > :deep(*:focus) {
    color: var(--theme_accent);
    background-color: _rgba(var(--theme_accent_rgb), 0.1);
  }
}
</style>
