<template lang="pug">
.c-menu(
  ref="cMenu",
  :class="menuClasses",
)
  template
    .c-menu__trigger(
      :class="classNameByDisabled",
      :style="triggerStyle",
      @click.prevent="switchVisibility(!localValue, true)",
      @mouseover.prevent="switchVisibility(true, false)",
      @mouseleave.prevent="switchVisibility(false, false)",
    )
      slot(name="trigger")

  portal(
    to="destination",
    :disabled="attach",
    slim,
  )
    .c-menu__container(
      :class="contentClass",
      ref="cMenuContainer",
      v-if="localValue",
      :style="containerStyle",
      @click.stop="onClickInside",
      @mouseover.prevent="switchVisibility(true, false)",
      @mouseleave.prevent="switchVisibility(false, false)",
    )
      slot
</template>

<script>
import {
  T,
  __,
  always,
  any,
  cond,
  includes,
  propEq,
} from 'ramda';


import {
  sync,
} from '~mixins';


import {
  alt,
  pathAlt,
  template,
} from '~utils';


export default {
  mixins: [
    sync([
      { prop: 'value', local: 'localValue' },
    ]),
  ],

  props: {
    value: Boolean,
    disabled: Boolean,
    small: Boolean,
    isContrast: Boolean,
    overlay: Boolean,
    fullWidth: Boolean,
    setWidth: Boolean,
    contentClass: String,
    openOnClick: {
      type: Boolean,
      default: true,
    },

    attach: {
      type: Boolean,
      default: true,
    },

    actionType: {
      type: String,
      default: 'click',
      validator: includes(__, ['click', 'hover']),
    },

    position: {
      type: String,
      default: 'right',
      validator: includes(__, ['left', 'right', 'center']),
    },

    positionY: {
      type: String,
      default: 'bottom',
      validator: includes(__, ['top', 'bottom']),
    },

    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },

    closeOnClickInside: {
      type: Boolean,
      default: true,
    },

    minWidth: {
      type: Number,
      default: 40,
    },

    zIndex: {
      type: [String, Number],
      default: 8,
    },
  },

  data() {
    return {
      localValue: false,
      containerWidth: 40,
      triggerWidth: 40,
      triggerBox: {
        width: 40,
        height: 28,
        top: 0,
        left: 0,
      },
    };
  },

  computed: {
    classNameByActive: pathAlt(['localValue'], 'c-menu_active', null),
    classNameByDisabled: pathAlt(['disabled'], 'c-menu_disabled', null),
    classNameByWidth: pathAlt(['fullWidth'], 'c-menu_full-width', null),
    classNameByAttachement: pathAlt(['attach'], 'c-menu_attached', null),
    classNameByAction: ({ actionType }) => `c-menu_${actionType}`,
    classNameByPosition: ({ position, attach }) => alt(
      `c-menu_position-${position}`,
      null,
      attach,
    ),

    classNameByPositionY: ({ positionY, attach }) => alt(
      `c-menu_at-${positionY}`,
      null,
      attach,
    ),

    menuClasses: vm => [
      vm.classNameByActive,
      vm.classNameByWidth,
      vm.classNameByPosition,
      vm.classNameByPositionY,
      vm.classNameByAttachement,
      vm.classNameByAction,
    ],

    containerTop: vm => alt(
      `${vm.triggerBox.top - 10}px`,
      `${vm.triggerBox.top + vm.triggerBox.height}px`,
      vm.overlay,
    ),

    containerLeft: vm => cond([
      [propEq('center', 'position'), always(`${vm.triggerBox.left - (vm.containerWidth - vm.triggerBox.width) / 2}px`)],
      [propEq('left', 'position'), always(`${vm.triggerBox.left}px`)],
      [T, always(`${vm.triggerBox.left + vm.triggerBox.width - vm.containerWidth}px`)],
    ])(vm),

    containerStyleWidth: vm => alt(`${vm.triggerBox.width}px`, null, vm.setWidth),

    containerStyle: (vm) => ({
      'z-index': vm.zIndex,
      '--c-menu-left': vm.containerLeft,
      '--c-menu-top': vm.containerTop,
      '--c-menu-offsetX': `${vm.triggerWidth - vm.containerWidth}px`,
      'min-width': `${vm.minWidth}px`,
      width: vm.containerStyleWidth,
    }),

    triggerStyle: (vm) => ({
      '--c-menu-trigger-color': alt(
        'rgba(255, 255, 255, 0.2)',
        'rgba(102, 102, 102, 0.2)',
        vm.isContrast,
      ),
    }),
  },

  methods: {
    switchVisibility(visibility, isClick) {
      if (this.disabled || !this.openOnClick) return;

      if (isClick || this.actionType === 'hover') {
        this.localValue = visibility;
      }
    },

    onClickInside() {
      if (this.closeOnClickInside) this.localValue = false;
    },

    addEventOnClickOutside() {
      if (!this.closeOnClickOutside) return;

      window.addEventListener('click', this.closeMenuOnClickOutside);
    },

    removeEventOnClickOutside() {
      if (!this.closeOnClickOutside) return;

      window.removeEventListener('click', this.closeMenuOnClickOutside);
    },

    closeMenuOnClickOutside(e) {
      // w/a for v-select inside menu container click event
      // should be removed after replacing v-select with c-select component in scope of LITE-16180
      const selectedOptionsList = (this.$refs.cMenuContainer) ? this.$refs.cMenuContainer.querySelectorAll('.v-select__selection') : [];
      const selectedOptionInContainer = any(propEq(e.target.textContent, 'textContent'))(selectedOptionsList);

      if (
        !this.localValue
        || !this.closeOnClickOutside
        || this.$refs.cMenu.contains(e.target)
        || (this.$refs.cMenuContainer && this.$refs.cMenuContainer.contains(e.target))
        || selectedOptionInContainer
      ) return;

      this.localValue = false;
    },

    // need to add this event listener because navigation bar button use @click.stop
    addEventOnNavBarClick() {
      const navBarButton = document.getElementById('navigation-opener');
      if (navBarButton) navBarButton.addEventListener('click', this.closeMenu);
    },

    removeEventOnNavBarClick() {
      const navBarButton = document.getElementById('navigation-opener');
      if (navBarButton) navBarButton.removeEventListener('click', this.closeMenu);
    },

    addEventOnPopState() {
      window.addEventListener('popstate', this.closeMenu);
    },

    removeEventOnPopState() {
      window.removeEventListener('popstate', this.closeMenu);
    },

    closeMenu() {
      this.localValue = false;
    },
  },

  watch: {
    localValue: {
      immediate: true,
      async handler(v) {
        if (!v) return;

        const trigger = this.$refs.cMenu.querySelector('.c-menu__trigger');

        if (trigger) {
          this.triggerWidth = trigger.clientWidth;
          this.triggerBox = (this.attach) ? template({
            width: ['clientWidth'],
            height: ['clientHeight'],
            top: ['offsetTop'],
            left: ['offsetLeft'],
          })(trigger) : trigger.getBoundingClientRect();
        }

        await this.$nextTick();

        const containerBlock = this.$refs.cMenuContainer;
        if (containerBlock) this.containerWidth = containerBlock.clientWidth;
      },
    },
  },

  mounted() {
    if (this.disabled) return;

    this.addEventOnClickOutside();
    this.addEventOnNavBarClick();
    this.addEventOnPopState();
  },

  beforeDestroy() {
    if (this.disabled) return;

    this.removeEventOnClickOutside();
    this.removeEventOnNavBarClick();
    this.removeEventOnPopState();
  },
};
</script>

<style lang="stylus">
@import '~styles/variables.styl';

.c-menu {
  --c-menu-trigger-color: transparent;
  --c-menu-offsetX: -80px;
  --c-menu-offsetY: 0;
  --c-menu-left: 0;
  --c-menu-top: 0;

  position: static;
  display: inline-block;
  vertical-align: middle;

  &__trigger {
    position: relative;
    cursor: pointer;
  }

  &__container {
    position: absolute;
    top: var(--c-menu-top);
    left: var(--c-menu-left);
    transform-origin: left top;
    display: inline-block;
    overflow-y: auto;
    overflow-x: hidden;
    contain: content;
    will-change: transform;
    white-space: nowrap;
    border-radius: 4px;
    background: #FFFFFF;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);
    .v-dialog & {
      z-index: 201 !important;
    }
  }

  &_position-center & {
    &__container {
      transform: translateX(-50%) translateY(0);
      top: revert;
      left: revert;
    }
  }

  &_position-left & {
    &__container {
      top: revert;
      left: revert;
    }
  }

  &_position-right & {
    &__container {
      transform: translateX(var(--c-menu-offsetX)) translateY(var(--c-menu-offsetY));
      top: revert;
      left: revert;
    }
  }

  &_at-top & {
    &__container {
      top: auto;
      bottom: 100%;
    }
  }

  &_active &__trigger {
    .c-button {
      background: var(--c-menu-trigger-color);
    }
  }

  &_disabled {
    cursor: default;
  }

  &_full-width {
    width: 100%;
  }
}

.c-menu_attached {
  &.c-menu_at-top {
    position: relative;
  }
}
</style>
