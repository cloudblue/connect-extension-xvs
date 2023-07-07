import {
  clone,
  defaultTo,
  equals,
  forEach,
  identity,
  juxt,
} from 'ramda';


import {
  alt,
  debounce as createDebounce,
  dassoc,
  dpath,
  mutatePath,
  pathHead,
  pathTail,
} from '~utils';

/* syncMixinFabric :: adds the ability to sync props and local data
 *
 * *** Mixin usage example ***
 *
 * ChildComponent.vue
 *   prop: {
 *     value: String,
 *     loading: Boolean,
 *   },
 *
 *   mixins: [
 *     sync([
 *      {
 *       prop: 'value',        // prop variable name
 *       local: 'localValue',  // data variable name
 *       propImmediate: false, // inits data variable by prop value (default = true)
 *       debounce: 3000,       // add debounce for watch handler
 *      },
 *      {
 *       prop: 'loading',
 *       local: 'localLoading',
 *      }
 *     ])
 *   ],
 *
 *   data() {
 *     return {
 *      localValue: null,
 *      localLoading: false,
 *     };
 *   }
 *
 * *** Enhanced component usage example ***
 *
 * ParentComponent
 *   child-component(
 *     v-model="form.name",
 *     loading.sync="form.loading",
 *   )
 */
const syncMixinFactory = opts => ({
  props: {
    debounce: Number,
    deserialize: Function,
    serialize: Function,
  },

  created() {
    /* eslint-disable consistent-return */
    opts.forEach((
      {
        local: localPath = '',
        prop: propPath = '',
        store: storePath = '',
        storeMutation: storeMutationPath = '',
        propImmediate = true,
        localImmediate = false,
        storeImmediate = false,
        deserialize = identity,
        serialize = identity,
        debounce,
      },
    ) => {
      const propKey = pathHead(propPath);
      const deepPropPath = pathTail(propPath);
      const isDeepProp = propKey !== propPath;
      const storeMutation = defaultTo(() => {}, dpath(storeMutationPath, this));
      const debounceMs = this.debounce || debounce;
      const deserializeFn = this.deserialize || this[deserialize] || deserialize;
      const serializeFn = this.serialize || this[serialize] || serialize;

      // updateProp :: emmits update events for prop
      const updateProp = (v) => {
        const event = alt('input', `update:${propKey}`, propKey === 'value');
        let newValue = clone(v);

        if (isDeepProp) {
          const oldProp = clone(dpath(propKey, this));
          newValue = dassoc(deepPropPath, newValue, oldProp);
        }

        this.$emit(event, newValue);
      };

      const syncExternalFactory = (update, p) => {
        const asyncUpdate = createDebounce(debounceMs, update);

        return alt((v) => {
          const newLocal = serializeFn(v);
          if (equals(newLocal, dpath(p, this))) return;

          alt(asyncUpdate, update, debounceMs)(newLocal);
        }, () => {}, p);
      };

      // syncProp :: watch handler for prop
      const syncProp = syncExternalFactory(updateProp, propPath);

      // syncStore :: watch handler for store
      const syncStore = syncExternalFactory(storeMutation, storePath);

      // syncLocal :: watch handler for data
      const syncLocal = (v) => {
        const newProp = deserializeFn(v);
        if (equals(newProp, dpath(localPath, this))) return;
        mutatePath(localPath.split('.'), clone(newProp), this);
      };

      // addWatcher adds watcher for path
      const addWatcher = (p, immediate, ...handlers) => {
        if (p) this.$watch(p, juxt(handlers), { deep: true, immediate });
      };

      // Add watcher for all path
      forEach(args => addWatcher(...args), [
        [localPath, localImmediate, syncProp, syncStore],
        [propPath, propImmediate, syncLocal, syncStore],
        [storePath, storeImmediate, syncLocal, syncProp],
      ]);
    });
  },
});

export default syncMixinFactory;
