import {
  objOf,
} from 'ramda';

import {
  mapGetters,
} from 'vuex';


import {
  hexToRGB,
} from '~utils';


const getStyleCustomizations = (namespace = 'theme') => ({
  computed: {
    ...mapGetters('theme', [
      'accent',
      'primaryColor',
      'contrast',
    ]),

    styleCustomizations() {
      return {
        [`--${namespace}_primary`]: this.primaryColor,
        [`--${namespace}_primary_rgb`]: hexToRGB(this.primaryColor),
        [`--${namespace}_accent`]: this.accent,
        [`--${namespace}_accent_rgb`]: hexToRGB(this.accent),
        [`--${namespace}_contrast`]: this.contrast,
        [`--${namespace}_contrast_rgb`]: hexToRGB(this.contrast),
      };
    },
  },

  methods: {
    genCssVar(name, value) {
      return objOf(`--${namespace}_${name}`, value);
    },
  },
});


export default getStyleCustomizations;
