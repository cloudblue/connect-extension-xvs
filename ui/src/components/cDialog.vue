<template lang="pug">
.c-dialog(
  v-show="localValue",
  :class="{ 'c-dialog_opened': localValue }",
  :style="{ zIndex }",
)
  transition(name="overlay")
    .c-dialog__overlay(
      v-if="localValue",
      ref="dialog-overview",
    )

  transition(name="window")
    .c-dialog__window.c-window(
      v-if="localValue",
      :style="{ height, width, minWidth: width }",
      :id="id",
      ref="c-window",
    )
      .c-window__header
        h2.c-window__title
          slot(name="title")
            .truncator
              .truncator__truncate.capitalize-first-letter {{ title }}
              .c-window__status.truncator__keep(v-if="status") — {{ status }}



      // TODO: check if we need sidebars (seems that we do)
      .c-window__sidebar(v-if="areTabsPresent || $slots['sidebar']")
        .c-window__scroller
          slot(name="sidebar")
            .c-vertical-tabs
              a.c-vertical-tab(
                v-for="(tab, index) in preparedTabs",
                @click="navigateToTab(tab.key)",
                :class="getTabClasses(tab)",
                :key="tab.key",
                v-bind="tab.props",
              )
                .c-vertical-tab__step-indicator.step-indicator(
                  v-if="isWizard",
                  :class="{ 'step-indicator-filled': !isPastCurrentTab(tab.key)}",
                )
                  c-icon.step-indicator__icon(
                    v-if="tab.skipStep",
                    size="18",
                    :icon="icons.googleArrowDownwardBaseline",
                  )
                  c-icon.step-indicator__icon(
                    v-else-if="!isCurrentOrPastCurrentTab(tab.key)",
                    size="18",
                    :icon="icons.googleCheckBaseline",
                  )
                  .step-indicator__text(v-else) {{ inc(index) }}

                .c-vertical-tab__content
                  .truncate-text {{ tab.label }}
                  .assistive-text(v-if="tab.assistiveText") {{ tab.assistiveText }}

      .c-window__right-sidebar.c-window__scroller(
        v-if="$slots['right-sidebar']",
        :style="rightSidebarStyle",
      )
        slot(name="right-sidebar")


      .loading-icon(v-if="loading")
        c-icon.primary--text._mx_auto.d-flex(
          :icon="icons.connectLoaderAnimated",
          :size="44",
          color="accent",
        )

      .c-window__content(:class="{ 'c-window__content_no-frame': noFrame }")
        c-alert.c-dialog__error(
          v-if="isErrorShown",
          :message="localErrorText",
          :icon="icons.googleErrorBaseline",
          dense,
          fluid,
          type="error",
        )
          template(#message="")
            slot(
              name="message",
              :error-text="localErrorText",
              :raw-error="rawError",
            )

        slot(:name="activeSlot")

      .c-window__actions(:class="{ 'c-window__actions_no-divider': hideActionsDivider }")
        template(v-for="action in preparedActions")
          .horizontal-spacer(
            v-if="action.type === 'spacer'",
            :key="`${action.label}-divider`",
          )
          c-button(
            v-else-if="!action.hidden",
            :key="action.label",
            :label="action.label",
            :disabled="action.disabled || isActionLoading[action.label]",
            :color="action.color || 'accent'",
            :loading="action.loading || isActionLoading[action.label]",
            v-bind="action.props",
            @click.stop="() => actionClickHandler(action)",
          )

</template>


<script>
import {
  connectLoaderAnimated,
} from '@cloudblueconnect/material-svg/animated';

import {
  googleArrowDownwardBaseline,
  googleCheckBaseline,
  googleErrorBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  always,
  apply,
  equals,
  find,
  findIndex,
  ifElse,
  inc,
  map,
  pipe,
  pluck,
  prop,
  propEq,
  propOr,
  reject,
  when,
} from 'ramda';


import {
  sync,
} from '~mixins';


import cAlert from '~components/cAlert.vue';
import cButton from '~components/cButton.vue';
import cIcon from '~components/cIcon.vue';


import {
  arr,
  isNotNilOrEmpty,
  kebabCase,
  lessThan,
  pathOrPath,
  pathTo,
  propTo,
  template,
} from '~utils';


export const DEFAULT_Z_INDEX = 1;

export const getElementZIndex = el => +window.getComputedStyle(el).getPropertyValue('z-index');

export const getNextZIndexBySelector = pipe(
  selector => document.querySelectorAll(selector),
  map(getElementZIndex),
  apply(Math.max),
  when(lessThan(DEFAULT_Z_INDEX), always(DEFAULT_Z_INDEX)),
  inc,
);

export default {
  mixins: [
    sync([
      { prop: 'errorText', local: 'localErrorText' },
      { prop: 'value', local: 'localValue' },
    ]),
  ],

  components: {
    cAlert,
    cIcon,
    cButton,
  },

  props: {
    value: Boolean,
    id: String,

    title: {
      type: String,
      required: true,
    },

    status: String,

    isWizard: {
      type: Boolean,
      default: false,
    },

    actions: {
      type: Array,
      default: always([{
        label: 'Close',
        closeAfterHandle: true,
        color: '#212121',
      }]),
    },

    tabs: {
      type: Array,
      default: arr,
    },

    defaultTab: String,

    errorText: String,

    noFrame: Boolean,
    hideActionsDivider: Boolean,

    rightSidebarBackground: {
      type: String,
      default: '#f5f5f5',
    },

    rightSidebarWidth: String,

    width: {
      type: String,
      default: '500px',
    },

    height: {
      type: String,
      default: 'auto',
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localValue: false,
      activeTab: '',

      localErrorText: '',
      rawError: {},

      icons: {
        googleArrowDownwardBaseline,
        googleCheckBaseline,
        googleErrorBaseline,
        connectLoaderAnimated,
      },

      isActionLoading: {},
      zIndex: -100,
      mostAdvancedVisitedIndex: 0,
    };
  },

  computed: {
    isErrorShown: pathTo(['localErrorText'], Boolean),
    rightSidebarStyle: template({
      backgroundColor: ['rightSidebarBackground'],
      width: ['rightSidebarWidth'],
    }),

    actualDefaultTab: pathOrPath(['defaultTab'], ['navigatableTabKeys', 0]),
    preparedTabs: pipe(
      prop('tabs'),
      reject(prop('hidden')),
    ),

    preparedActions: pathTo(['actions'], map(action => ({
      key: `${kebabCase(action.label || '')}-action`,
      ...action,
    }))),

    areTabsPresent: pathTo(['preparedTabs'], isNotNilOrEmpty),

    activeTabObject: vm => propTo('preparedTabs', find(propEq(vm.activeTab, 'key')), vm),

    navigatableTabKeys: pipe(propTo('preparedTabs', reject(prop('skipStep'))), pluck('key')),

    navigatableTabIdx: vm => findIndex(equals(vm.activeTab), vm.navigatableTabKeys),

    activeSlot: ifElse(prop('areTabsPresent'), prop('activeTab'), always('default')),
  },

  methods: {
    async actionClickHandler(action) {
      try {
        this.localErrorText = '';
        if (typeof action.handler === 'function') {
          this.isActionLoading[action.label] = true;
          await action.handler();
        }

        if (action.closeAfterHandle) {
          this.localValue = false;
        }
      } catch (e) {
        this.localErrorText = e.message;
        this.rawError = e;
      } finally {
        this.isActionLoading[action.label] = false;
      }
    },

    navigateToTab(key) {
      if (!this.isWizard) {
        this.activeTab = key;
      }
    },

    isIndexPastMostAdvancedVisitedIndex(index) {
      return index !== -1 && index > this.mostAdvancedVisitedIndex;
    },

    isPastCurrentTab(key) {
      const navigateToIndex = this.navigatableTabKeys.indexOf(key);

      return this.isIndexPastMostAdvancedVisitedIndex(navigateToIndex);
    },

    isCurrentOrPastCurrentTab(key) {
      const navigateToIndex = this.navigatableTabKeys.indexOf(key);

      return this.isIndexPastMostAdvancedVisitedIndex(navigateToIndex)
        || this.navigatableTabIdx === navigateToIndex;
    },

    getTabClasses(tab) {
      return {
        'c-vertical-tab_clickable': !this.isWizard,
        'c-vertical-tab_active': tab.key === this.activeTabObject?.key,
        'c-vertical-tab_inactive': this.isWizard && this.isPastCurrentTab(tab.key),
      };
    },

    nextStep() {
      const nextTabKey = this.navigatableTabKeys[this.navigatableTabIdx + 1];
      if (nextTabKey) {
        this.activeTab = nextTabKey;
      }
    },

    previousStep() {
      const prevTabKey = this.navigatableTabKeys[this.navigatableTabIdx - 1];
      if (prevTabKey) {
        this.activeTab = prevTabKey;
      }
    },

    inc,
  },

  watch: {
    localValue: {
      immediate: true,
      handler(isOpened) {
        if (isOpened) {
          this.zIndex = getNextZIndexBySelector('.c-dialog_opened'); // make dialogs stackable
          this.activeTab = this.actualDefaultTab;

          this.$emit('open');
        } else {
          this.zIndex = -100;
          this.mostAdvancedVisitedIndex = 0;
          this.$emit('close');
        }
      },
    },

    actions: {
      deep: true,
      immediate: true,
      handler() {
        this.actions.map(action => this.$set(
          this.isActionLoading,
          action.label,
          propOr(false, action.label, this.isActionLoading),
        ));
      },
    },

    activeTab() {
      this.$emit('change-tab', this.activeTabObject);
    },

    navigatableTabIdx: {
      immediate: true,
      handler(currentVal) {
        if (currentVal > this.mostAdvancedVisitedIndex) {
          this.mostAdvancedVisitedIndex = currentVal;
        }
      },
    },
  },
};
</script>

<style lang="stylus">
@import '~styles/common.styl';

.overlay-enter-active,
.overlay-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.overlay-enter,
.overlay-leave-to {
  opacity: 0;
}

.window-enter-active,
.window-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: scale(1) translate3d(0,0,0);
}

.window-enter,
.window-leave-to {
  transform: scale(0.5) translate3d(0,0,0);
  opacity: 0;
}


.c-dialog {
  z-index: -100;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;

  transition-property: z-index;
  transition-duration: 0s;
  transition-timing-function: step-end;
  transition-delay: 0.3s;

  &_opened {
    z-index: 1;

    transition-duration: 0.3s;
    transition-timing-function: step-start;
    transition-delay: 0s;
  }

  &__overlay {
    z-index: 3;
    pointer-events: auto;
    touch-action: none;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($base-text-color, .46);
  }

  &__window {
    z-index: 3;
    position: relative;
    flex: 0 0 auto;

    pointer-events: all;
    touch-action: auto;

    max-height: 90%;
    max-width: "calc(100% - %s)" % ($edge-gap * 2);
    margin: auto;

    outline: none;
    box-shadow:
            0   11px 15px -7px rgba(0, 0, 0, .2),
            0px 24px 38px 3px  rgba(0, 0, 0, .14),
            0px 9px  46px 8px  rgba(0, 0, 0, .12);

    border-radius: 4px;
    overflow-y: hidden;

    &_z-shaking {
      animation-name: z-shake-dialog;
      animation-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
      animation-duration: 0.15s;
    }
  }

  &__error {
    margin-bottom: 20px;
  }
}

.c-window {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "h h h h" "s c c r" "s a a r";

  overflow: auto;

  background-color: white;

  &__header {
    grid-area: h;

    min-width: 0;
    max-width: 100%;
  }
  &__header,
  &__title {
    user-select: none;
  }

  &__status {
    margin-left: $module * 2;
    color: _rgba($contrast-rgb, .5);
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $module * 16;
    padding-left: $edge-gap;
    padding-right: $edge-gap;
    margin-top: 0;
    margin-bottom: 0;

    line-height: 24px;
    font-size: 20px;
    font-weight: 500;

    color: $contrast;
    background-color: $primary;
  }

  &__message {
    .c-alert {
      border-radius: 0;
    }
  }

  &__toolbar {
    border-bottom: 1px solid $theme-light-1;
  }

  &__sidebar {
    position: relative;
    grid-area: s;
    display: flex;
    background-color: #f5f5f5;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 1px;
      background-color: $theme-light-1;
    }
  }

  &__right-sidebar {
    position: relative;
    grid-area: r;
    display: flex;

    border-left: 1px solid $theme-light-1;
  }
  .c-window__right-sidebar.c-window__scroller {
    padding: 24px;
  }

  &__scroller {
    flex: 1 1 100%;
    overflow-y: auto;
  }
  .loading-icon {
    grid-area: c;
    height: 100%;
    z-index: inherit;
    background: rgba(255, 255, 255, .6);

    svg {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__content {
    grid-area: c;
    padding: $edge-gap;

    &_no-frame {
      padding: 0;
    }
  }

  &__actions {
    display: flex;
    grid-area: a;
    min-height: 52px;
    align-items: center;
    justify-content: flex-end;
    padding-left: $edge-gap - ($module * 2);
    padding-right: $edge-gap - ($module * 2);
    border-top: 1px solid $theme-light-1;

    &_no-divider {
      border-top-color: transparent;
    }

    button {
      margin: 0;
    }

    button + button {
      margin-left: $module * 4;
    }
  }
}

.c-right-sidebar {
  padding-bottom: $module * 4;
  width: 320px;
}

.c-vertical-tabs {
  padding-top: $module * 4;
  padding-bottom: $module * 4;
  width: 220px;
}

.c-vertical-tab {
  $content-gap = 8px;
  $inactive-step-color = #bdbdbd;

  position: relative;
  display: flex;
  align-items: center;
  min-height: $module * 16;
  padding-left: $edge-gap;
  padding-right: $edge-gap - $content-gap;
  overflow: hidden;

  text-decoration: none;
  color: $base-text-color;

  user-select: none;

  transition: background-color 385ms cubic-bezier(0.4, 0, 0.2, 1);

  a& {
    cursor: default;
  }

  &:before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: $tab-border-width;

    transform-origin: right;
    transform: scaleX(0);
    transition: transform 385ms cubic-bezier(0.4, 0, 0.2, 1);

    background-color: $accent;
  }

  &__content {
    margin-right: $content-gap;
    flex: 1 1;
    min-width: 0;
  }

  &__step-indicator,
  &__icon {
    flex: 0 0 auto;
  }

  &__step-indicator {
    margin-right: $module * 2;

    &:before,
    &:after {
      content: "";
      position: absolute;
      left: $edge-gap + (24px / 2);
      z-index: 0;

      width: 1px;
      height: 50%;
      margin-left: -0.5px;
      background-color: $theme-light-1;
    }

    &:after {
      bottom: (-24/2 - 4px);
    }

    &:before {
      top: (-24/2 - 4px);
    }

    &.step-indicator-filled {
      &:before,
      &:after {
        background-color: $accent;
        opacity: 0.15;
      }
    }
  }

  &:first-of-type &__step-indicator:before,
  &:last-of-type &__step-indicator:after {
    content: none;
  }

  &_active {
    background-color: _rgba($accent-rgb, 0.15);
    color: $accent;
    font-weight: 500;

    &:before {
      transform: scaleX(1);
    }

    .assistive-text {
      color: _rgba($accent-rgb, 0.75);
      font-weight: 400;
    }

    .step-indicator {
      background-color: $accent;
      color: $contrast-accent;
    }
  }

  &_clickable:not(&_active) {
    &:hover {
      background-color: rgba($base-text-color, 0.05);
    }

    a& {
      cursor: pointer;
    }
  }

  &_inactive {
    color: $assistive-text-color;

    .step-indicator {
      background-color: rgba($inactive-step-color, 0.15);
      color: $inactive-step-color;
    }
  }

  &_active &__step-indicator {
    &:after,
    &:before {
      content: none;
    }
  }
}

.step-indicator {
  display: flex;
  width: $module * 6;
  height: $module * 6;
  border-radius: 100%;
  background-color: _rgba($accent-rgb, 0.15);
  color: $accent;

  &__text,
  &__icon {
    margin: auto;
  }

  &__icon {
    &.c-icon {
      color: currentColor;
    }
  }

  &__text {
    color: currentColor;
    font-weight: 500;
    font-size: 14px;
    line-height: 1;
  }
}
</style>
