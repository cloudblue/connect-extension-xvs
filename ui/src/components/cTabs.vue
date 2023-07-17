<template lang="pug">
.c-tabs
  .c-tabs__controls(:class="{ 'c-tabs__controls_border_none': noBorder }")
    .c-tabs__control-tooltip(
      v-for="tab in tabs",
      :key="tab.value",
      @click="open(tab)",
    )
      slot(
        name="tab",
        v-bind="tab",
      )
        span.c-tabs__control-item(:class="linkClass(tab)")
          pic._mr_8(
            v-if="tab.image",
            :src="tab.image",
            :width="20",
            :height="20",
            size="contain",
          )
          span {{ tab.label }}
          c-icon._ml_4(
            v-if="tab.icon",
            :icon="tab.icon.value",
            :color="tab.icon.color",
            :class="tab.icon.class",
            size="14",
          )

  .c-tabs__content
    .c-tab__view(
      v-for="tab in tabs",
      :key="tab.value",
    )
      slot(
        v-if="localCurrentTab?.value === tab.value"
        v-bind="tab",
        :name="tab.value",
      )

</template>


<script>
import cIcon from '~components/cIcon.vue';
import Pic from '~components/Pic.vue';

import sync from '~mixins/sync';


export default {
  mixins: [
    sync([{ prop: 'currentTab', local: 'localCurrentTab' }]),
  ],

  components: {
    cIcon,
    Pic,
  },

  props: {
    currentTab: {
      type: Object,
      default: null,
    },

    tabs: {
      required: true,
      type: Array,
    },

    noBorder: Boolean,
    fullHeight: Boolean,
  },

  data: () => ({
    localCurrentTab: null,
  }),

  methods: {
    open(tab) {
      if (tab.disabled || tab.value === this.localCurrentTab?.value) return;

      this.localCurrentTab = tab;
      this.$emit('open', tab);
    },

    linkClass(tab) {
      return {
        'c-tabs__control-item_active': tab.value === this.localCurrentTab?.value,
        'c-tabs__control-item_disabled': tab.disabled,
        'c-tabs__control-item_height_full': this.fullHeight,
      };
    },
  },

  created() {
    if (!this.localCurrentTab && this.tabs.length) this.localCurrentTab = this.tabs[0];
  },
};
</script>


<style lang="stylus">
.c-tabs {
  &__controls {
    display: flex;
    border-bottom: 1px solid #e0e0e0;

    &_border_none {
      border-bottom: none;
    }
  }

  &__content {
    margin-top: 32px;
  }

  &__control-tooltip {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 24px;
    line-height: 48px;
    white-space: nowrap;
    cursor: pointer;

    color: #212121;

    &:first-child {
      margin-left: 0;
    }

    a& {
      text-decoration: none;
    }

    a&:hover {
      color: var(--theme_accent);
    }
  }

  &__control-item {
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;

    &:after {
      content: '';
      height: 3px;
      position: absolute;
      right: 0;
      bottom: -1px;
      left: 0;

      transform-origin: bottom;
      transform: scaleY(0);
      transition: transform 385ms cubic-bezier(0.4, 0, 0.2, 1);

      background-color: var(--theme_accent);
    }

    &_active {
      color: var(--theme_accent);

      &:after {
        transform: scaleX(1);
      }
    }

    &_disabled {
      color: #bdbdbd !important;
      cursor: default !important;
    }

    &_height_full {
      height: 100%;
    }

    .pic {
      border-radius: 2px;
    }
  }
}
</style>
