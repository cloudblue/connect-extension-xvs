<template lang="pug">
.navigation-bar
  router-link.navigation-bar__back-button(
    v-if="backRoute",
    :to="backRoute",
  )
    c-icon(
      :color="themeGrey1",
      :icon="icons.googleArrowBackBaseline",
      size="24",
    )

  slot(name="logo")

  slot(name="title")
    .navigation-bar__page-title-holder(v-if="assistiveTitle")
      .navigation-bar__page-assistive-title.truncate-text {{ assistiveTitle }}
      h1.navigation-bar__page-title.truncate-text {{ title }}

    h1.navigation-bar__page-title.truncate-text(v-else) {{ title }}

  c-tabs.navigation-bar__tabs(
    v-if="tabs.length",
    :current-tab.sync="localCurrentTab",
    :tabs="tabs",
    full-height,
    no-border,
    no-content,
  )

  .actions-holder.navigation-bar__actions
    .actions-slot
      slot(name="actions")

</template>

<script>
import {
  googleArrowBackBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import cIcon from '~components/cIcon.vue';
import cTabs from '~components/cTabs.vue';

import {
  themeGrey1,
} from '~constants';

import sync from '~mixins/sync';


export default {
  mixins: [
    sync([{ prop: 'currentTab', local: 'localCurrentTab' }]),
  ],

  components: {
    cIcon,
    cTabs,
  },

  props: {
    backRoute: {
      type: [Object, String],
      default: null,
    },

    assistiveTitle: String,
    title: String,

    tabs: {
      type: Array,
      default: () => [],
    },

    currentTab: Object,
  },

  data: () => ({
    icons: { googleArrowBackBaseline },
    localCurrentTab: null,
    themeGrey1,
  }),
};
</script>

<style lang="stylus">
.navigation-bar {
  box-sizing: content-box;
  display: flex;
  align-items: center;
  flex: 0 0 auto;

  height: 64px;
  padding-left: 24px;
  padding-right: 24px;
  border-bottom: 1px solid #e0e0e0;
  background: #f5f5f5;

  &__page-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    margin-top: 0;
    margin-bottom: 0;
  }

  &__page-assistive-title {
    color: #707070;
  }

  &__back-button + &__page-title-holder,
  &__back-button + &__page-title {
    margin-left: 32px;
  }

  &__back-button {
    margin: 0 -6px;
    color: #666666;
    padding: 4px;

    &:hover {
      background: #e0e0e0;
    }
  }

  &__tabs,
  &__content,
  &__actions {
    padding-left: 48px;
  }

  &__tabs,
  &__content {
    display: flex;
    align-self: stretch;
  }

  &__tabs {
    flex: 0 0 auto;
  }

  &__content {
    flex: 1 1 auto;
  }

  &__actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    flex: 0 0 auto;
  }
}

.page-title {
  display: flex;
  align-items: center;

  &__link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    cursor: pointer;
  }
}

.actions-holder {
  .actions-slot {
    display: flex;
    align-items: center;

    & > div {
      padding-left: 16px;
    }
  }

  &__button {
    margin: 0;
    min-width: 0;
  }
}

.actions-menu {
  &__divider {
    margin-top: 7px;
    margin-bottom: 8px;
  }
}

._mb_2 {
  margin-bottom: 2px;
}
</style>
