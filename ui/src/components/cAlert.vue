<template lang="pug">
.c-alert-holder
  .c-alert(:class="classSettings",)
    .c-alert__icon(v-if="showIcon")
      c-icon(:icon="icon")

    .c-alert__text
      slot(name="message") {{ message }}

    .c-alert__actions(v-if="this.$slots.actions",)
      slot(name="actions")

</template>

<script>
import {
  googleInfoBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  flip,
  includes,
} from 'ramda';


import cIcon from '~components/cIcon.vue';


const typeAlert = [
  'info',
  'error',
  'success',
  'warning',
  'default',
];

export default {
  components: {
    cIcon,
  },

  props: {
    message: String,

    icon: {
      type: Object,
      default: () => (googleInfoBaseline),
    },

    dense: Boolean,

    alignTop: Boolean,

    fluid: Boolean,

    grid: Boolean,

    showIcon: {
      type: Boolean,
      default: true,
    },

    type: {
      type: String,
      validator: flip(includes)(typeAlert),
      default: 'default',
    },
  },

  computed: {
    classSettings() {
      return {
        'c-alert_align-top': this.alignTop,
        'c-alert_fluid': this.fluid,
        'c-alert_dense': this.dense,
        'c-alert_grid': this.grid,
        [`c-alert_${this.type}`]: true,
      };
    },
  },
};
</script>

<style lang="stylus">
@import '~styles/common.styl';

.c-alert {
  align-items: center;
  box-sizing: border-box;
  display: inline-flex;

  min-height: 64px;
  min-width: 240px;
  max-width: 600px;
  padding: 16px;
  border-radius: 2px;

  background-color: rgba(#bdbdbd, 0.15);

  color: #bdbdbd;
}

.c-alert_align-top {
  align-items: flex-start;
}

.c-alert_dense {
  min-height: 56px;
  padding-top: 12px;
  padding-bottom: 12px;
}

.c-alert_fluid {
  display: flex;
  max-width: none;
}

// NOTE: this should go later than .c-alert_fluid to work properly !
.c-alert_grid {
  display: grid;
  grid-template-columns: 32px auto;
  grid-template-rows: auto;
  grid-template-areas: "icon text" "x actions";
}

.c-alert_error {
  background-color: rgba(#FF6A6A, 0.2);
  color: #FF6A6A;
}
.c-alert_info {
  background-color: _rgba(var(--theme_accent_rgb), 0.15);
  color: var(--theme_accent);
}
.c-alert_success {
  background-color: rgba(#0bb071, 0.15);
  color: #0bb071;
}
.c-alert_warning {
  background-color: rgba(#F2C94C, 0.15);
  color: #F2C94C;
}

.c-alert__icon {
  flex: 0 0 auto;
  margin-right: 12px;
  display: flex;

  > .c-icon,
  > .v-icon {
    color: currentColor;
  }

  .c-alert_align-top & {
    margin-top: -2px;
  }

  .c-alert_grid & {
    grid-area: icon;
  }
}

.c-alert__text {
  flex: 1 1 auto;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #212121;
  white-space: break-spaces;

  &:first-letter {
    text-transform: uppercase;
  }

  .c-alert_grid & {
    grid-area: text;
  }
}

.c-alert__actions {
  flex: 0 0 auto;
  margin-right: -4px;
  margin-left: 24px;

  button {
    margin: -2px 0;

    & + & {
      margin-left: 16px;
    }
  }

  .c-alert_dense & {
    margin-right: -8px;

    button {
      margin-top: -4px;
      margin-bottom: -4px;
    }
  }

  .c-alert_grid & {
    grid-area: actions;
    margin-left: 0;
  }
}
</style>
