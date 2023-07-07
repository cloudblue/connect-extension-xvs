import {
  applyTo,
  is,
  map,
  when,
} from 'ramda';


import sync from '~mixins/sync';


import {
  altIcon,
} from '~helpers';


const entityTable = (
  prepareRow,
  detailsRouteNameDefault,
) => ({
  mixins: [
    sync([
      { prop: 'value', local: 'localValue' },
      { prop: 'updating', local: 'localUpdating' },
      { prop: 'showLoader', local: 'localShowLoader' },
      { prop: 'showPlaceholder', local: 'localShowPlaceholder' },
      {
        propImmediate: false,
        localImmediate: true,
      },
    ]),
  ],

  props: {
    value: {
      type: Array,
      default: () => [],
    },
    update: Function,
    updating: Boolean,
    showLoader: Boolean,
    showPlaceholder: Boolean,
    localFilter: Function,
    padding: String,
    memoizePrefix: String,
    memoize: {
      default: true,
      type: Boolean,
    },
    detailsRouteName: {
      type: String,
      default: detailsRouteNameDefault,
    },
    headers: Array,
    searchable: Boolean,
  },

  data() {
    return {
      localShowPlaceholder: false,
      localShowLoader: false,
      localUpdating: false,
      localValue: [],
    };
  },

  computed: {
    preparedHeaders: vm => {
      // eslint-disable-next-line no-console
      console.log('vm.headers', vm.headers);

      return map(when(is(Function), applyTo(vm)))(vm.headers);
    },
  },

  methods: {
    altIcon,
    prepareRow,

    load(queryParameters, force) {
      return this.update({ queryParameters, force });
    },

    detailsLink(id) {
      return {
        name: this.detailsRouteName,
        params: { id },
      };
    },
  },
});

export default entityTable;
