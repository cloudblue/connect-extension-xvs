<template lang="pug">
.c-view
  .c-view__progress-wrapper(v-if="loading")
    c-icon.primary--text._ma_auto(
      :icon="icons.connectLoaderAnimated",
      :size="76",
      color="accent",
    )

  template(v-else)
    c-nav-bar.c-view__navigation(
      :assistive-title="assistiveTitle",
      :back-route="backRoute",
      :current-tab.sync="localCurrentTab",
      :title="title",
      :tabs="tabs",
    )
      template(#logo="")
        slot(name="logo")

      template(#title="")
        slot(name="title")

      template(#actions="")
        slot(name="actions")

    .c-view__content-holder
      .c-view__content(:class="{ 'c-view__content_padded': !noPadded }")
        slot(name="default")

</template>


<script>
import {
  connectLoaderAnimated,
} from '@cloudblueconnect/material-svg/animated';


import cIcon from '~components/cIcon.vue';
import cNavBar from '~components/cNavBar.vue';

import sync from '~mixins/sync';


export default {
  mixins: [
    sync([{ prop: 'currentTab', local: 'localCurrentTab' }]),
  ],

  components: {
    cIcon,
    cNavBar,
  },

  props: {
    loading: Boolean,
    noPadded: Boolean,

    // navigation bar props
    assistiveTitle: String,
    backRoute: [Object, String],
    title: String,
    currentTab: Object,
    tabs: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    icons: { connectLoaderAnimated },
    localCurrentTab: null,
  }),

  watch: {
    '$route.params.tab': {
      immediate: true,
      handler(v) {
        if (v) {
          const newTab = this.tabs.find(tab => tab.value === v);
          if (newTab) this.localCurrentTab = newTab;
        }
      },
    },

    localCurrentTab: {
      deep: true,
      immediate: true,
      handler(v) {
        if (!v || v.value === this.$route.params?.tab) return;

        this.$router.replace({
          ...this.$route,
          params: { ...this.$route.params, tab: v.value },
        });
      },
    },
  },
};
</script>


<style lang="stylus">
.c-view {
  position: relative;
  flex: 1 1 100%;
  display: grid;

  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  grid-template-areas: "n" "c";

  overflow: auto;

  &__progress-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
  }

  &__navigation {
    grid-area: n;
  }

  &__content-holder {
    position: relative;
    grid-area: c;
  }

  &__content {
    position: relative;
    min-height: 100%;
    box-sizing: border-box;
    padding-bottom: 64px;

    &_padded {
      padding: 24px 24px 40px;
    }
  }

  &__content,
  &__navigation {
    &:empty {
      display: none;
    }
  }
}
</style>
