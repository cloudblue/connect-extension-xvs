<template lang="pug">
component.column.c-table-header(
  role="columnheader",
  :class="`text-xs-${align}`"
  :is="tag",
)
  .c-table-header__wrapper
    c-menu.th-menu(
      v-model="menuVisibility",
      v-if="showManageIcon",
      :close-on-click-inside="false",
      position="left",
      :attach="false",
    )
      template(#trigger="")
        .c-table-header__button(
          ref="header",
          :class="{ 'c-table-header__button_active': menuVisibility }",
        )
          div.c-table-header__content
            div.c-table-header__text {{ text }}
            c-icon.c-table-header__icon(
              :icon="icons[masterIcon]",
              class="c-table-header__icon_active",
              size="18",
            )

    .c-table-header__content(v-else)
      pic.c-table-header__content-icon(
        v-if="icon",
        :height="20",
        :src="icon",
        :width="20",
        size="cover",
      )
      .c-table-header__text {{ text }}
    slot(name="append-header-item")
</template>

<script>
import {
  googleArrowDownwardBaseline,
  googleArrowDropDownBaseline,
  googleArrowDropUpBaseline,
  googleArrowUpwardBaseline,
  googleFilterListBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  T,
  always,
  cond,
  prop,
  where,
} from 'ramda';


import cIcon from '~components/cIcon.vue';
import cMenu from '~components/cMenu.vue';
import Pic from '~components/Pic.vue';


export default {
  components: {
    cIcon,
    cMenu,
    Pic,
  },

  props: {
    tag: {
      type: String,
      default: 'th',
    },

    align: {
      type: String,
      default: 'left',
    },

    text: String,
    value: String,
    manageable: Boolean,

    loading: {
      type: Boolean,
      default: false,
    },

    icon: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      menuVisibility: false,
      menu: {
        x: 0,
        y: 0,
        height: 0,
      },

      icons: {
        arrow_downward: googleArrowDownwardBaseline,
        arrow_drop_up: googleArrowDropUpBaseline,
        arrow_drop_down: googleArrowDropDownBaseline,
        arrow_upward: googleArrowUpwardBaseline,
        filter_list: googleFilterListBaseline,
      },
    };
  },

  computed: {
    showManageIcon: where({
      manageable: Boolean,
    }),

    masterIcon: cond([
      [prop('menuVisibility'), always('arrow_drop_up')],
      [T, always('arrow_drop_down')],
    ]),
  },
};
</script>


<style lang="stylus" scoped>
@import '~styles/common';

.c-table-header {
  min-height: 32px;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: $assistive-text-color;
  text-transform: uppercase;
  font-weight: bold;
  padding-right: $module * 3;
  padding-left: $module * 3;
  &:first-child {
    border-left: none;
    padding-left: 8px;
  }

  &:last-child {
    border-right: none;
    padding-right: 8px;
  }


  &_disabled-resize {
    pointer-events: none;
  }

  &__content {
    display: flex;
    align-items: center;
    min-width: 0;

    &-icon {
      margin-right: 4px;
      border-radius: 2px;
    }
  }

  &__text {
    line-height: 32px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__icon {
    margin-left: 2px;
    transition: none;
    flex-shrink: 0;

    &_active {
      color: $accent;
    }
  }

  &__button {
    width: auto;
    height: 32px;
    overflow: hidden;
    align-items: center;
    line-height: 32px;
    padding-right: 8px;
    padding-left: 8px;
    margin-left: -8px;
    cursor: pointer;
    transition: background-color 0.2s;
    text-transform: uppercase;

    &_active {
      background-color: rgba(33, 33, 33, 0.05);
    }

    &[disabled] {
      cursor: default;

      &:hover {
        background-color: transparent;
      }
    }
  }

  &__wrapper {
    width: 100%;
    display: flex;
    align-items: center;
  }
}

.v-menu--inline {
  display: block;
}

.header-menu {
  padding: $module * 2 0;

  &__title {
    padding: $module $module * 4 $module $module * 6;
    font-size: 14px;
    font-weight: 500;
    color: $theme-grey-1;
  }

  &__item {
    min-height: $module * 12;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 24px;
    padding: $module * 3 $module * 4 $module * 3 $module * 6;
    cursor: pointer;

    &:hover {
      background-color: rgba(33, 33, 33, 0.05);
    }

    &_active {
      background-color: _rgba($accent-rgb, 0.15) !important;
      color: $accent;

      .header-menu__icon {
        color: $accent;
      }
    }
  }

  &__icon {
    margin-right: $module * 6;
    font-size: 24px;
  }

  &__label {
    color: inherit;
  }
}

.v-menu__content{
  overflow: hidden;
  background white;
}
.th-menu{
  width: auto;
  min-width: 0;
}
.th-menu .c-menu__trigger {
  margin-left: -8px;
}
i {
  font-size: 18px;
}
i.active{
  color: $accent;
}
i.nosort {
  color: rgba(0, 0, 0, 0.26);
}

.scrollable {
  overflow-y: auto;
}
</style>
