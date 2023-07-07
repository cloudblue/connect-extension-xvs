<template lang="pug">
.image(:style="containerSettings", @click="$emit('click')")
  .loader(v-if="loading")
    c-icon(
      :icon="icons.connectLoaderAnimated",
      :size="20",
      color="accent",
      locator="loading-indicator",
    )
  template(v-else)
    .image__itself(
      v-if="isImageLoaded",
      :style="imageItselfSettings",
    )
    .image__placeholder(
      v-else,
      align-center,
      justify-center,
    )
      c-icon(
        v-if="placeholderIcon",
        :icon="placeholderIcon",
        :style="placeholderSettings",
        :size="iconSize",
      )

</template>

<script>
import {
  connectLoaderAnimated,
} from '@cloudblueconnect/material-svg/animated';

import {
  min,
} from 'ramda';


import cIcon from '~components/cIcon.vue';


// import {
//   altIcon,
// } from '~helpers';

// import {
//   loadImage,
// } from '~helpers/pic';

import {
  alt,
  isNilOrEmpty,
} from '~utils';

import {
  googleLanguageBaseline,
} from '@cloudblueconnect/material-svg/baseline';


const altIcon = v => (isNilOrEmpty(v) ? googleLanguageBaseline : '');

const loadImage = img => new Promise(
  (resolve, reject) => {
    img.addEventListener('load', resolve);
    img.addEventListener('error', reject);
  },
);

export default {
  components: {
    cIcon,
  },

  props: {
    src: {
      type: String,
      default: '',
    },

    altIcon: Object,

    width: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    size: {
      type: String,
      default: 'cover',
    },

    forceSize: {
      type: Boolean,
      default: false,
    },

    altIconColor: {
      type: String,
      required: false,
    },
  },

  data: () => ({
    loading: true,
    isImageLoaded: false,
    imageItselfSettings: {},
    icons: { connectLoaderAnimated },
  }),

  computed: {
    iconSize: vm => `${min(vm.width, vm.height) * 0.9}px`,
    placeholderIcon: vm => alt(altIcon(vm.src), vm.altIcon, isNilOrEmpty(vm.altIcon)),


    placeholderSettings() {
      const iconColor = this.altIconColor ? { color: this.altIconColor } : {};

      return {
        fontSize: this.iconSize,
        ...iconColor,
      };
    },

    containerSettings() {
      const settings = {
        width: `${this.width}px`,
        height: `${this.height}px`,
      };

      if (this.forceSize) {
        settings.minWidth = `${this.width}px`;
        settings.minHeight = `${this.height}px`;
      }

      return settings;
    },
  },

  methods: {
    async loadImage() {
      this.loading = true;

      const img = new Image();
      img.src = this.src;

      try {
        await loadImage(img);
        this.isImageLoaded = true;
        this.imageItselfSettings = {
          backgroundImage: `url(${this.src})`,
          backgroundSize: this.size,
        };
      } catch (e) {
        this.isImageLoaded = false;
      } finally {
        this.loading = false;
      }
    },
  },

  watch: {
    src() {
      this.loadImage();
    },
  },

  async created() {
    await this.loadImage();
  },
};
</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl';

.image {
  overflow: hidden;
  box-sizing: content-box;
  position: relative;

  &__itself {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
