/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 7701:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm.js
var vue_esm = __webpack_require__(538);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/pages/App.vue?vue&type=template&id=6423ebf4&lang=pug&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    { staticClass: "app", style: _vm.styleCustomizations },
    [
      _c("div", { staticClass: "title" }, [_vm._v("XVS Extension")]),
      _c(
        "ui-tabs",
        [
          _c("ui-tab", { attrs: { default: "", tab: "Deployments" } }, [
            _vm._v("Deployments"),
          ]),
          _c("ui-tab", { attrs: { tab: "Requests" } }, [_vm._v("Requests")]),
          _c(
            "ui-pad",
            { attrs: { pad: "Deployments" } },
            [
              _c("div", { staticClass: "summary-tab" }, [_vm._v("uno")]),
              _c("c-data-table", {
                attrs: { headers: _vm.headers, "hide-go-to-page-section": "" },
                scopedSlots: _vm._u([
                  {
                    key: "items",
                    fn: function ({ row, visibleHeaders }) {
                      return [
                        _c(
                          "tr",
                          {
                            staticClass: "table__row hoverable",
                            attrs: { id: row.id },
                          },
                          [
                            _vm._l(visibleHeaders, function (header) {
                              return [
                                header.value === "customer"
                                  ? _c(
                                      "td",
                                      {
                                        key: header.value,
                                        staticClass: "nowrap-cell",
                                      },
                                      [_c("span", [_vm._v(_vm._s(row.id))])]
                                    )
                                  : _vm._e(),
                              ]
                            }),
                          ],
                          2
                        ),
                      ]
                    },
                  },
                ]),
                model: {
                  value: _vm.localValue,
                  callback: function ($$v) {
                    _vm.localValue = $$v
                  },
                  expression: "localValue",
                },
              }),
            ],
            1
          ),
          _c(
            "ui-pad",
            { attrs: { pad: "Requests" } },
            [
              _c("div", { staticClass: "subscriptions-tab" }, [_vm._v("dos")]),
              _c("c-data-table", {
                attrs: { headers: _vm.headers, "hide-go-to-page-section": "" },
                scopedSlots: _vm._u([
                  {
                    key: "items",
                    fn: function ({ row, visibleHeaders }) {
                      return [
                        _c(
                          "tr",
                          {
                            staticClass: "table__row hoverable",
                            attrs: { id: row.id },
                          },
                          [
                            _vm._l(visibleHeaders, function (header) {
                              return [
                                header.value === "customer"
                                  ? _c(
                                      "td",
                                      {
                                        key: header.value,
                                        staticClass: "nowrap-cell",
                                      },
                                      [_c("span", [_vm._v(_vm._s(row.id))])]
                                    )
                                  : _vm._e(),
                              ]
                            }),
                          ],
                          2
                        ),
                      ]
                    },
                  },
                ]),
                model: {
                  value: _vm.localValue,
                  callback: function ($$v) {
                    _vm.localValue = $$v
                  },
                  expression: "localValue",
                },
              }),
            ],
            1
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/pages/App.vue?vue&type=template&id=6423ebf4&lang=pug&

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cDataTable.vue?vue&type=template&id=520b2abd&scoped=true&lang=pug&
var cDataTablevue_type_template_id_520b2abd_scoped_true_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    {
      staticClass: "c-data-table",
      class: { "c-data-table-loading": _vm.localUpdating },
    },
    [
      _c(
        "c-table",
        _vm._g(
          _vm._b(
            {
              ref: "c-table",
              attrs: {
                loading: _vm.localUpdating,
                "show-placeholder": _vm.isPlaceholderShown,
                headers: _vm.localHeaders,
                value: _vm.items,
                "total-items": _vm.localTotal,
                pagination: _vm.pagination,
                "hide-go-to-page-section": _vm.hideGoToPageSection,
                "hide-rows-per-page-section": _vm.hideRowsPerPageSection,
                "hide-all-pagination-sections": _vm.hideAllPaginationSections,
                "headers-widths": _vm.headersWidths,
                padding: _vm.padding,
                "fix-layout": _vm.fixLayout,
                "hide-empty-table": _vm.hideEmptyTable,
                "no-data-text": _vm.noDataText,
                "fixed-first-column": _vm.fixedFirstColumn,
              },
              on: {
                "update:headers": function ($event) {
                  _vm.localHeaders = $event
                },
                "update:pagination": function ($event) {
                  _vm.pagination = $event
                },
                refresh: _vm.refresh,
                "update:headersWidths": function ($event) {
                  _vm.headersWidths = $event
                },
                "update:headers-widths": function ($event) {
                  _vm.headersWidths = $event
                },
              },
              scopedSlots: _vm._u(
                [
                  {
                    key: "buttons",
                    fn: function (props) {
                      return [_vm._t("buttons", null, null, props)]
                    },
                  },
                  {
                    key: "headers",
                    fn: function (props) {
                      return [_vm._t("headers", null, null, props)]
                    },
                  },
                  {
                    key: "append-header-item",
                    fn: function (header) {
                      return [_vm._t("append-header-item", null, null, header)]
                    },
                  },
                  {
                    key: "items",
                    fn: function (props) {
                      return [_vm._t("items", null, null, props)]
                    },
                  },
                  {
                    key: "placeholder",
                    fn: function () {
                      return [_vm._t("placeholder")]
                    },
                    proxy: true,
                  },
                  {
                    key: "progress",
                    fn: function () {
                      return [
                        _vm._t("progress", function () {
                          return [
                            _c(
                              "div",
                              { staticClass: "progress-spinner" },
                              [
                                _c("c-icon", {
                                  staticClass: "circle-loader",
                                  attrs: {
                                    size: 34,
                                    icon: _vm.icons.connectLoaderAnimated,
                                    color: "accent",
                                    locator: "loading-indicator",
                                  },
                                }),
                              ],
                              1
                            ),
                          ]
                        }),
                      ]
                    },
                    proxy: true,
                  },
                ],
                null,
                true
              ),
            },
            "c-table",
            _vm.$attrs,
            false
          ),
          _vm.listeners
        )
      ),
    ],
    1
  )
}
var cDataTablevue_type_template_id_520b2abd_scoped_true_lang_pug_staticRenderFns = []
cDataTablevue_type_template_id_520b2abd_scoped_true_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cDataTable.vue?vue&type=template&id=520b2abd&scoped=true&lang=pug&

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/connect/loader/animated.svg
var animated = __webpack_require__(3836);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/hourglass_bottom/baseline.svg
var baseline = __webpack_require__(9553);
// EXTERNAL MODULE: ./node_modules/hash-sum/hash-sum.js
var hash_sum = __webpack_require__(504);
var hash_sum_default = /*#__PURE__*/__webpack_require__.n(hash_sum);
// EXTERNAL MODULE: ./node_modules/ramda/es/index.js + 183 modules
var es = __webpack_require__(9535);
;// CONCATENATED MODULE: ./ui/src/tools/utils.js



/**
 * Flattens nested object properties.
 *
 * @function
 * @param {object} source Source object.
 * @returns {object}
 *
 * @example
 * flattenObj({ a: { b: B, c: C } }) //=> { 'a.b': B, 'a.c': C }
 */
const flattenObj = (source) => {
  const go = obj_ => (0,es/* chain */.tSV)(([k, v]) => {
    if ((0,es/* type */.dt8)(v) === 'Object' || (0,es/* type */.dt8)(v) === 'Array') {
      return (0,es/* map */.UID)(([k_, v_]) => [`${k}.${k_}`, v_], go(v));
    }

    return [[k, v]];
  }, (0,es/* toPairs */.Zpf)(obj_));

  return (0,es/* fromPairs */.Pen)(go(source));
};

/**
 * Returns first truthy value of two property paths.
 * If there is no truthy value returns last of two.
 *
 * @function
 * @param {array} propPath
 * @param {array} altPropPath
 * @param {object} source
 * @returns {*}
 *
 * @example
 * pathOrPath([a, b], [c], { a: [ b: B ], c: C }) //=> B
 * pathOrPath([a, b], [c], { c: C }) //=> C
 */
const pathOrPath = (0,es/* curry */.WAo)((a, b, source) => (0,es.or)((0,es/* path */.ETc)(a, source), (0,es/* path */.ETc)(b, source)));

/**
 * Invokes `cb` function with value retrieved from `target` at a given path
 * and returns result of `cb`.
 *
 * @function
 * @param {array} path Prop path.
 * @param {function} cb Callback function.
 * @param {object} target Target object.
 * @returns {*} Result of `cb` call.
 *
 * @example
 * pathTo(['a', 'b'], a => a * 2, { a: { b: 2 } }) //=> 4
 */
const pathTo = (0,es/* curry */.WAo)((p, cb, target) => (0,es/* pipe */.zGw)((0,es/* path */.ETc)(p), cb)(target));

/**
 * Check that given value is object.
 *
 * @function
 * @param {object} value
 * @returns {boolean}
 *
 * @example
 * isObjectStrict({}) //=> true
 * isObjectStrict(1) //=> false
 */
const isObjectStrict = (0,es/* pipe */.zGw)(es/* type */.dt8, (0,es/* equals */.fS0)('Object'));

/**
 * Verify all elements are number or string.
 *
 * @function
 * @param {array} arr
 * @returns {boolean}
 */
const isAllPrimitive = (0,es/* all */.$6P)((0,es/* anyPass */.H50)([(0,es.is)(Number), (0,es.is)(String)]));

/**
 * Returns new object based on a template.
 * Supports nested objects.
 *
 * @function
 * @param {object} template
 * @param {object} source
 * @returns {object}
 *
 * @example
 * template(
 *  {
 *    id: path(['data', 'uuid'])
 *  },
 *  { data: { uuid: 42 } }
 * ) //=> { id: 42 }
 *
 * @example #2
 * template({
 *   id: ['data', 'uuid'],
 *   title: ['data', 'details', 'title'],
 * })
 * ({
 *  data: {
 *    uuid: 53,
 *    details: {
 *      title: 'hello world!',
 *      amount: 10,
 *    },
 *  }
 * })  //=> { id: 53, title: 'hello world!' }
 */
const template = (0,es/* curry */.WAo)((tpl, src) => {
  /* eslint-disable no-use-before-define */
  function processTpl(v) {
    return (0,es/* map */.UID)((0,es/* cond */.wVM)([
      // Result of function
      [(0,es.is)(Function), (0,es/* applyTo */.gH4)(src)],

      // Empty is constant data
      [es/* isEmpty */.xbD, es/* identity */.yRu],

      // Array may be path or template
      [(0,es.is)(Array), processArray],

      // Object is always template part
      [isObjectStrict, template(es.__, src)],

      // Everything else is constant data
      [es.T, es/* identity */.yRu],
    ]))(v);
  }

  function processArray(v) {
    return (0,es/* cond */.wVM)([
      // if array is path
      [isAllPrimitive, (0,es/* path */.ETc)(es.__, src)],

      // In other cases array is template part
      [es.T, processTpl],
    ])(v);
  }

  return processTpl(tpl);
});

/**
 * Calls `onTrueFn` if value at given path is truthy, otherwise `onFalseFn`.
 * Functions will be invoked with `source` object as first argument.
 *
 * @function
 * @param {array} path
 * @param {function} onTrueFn
 * @param {function} onFalseFn
 * @param {object} source
 * @returns {*}
 *
 * @example
 * pathIfElse(
 *  ['a', 'b'],
 *  () => 1,
 *  () => 2
 * )({ a: { b: 0 } })
 * //=> 2
 */
const pathIfElse = (0,es/* curry */.WAo)((p, i, e) => pathTo(p, (0,es/* ifElse */.KJl)(es/* identity */.yRu, i, e)));

/**
 * Calls `fn` with `props` values as first argument and returns result of that call.
 *
 * @function
 * @param {array} props
 * @param {function} fn
 * @param {object} source
 * @returns {*}
 *
 * @example
 * propsTo(['a', 'b'], (props) => props, { a: 1, b: 2 }) //=> [1, 2]
 */
const propsTo = (0,es/* curry */.WAo)((p, cb, source) => (0,es/* pipe */.zGw)((0,es/* props */.NQ5)(p), cb)(source));

/**
 * Returns value based on condition.
 * If truthy returns first, otherwise second.
 * Condition could be function, in this case returns a function that after call
 * invokes condition function with actual arguments and apply to `alt`.
 *
 * @function
 * @param {*} a Value if condition is true
 * @param {*} b Value if condition is false
 * @param {*} cond Condition
 * @returns {*}
 */
const alt = (0,es/* curry */.WAo)((t, f, c) => {
  if ((0,es.is)(Function, c)) {
    return (...v) => alt(t, f, c(...v));
  }

  return c ? t : f;
});

/**
 * Returns `true` if value is empty, `null` or `undefined`, otherwise `false`.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 *
 * @example
 * isNilOrEmpty({}) //=> true
 * isNilOrEmpty([1]) //=> false
 */
const isNilOrEmpty = (0,es/* anyPass */.H50)([es/* isEmpty */.xbD, es/* isNil */.kKJ]);

/**
 * Returns `true` if value is not empty and not `null`/`undefined`, otherwise `false`.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 */
const isNotNilOrEmpty = (0,es/* complement */.CyQ)(isNilOrEmpty);

/**
 * Checks truthiness of a property.
 * Returns true if property value is falsy.
 *
 * @function
 * @param {string} prop
 * @param {object}
 * @returns {boolean}
 *
 * @example
 * notProp('country', { country: '' }) //=> true
 * notProp('country', { country: 'France' }) //=> false
 */
const notProp = (0,es/* complement */.CyQ)(es/* prop */.vgT);

/**
 * Returns new empty object.
 *
 * @function
 * @returns {object}
 */
const obj = () => ({});

/**
 * If value is truthy at given path return `t` value, `f` otherwise.
 *
 * @function
 * @param {array} path
 * @param {*} t Value returned if path value is truthy
 * @param {*} f Value returned if path value is falsy
 * @param {object} target Target object
 * @returns {*}
 *
 * @example
 * pathAlt(['a', 'b'], true, false, {}) //=> false
 * pathAlt(['a', 'b'], 'pass', 'fail', { a: { b: 42 } }) //=> 'pass'
 */
const pathAlt = (0,es/* curry */.WAo)((p, t, f) => pathTo(p, alt(t, f)));

/**
 * Invokes `cb` function with value retrieved from `target` at a given prop
 * and returns result of `cb`.
 *
 * @function
 * @param {array} Prop name.
 * @param {function} cb Callback function.
 * @param {object} target Target object.
 * @returns {*} Result of `cb` call.
 *
 * @example
 * propTo('a', a => a * 2, { a: 2 }) //=> 4
 */
const propTo = (0,es/* curry */.WAo)((p, cb, target) => (0,es/* pipe */.zGw)((0,es/* prop */.vgT)(p), cb)(target));

/**
 * Curried
 * If string is passed - splits with provided separator
 * If passed value is not a string - returns as is
 *
 * @function
 * @param {string} s Separator.
 * @param {*} str Target string.
 * @returns {*}
 *
 * @example
 * safeSplit('.', 'a.b.c') //=> ['a', 'b', 'c']
 * safeSplit('.', ['a', 'b', 'c') //=> ['a', 'b', 'c']
 */
const safeSplit = (0,es/* curry */.WAo)((s, str) => (0,es/* when */.gxm)((0,es.is)(String), (0,es/* split */.Vl2)(s))(str));

/**
 * Returns a value at a given path. Path must be in dot notation: `coords.lat`.
 *
 * @function
 * @param {string} path Property path in dot notation.
 * @param {object} obj Target object.
 * @returns {*}
 *
 * @example
 * dpath('a.b', { a: { b: 2 } }) //=> 2
 * dpath('a.b', { c: { b: 2 } }) //=> undefined
 */
const dpath = (0,es/* useWith */.Voj)(es/* path */.ETc, [safeSplit('.')]);

const random = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1) + min);

/** Curried. Wraps function into debounced function
 *  Meaning function execution will be delayed for defined amount of ms provided
 *  Each call of a function starts ms counts from the beginning
 *
 * @sig Number -> Function -> Function
 *
 * @function
 * @param {number}    ms   debounce timeout
 * @param {function}  cb   callback function
 *
 * @returns {function}
 */
const utils_debounce = (0,es/* curry */.WAo)((ms, cb) => {
  let delay;

  return function debounced(...args) {
    clearTimeout(delay);
    delay = setTimeout(() => {
      delay = null;
      cb.apply(this, args);
    }, ms);
  };
});

/** Converts String to kebab case ('yet-another-kebab-case')
 *
 * @sig String -> String
 * @sig '  Yet Another__RANDOM    string' -> 'yet-another-random-string'
 *
 * @function
 * @param {string}  key   transformed string
 *
 * @returns {string}
 */
const kebabCase = (0,es/* pipe */.zGw)(
  es/* toLower */.t$q,
  (0,es/* replace */.gxs)(/[-_]+/g, ' '),
  es/* trim */.fyY,
  (0,es/* replace */.gxs)(/\s+/g, '-'),
);

/**
 * Returns first truthy value of two properties.
 *
 * @function
 * @param {(string|number)} prop
 * @param {(string|number)} altProp
 * @param {object} source
 * @returns {*}
 *
 * @example
 * propOrProp(a, b, { a: A, b: B }) //=> A
 * propOrProp(a, b, { b: B }) //=> B
 */
const propOrProp = (0,es/* curry */.WAo)((a, b, source) => (0,es.or)((0,es/* prop */.vgT)(a, source), (0,es/* prop */.vgT)(b, source)));

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Path must be in dot notation: `coords.lat`.
 *
 * @function
 * @param {string} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @returns {*}
 *
 * @example
 * assocDPath('a.b.c', 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 */
const assocDPath = (0,es/* useWith */.Voj)(es/* assocPath */.uhR, [safeSplit('.')]);

/**
 * Returns root level prop by path in dot notation: `coords.lat`.
 *
 * @function
 * @param {String} path Property path in dot notation.
 * @returns {String}
 *
 * @example
 * pathHead('settings.filter.search') //=> 'settings'
 * pathHead('') //=> ''
 */
const pathHead = (0,es/* pipe */.zGw)(safeSplit('.'), es/* head */.YMb);

/**
 * Returns copy of object with result of 'setting' a path configured in dot notation ('coords.lat').
 *
 * @function
 * @param {string} path Property path in dot notation.
 * @param {*} Value that is about to be set.
 * @param {object} obj Target object.
 * @returns {object}
 *
 * @example
 * dassoc('a.b', 1, { a: { b: 2 } }) //=> { a: { b: 1 } }
 * dassoc('a.b', 1, { c: { b: 2 } }) //=>  { a: { b: 1 }, c: { b: 2 } }
 */
const dassoc = (0,es/* useWith */.Voj)(es/* assocPath */.uhR, [safeSplit('.')]);

/**
 * Mutable. Sets value of path passed as an Array (Same as R.assocPath but mutable)
 *
 * @function
 * @param {array} p - Property path as an array of Strings.
 * @param {*} v - Value that is about to be set.
 * @param {object} o - obj Target object.
 * @returns {object}
 *
 * @example
 * const obj = { a: { b: 1 } };
 * mutatePath('a.b', 2, obj );
 *
 * obj.a.b === 2 //=>  true
 */
const mutatePath = (p, v, o) => {
  const set = (oo, nextProp, ...otherProps) => {
    if ((0,es/* isEmpty */.xbD)(otherProps)) {
      oo[nextProp] = v;

      return o;
    }

    if ((0,es/* isNil */.kKJ)(oo[nextProp])) oo[nextProp] = {};

    return set(oo[nextProp], ...otherProps);
  };

  return set(o, ...p);
};

/**
 * Returns deep path without root key in dot notation: `coords.lat`.
 *
 * @function
 * @param {String} path Property path in dot notation.
 * @returns {Array}
 *
 * @example
 * pathHead('settings.filter.search') //=> ['filter', 'search']
 */
const pathTail = (0,es/* pipe */.zGw)(safeSplit('.'), es/* tail */.GbB);

/**
 * Returns true if the `value` is string.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 */
const isString = (0,es.is)(String);

/**
 * Return string representation of the given value.
 *
 * @function
 * @param {*} value
 * @returns {string}
 *
 * @example
 * ensureString('123') //=> '123'
 * ensureString(123) //=> '123'
 * ensureString([1, 2, 3]) //=> '123'
 * ensureString({ a: 1, b: 2 }) //=> '{ "a": 1, "b": 2 }'
 */
const ensureString = (0,es/* cond */.wVM)([
  [isNilOrEmpty, (0,es/* always */.Bxt)('')],
  [(0,es.is)(Array), (0,es/* join */.v_p)('')],
  [(0,es.is)(String), es/* identity */.yRu],
  [es.T, toString],
]);

const biarg = (0,es/* curry */.WAo)((f, a, b) => f(a)(b));

// ensureArray parse to array if it is not
// ensureArray :: Any -> Array
const ensureArray = (0,es/* unless */.qhW)((0,es.is)(Array), es.of);

/**
 * Returns first object from array whose property value at given path is
 * equal to `cmpVal`.
 *
 * @function
 * @param {array} path
 * @param {array} arr
 * @param {*} cmpVal
 * @returns {object|undefined}
 *
 * @example
 * findByPath(['a', 'b'], [{ a: { b: 1} }, { a: { b: 2 } }], 2) //=> { a: { b: 2 } }
 */
const findByPath = (0,es/* curry */.WAo)((k, a, v) => (0,es/* find */.sEJ)((0,es/* pathEq */.uF6)(k, v), a));

/**
  * Wrap up a value to array.
  *
  * @function
  * @param {*} value
  * @returns {array}
  *
  * @example
  * nest(1) //=> [1]
  * nest([1]) //=> [[1]]
  */
const nest = v => [v];

/**
 * Enrich object.
 *
 * @function
 * @param {string|array} sourcePath
 * @param {string|array} targetPath
 * @param {string} key
 * @param {object|array} source
 * @param {object|array} target
 * @returns {object|array}
 *
 * @example
 * enrich(
 *  ['a'],
 *  ['b'],
 *  'key',
 *  { a: 1 },
 *  { b: 1, c: 3 }
 * ) //=> { b: 2, c: 3, key: { a : 1 } }
 *
 * enrich(
 *  'id', 'id', 'plugged', [{ id: 1, data: 123 }, { id: 2, data: 321 }], [{ id: 1 }, { id: 2 }]
 * )
 * //=> [{ id: 1, plugged: { id: 1, data: 123 } }, { id: 2, plugged: { id: 2, data: 321 } }]
 */
const enrich = (0,es/* curry */.WAo)((bysrc, bytrg, to, s, t) => {
  const src = (0,es/* clone */.d9v)(s);
  const trg = (0,es/* clone */.d9v)(t);
  const trgPath = (0,es/* when */.gxm)((0,es.is)(String), nest)(bytrg);
  const srcPath = (0,es/* when */.gxm)((0,es.is)(String), nest)(bysrc);
  const enrichByPath = (0,es/* map */.UID)(i => (0,es/* assoc */.yGi)(
    to,
    (0,es/* pipe */.zGw)(
      (0,es/* path */.ETc)(trgPath),
      findByPath(srcPath, src),
    )(i),
  )(i));

  return (0,es/* ifElse */.KJl)(
    (0,es.is)(Array),
    enrichByPath,
    (0,es/* pipe */.zGw)(
      nest,
      enrichByPath,
      (0,es/* nth */.hL$)(0),
    ),
  )(trg);
});

/**
 * Search for object with specific property value in array.
 * If property with value exits return first found object, otherwise `undefined`.
 *
 * @function
 * @param {string} prop Property name
 * @param {*} value Property value
 * @param {array} arr Searched array
 * @returns {*|undefined}
 */
const findByProp = (0,es/* curry */.WAo)((p, v, a) => (0,es/* find */.sEJ)((0,es/* propEq */.OH4)(p, v), a));

/**
 * Standarizes a format for an alias with a prefix
 *
 * @param {String} contextProp - the name of the aliased prop
 *
 * @param {Object} opts
 * @param {String} opts.prefix - generated prefix
 */
const getAlias = (contextProp, { prefix } = {}) => (prefix ? `${prefix}:${contextProp}` : contextProp);

const hasMultipleElements = collection => is(Array, collection) && collection.length > 1;

/**
 * Given a value function checks that value is empty or `null`.
 * If value is object, deeply checks properties.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 *
 * @example
 * isDeepNilOrEmpty([]) //=> true
 * isDeepNilOrEmpty({}) //=> true
 * isDeepNilOrEmpty({ a: '', b: { c: [] } }) //=> true
 * isDeepNilOrEmpty({ a: '1' }) //=> false
 */
const isDeepNilOrEmpty = (0,es/* ifElse */.KJl)(
  isObjectStrict,
  (0,es/* pipe */.zGw)(flattenObj, es/* values */.VO0, (0,es/* all */.$6P)(isNilOrEmpty)),
  isNilOrEmpty,
);

/**
 * Return new empty array.
 *
 * @function
 * @returns {array}
 */
const arr = () => ([]);

/** Gets index of first object with equal prop with value in array
 *
 * @function
 * @param {string}    propName    name of object property in each object
 * @param {string}     value     finding value
 * @param {array}     array     array of similar objects
 *
 * @return {number}
 */
const findIndexByProp = (0,es/* curry */.WAo)(
  (propName, value, array) => (0,es/* findIndex */.cxD)((0,es/* propEq */.OH4)(propName, value))(array),
);

/**
 * Verify a given values is not equal. Handles cyclical data structures.
 *
 * @function
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 *
 * @example
 * notEquals(1, 1) //=> false
 * notEquals({}, {}) //=> false
 * notEquals({ a: 1 }, { a: 1, b: 2 }) //=> true
 * notEquals(3, 4) //=> true
 */
const notEquals = (0,es/* complement */.CyQ)(es/* equals */.fS0);

/**
 * Verify a given value is not empty.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 *
 * @example
 * notEmpty([]) //=> false
 * notEmpty({}) //=> false
 * notEmpty(0) //=> true
 */
const notEmpty = (0,es/* complement */.CyQ)(es/* isEmpty */.xbD);

/**
 * Creates deep copy of any objects using JSON.stringify/JSON.parse under the hood
 * and returns a result of call `cb` with a copied value.
 * If value undefined or function returns it as is.
 *
 * @function
 * @param {*} val Value to copy
 * @param {function} cb Transformation function
 * @returns {*}
 *
 * @example
 * snapshot({ a: { b: 2 } }, v => v) //=> { a: { b: 2 } } deep copy
 */
const snapshot = (val, cb = es/* identity */.yRu) => (0,es/* unless */.qhW)(
  (0,es/* either */.wEe)((0,es/* equals */.fS0)(undefined), (0,es.is)(Function)),
  v => cb(JSON.parse(JSON.stringify(v))),
)(val);

/**
 * Returns `true` if the second argument is less than the first; `false` otherwise.
 *
 * @function
 * @param {*} a Comparable value
 * @param {*} b Comparable value
 * @returns {boolean}
 *
 * @example
 * lessThan(2, 7) //=> false
 * lessThan(2, 1) //=> true
 */
const lessThan = (0,es/* flip */.RRI)(es.lt);

/**
 * Returns `true` if the second argument is greater than the first; `false` otherwise.
 *
 * @function
 * @param {*} a Comparable value
 * @param {*} b Comparable value
 * @returns {boolean}
 */
const moreThan = (0,es/* flip */.RRI)(es.gt);

/**
 * Compare value at path with `cmpValue`.
 *
 * @function
 * @param {array} path
 * @param {*} cmpValue Value to compare with.
 * @param {object} target
 * @returns {boolean}
 *
 * @example
 * pathNotEq(['a', 'b'], 42, { a: { b: 42 } }) //=> false
 */
const pathNotEq = (0,es/* complement */.CyQ)(es/* pathEq */.uF6);

/**
 * Safely concat arrays.
 * If argument is not array, wrap it up.
 *
 * @function
 * @param {*} a
 * @param {*} b
 * @returns {array}
 *
 * @example
 * safeConcat(1, [2]) //=> [1, 2]
 * safeConcat(null, 2) //=> [2]
 * safeConcat(null, null) //=> []
 */
const safeConcat = (0,es/* curry */.WAo)((o1, o2) => (0,es/* concat */.zoF)(
  ensureArray(o1),
  ensureArray(o2),
));

/**
 * Returns array of object values deeply traversing properties.
 *
 * @function
 * @param {object} source
 * @returns {array}
 *
 * @example
 * valuesDeep({ a: 1, b: { c: 2 }, d: 3 }) //=> [1, 2, 3]
 */
const valuesDeep = source => (0,es/* pipe */.zGw)(
  es/* keys */.XPQ,
  (0,es/* reduce */.u4g)((r, v) => (0,es/* pipe */.zGw)(
    (0,es/* prop */.vgT)(v),
    (0,es/* when */.gxm)(isObjectStrict, valuesDeep),
    (0,es/* concat */.zoF)(r),
  )(source), []),
)(source);

/**
 * Returns `true` if all properties is empty, `null` or `undefined`.
 * Before check removes properties given in `excludeProps` param.
 *
 * @function
 * @param {array} excludeProps Properties exclude from check.
 * @param {object} source
 * @returns {boolean}
 *
 * @example
 * isEmptyObjWithExceptions(['a', 'b'], { a: 7, b: [], c: 4 }) //=> false
 * isEmptyObjWithExceptions(['a', 'b'], { a: 7, b: [], c: [] }) //=> true
 */
const isEmptyObjWithExceptions = (0,es/* curry */.WAo)((excludeProps, params) => (0,es/* pipe */.zGw)(
  (0,es/* omit */.CEd)(excludeProps),
  valuesDeep,
  (0,es/* all */.$6P)(isNilOrEmpty),
)(params));

/**
 * Calls `fn` with `props` values as arguments and returns result of that call.
 *
 * @function
 * @param {array} props
 * @param {function} fn
 * @param {object} source
 * @returns {*}
 *
 * @example
 * propsApply(['a', 'b'], (...args) => args, { a: 1, b: 2 }) //=> [1, 2]
 */
const propsApply = (0,es/* curry */.WAo)((p, cb, source) => (0,es/* pipe */.zGw)((0,es/* props */.NQ5)(p), (0,es/* apply */.nnj)(cb))(source));

/** Updates array with new values starting with specific index
 *
 * @sig Number -> Array -> Array -> Array
 * @sig 0 -> [a, b] -> [A, B, C] -> [a, b, C]
 * @sig 5 -> [a, b] -> [A, B, C] -> [A, B, C, null, null, a, b]
 *
 * @param {number}  idx         start index
 * @param {Array}   data        new data
 * @param {Array}   collection  old data
 *
 * @returns {Array} updated array
 */
const updateIndex = (0,es/* curry */.WAo)((idx, data, collection) => {
  let trg = snapshot(collection);

  if (trg.length < idx) trg = trg.concat((0,es/* repeat */.rx1)(null, idx - trg.length));
  trg.splice(idx, data.length, data);

  return (0,es/* flatten */.xHg)(trg);
});

/**
 *
 * @param fns
 * @returns {*|[(function(*): boolean)]|string|boolean}
 *
 * @example
 * triargPipe(assoc, lens(identity), over)('a', pathEq(['b'], c), {b: c}) // => {a: true, b: c}
 */
const triargPipe = (...fns) => (0,es/* curry */.WAo)((a, b, c) => (0,es/* pipe */.zGw)(...fns)(a)(b)(c));

/**
 *
 * @type {*}
 *
 * @example
 * assocComputed('a', pathEq(['b'], c), {b: c}) // => {a: true, b: c}
 */
const assocComputed = triargPipe(es/* assoc */.yGi, (0,es/* lens */.g8p)(es/* identity */.yRu), es/* over */.xc);

/**
 * Generates random digits and chars sequence.
 *
 * @function
 * @param {number} count Symbols count.
 * @returns {string}
 *
 * @example
 * rhx(5) //=> 805f7
 * rhx(2) //=> 23
 * rhx(8) //=> 1679b26e
 */
const rhx = (0,es/* pipe */.zGw)((0,es/* times */.DZ1)(() => Math.floor(Math.random() * 16).toString(16)), (0,es/* join */.v_p)(''));

/**
 * Function wrapper around `toFixed` method.
 *
 * @function
 * @param {number} precision
 * @param {number} value
 * @returns {string}
 *
 * @example
 * toFixed(2, 2.34345) //=> 2.23
 * toFixed(2, 2) //=> 2.00
 */
const toFixed = (0,es/* curry */.WAo)((precision, v) => v.toFixed(precision));

;// CONCATENATED MODULE: ./ui/src/tools/mixins/sync.js





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
        deserialize = es/* identity */.yRu,
        serialize = es/* identity */.yRu,
        debounce,
      },
    ) => {
      const propKey = pathHead(propPath);
      const deepPropPath = pathTail(propPath);
      const isDeepProp = propKey !== propPath;
      const storeMutation = (0,es/* defaultTo */.yAE)(() => {}, dpath(storeMutationPath, this));
      const debounceMs = this.debounce || debounce;
      const deserializeFn = this.deserialize || this[deserialize] || deserialize;
      const serializeFn = this.serialize || this[serialize] || serialize;

      // updateProp :: emmits update events for prop
      const updateProp = (v) => {
        const event = alt('input', `update:${propKey}`, propKey === 'value');
        let newValue = (0,es/* clone */.d9v)(v);

        if (isDeepProp) {
          const oldProp = (0,es/* clone */.d9v)(dpath(propKey, this));
          newValue = dassoc(deepPropPath, newValue, oldProp);
        }

        this.$emit(event, newValue);
      };

      const syncExternalFactory = (update, p) => {
        const asyncUpdate = utils_debounce(debounceMs, update);

        return alt((v) => {
          const newLocal = serializeFn(v);
          if ((0,es/* equals */.fS0)(newLocal, dpath(p, this))) return;

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
        if ((0,es/* equals */.fS0)(newProp, dpath(localPath, this))) return;
        mutatePath(localPath.split('.'), (0,es/* clone */.d9v)(newProp), this);
      };

      // addWatcher adds watcher for path
      const addWatcher = (p, immediate, ...handlers) => {
        if (p) this.$watch(p, (0,es/* juxt */.tEA)(handlers), { deep: true, immediate });
      };

      // Add watcher for all path
      (0,es/* forEach */.Ed_)(args => addWatcher(...args), [
        [localPath, localImmediate, syncProp, syncStore],
        [propPath, propImmediate, syncLocal, syncStore],
        [storePath, storeImmediate, syncLocal, syncProp],
      ]);
    });
  },
});

/* harmony default export */ const mixins_sync = (syncMixinFactory);

// EXTERNAL MODULE: ./node_modules/color-convert/index.js
var color_convert = __webpack_require__(2085);
var color_convert_default = /*#__PURE__*/__webpack_require__.n(color_convert);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/check_circle/baseline.svg
var check_circle_baseline = __webpack_require__(4752);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/fiber_manual_record/baseline.svg
var fiber_manual_record_baseline = __webpack_require__(5136);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/error/baseline.svg
var error_baseline = __webpack_require__(208);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/cancel/baseline.svg
var cancel_baseline = __webpack_require__(2171);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/visibility_off/baseline.svg
var visibility_off_baseline = __webpack_require__(9829);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/label_off/baseline.svg
var label_off_baseline = __webpack_require__(6263);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/label/baseline.svg
var label_baseline = __webpack_require__(5366);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/lock/baseline.svg
var lock_baseline = __webpack_require__(7424);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/lock_open/baseline.svg
var lock_open_baseline = __webpack_require__(9521);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/pause_circle_filled/baseline.svg
var pause_circle_filled_baseline = __webpack_require__(5744);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/remove_circle/baseline.svg
var remove_circle_baseline = __webpack_require__(3777);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/connect/optimized_clock/animated.svg
var optimized_clock_animated = __webpack_require__(6569);
;// CONCATENATED MODULE: ./ui/src/tools/constants.js





/* COLORS */
/* eslint padding-line-between-statements: 0 */
const baseTextColor = '#212121';
const assistiveTextColor = '#707070';
const cGreyDarken1 = '#757575';
const cGreyDarken2 = '#616161';
const cGreyDarken3 = '#424242';
const disabledColor = '#bdbdbd';
const niceGreen = '#0bb071';
const niceRed = '#ff6a6a';
const orangeDimmed = '#f2994a';
const paleOrange = '#fff2e6';
const themeGrey1 = '#666666';
const themeLight1 = '#e0e0e0';
const yellow = '#F2C94C';
const white = '#ffffff';
const whiteSmoke = '#f5f5f5';

const defaultEchartsColorPalette = (/* unused pure expression or super */ null && ([
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
]));

const colorsDict = {
  black: 'black',
  blue: 'blue',
  green: 'green',
  grey: 'grey',
  lightBlue: 'light blue',
  lime: 'lime',
  orange: 'orange',
  pink: 'pink',
  red: 'red',
  violet: 'violet',
  white: 'white',
};

// Hex only
const colorsValues = {
  [colorsDict.blue]: {
    color: '#3150bc',
    label: 'blue',
  },
  [colorsDict.green]: {
    color: '#0bb071',
    label: 'green',
  },
  [colorsDict.grey]: {
    color: '#666666',
    label: 'grey',
  },
  [colorsDict.lightBlue]: {
    color: '#2c98f0',
    label: 'light blue',
  },
  [colorsDict.lime]: {
    color: '#2fb11a',
    label: 'lime',
  },
  [colorsDict.orange]: {
    color: '#f2994a',
    label: 'orange',
  },
  [colorsDict.pink]: {
    color: '#f70076',
    label: 'pink',
  },
  [colorsDict.red]: {
    color: '#ff6a6a',
    label: 'red',
  },
  [colorsDict.violet]: {
    color: '#8133ff',
    label: 'violet',
  },
  [colorsDict.white]: {
    color: '#ffffff',
    label: 'white',
  },
  [colorsDict.black]: {
    color: '#000000',
    label: 'black',
  },
};

const colorVars = [
  'primary',
  'accent',
  'contrast',
];


/* REST */
const responseTypes = {
  BLOB: 'blob',
  JSON: 'json',
  FORM_DATA: 'formData',
  TEXT: 'text',
};

/* STATUSES */

const icons = {
  done: check_circle_baseline/* default */.Z,
  dot: fiber_manual_record_baseline/* default */.Z,
  error: error_baseline/* default */.Z,
  failed: cancel_baseline/* default */.Z,
  hidden: visibility_off_baseline/* default */.Z,
  label_off: label_off_baseline/* default */.Z,
  label: label_baseline/* default */.Z,
  lock: lock_baseline/* default */.Z,
  open: lock_open_baseline/* default */.Z,
  paused: pause_circle_filled_baseline/* default */.Z,
  skip: remove_circle_baseline/* default */.Z,
  waiting: optimized_clock_animated/* default */.Z,
};

const statusesColors = {
  attention: '#f2994a',
  default: '#424242',
  disabled: '#b1b1b1',
  done: '#0bb071',
  negative: '#ff6a6a',
};

const statuses = {
  deleted: {
    text: 'deleted',
    icon: icons.failed,
    color: statusesColors.negative,
  },
  active: {
    text: 'active',
    icon: icons.done,
    color: statusesColors.done,
  },
  reconfiguring: {
    text: 'reconfiguring',
    icon: icons.waiting,
    color: statusesColors.attention,
  },
  reviewing: {
    text: 'reviewing',
    icon: icons.waiting,
    color: statusesColors.disabled,
  },
  pending: {
    text: 'pending',
    icon: icons.waiting,
    color: statusesColors.disabled,
  },
  processing: {
    text: 'processing',
    icon: icons.waiting,
    color: statusesColors.disabled,
  },
  suspended: {
    text: 'suspended',
    icon: icons.paused,
    color: statusesColors.attention,
  },
  terminated: {
    text: 'terminated',
    icon: icons.failed,
    color: statusesColors.negative,
  },
  terminating: {
    text: 'terminating',
    icon: icons.waiting,
    color: statusesColors.negative,
  },
};

const animationTime = 300;


const timeFormats = {
  TIME: 'LT',
  TIME_WITH_SECONDS: 'LTS',
};

const discountLevels = {
  '01A12': 'Level 1',
  '02A12': 'Level 2',
  '03A12': 'Level 3',
  '04A12': 'Level 4',
};

;// CONCATENATED MODULE: ./ui/src/tools/helpers.js











/**
 * Convert HEX to RGB.
 *
 * @function
 * @param {string} hex Hex string
 * @returns {array} Color in RGB color space
 *
 * @example
 * hexToRGB('ffffff') //=> [255, 255, 255]
 */
const hexToRGB = hex => color_convert_default().hex.rgb(hex);

/**
 * Returns a object with a given key as property in format `--{key}` and
 * RGB components with comma delimiter as value.
 *
 * @function
 * @param {string} key
 * @param {string} hexVal
 * @returns {object}
 *
 * @example
 * hexToStyleVar('color', '#00FF00') //=> { --color: '0, 255, 0' }
 */
const hexToStyleVar = (0,es/* curry */.WAo)((key, hex) => (0,es/* pipe */.zGw)(
  hexToRGB,
  (0,es/* join */.v_p)(', '),
  (0,es/* objOf */.RVN)(`--${key}`),
)(hex));

/**
 * If the input has no units, adds px to it, otherwise returns the input.
 *
 * @function
 * @param {string|number} value
 *
 * @example
 * ```javascript
 * addUnits(20) // '20px';
 * addUnits('20px') // '20px';
 * ```
 */
const addUnits = (0,es/* when */.gxm)(
  (0,es/* test */.Bul)(/^-?\d+$/),
  v => `${v}px`,
);

const checkVarColor = (0,es/* includes */.q9t)(es.__, colorVars);

const hexColor = (0,es/* when */.gxm)(
  (0,es/* has */.e$l)(es.__, colorsValues),
  colorName => (0,es/* path */.ETc)([colorName, 'color'], colorsValues),
);

const colorToRGB = (0,es/* pipe */.zGw)(
  hexColor,
  hexToRGB,
);

/**
 * Convert RGB to HEX.
 *
 * @function
 * @param {string} rgb rgb string
 * @returns {string} hex color string
 *
 * @example
 * hexToRGB('255, 255, 255') //=> 'ffffff'
 */
const rgbToHEX = (0,es/* pipe */.zGw)(
  (0,es/* split */.Vl2)(','),
  (0,es/* map */.UID)(Number),
  (color_convert_default()).rgb.hex,
);

const hexRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const validateColor = (0,es/* anyPass */.H50)([
  es/* isEmpty */.xbD,
  (0,es/* test */.Bul)(hexRegExp),
  checkVarColor,
  (0,es/* has */.e$l)(es.__, colorsValues),
]);

/**
 * Check is color bright or not.
 * https://www.w3.org/TR/AERT/#color-contrast
 *
 * @function
 * @param {string} color Color in hex (supports `#` at start)
 * @returns {boolean} Is color bright or not
 */
const isBright = (0,es/* pipe */.zGw)(
  (0,es/* replace */.gxs)('#', ''),
  (color_convert_default()).hex.rgb,
  ([r, g, b]) => r * 0.299 + g * 0.587 + b * 0.114 > 180,
);

const validateHexColor = (0,es/* ifElse */.KJl)(
  Boolean,
  (0,es/* test */.Bul)(hexRegExp),
  es.T,
);

/**
 * Add delta value to each RGB components and returns hex value with `#` at start.
 * If value out of range, round to nearest.
 *
 * @function
 * @param {number} delta Delta value
 * @param {string} color Color in hex format
 * @returns {string} Color in hex with `#` at start.
 *
 * @example
 * hexBrightness(10)('00ffff') //=> '#0AFFFF'
 */
const hexBrightness = (0,es/* curry */.WAo)((delta, color) => (0,es/* pipe */.zGw)(
  (color_convert_default()).hex.rgb,
  (0,es/* map */.UID)((v) => {
    const val = v + delta;

    if (val < 0) {
      return 0;
    }

    if (val > 255) {
      return 255;
    }

    return val;
  }),
  (color_convert_default()).rgb.hex,
  (0,es/* concat */.zoF)('#'),
)(color));

/**
 * Capitalize string.
 *
 * @function
 * @param {string} str
 * @returns {string} Capitalized string.
 *
 * @example
 * toUpperFirstLetter('text') //=> 'Text'
 */
const toUpperFirstLetter = (0,es/* pipe */.zGw)(
  ensureString,
  (0,es/* converge */.v19)(es/* concat */.zoF, [
    (0,es/* pipe */.zGw)(es/* head */.YMb, es/* toUpper */.GBc),
    es/* tail */.GbB,
  ]),
);

/**
 * Represent object to array of objects.
 *
 * @function
 * @param {array} keys Pair of keys.
 * @param {object} source
 * @returns {array}
 *
 * @example
 * hydrateObj(['k', 'v'], { k1: v1, k2: v2 }) //=> [{ k: k1, v: v1 }, { k: k2, v: v2 }]
 * hydrateObj(['k', 'v', 'd'], { k1: v1, k2: v2 }) //=> [{ k: k1, v: v1 }, { k: k2, v: v2 }]
 */
const hydrateObj = biarg(k => (0,es/* pipe */.zGw)(es/* toPairs */.Zpf, (0,es/* map */.UID)((0,es/* zipObj */._Qy)(k))));

/**
 * Returns array of items with fields `value`, `text`.
 *
 * @function
 * @param {*} value
 * @returns {array} Prepared items.
 */
const prepareSelectItems = (0,es/* cond */.wVM)([
  [(0,es/* both */.HkC)((0,es.is)(Array), (0,es/* none */.YPD)((0,es.is)(Object))), (0,es/* map */.UID)(value => ({ value, text: toUpperFirstLetter(value) }))],
  [isObjectStrict, hydrateObj(['value', 'text'])],
  [es.T, ensureArray],
]);

/** Drops object with hide prop
 * @type {Function}
 * @param {Array} objs - objects
 * @return {Any}
 *
 * @summary Array -> Array
 * @example
 * Input:: dropHidden([{v: '1', hide: true}, {v: '2'}])
 * Output:: [{v: '2'}]
 */
const dropHidden = (0,es/* reject */.d1t)((0,es/* propEq */.OH4)('hide', true));

/**
 * Returns value based on condition.
 * If truthy returns first, otherwise second.
 * Condition could be function, in this case returns a function that after call
 * invokes condition function with actual arguments and apply to `alt`.
 *
 * @function
 * @param {*} a Value if condition is true
 * @param {*} b Value if condition is false
 * @param {*} cond Condition
 * @returns {*}
 */
const helpers_alt = (0,es/* curry */.WAo)((t, f, c) => {
  if ((0,es.is)(Function, c)) {
    return (...v) => helpers_alt(t, f, c(...v));
  }

  return c ? t : f;
});

const getSkeletonsArray = number => (new Array(10)).fill(null)
  .map(() => (new Array(number)).fill(null)
    .map(() => Math.floor(Math.random() * 51) + 50));


/**
 * Checks if a given value is empty, null or undefined.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 */
const helpers_isNilOrEmpty = (0,es/* anyPass */.H50)([es/* isEmpty */.xbD, es/* isNil */.kKJ]);

/**
 * Returns default alt-icon for pic component
 *
 * @function
 * @param {*} v
 * @returns {string}
 *
 * @example
 * altIcon('') //=> googleLanguageBaseline
 * altIcon(null) //=> googleLanguageBaseline
 * altIcon('abc') //=> ''
 */
const helpers_altIcon = v => (helpers_isNilOrEmpty(v) ? googleLanguageBaseline : '');

;// CONCATENATED MODULE: ./ui/src/tools/mixins/entityTable.js









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

/* harmony default export */ const mixins_entityTable = ((/* unused pure expression or super */ null && (entityTable)));

;// CONCATENATED MODULE: ./ui/src/tools/mixins/validate.js





/* validateMixinFabric :: adds the ability to validate input with rules
 *
 * *** Mixin usage example ***
 *
 * ChildComponent.vue
 *
 *   mixins: [
 *     validate({
 *       rules: 'rules',                  // String || Array  creates Prop
 *       externalErrors: 'errorMessages', // String || Array  creates Prop
 *       localErrors: 'validationErrors'  // Array            creates Data
 *       observed: 'localValue',          // default: 'value' creates Data
 *       status: 'isValid',               // default: 'localIsValid' creates Data
 *       processing: 'isValidating',      //                  creates Data
 *       middleware: 'handler'            // String | Fn -> Array<String|Boolean>
 *                   (status, observed, errorMessages) => toUpperCase(errorMessages),
 *     }),
 *   ],
 *
 * *** Enhanced component usage example ***
 *
 * ParentComponent
 *   child-component(
 *     v-model="form.name",
 *     :rules="[rules.required, rules.email]",
 *     :errorMessages="['Please, fulfill this field!', 'This field should be an email']",
 *     // NOTE: Automaticaly sets error state + adds error messages to field
 *   )
 *
 * ParentComponent
 *   child-component(
 *     v-model="form.name",
 *     :rules="[rules.required, rules.email]",
 *     :error="true",  // NOTE: Automaticaly sets error state to field
 *   )
 */
const validateMixinFactory = ({
  observed = 'value',
  rules = 'rules',
  status = 'localIsValid',
  processing = 'isValidating',
  middleware = null, // (status, observed, errorMessages) => {}
  externalErrors = 'errorMessages',
  localErrors = 'validationErrors',
}) => ({
  props: {
    [rules]: {
      type: Array,
      default: () => ([]),
    },
    [externalErrors]: { // NOTE: force error + custom error messages
      type: [String, Array],
      default: '',
    },
  },

  data() {
    return {
      [status]: null,
      [processing]: false,
      validate__rulesApplianceResult: null,
    };
  },

  computed: {
    [localErrors]: (0,es/* pipe */.zGw)(
      propOrProp(externalErrors, 'validate__rulesApplianceResult'),
      (0,es/* when */.gxm)((0,es.is)(String), nest),
      (0,es/* unless */.qhW)((0,es.is)(Array), (0,es/* always */.Bxt)([])),
    ),
  },

  methods: {
    async validateField(value) { // NOTE: return True|False|Array<String>
      if (!this[rules].length) return true;

      this[processing] = true;

      // NOTE: array with results of appliance each rule against value accordingly true|false|String
      const validationResults = await Promise.all(this.rules.map(r => r(value)));

      // NOTE: array of strings (error messages), or `true`, if all rules passed
      return (0,es/* reduce */.u4g)((acc, res) => {
        let result = acc;

        if (res === true) return result;
        if (acc === true) result = [];
        if ((0,es.is)(String, res)) result.push(res);

        return result;
      }, true, validationResults);
    },
  },

  watch: {
    [observed]: {
      deep: true,
      async handler(newVal) {
        let validationResult = await this.validateField(newVal);
        // NOTE: transform validation result with a middleware function
        const middlewareFn = (0,es/* ifElse */.KJl)(
          (0,es.is)(String),
          (0,es/* prop */.vgT)(es.__, this),
          es/* identity */.yRu,
        )(middleware);
        if (middlewareFn) {
          validationResult = await middlewareFn(
            validationResult === true,
            newVal,
            validationResult,
          );
        }

        this.validate__rulesApplianceResult = validationResult;
        this[status] = validationResult === true;
        this[processing] = false;
      },
    },
  },
});

/* harmony default export */ const validate = (validateMixinFactory);

;// CONCATENATED MODULE: ./ui/src/tools/mixins/index.js







;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cIcon.vue?vue&type=template&id=80f99fa2&lang=pug&
var cIconvue_type_template_id_80f99fa2_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "svg",
    {
      staticClass: "c-icon",
      class: _vm.classes,
      style: _vm.styles,
      attrs: { "view-box": _vm.icon.viewBox },
      on: {
        click: function ($event) {
          return _vm.$emit("click", $event)
        },
      },
    },
    [_c("use", { attrs: { "xlink:href": `#${_vm.icon.id}` } })]
  )
}
var cIconvue_type_template_id_80f99fa2_lang_pug_staticRenderFns = []
cIconvue_type_template_id_80f99fa2_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cIcon.vue?vue&type=template&id=80f99fa2&lang=pug&

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cIcon.vue?vue&type=script&lang=js&









/* harmony default export */ const cIconvue_type_script_lang_js_ = ({
  props: {
    icon: {
      type: Object,
      required: true,
    },

    color: String,

    disabled: Boolean,
    size: [Number, String],
  },

  computed: {
    classes: template({
      'c-icon_disabled': ['disabled'],
      'c-icon_link': pathOrPath(['$listeners', 'click'], ['$listeners', '!click']),
    }),

    actualColor: ({ $vuetify, color }) => (0,es/* pathOr */.pMU)(color, ['theme', color], $vuetify),

    styles: template({
      color: ['actualColor'],
      height: ['actualSize'],
      width: ['actualSize'],
    }),

    actualSize: pathTo(['size'], addUnits),
  },
});

;// CONCATENATED MODULE: ./ui/src/components/cIcon.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_cIconvue_type_script_lang_js_ = (cIconvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1900);
;// CONCATENATED MODULE: ./ui/src/components/cIcon.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  components_cIconvue_type_script_lang_js_,
  cIconvue_type_template_id_80f99fa2_lang_pug_render,
  cIconvue_type_template_id_80f99fa2_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const cIcon = (component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTable.vue?vue&type=template&id=295c8ef7&lang=pug&
var cTablevue_type_template_id_295c8ef7_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    {
      directives: [
        {
          name: "overflow-hint",
          rawName: "v-overflow-hint",
          value: ".c-table__overflow",
          expression: "'.c-table__overflow'",
        },
      ],
      ref: "c-table",
      staticClass: "c-table",
      class: { "c-table-loading": _vm.loading },
      style: _vm.style,
      attrs: { locator: _vm.locator },
    },
    [
      _c(
        "transition",
        { attrs: { name: _vm.placeholderTransitionName } },
        [_vm.showPlaceholder ? _vm._t("placeholder") : _vm._e()],
        2
      ),
      _vm.isTableVisible
        ? [
            _vm._t("panel", function () {
              return [
                _vm.manageable
                  ? _c("div", { staticClass: "c-table__panel" }, [
                      _c("div", { staticClass: "c-table__panel-actions" }),
                      _c(
                        "div",
                        { staticClass: "c-table_buttons" },
                        [
                          _vm._t("buttons", function () {
                            return [
                              _vm.showPagination
                                ? _c("c-table-pagination", {
                                    staticClass:
                                      "c-table__pagination c-table__pagination_top",
                                    attrs: {
                                      pagination: _vm.localPagination,
                                      options: _vm.paginationOptions,
                                      total: _vm.totalItems,
                                      count: _vm.localValue.length,
                                      "all-option": _vm.allowDisplayAll,
                                      "only-right-part": "",
                                      position: "top",
                                    },
                                    on: {
                                      "update:pagination": function ($event) {
                                        _vm.localPagination = $event
                                      },
                                    },
                                  })
                                : _vm._e(),
                            ]
                          }),
                        ],
                        2
                      ),
                    ])
                  : _vm._e(),
              ]
            }),
            _c("div", { staticClass: "table-relative" }, [
              _c("div", { staticClass: "c-table__overflow" }, [
                _c(
                  "table",
                  {
                    ref: "table",
                    class: {
                      "c-table_layout_fixed": _vm.fixLayout,
                      "c-table_loading": _vm.loading,
                      "c-table_dense": _vm.dense,
                    },
                    attrs: { locator: _vm.locator },
                  },
                  [
                    _vm.headers.length
                      ? _c("thead", [
                          _c(
                            "tr",
                            _vm._l(_vm.visibleHeaders, function (header) {
                              return _c(
                                "c-table-header",
                                _vm._b(
                                  {
                                    key: header.value,
                                    class: {
                                      "c-table-header_disabled-resize":
                                        !_vm.isInteractiveState,
                                    },
                                    attrs: {
                                      locator: `${header.value}-header`,
                                      align: header.align,
                                      value: header.value,
                                      text: header.text,
                                      manageable: _vm.manageable,
                                      width:
                                        _vm.localHeadersWidths[header.value],
                                      "min-width": header.minWidth,
                                      "not-resizable": header.notResizable,
                                      loading: _vm.loading,
                                      icon: header.icon,
                                    },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "append-header-item",
                                          fn: function () {
                                            return [
                                              _vm._t(
                                                "append-header-item",
                                                null,
                                                null,
                                                header
                                              ),
                                            ]
                                          },
                                          proxy: true,
                                        },
                                      ],
                                      null,
                                      true
                                    ),
                                  },
                                  "c-table-header",
                                  header.props,
                                  false
                                )
                              )
                            }),
                            1
                          ),
                        ])
                      : _vm._e(),
                    _c(
                      "tbody",
                      [
                        _vm.localValue.length
                          ? [
                              _vm._l(_vm.localValue, function (item, index) {
                                return [
                                  !_vm.hideLoader && (_vm.loading || !item)
                                    ? void 0
                                    : _vm._t("items", null, {
                                        visibleHeaders: _vm.visibleHeaders,
                                        item: item,
                                        row: _vm.prepareRow(item),
                                        afterItem: _vm.localValue[index + 1],
                                        beforeItem: _vm.localValue[index - 1],
                                        index: index,
                                      }),
                                ]
                              }),
                            ]
                          : !_vm.hideLoader && !_vm.isInteractiveState
                          ? _vm._l(10, function (row) {
                              return _c(
                                "tr",
                                { key: row, staticClass: "c-table__loader" },
                                _vm._l(
                                  _vm.headers,
                                  function (header, headerIndex) {
                                    return _c("td", { key: header.value }, [
                                      _vm.skeletonsWidths[row]
                                        ? _c("span", [
                                            _c("div", {
                                              staticClass:
                                                "c-table__loader_skeleton",
                                              style: `width: ${_vm.skeletonsWidths[row][headerIndex]}%;`,
                                            }),
                                          ])
                                        : _vm._e(),
                                    ])
                                  }
                                ),
                                0
                              )
                            })
                          : _c("tr", [
                              _c(
                                "td",
                                {
                                  staticClass: "text-xs-center",
                                  attrs: { colspan: _vm.visibleHeaders.length },
                                },
                                [_vm._v("No data available")]
                              ),
                            ]),
                      ],
                      2
                    ),
                    _c("tfoot", [_vm._t("footer")], 2),
                  ]
                ),
              ]),
            ]),
            _vm.showPagination
              ? _c(
                  "div",
                  { staticClass: "c-table__panel_bottom" },
                  [
                    _vm.showPagination
                      ? _c("c-table-pagination", {
                          staticClass:
                            "c-table__pagination c-table__pagination_bottom",
                          class: { disabled: !_vm.isInteractiveState },
                          attrs: {
                            pagination: _vm.localPagination,
                            options: _vm.paginationOptions,
                            total: _vm.totalItems,
                            count: _vm.localValue.length,
                            "all-option": _vm.allowDisplayAll,
                            "hide-go-to-page-section": _vm.hideGoToPageSection,
                            "hide-rows-per-page-section":
                              _vm.hideRowsPerPageSection,
                            "hide-all-sections": _vm.hideAllPaginationSections,
                          },
                          on: {
                            "update:pagination": function ($event) {
                              _vm.localPagination = $event
                            },
                          },
                        })
                      : _vm._e(),
                  ],
                  1
                )
              : _vm._e(),
          ]
        : _vm._e(),
    ],
    2
  )
}
var cTablevue_type_template_id_295c8ef7_lang_pug_staticRenderFns = []
cTablevue_type_template_id_295c8ef7_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cTable.vue?vue&type=template&id=295c8ef7&lang=pug&

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/refresh/baseline.svg
var refresh_baseline = __webpack_require__(2811);
;// CONCATENATED MODULE: ./ui/src/tools/directives/overflowHint.js






const OVERFLOW_STATUS = {
  NONE: 'none',
  LEFT: 'left',
  RIGHT: 'right',
  BOTH: 'both',
};

/**
 * Given an HTMLElement, checks if it has horizontal overflow and returns the overflow status.
 *
 * Gets the overflow status with simple operations:
 * - There is overflow if the element's scrollWidth is greater than its offsetWidth.
 * - To see if there is overflow on the left side we just check that its scrollLeft property
 * is greater than 0.
 * - To see if there is overflow on the right side, we check if the combined element's offsetWidth
 * and scrollLeft properties are less than the element's scrollWidth
 * Then it's just a matter of combination between those two.
 *
 * @param {HTMLElement} container - the container html element
 * @returns {string}
 */
const getOverflowStatus = ({ offsetWidth, scrollLeft, scrollWidth }) => {
  if ((0,es/* gte */.egL)(offsetWidth, scrollWidth)) return OVERFLOW_STATUS.NONE;

  const isOverflowingLeft = (0,es.gt)(scrollLeft, 0);
  const isOverflowingRight = (0,es.lt)(Math.ceil(scrollLeft + offsetWidth), scrollWidth);

  let status = OVERFLOW_STATUS.NONE;

  if (isOverflowingLeft) status = OVERFLOW_STATUS.LEFT;
  if (isOverflowingRight) status = OVERFLOW_STATUS.RIGHT;
  if (isOverflowingLeft && isOverflowingRight) status = OVERFLOW_STATUS.BOTH;

  return status;
};

const setClasses = (el, status) => {
  el.classList.remove('overflowing', 'overflowing_both', 'overflowing_right', 'overflowing_left');

  if (status !== OVERFLOW_STATUS.NONE) el.classList.add('overflowing', `overflowing_${status}`);
};

/**
 * Directive that shows a hint to the user when there is horizontal overflow
 *
 * @example
 * ```vue
 * <template lang="pug">
 *   // When controling the template
 *   .parent(v-overflow-hint)
 *     .child-elem-that-might-overflow
 *
 *   // When you don't have direct access to the overflow container in the template, you can
 *   // specify a css selector
 *   .some-elem(v-overflow-hint="'.overflow-container'")
 *     child-component-that-might-overflow
 * </template>
 * ```
 */
/* harmony default export */ const overflowHint = ({
  async bind(el, { value: selector }, { context }) {
    await context.$nextTick();

    const container = selector ? el.querySelector(selector) : el;

    const overflowElement = document.createElement('div');
    overflowElement.classList.add('overflow-container');
    container.append(overflowElement);

    const calculateOverflowStatus = utils_debounce(16, () => {
      setClasses(el, getOverflowStatus(container));
    });

    window.addEventListener('resize', calculateOverflowStatus);
    container.addEventListener('scroll', calculateOverflowStatus);
    const resizeObserver = new ResizeObserver(calculateOverflowStatus);
    resizeObserver.observe(container.firstElementChild);

    el.overflowhint = { calculateOverflowStatus, resizeObserver };
  },

  unbind: (el, { value: selector }) => {
    if (!el.overflowhint) return;
    const { calculateOverflowStatus, resizeObserver } = el.overflowhint;
    const container = selector ? el.querySelector(selector) : el;

    window.removeEventListener('resize', calculateOverflowStatus);
    if (container) container.removeEventListener('scroll', calculateOverflowStatus);
    resizeObserver.disconnect();
    el.overflowhint = null;
  },
});

;// CONCATENATED MODULE: ./ui/src/tools/directives/index.js



/* harmony default export */ const directives = ({
  overflowHint: overflowHint,
});

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTable/cTableHeader.vue?vue&type=template&id=4f079105&scoped=true&lang=pug&
var cTableHeadervue_type_template_id_4f079105_scoped_true_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    _vm.tag,
    {
      tag: "component",
      staticClass: "column c-table-header",
      class: `text-xs-${_vm.align}`,
      attrs: { role: "columnheader" },
    },
    [
      _c(
        "div",
        { staticClass: "c-table-header__wrapper" },
        [
          _vm.showManageIcon
            ? _c("c-menu", {
                staticClass: "th-menu",
                attrs: {
                  "close-on-click-inside": false,
                  position: "left",
                  attach: false,
                },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "trigger",
                      fn: function () {
                        return [
                          _c(
                            "div",
                            {
                              ref: "header",
                              staticClass: "c-table-header__button",
                              class: {
                                "c-table-header__button_active":
                                  _vm.menuVisibility,
                              },
                            },
                            [
                              _c(
                                "div",
                                { staticClass: "c-table-header__content" },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "c-table-header__text" },
                                    [_vm._v(_vm._s(_vm.text))]
                                  ),
                                  _c("c-icon", {
                                    staticClass: "c-table-header__icon",
                                    class: {
                                      "c-table-header__icon_active":
                                        _vm.isIconActive,
                                    },
                                    attrs: {
                                      icon: _vm.icons[_vm.masterIcon],
                                      size: "18",
                                    },
                                  }),
                                ],
                                1
                              ),
                            ]
                          ),
                        ]
                      },
                      proxy: true,
                    },
                  ],
                  null,
                  false,
                  689356806
                ),
                model: {
                  value: _vm.menuVisibility,
                  callback: function ($$v) {
                    _vm.menuVisibility = $$v
                  },
                  expression: "menuVisibility",
                },
              })
            : _c(
                "div",
                { staticClass: "c-table-header__content" },
                [
                  _vm.icon
                    ? _c("pic", {
                        staticClass: "c-table-header__content-icon",
                        attrs: {
                          height: 20,
                          src: _vm.icon,
                          width: 20,
                          size: "cover",
                        },
                      })
                    : _vm._e(),
                  _c("div", { staticClass: "c-table-header__text" }, [
                    _vm._v(_vm._s(_vm.text)),
                  ]),
                ],
                1
              ),
          _vm._t("append-header-item"),
        ],
        2
      ),
    ]
  )
}
var cTableHeadervue_type_template_id_4f079105_scoped_true_lang_pug_staticRenderFns = []
cTableHeadervue_type_template_id_4f079105_scoped_true_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cTable/cTableHeader.vue?vue&type=template&id=4f079105&scoped=true&lang=pug&

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/arrow_downward/baseline.svg
var arrow_downward_baseline = __webpack_require__(6593);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/arrow_drop_up/baseline.svg
var arrow_drop_up_baseline = __webpack_require__(7859);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/arrow_drop_down/baseline.svg
var arrow_drop_down_baseline = __webpack_require__(940);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/arrow_upward/baseline.svg
var arrow_upward_baseline = __webpack_require__(3873);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/filter_list/baseline.svg
var filter_list_baseline = __webpack_require__(977);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cMenu.vue?vue&type=template&id=74707584&lang=pug&
var cMenuvue_type_template_id_74707584_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    { ref: "cMenu", staticClass: "c-menu", class: _vm.menuClasses },
    [
      [
        _c(
          "div",
          {
            staticClass: "c-menu__trigger",
            class: _vm.classNameByDisabled,
            style: _vm.triggerStyle,
            on: {
              click: function ($event) {
                $event.preventDefault()
                return _vm.switchVisibility(!_vm.localValue, true)
              },
              mouseover: function ($event) {
                $event.preventDefault()
                return _vm.switchVisibility(true, false)
              },
              mouseleave: function ($event) {
                $event.preventDefault()
                return _vm.switchVisibility(false, false)
              },
            },
          },
          [_vm._t("trigger")],
          2
        ),
      ],
      _c(
        "portal",
        { attrs: { to: "destination", disabled: _vm.attach, slim: "" } },
        [
          _vm.localValue
            ? _c(
                "div",
                {
                  ref: "cMenuContainer",
                  staticClass: "c-menu__container",
                  class: _vm.contentClass,
                  style: _vm.containerStyle,
                  on: {
                    click: function ($event) {
                      $event.stopPropagation()
                      return _vm.onClickInside.apply(null, arguments)
                    },
                    mouseover: function ($event) {
                      $event.preventDefault()
                      return _vm.switchVisibility(true, false)
                    },
                    mouseleave: function ($event) {
                      $event.preventDefault()
                      return _vm.switchVisibility(false, false)
                    },
                  },
                },
                [_vm._t("default")],
                2
              )
            : _vm._e(),
        ]
      ),
    ],
    2
  )
}
var cMenuvue_type_template_id_74707584_lang_pug_staticRenderFns = []
cMenuvue_type_template_id_74707584_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cMenu.vue?vue&type=template&id=74707584&lang=pug&

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cMenu.vue?vue&type=script&lang=js&










/* harmony default export */ const cMenuvue_type_script_lang_js_ = ({
  mixins: [
    mixins_sync([
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
      validator: (0,es/* includes */.q9t)(es.__, ['click', 'hover']),
    },

    position: {
      type: String,
      default: 'right',
      validator: (0,es/* includes */.q9t)(es.__, ['left', 'right', 'center']),
    },

    positionY: {
      type: String,
      default: 'bottom',
      validator: (0,es/* includes */.q9t)(es.__, ['top', 'bottom']),
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

    containerLeft: vm => (0,es/* cond */.wVM)([
      [(0,es/* propEq */.OH4)('position', 'center'), (0,es/* always */.Bxt)(`${vm.triggerBox.left - (vm.containerWidth - vm.triggerBox.width) / 2}px`)],
      [(0,es/* propEq */.OH4)('position', 'left'), (0,es/* always */.Bxt)(`${vm.triggerBox.left}px`)],
      [es.T, (0,es/* always */.Bxt)(`${vm.triggerBox.left + vm.triggerBox.width - vm.containerWidth}px`)],
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
      const selectedOptionInContainer = (0,es/* any */.YjB)((0,es/* propEq */.OH4)('textContent', e.target.textContent))(selectedOptionsList);

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
});

;// CONCATENATED MODULE: ./ui/src/components/cMenu.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_cMenuvue_type_script_lang_js_ = (cMenuvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/cMenu.vue



;


/* normalize component */

var cMenu_component = (0,componentNormalizer/* default */.Z)(
  components_cMenuvue_type_script_lang_js_,
  cMenuvue_type_template_id_74707584_lang_pug_render,
  cMenuvue_type_template_id_74707584_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const cMenu = (cMenu_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/Pic.vue?vue&type=template&id=7d3e3baa&scoped=true&lang=pug&
var Picvue_type_template_id_7d3e3baa_scoped_true_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    {
      staticClass: "image",
      style: _vm.containerSettings,
      on: {
        click: function ($event) {
          return _vm.$emit("click")
        },
      },
    },
    [
      _vm.loading
        ? _c(
            "div",
            { staticClass: "loader" },
            [
              _c("c-icon", {
                attrs: {
                  icon: _vm.icons.connectLoaderAnimated,
                  size: 20,
                  color: "accent",
                  locator: "loading-indicator",
                },
              }),
            ],
            1
          )
        : [
            _vm.isImageLoaded
              ? _c("div", {
                  staticClass: "image__itself",
                  style: _vm.imageItselfSettings,
                })
              : _c(
                  "div",
                  {
                    staticClass: "image__placeholder",
                    attrs: { "align-center": "", "justify-center": "" },
                  },
                  [
                    _vm.placeholderIcon
                      ? _c("c-icon", {
                          style: _vm.placeholderSettings,
                          attrs: {
                            icon: _vm.placeholderIcon,
                            size: _vm.iconSize,
                          },
                        })
                      : _vm._e(),
                  ],
                  1
                ),
          ],
    ],
    2
  )
}
var Picvue_type_template_id_7d3e3baa_scoped_true_lang_pug_staticRenderFns = []
Picvue_type_template_id_7d3e3baa_scoped_true_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/Pic.vue?vue&type=template&id=7d3e3baa&scoped=true&lang=pug&

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/language/baseline.svg
var language_baseline = __webpack_require__(9754);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/Pic.vue?vue&type=script&lang=js&









// import {
//   altIcon,
// } from '~helpers';

// import {
//   loadImage,
// } from '~helpers/pic';






const Picvue_type_script_lang_js_altIcon = v => (isNilOrEmpty(v) ? language_baseline/* default */.Z : '');

const loadImage = img => new Promise(
  (resolve, reject) => {
    img.addEventListener('load', resolve);
    img.addEventListener('error', reject);
  },
);

/* harmony default export */ const Picvue_type_script_lang_js_ = ({
  components: {
    cIcon: cIcon,
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
    icons: { connectLoaderAnimated: animated/* default */.Z },
  }),

  computed: {
    iconSize: vm => `${(0,es/* min */.VV$)(vm.width, vm.height) * 0.9}px`,
    placeholderIcon: vm => alt(Picvue_type_script_lang_js_altIcon(vm.src), vm.altIcon, isNilOrEmpty(vm.altIcon)),


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
});

;// CONCATENATED MODULE: ./ui/src/components/Pic.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_Picvue_type_script_lang_js_ = (Picvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/Pic.vue



;


/* normalize component */

var Pic_component = (0,componentNormalizer/* default */.Z)(
  components_Picvue_type_script_lang_js_,
  Picvue_type_template_id_7d3e3baa_scoped_true_lang_pug_render,
  Picvue_type_template_id_7d3e3baa_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "7d3e3baa",
  null
  
)

/* harmony default export */ const Pic = (Pic_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTable/cTableHeader.vue?vue&type=script&lang=js&











/* harmony default export */ const cTableHeadervue_type_script_lang_js_ = ({
  components: {
    cIcon: cIcon,
    cMenu: cMenu,
    Pic: Pic,
  },

  props: {
    tag: {
      type: String,
      default: 'th',
    },

    align: {
      type: String,
      default: 'left',
    },

    text: String,
    value: String,
    manageable: Boolean,

    loading: {
      type: Boolean,
      default: false,
    },

    icon: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      menuVisibility: false,
      menu: {
        x: 0,
        y: 0,
        height: 0,
      },

      icons: {
        arrow_downward: arrow_downward_baseline/* default */.Z,
        arrow_drop_up: arrow_drop_up_baseline/* default */.Z,
        arrow_drop_down: arrow_drop_down_baseline/* default */.Z,
        arrow_upward: arrow_upward_baseline/* default */.Z,
        filter_list: filter_list_baseline/* default */.Z,
      },
    };
  },

  computed: {
    showManageIcon: (0,es/* where */.arb)({
      manageable: Boolean,
    }),

    masterIcon: (0,es/* cond */.wVM)([
      [(0,es/* prop */.vgT)('menuVisibility'), (0,es/* always */.Bxt)('arrow_drop_up')],
      [es.T, (0,es/* always */.Bxt)('arrow_drop_down')],
    ]),
  },
});

;// CONCATENATED MODULE: ./ui/src/components/cTable/cTableHeader.vue?vue&type=script&lang=js&
 /* harmony default export */ const cTable_cTableHeadervue_type_script_lang_js_ = (cTableHeadervue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/cTable/cTableHeader.vue



;


/* normalize component */

var cTableHeader_component = (0,componentNormalizer/* default */.Z)(
  cTable_cTableHeadervue_type_script_lang_js_,
  cTableHeadervue_type_template_id_4f079105_scoped_true_lang_pug_render,
  cTableHeadervue_type_template_id_4f079105_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "4f079105",
  null
  
)

/* harmony default export */ const cTableHeader = (cTableHeader_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTable/cTableHeadersSelector.vue?vue&type=template&id=2e6ff4ea&scoped=true&lang=pug&
var cTableHeadersSelectorvue_type_template_id_2e6ff4ea_scoped_true_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _vm.showSelector
    ? _c(
        "c-table-control-menu",
        {
          attrs: {
            text: "Columns",
            active: !_vm.areAllHeadersVisible,
            icon: _vm.icons.googleViewColumnBaseline,
            "min-width": "170px",
            "control-buttons": false,
            disabled: _vm.disabled,
          },
        },
        [
          _c(
            "div",
            { staticClass: "headers-selector" },
            _vm._l(_vm.hideableHeaders, function (header) {
              return _c(
                "c-tooltip",
                {
                  key: header.value,
                  staticClass: "selector-option",
                  attrs: {
                    message: "At least one column must be selected",
                    disabled: !_vm.isDisableHeader(header),
                  },
                },
                [
                  _c("v-checkbox", {
                    attrs: {
                      value: header.value,
                      label: header.text,
                      disabled: _vm.isDisableHeader(header),
                      "hide-details": "",
                      multiple: "",
                    },
                    model: {
                      value: _vm.localValue,
                      callback: function ($$v) {
                        _vm.localValue = $$v
                      },
                      expression: "localValue",
                    },
                  }),
                ],
                1
              )
            }),
            1
          ),
        ]
      )
    : _vm._e()
}
var cTableHeadersSelectorvue_type_template_id_2e6ff4ea_scoped_true_lang_pug_staticRenderFns = []
cTableHeadersSelectorvue_type_template_id_2e6ff4ea_scoped_true_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cTable/cTableHeadersSelector.vue?vue&type=template&id=2e6ff4ea&scoped=true&lang=pug&

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/view_column/baseline.svg
var view_column_baseline = __webpack_require__(8778);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTable/cTableControlMenu.vue?vue&type=template&id=021c951b&lang=pug&
var cTableControlMenuvue_type_template_id_021c951b_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "c-menu",
    {
      attrs: { "close-on-click-inside": false, position: "left" },
      scopedSlots: _vm._u([
        {
          key: "trigger",
          fn: function () {
            return [
              _c("c-button", {
                staticClass: "ma-0",
                class: { "c-table__panel-button_active": _vm.active },
                attrs: {
                  small: "",
                  locator: _vm.locator,
                  disabled: _vm.disabled,
                  icon: _vm.icon,
                  label: _vm.text,
                },
              }),
            ]
          },
          proxy: true,
        },
      ]),
      model: {
        value: _vm.show,
        callback: function ($$v) {
          _vm.show = $$v
        },
        expression: "show",
      },
    },
    [
      _c("div", { staticClass: "scrollable" }, [
        _c(
          "form",
          {
            staticClass: "c-table-control-menu",
            style: _vm.style,
            on: {
              keyup: function ($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                )
                  return null
                return _vm.$emit("submit")
              },
            },
          },
          [
            _vm._t("default"),
            _vm.controlButtons
              ? _c(
                  "div",
                  { staticClass: "c-table-control-menu__buttons" },
                  [
                    _c(
                      "c-tooltip",
                      {
                        attrs: {
                          message: _vm.tooltipAddButtonMessage,
                          disabled: !_vm.addButtonDisabled,
                        },
                      },
                      [
                        _c("c-button", {
                          attrs: {
                            disabled: _vm.addButtonDisabled,
                            color: "accent",
                            small: "",
                            locator: "add-filter-button",
                            icon: _vm.addButtonIcon,
                            label: _vm.addButtonText,
                          },
                          on: {
                            click: function ($event) {
                              return _vm.$emit("click-add")
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    _c("c-button", {
                      staticClass: "ml-1",
                      attrs: {
                        disabled: _vm.resetButtonDisabled,
                        locator: "reset-button",
                        small: "",
                        icon: _vm.resetButtonIcon,
                        label: _vm.resetButtonText,
                      },
                      on: {
                        click: function ($event) {
                          return _vm.$emit("click-reset")
                        },
                      },
                    }),
                    _c("c-button", {
                      attrs: {
                        small: "",
                        locator: "close-button",
                        label: "Close",
                      },
                      on: {
                        click: function ($event) {
                          _vm.show = false
                        },
                      },
                    }),
                  ],
                  1
                )
              : _vm._e(),
          ],
          2
        ),
      ]),
    ]
  )
}
var cTableControlMenuvue_type_template_id_021c951b_lang_pug_staticRenderFns = []
cTableControlMenuvue_type_template_id_021c951b_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cTable/cTableControlMenu.vue?vue&type=template&id=021c951b&lang=pug&

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/add/baseline.svg
var add_baseline = __webpack_require__(5363);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/close/baseline.svg
var close_baseline = __webpack_require__(8039);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cButton.vue?vue&type=template&id=0ddc61a6&lang=pug&
var cButtonvue_type_template_id_0ddc61a6_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "button",
    {
      ref: "button",
      staticClass: "c-button",
      class: _vm.computedClasses,
      style: _vm.computedColors,
      attrs: { type: _vm.type, disabled: _vm.calculatedDisabled },
      on: {
        click: function ($event) {
          return _vm.$emit("click", $event)
        },
      },
    },
    [
      _vm.link && !_vm.disabled && !_vm.loading
        ? _c("a", { staticClass: "c-button__link", attrs: { href: _vm.link } })
        : _vm._e(),
      this.$slots.icon || _vm.icon
        ? _c(
            "div",
            { staticClass: "c-button__icon-left" },
            [
              _vm._t("icon", function () {
                return [
                  _vm.showIconLoader
                    ? _c("c-icon", {
                        attrs: {
                          icon: _vm.icons.connectLoaderAnimated,
                          size: _vm.iconSize,
                          locator: "loading-indicator",
                        },
                      })
                    : _vm.icon
                    ? _c("c-icon", {
                        attrs: { icon: _vm.icon, size: _vm.iconSize },
                      })
                    : _vm._e(),
                ]
              }),
            ],
            2
          )
        : _vm._e(),
      _vm._t("default", function () {
        return [
          _vm.label
            ? [
                _vm.showLoader
                  ? _c("c-icon", {
                      attrs: {
                        icon: _vm.icons.connectLoaderAnimated,
                        size: _vm.iconSize,
                        locator: "loading-indicator",
                      },
                    })
                  : _vm._e(),
                _c(
                  "div",
                  {
                    staticClass: "c-button__label",
                    class: _vm.cButtonLabelClasses,
                  },
                  [_vm._v(_vm._s(_vm.label))]
                ),
              ]
            : _vm._e(),
        ]
      }),
      this.$slots["right-icon"] || _vm.iconRight
        ? _c(
            "div",
            { staticClass: "c-button__icon-right" },
            [
              _vm._t("right-icon", function () {
                return [
                  _vm.showRightIconLoader
                    ? _c("c-icon", {
                        attrs: {
                          icon: _vm.icons.connectLoaderAnimated,
                          size: _vm.iconSize,
                          locator: "loading-indicator",
                        },
                      })
                    : _vm.iconRight
                    ? _c("c-icon", {
                        class: _vm.cButtonIconRightClasses,
                        attrs: { icon: _vm.iconRight, size: _vm.iconSize },
                      })
                    : _vm._e(),
                ]
              }),
            ],
            2
          )
        : _vm._e(),
    ],
    2
  )
}
var cButtonvue_type_template_id_0ddc61a6_lang_pug_staticRenderFns = []
cButtonvue_type_template_id_0ddc61a6_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cButton.vue?vue&type=template&id=0ddc61a6&lang=pug&

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cButton.vue?vue&type=script&lang=js&














const cButtonModesDict = {
  solid: 'solid',
  flat: 'flat',
  outlined: 'outlined',
  rounded: 'rounded',
};

const cButtonModes = (0,es/* values */.VO0)(cButtonModesDict);

const contrastHexColor = alt('#000000', '#FFFFFF', isBright);
const toContrastRGB = (0,es/* pipe */.zGw)(contrastHexColor, hexToRGB);


/* harmony default export */ const cButtonvue_type_script_lang_js_ = ({
  components: {
    cIcon: cIcon,
  },

  props: {
    active: Boolean,
    icon: Object,
    iconRight: Object,
    label: String,
    opener: Boolean,
    isOpen: Boolean,
    size: String,
    fluid: Boolean,

    loading: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: 'button',
      validator: (0,es/* includes */.q9t)(es.__, ['button', 'submit']),
    },

    mode: {
      type: String,
      default: cButtonModesDict.flat,
      validator: (0,es/* includes */.q9t)(es.__, cButtonModes),
    },

    color: {
      type: String,
      default: '',
      validator: validateColor,
    },

    small: {
      type: Boolean,
      default: false,
    },

    upperCase: {
      type: Boolean,
      default: true,
    },

    link: String,
  },

  data: () => ({
    buttonColor: '',
    icons: {
      connectLoaderAnimated: animated/* default */.Z,
    },
  }),

  computed: {
    calculatedDisabled: (0,es/* either */.wEe)(
      (0,es/* prop */.vgT)('loading'),
      (0,es/* prop */.vgT)('disabled'),
    ),

    isIconOnlyBtn: (0,es/* where */.arb)({
      icon: isNotNilOrEmpty,
      label: isNilOrEmpty,
      iconRight: isNilOrEmpty,
    }),

    isTxtOnlyBtn: (0,es/* where */.arb)({
      icon: isNilOrEmpty,
      label: isNotNilOrEmpty,
      iconRight: isNilOrEmpty,
    }),

    isIconsBtn: (0,es/* where */.arb)({
      icon: isNotNilOrEmpty,
      iconRight: isNotNilOrEmpty,
    }),

    isSolidBtn: (0,es/* propEq */.OH4)('mode', cButtonModesDict.solid),

    initialBtnColor: (0,es/* cond */.wVM)([
      [(0,es/* prop */.vgT)('color'), pathTo(['color'], hexColor)],
      [(0,es/* prop */.vgT)('isSolidBtn'), (0,es/* always */.Bxt)('accent')],
      [es.T, (0,es/* always */.Bxt)('#212121')],
    ]),

    isVarColor: pathTo(['initialBtnColor'], checkVarColor),

    classNameByMode: ({ mode }) => `c-button_${mode}`,
    classFluid: template({ 'c-button_fluid': ['fluid'] }),
    classActive: template({ 'c-button_active': ['active'] }),
    classNameBySize: pathAlt(['small'], 'c-button_small', ''),
    classNameByDisabled: pathAlt(['disabled'], 'c-button_disabled', ''),
    classNameByContent: (0,es/* cond */.wVM)([
      [(0,es/* prop */.vgT)('isIconOnlyBtn'), (0,es/* always */.Bxt)('c-button_icon-only')],
      [(0,es/* prop */.vgT)('isTxtOnlyBtn'), (0,es/* always */.Bxt)('c-button_txt-only')],
      [es.T, (0,es/* always */.Bxt)('')],
    ]),

    computedClasses: (0,es/* pipe */.zGw)(
      (0,es/* pick */.eiS)([
        'classNameByMode', 'classNameBySize',
        'classNameByContent', 'classNameByDisabled',
        'classFluid', 'classActive',
      ]),
      (0,es/* pickBy */.D95)(isNotNilOrEmpty),
      es/* values */.VO0,
    ),

    computedColor: vm => (0,es/* cond */.wVM)([
      [(0,es/* prop */.vgT)('disabled'), obj],
      [(0,es/* prop */.vgT)('isVarColor'), (0,es/* always */.Bxt)({ '--button-computed-color': `var(--theme_${vm.initialBtnColor}_rgb)` })],
      [(0,es/* prop */.vgT)('color'), (0,es/* pipe */.zGw)((0,es/* prop */.vgT)('color'), colorToRGB, (0,es/* objOf */.RVN)('--button-computed-color'))],
      [es.T, (0,es/* pipe */.zGw)((0,es/* prop */.vgT)('initialBtnColor'), colorToRGB, (0,es/* objOf */.RVN)('--button-color'))],
    ])(vm),

    computedContentColor: (0,es/* ifElse */.KJl)(
      (0,es/* anyPass */.H50)([(0,es/* prop */.vgT)('disabled'), notProp('isSolidBtn')]),
      obj,
      template({
        '--solid-content-color': pathTo(['buttonColor'], toContrastRGB),
      }),
    ),

    computedColors: propsTo(
      ['computedColor', 'computedContentColor'],
      es/* mergeAll */.Jnq,
    ),

    showIconLoader: (0,es/* both */.HkC)((0,es/* prop */.vgT)('loading'), (0,es/* anyPass */.H50)([(0,es/* prop */.vgT)('icon'), (0,es/* prop */.vgT)('isIconsBtn')])),
    showLoader: (0,es/* whereEq */.goX)({ loading: true, isTxtOnlyBtn: true }),
    showRightIconLoader: (0,es/* where */.arb)({
      loading: Boolean,
      icon: isNilOrEmpty,
      iconRight: isNotNilOrEmpty,
    }),

    showIconOnly: (0,es/* anyPass */.H50)([(0,es/* prop */.vgT)('showLoader'), (0,es/* prop */.vgT)('isIconOnlyBtn')]),

    iconSize: (0,es/* cond */.wVM)([
      [(0,es/* prop */.vgT)('size'), (0,es/* prop */.vgT)('size')],
      [(0,es/* both */.HkC)((0,es/* prop */.vgT)('showIconOnly'), (0,es/* prop */.vgT)('small')), (0,es/* always */.Bxt)('18')],
      [(0,es/* prop */.vgT)('showIconOnly'), (0,es/* always */.Bxt)('24')],
      [(0,es/* prop */.vgT)('small'), (0,es/* always */.Bxt)('14')],
      [es.T, (0,es/* always */.Bxt)('18')],
    ]),

    cButtonLabelClasses: template({
      'c-button__label_uppercase': ['upperCase'],
      'c-button__label_loading': ['showLoader'],
    }),

    cButtonIconRightClasses: template({
      'opener-status': ['opener'],
      open: ['isOpen'],
    }),
  },

  mounted() {
    this.buttonColor = rgbToHEX(
      getComputedStyle(this.$refs.button).getPropertyValue('--button-color'),
    );
  },
});

;// CONCATENATED MODULE: ./ui/src/components/cButton.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_cButtonvue_type_script_lang_js_ = (cButtonvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/cButton.vue



;


/* normalize component */

var cButton_component = (0,componentNormalizer/* default */.Z)(
  components_cButtonvue_type_script_lang_js_,
  cButtonvue_type_template_id_0ddc61a6_lang_pug_render,
  cButtonvue_type_template_id_0ddc61a6_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const cButton = (cButton_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTooltip.vue?vue&type=template&id=7521be8f&scoped=true&lang=pug&
var cTooltipvue_type_template_id_7521be8f_scoped_true_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    {
      ref: "elm",
      staticClass: "c-tooltip",
      on: {
        mouseover: _vm.openTooltipAsync,
        mouseleave: _vm.closeTooltipAsync,
      },
    },
    [
      _vm._t("default"),
      _vm.showTooltip
        ? _c("portal", { attrs: { to: "destination" } }, [
            _c(
              "div",
              { staticClass: "c-tooltip__content", style: _vm.computeStyle() },
              [
                _vm._t("message", function () {
                  return [_c("span", [_vm._v(_vm._s(_vm.message))])]
                }),
              ],
              2
            ),
          ])
        : _vm._e(),
    ],
    2
  )
}
var cTooltipvue_type_template_id_7521be8f_scoped_true_lang_pug_staticRenderFns = []
cTooltipvue_type_template_id_7521be8f_scoped_true_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cTooltip.vue?vue&type=template&id=7521be8f&scoped=true&lang=pug&

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTooltip.vue?vue&type=script&lang=js&







/* harmony default export */ const cTooltipvue_type_script_lang_js_ = ({
  props: {
    message: {
      type: String,
      default: '',
    },

    closeDelay: {
      type: Number,
      default: 200,
    },

    openDelay: {
      type: Number,
      default: 200,
    },

    disabled: Boolean,

    top: Boolean,
    right: Boolean,
    left: Boolean,
    capitalize: Boolean,
  },

  data: () => ({
    show: false,
  }),

  computed: {
    showTooltip: (0,es/* whereEq */.goX)({
      show: true,
      isTooltipDisabled: false,
    }),

    isMessageEmpty: vm => !vm.message && !vm.$slots.message,
    isTooltipDisabled: vm => vm.disabled || vm.isMessageEmpty,
    openTooltipAsync: vm => utils_debounce(vm.openDelay, vm.openTooltip),
    closeTooltipAsync: vm => utils_debounce(vm.closeDelay, vm.closeTooltip),
  },

  methods: {
    computeStyle() {
      // eslint-disable-next-line prefer-const
      let { top, left, height, width } = this.$refs.elm.getBoundingClientRect();
      const offset = 12;
      const yOffset = height + offset;
      const xOffset = width + offset;

      if (this.top) {
        top -= yOffset;
      } else {
        top += yOffset;
      }

      if (this.right) {
        left += xOffset;
      } else if (this.left) {
        left -= xOffset;
      }
      const style = {
        left: `${left}px`,
        top: `${top}px`,
      };

      if (this.capitalize) {
        style['text-transform'] = 'capitalize';
      }

      return style;
    },

    openTooltip() {
      this.show = true;
    },

    closeTooltip() {
      this.show = false;
    },
  },
});

;// CONCATENATED MODULE: ./ui/src/components/cTooltip.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_cTooltipvue_type_script_lang_js_ = (cTooltipvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/cTooltip.vue



;


/* normalize component */

var cTooltip_component = (0,componentNormalizer/* default */.Z)(
  components_cTooltipvue_type_script_lang_js_,
  cTooltipvue_type_template_id_7521be8f_scoped_true_lang_pug_render,
  cTooltipvue_type_template_id_7521be8f_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "7521be8f",
  null
  
)

/* harmony default export */ const cTooltip = (cTooltip_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTable/cTableControlMenu.vue?vue&type=script&lang=js&















/* harmony default export */ const cTableControlMenuvue_type_script_lang_js_ = ({
  mixins: [
    mixins_sync([{ prop: 'value', local: 'show' }]),
  ],

  components: {
    cButton: cButton,
    cMenu: cMenu,
    cTooltip: cTooltip,
  },

  props: {
    value: Boolean,
    icon: Object,
    active: Boolean,
    addButtonText: String,
    resetButtonText: String,
    addButtonDisabled: Boolean,
    resetButtonDisabled: Boolean,
    tooltipAddButtonMessage: String,
    locator: {
      type: String,
      default: 'panel-button',
    },

    text: {
      required: true,
      type: String,
    },

    addButtonIcon: {
      default: () => add_baseline/* default */.Z,
      type: Object,
    },

    resetButtonIcon: {
      default: () => close_baseline/* default */.Z,
      type: Object,
    },

    minWidth: {
      type: String,
      default: '525px',
    },

    controlButtons: {
      type: Boolean,
      default: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      show: false,
    };
  },

  computed: {
    style: template({
      minWidth: ['minWidth'],
    }),
  },
});

;// CONCATENATED MODULE: ./ui/src/components/cTable/cTableControlMenu.vue?vue&type=script&lang=js&
 /* harmony default export */ const cTable_cTableControlMenuvue_type_script_lang_js_ = (cTableControlMenuvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/cTable/cTableControlMenu.vue



;


/* normalize component */

var cTableControlMenu_component = (0,componentNormalizer/* default */.Z)(
  cTable_cTableControlMenuvue_type_script_lang_js_,
  cTableControlMenuvue_type_template_id_021c951b_lang_pug_render,
  cTableControlMenuvue_type_template_id_021c951b_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const cTableControlMenu = (cTableControlMenu_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTable/cTableHeadersSelector.vue?vue&type=script&lang=js&
















const isHideableHeader = (0,es/* where */.arb)({
  text: Boolean,
  value: Boolean,
  hidden: es/* not */.ffD,
});

const isPersistentHeader = (0,es/* complement */.CyQ)(isHideableHeader);

const isHeaderVisible = (0,es/* curry */.WAo)((visibleValues, header) => (0,es/* both */.HkC)(
  notProp('hidden'),
  (0,es/* either */.wEe)(
    isPersistentHeader,
    h => (0,es/* includes */.q9t)(h.value, visibleValues),
  ),
)(header));


/* harmony default export */ const cTableHeadersSelectorvue_type_script_lang_js_ = ({
  mixins: [
    mixins_sync([
      { prop: 'value', local: 'localValue' },
    ]),
  ],

  components: {
    cTooltip: cTooltip,
    cTableControlMenu: cTableControlMenu,
  },

  props: {
    value: {
      type: Array,
      required: true,
    },

    headers: {
      type: Array,
      required: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localValue: snapshot(this.value),
      icons: {
        googleViewColumnBaseline: view_column_baseline/* default */.Z,
      },
    };
  },

  computed: {
    hideableHeaders: pathTo(['headers'], (0,es/* filter */.hXT)(isHideableHeader)),

    areAllHeadersVisible: ({ hideableHeaders, localValue }) => (0,es/* all */.$6P)(
      isHeaderVisible(localValue),
      hideableHeaders,
    ),

    showSelector: pathTo(['hideableHeaders'], notEmpty),
  },

  methods: {
    isDisableHeader(header) {
      return (0,es/* equals */.fS0)([header.value], this.localValue);
    },
  },
});

;// CONCATENATED MODULE: ./ui/src/components/cTable/cTableHeadersSelector.vue?vue&type=script&lang=js&
 /* harmony default export */ const cTable_cTableHeadersSelectorvue_type_script_lang_js_ = (cTableHeadersSelectorvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/cTable/cTableHeadersSelector.vue



;


/* normalize component */

var cTableHeadersSelector_component = (0,componentNormalizer/* default */.Z)(
  cTable_cTableHeadersSelectorvue_type_script_lang_js_,
  cTableHeadersSelectorvue_type_template_id_2e6ff4ea_scoped_true_lang_pug_render,
  cTableHeadersSelectorvue_type_template_id_2e6ff4ea_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "2e6ff4ea",
  null
  
)

/* harmony default export */ const cTableHeadersSelector = (cTableHeadersSelector_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTable/cTablePagination.vue?vue&type=template&id=f7453a9e&scoped=true&lang=pug&
var cTablePaginationvue_type_template_id_f7453a9e_scoped_true_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    {
      staticClass: "pagination",
      class: { pagination_hidden: _vm.hideAllSections },
    },
    [
      _vm.showLeftPart
        ? _c("div", { staticClass: "pagination__part pagination__part_left" }, [
            _c(
              "div",
              { staticClass: "pagination__navigation" },
              [
                _c("c-button", {
                  staticClass: "pagination__button",
                  attrs: {
                    locator: "prev-page",
                    small: "",
                    mode: "outlined",
                    disabled: _vm.isFirstPage,
                    upperCase: false,
                    label: "Previous",
                  },
                  on: { click: _vm.toPrevPage },
                }),
                _vm._l(
                  _vm.paginationElementsConfig,
                  function (paginationElement) {
                    return [
                      paginationElement.type ===
                      _vm.paginationElementsTypes.anotherPage
                        ? _c(paginationElement.type, {
                            key: paginationElement.locator,
                            tag: "component",
                            class: paginationElement.classes,
                            attrs: {
                              locator: paginationElement.locator,
                              label: paginationElement.label,
                              small: paginationElement.small,
                              mode: paginationElement.mode,
                              upperCase: paginationElement.upperCase,
                            },
                            on: {
                              click: function ($event) {
                                return _vm.validateInputAndGoTo(
                                  paginationElement.value
                                )
                              },
                            },
                          })
                        : _c(
                            paginationElement.type,
                            {
                              key: paginationElement.locator,
                              tag: "component",
                              class: paginationElement.classes,
                              attrs: { locator: paginationElement.locator },
                            },
                            [_vm._v(_vm._s(paginationElement.innerText))]
                          ),
                    ]
                  }
                ),
                _c("c-button", {
                  staticClass: "pagination__button",
                  attrs: {
                    locator: "next-page",
                    small: "",
                    mode: "outlined",
                    upperCase: false,
                    label: "Next",
                    disabled: _vm.isLastPage,
                  },
                  on: { click: _vm.toNextPage },
                }),
              ],
              2
            ),
            _vm.showGoToPage
              ? _c(
                  "div",
                  { staticClass: "pagination__go-to-page" },
                  [
                    _c("span", { staticClass: "pagination__text" }, [
                      _vm._v("Go to page:"),
                    ]),
                    _c("c-text-field", {
                      staticClass: "pagination__goto-page",
                      attrs: {
                        size: "small",
                        type: "number",
                        min: 1,
                        max: _vm.lastPage,
                        value: _vm.localPagination.page,
                        placeholder: String(_vm.localPagination.page),
                        pattern: "[0-9]",
                      },
                      on: { input: _vm.validateInputAndGoTo },
                    }),
                  ],
                  1
                )
              : _vm._e(),
          ])
        : _vm._e(),
      _c("div", { staticClass: "pagination__part pagination__part_right" }, [
        _vm.showRowsPerPage
          ? _c(
              "div",
              { staticClass: "pagination__rows-per-page" },
              [
                _c("div", { staticClass: "pagination__text" }, [
                  _vm._v("Rows per page"),
                ]),
                _c("c-menu", {
                  staticClass: "pagination__rows-selection _mr_16 c-menu-list",
                  class: _vm.dynamicClassesMenu,
                  attrs: {
                    locator: "c-menu-list",
                    outline: "",
                    small: "",
                    "position-y": _vm.rowsMenuPositionY,
                    overlay: false,
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "trigger",
                        fn: function () {
                          return [
                            _c("c-button", {
                              staticClass: "c-menu-list__open",
                              attrs: {
                                locator: "c-menu-list_open-button",
                                small: "",
                                upperCase: false,
                                "icon-right":
                                  _vm.icons.googleArrowDropDownBaseline,
                                label: _vm.rowsPerPageBtnLabel,
                                mode: _vm.cButtonModesDict.outlined,
                              },
                            }),
                          ]
                        },
                        proxy: true,
                      },
                      {
                        key: "default",
                        fn: function () {
                          return [
                            _c(
                              "ul",
                              { staticClass: "c-menu-list__list" },
                              _vm._l(_vm.allOptions, function (option) {
                                return _c(
                                  "li",
                                  {
                                    key: option.value,
                                    staticClass: "c-menu-list__item",
                                  },
                                  [
                                    _c("c-button", {
                                      staticClass:
                                        "pagination__rows-selection-btn",
                                      class: _vm.getRowsBtnClass(
                                        option.value,
                                        _vm.localPagination.rowsPerPage
                                      ),
                                      attrs: {
                                        locator: `row-per-page-${option.text}`,
                                        small: "",
                                        label: String(option.text),
                                        "upper-case": false,
                                        disabled:
                                          option.value ===
                                          _vm.localPagination.rowsPerPage,
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.setRowPerPageTo(
                                            option.value
                                          )
                                        },
                                      },
                                    }),
                                  ],
                                  1
                                )
                              }),
                              0
                            ),
                          ]
                        },
                        proxy: true,
                      },
                    ],
                    null,
                    false,
                    3460008866
                  ),
                }),
                _c("span", { staticClass: "pagination__dot _mr_16" }, [
                  _vm._v("•"),
                ]),
              ],
              1
            )
          : _vm._e(),
        _c(
          "div",
          { staticClass: "pagination__info" },
          [
            _vm._v("Total: "),
            _c("number-item", { attrs: { value: _vm.total } }),
            _vm._v(" rows"),
          ],
          1
        ),
      ]),
    ]
  )
}
var cTablePaginationvue_type_template_id_f7453a9e_scoped_true_lang_pug_staticRenderFns = []
cTablePaginationvue_type_template_id_f7453a9e_scoped_true_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cTable/cTablePagination.vue?vue&type=template&id=f7453a9e&scoped=true&lang=pug&

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/chevron_left/baseline.svg
var chevron_left_baseline = __webpack_require__(2005);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/chevron_right/baseline.svg
var chevron_right_baseline = __webpack_require__(1757);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/more_vert/baseline.svg
var more_vert_baseline = __webpack_require__(6281);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTextField.vue?vue&type=template&id=40f68b43&scoped=true&lang=pug&
var cTextFieldvue_type_template_id_40f68b43_scoped_true_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c(
    "div",
    {
      ref: _vm.fieldComponent,
      staticClass: "c-text-field",
      class: _vm.fieldClasses,
      style: _vm.computedColors,
      attrs: { locator: _vm.locators.container },
      on: { focusin: _vm.setFocus, focusout: _vm.removeFocus },
    },
    [
      _vm.showLabel
        ? _c(
            "label",
            {
              ref: _vm.fieldLabel,
              staticClass: "c-text-field__label",
              attrs: { for: _vm.fieldID, locator: _vm.locators.label },
            },
            [
              _vm._t(
                "label",
                function () {
                  return [_c("span", [_vm._v(_vm._s(_vm.label))])]
                },
                null,
                _vm.slotProps
              ),
              _vm.showLabelIcon
                ? _c(
                    "div",
                    {
                      staticClass: "c-text-field__label-icon",
                      style: _vm.inheritedButtonsStyling,
                      attrs: { locator: _vm.locators.labelIcon },
                    },
                    [
                      _vm._t(
                        "label-icon",
                        function () {
                          return [
                            _c("c-icon", {
                              attrs: {
                                icon: _vm.labelIcon,
                                size: `${_vm.computedLabelIconSize}`,
                                color: "var(--ctf-color-current)",
                              },
                            }),
                          ]
                        },
                        null,
                        _vm.slotProps
                      ),
                    ],
                    2
                  )
                : _vm._e(),
            ],
            2
          )
        : _vm._e(),
      _c(
        "div",
        {
          staticClass: "c-text-field__wrapper",
          attrs: { locator: _vm.locators.wrapper },
        },
        [
          _vm.showPrepend
            ? _c(
                "div",
                {
                  staticClass: "c-text-field__prepend",
                  style: _vm.inheritedButtonsStyling,
                  attrs: { locator: _vm.locators.prepend },
                },
                [
                  _vm._t(
                    "prepend",
                    function () {
                      return [
                        _c("c-icon", {
                          attrs: {
                            icon: _vm.prependIcon,
                            size: `${_vm.computedIconSize}`,
                            color: "var(--ctf-color-current)",
                          },
                        }),
                      ]
                    },
                    null,
                    _vm.slotProps
                  ),
                ],
                2
              )
            : _vm._e(),
          _c(
            "div",
            {
              ref: _vm.fieldBody,
              staticClass: "c-text-field__body",
              attrs: { locator: _vm.locators.body },
              on: { click: _vm.onBodyClick },
            },
            [
              _vm.showPrependInner
                ? _c(
                    "div",
                    {
                      staticClass: "c-text-field__prepend-inner",
                      style: _vm.inheritedButtonsStyling,
                      attrs: { locator: _vm.locators.prependInner },
                    },
                    [
                      _vm._t(
                        "prepend-inner",
                        function () {
                          return [
                            _c("c-icon", {
                              attrs: {
                                icon: _vm.prependInnerIcon,
                                size: `${_vm.computedIconSize}`,
                                color: "var(--ctf-color-current)",
                              },
                            }),
                          ]
                        },
                        null,
                        _vm.slotProps
                      ),
                    ],
                    2
                  )
                : _vm._e(),
              _vm.prefix
                ? _c(
                    "span",
                    {
                      staticClass: "c-text-field__prefix",
                      attrs: { locator: _vm.locators.prefix },
                    },
                    [_vm._v(_vm._s(_vm.prefix))]
                  )
                : _vm._e(),
              _vm.currentType === "checkbox"
                ? _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.localValue,
                        expression: "localValue",
                      },
                      {
                        name: "facade",
                        rawName: "v-facade",
                        value: _vm.mask,
                        expression: "mask",
                      },
                    ],
                    ref: _vm.fieldID,
                    staticClass: "c-text-field__input",
                    attrs: {
                      id: _vm.fieldID,
                      placeholder: _vm.disabled ? false : _vm.placeholder,
                      disabled: _vm.disabled,
                      readonly: _vm.readonly,
                      required: _vm.required,
                      max: _vm.max,
                      min: _vm.min,
                      step: _vm.step,
                      autofocus: _vm.autofocus,
                      pattern: _vm.pattern,
                      autocomplete: _vm.browserAutocomplete ? "on" : "off",
                      locator: _vm.locators.input,
                      type: "checkbox",
                    },
                    domProps: {
                      checked: Array.isArray(_vm.localValue)
                        ? _vm._i(_vm.localValue, null) > -1
                        : _vm.localValue,
                    },
                    on: {
                      change: function ($event) {
                        var $$a = _vm.localValue,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 && (_vm.localValue = $$a.concat([$$v]))
                          } else {
                            $$i > -1 &&
                              (_vm.localValue = $$a
                                .slice(0, $$i)
                                .concat($$a.slice($$i + 1)))
                          }
                        } else {
                          _vm.localValue = $$c
                        }
                      },
                    },
                  })
                : _vm.currentType === "radio"
                ? _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.localValue,
                        expression: "localValue",
                      },
                      {
                        name: "facade",
                        rawName: "v-facade",
                        value: _vm.mask,
                        expression: "mask",
                      },
                    ],
                    ref: _vm.fieldID,
                    staticClass: "c-text-field__input",
                    attrs: {
                      id: _vm.fieldID,
                      placeholder: _vm.disabled ? false : _vm.placeholder,
                      disabled: _vm.disabled,
                      readonly: _vm.readonly,
                      required: _vm.required,
                      max: _vm.max,
                      min: _vm.min,
                      step: _vm.step,
                      autofocus: _vm.autofocus,
                      pattern: _vm.pattern,
                      autocomplete: _vm.browserAutocomplete ? "on" : "off",
                      locator: _vm.locators.input,
                      type: "radio",
                    },
                    domProps: { checked: _vm._q(_vm.localValue, null) },
                    on: {
                      change: function ($event) {
                        _vm.localValue = null
                      },
                    },
                  })
                : _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.localValue,
                        expression: "localValue",
                      },
                      {
                        name: "facade",
                        rawName: "v-facade",
                        value: _vm.mask,
                        expression: "mask",
                      },
                    ],
                    ref: _vm.fieldID,
                    staticClass: "c-text-field__input",
                    attrs: {
                      id: _vm.fieldID,
                      placeholder: _vm.disabled ? false : _vm.placeholder,
                      disabled: _vm.disabled,
                      readonly: _vm.readonly,
                      required: _vm.required,
                      max: _vm.max,
                      min: _vm.min,
                      step: _vm.step,
                      autofocus: _vm.autofocus,
                      pattern: _vm.pattern,
                      autocomplete: _vm.browserAutocomplete ? "on" : "off",
                      locator: _vm.locators.input,
                      type: _vm.currentType,
                    },
                    domProps: { value: _vm.localValue },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) return
                        _vm.localValue = $event.target.value
                      },
                    },
                  }),
              _vm.suffix
                ? _c(
                    "span",
                    {
                      staticClass: "c-text-field__suffix",
                      attrs: { locator: _vm.locators.suffix },
                    },
                    [_vm._v(_vm._s(_vm.suffix))]
                  )
                : _vm._e(),
              _vm.showVisibilityToggle
                ? _c("c-button", {
                    staticClass: "c-text-field__toggle-visibility",
                    attrs: {
                      icon: _vm.visibilityIcon,
                      disabled: _vm.disabled,
                      size: `${_vm.computedIconSize}`,
                      small: _vm.size === _vm.fieldSizesDict.small,
                      locator: _vm.locators.toggleVisibility,
                    },
                    on: { click: _vm.toggleVisibility },
                  })
                : _vm._e(),
              _vm.clearable
                ? _c("c-button", {
                    staticClass: "c-text-field__clearable",
                    attrs: {
                      icon: _vm.icons.googleRefreshBaseline,
                      disabled: _vm.disabled,
                      size: `${_vm.computedIconSize}`,
                      small: _vm.size === _vm.fieldSizesDict.small,
                      locator: _vm.locators.clearable,
                    },
                    on: { click: _vm.clearInput },
                  })
                : _vm._e(),
              _vm.showAppendInner
                ? _c(
                    "div",
                    {
                      staticClass: "c-text-field__append-inner",
                      style: _vm.inheritedButtonsStyling,
                      attrs: { locator: _vm.locators.appendInner },
                    },
                    [
                      _vm._t(
                        "append-inner",
                        function () {
                          return [
                            _c("c-icon", {
                              attrs: {
                                icon: _vm.appendInnerIcon,
                                size: `${_vm.computedIconSize}`,
                                color: "var(--ctf-color-current)",
                              },
                            }),
                          ]
                        },
                        null,
                        _vm.slotProps
                      ),
                    ],
                    2
                  )
                : _vm._e(),
            ],
            1
          ),
          _vm.showAppend
            ? _c(
                "div",
                {
                  staticClass: "c-text-field__append",
                  style: _vm.inheritedButtonsStyling,
                  attrs: { locator: _vm.locators.append },
                },
                [
                  _vm._t(
                    "append",
                    function () {
                      return [
                        _c("c-icon", {
                          attrs: {
                            icon: _vm.appendIcon,
                            size: `${_vm.computedIconSize}`,
                            color: "var(--ctf-color-current)",
                          },
                        }),
                      ]
                    },
                    null,
                    _vm.slotProps
                  ),
                ],
                2
              )
            : _vm._e(),
        ]
      ),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.showUnderline,
              expression: "showUnderline",
            },
          ],
          staticClass: "c-text-field__underline",
          attrs: { locator: _vm.locators.underline },
        },
        [
          _vm.showUnderlineIcon
            ? _c(
                "div",
                {
                  staticClass: "c-text-field__underline-icon",
                  style: _vm.inheritedButtonsStyling,
                  attrs: { locator: _vm.locators.underlineIcon },
                },
                [
                  _vm._t(
                    "underline-icon",
                    function () {
                      return [
                        _c("c-icon", {
                          attrs: {
                            icon: _vm.underlineIcon,
                            size: "12",
                            color: "var(--ctf-color-current)",
                          },
                        }),
                      ]
                    },
                    null,
                    _vm.slotProps
                  ),
                ],
                2
              )
            : _vm._e(),
          _vm.shownErrors.length
            ? _c(
                "ul",
                {
                  staticClass: "c-text-field__errors",
                  attrs: { locator: _vm.locators.errors },
                },
                _vm._l(_vm.shownErrors, function (e) {
                  return _c(
                    "li",
                    { key: e, staticClass: "c-text-field__error" },
                    [_vm._v(_vm._s(e))]
                  )
                }),
                0
              )
            : _vm._e(),
          _vm.shownWarnings.length
            ? _c(
                "ul",
                {
                  staticClass: "c-text-field__warnings",
                  attrs: { locator: _vm.locators.errors },
                },
                _vm._l(_vm.shownWarnings, function (w) {
                  return _c(
                    "li",
                    { key: w, staticClass: "c-text-field__warning" },
                    [_vm._v(_vm._s(w))]
                  )
                }),
                0
              )
            : _c(
                "div",
                {
                  staticClass: "c-text-field__helper",
                  attrs: { locator: _vm.locators.hint },
                },
                [
                  _vm._t(
                    "helper",
                    function () {
                      return [
                        _vm.showUnderlineHelper
                          ? _c("span", [_vm._v(_vm._s(_vm.hint))])
                          : _vm._e(),
                      ]
                    },
                    null,
                    _vm.slotProps
                  ),
                ],
                2
              ),
          _vm.showCounter
            ? _c(
                "div",
                {
                  staticClass: "c-text-field__counter",
                  attrs: { locator: _vm.locators.counter },
                },
                [
                  _vm._t(
                    "counter",
                    function () {
                      return [_vm._v(_vm._s(_vm.counterValue))]
                    },
                    null,
                    _vm.slotProps
                  ),
                ],
                2
              )
            : _vm._e(),
        ]
      ),
    ]
  )
}
var cTextFieldvue_type_template_id_40f68b43_scoped_true_lang_pug_staticRenderFns = []
cTextFieldvue_type_template_id_40f68b43_scoped_true_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/cTextField.vue?vue&type=template&id=40f68b43&scoped=true&lang=pug&

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/visibility/baseline.svg
var visibility_baseline = __webpack_require__(8999);
// EXTERNAL MODULE: ./node_modules/vue-input-facade/dist/vue-input-facade.umd.min.js
var vue_input_facade_umd_min = __webpack_require__(2289);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTextField.vue?vue&type=script&lang=js&





















const cTextFieldModesDict = {
  default: 'default',
  'single-line': 'single-line',
  solo: 'solo',
  dense: 'dense',
  outlined: 'outlined',
  filled: 'filled',
  'full-width': 'full-width',
  box: 'box',
};

const cTextFieldModes = (0,es/* values */.VO0)(cTextFieldModesDict);

const cTextFieldSizesDict = {
  large: 'large',
  small: 'small',
};

const cTextFieldSizes = (0,es/* values */.VO0)(cTextFieldSizesDict);

const cTextFieldIconSizesDict = {
  large: 24,
  small: 18,
};

const cTextFieldLabelIconSizesDict = {
  large: 20,
  small: 16,
};

const generateID = () => `ctf-${rhx(9)}`;

const makeLocatorWith = str => (0,es/* when */.gxm)((0,es/* defaultTo */.yAE)(''), (0,es/* concat */.zoF)(es.__, str));


/* harmony default export */ const cTextFieldvue_type_script_lang_js_ = ({
  mixins: [
    mixins_sync([{
      prop: 'value',
      local: 'localValue',
      propImmediate: false,
    }]),
    validate({
      rules: 'rules',
      observed: 'localValue',
      externalErrors: 'errorMessages',
      localErrors: 'validationErrors',
      status: 'isValid',
      processing: 'isValidating',
    }),
  ],

  directives: {
    facade: vue_input_facade_umd_min.facade,
  },

  components: {
    cButton: cButton,
    cIcon: cIcon,
  },

  props: {
    value: [String, Number],
    locator: String,
    label: String,
    labelIcon: Object,
    labelIconLeft: Boolean,

    type: {
      type: String,
      default: 'text',
    },

    size: {
      type: String,
      default: cTextFieldSizesDict.large,
      validator: (0,es/* includes */.q9t)(es.__, cTextFieldSizes),
    },

    placeholder: String,
    required: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    pattern: String,

    errorCount: {
      type: [Number, String],
      default: 1,
    },

    warningMessages: {
      type: Array,
      default: () => [],
    },

    warningCount: {
      type: [Number, String],
      default: 1,
    },

    clearable: Boolean,
    passwordToggle: {
      type: Boolean,
      default: true,
    },

    hint: String,
    persistentHint: {
      type: Boolean,
      default: true,
    },

    // NOTE: for design cases when we want to reserve space for underline even
    //       though it's empty for now, requested by Max T.
    persistentUnderline: Boolean,

    counter: [Number, String],

    prefix: String,
    suffix: String,
    prependIcon: Object,
    prependInnerIcon: Object,
    appendInnerIcon: Object, // NOTE: vuetify has `appendIcon` instead
    appendIcon: Object, // NOTE: vuetify has `appendOuterIcon` instead
    underlineIcon: Object,

    min: {
      type: [Number, String],
      default: 0,
    },

    max: {
      type: [Number, String],
      default: Infinity,
    },

    step: {
      type: [Number],
      default: 1,
    },

    color: {
      type: String,
      default: '',
      validator: validateColor,
    },

    // TODO: need to discuss it with Max T.
    // height: {
    //   type: [String, Number],
    //   default: null,
    // },

    browserAutocomplete: Boolean,

    mask: String,

    mode: {
      type: String,
      default: cTextFieldModesDict.default,
      validator: (0,es/* includes */.q9t)(es.__, cTextFieldModes),
    },
  },

  data() {
    return {
      localValue: null,
      fieldID: generateID(9),
      icons: {
        googleCloseBaseline: close_baseline/* default */.Z,
        googleRefreshBaseline: refresh_baseline/* default */.Z,
        googleVisibilityBaseline: visibility_baseline/* default */.Z,
        googleVisibilityOffBaseline: visibility_off_baseline/* default */.Z,
      },

      focused: false,
      currentType: this.type,
      popupItem: true,

      fieldSizesDict: cTextFieldSizesDict,
      iconSizesDict: cTextFieldIconSizesDict,
      labelIconSizesDict: cTextFieldLabelIconSizesDict,

      inheritedButtonsStyling: {
        '--button-custom-color': 'var(--ctf-color-current)',
      },
    };
  },

  computed: {
    locators: propTo('locator', template({
      container: makeLocatorWith('--container'),
      label: makeLocatorWith('--label'),
      labelIcon: makeLocatorWith('--label-icon'),
      wrapper: makeLocatorWith('--wrapper'),
      prepend: makeLocatorWith('--prepend'),
      body: makeLocatorWith('--body'),
      prependInner: makeLocatorWith('--prepend-inner'),
      prefix: makeLocatorWith('--prefix'),
      input: (0,es/* defaultTo */.yAE)(''),
      suffix: makeLocatorWith('--suffix'),
      toggleVisibility: makeLocatorWith('--toggle-visibility'),
      clearable: makeLocatorWith('--clearable'),
      appendInner: makeLocatorWith('--append-inner'),
      append: makeLocatorWith('--append'),
      underline: makeLocatorWith('--underline'),
      underlineIcon: makeLocatorWith('--underline-icon'),
      errors: makeLocatorWith('--errors'),
      hint: makeLocatorWith('--hint'),
      counter: makeLocatorWith('--counter'),
    })),

    fieldComponent: vm => `${vm.fieldID}-component`,
    fieldLabel: vm => `${vm.fieldID}-label`,
    fieldBody: vm => `${vm.fieldID}-body`,
    customClasses: (0,es/* pipe */.zGw)(
      template({
        'c-text-field_required': (0,es/* prop */.vgT)('required'),
        'c-text-field_optional': (0,es/* pipe */.zGw)((0,es/* prop */.vgT)('required'), es/* not */.ffD),
        'c-text-field_focused': (0,es/* prop */.vgT)('focused'),
        'c-text-field_disabled': (0,es/* prop */.vgT)('disabled'),
        'c-text-field_error': (0,es/* anyPass */.H50)([
          (0,es/* path */.ETc)(['validationErrors', 'length']),
          (0,es/* propEq */.OH4)('isValid', false),
        ]),
        'c-text-field_warning': (0,es/* pipe */.zGw)(
          (0,es/* path */.ETc)(['warningMessages', 'length']),
          Boolean,
        ),
        'c-text-field_label-left-icon': (0,es/* prop */.vgT)('labelIconLeft'),
      }),
      (0,es/* pickBy */.D95)((0,es/* equals */.fS0)(true)),
      es/* keys */.XPQ,
    ),

    classNameByMode: (0,es/* ifElse */.KJl)(
      (0,es/* propEq */.OH4)('mode', 'default'),
      (0,es/* always */.Bxt)(''),
      (0,es/* pipe */.zGw)(
        (0,es/* prop */.vgT)('mode'),
        (0,es/* concat */.zoF)('c-text-field_'),
      ),
    ),

    classNameBySize: (0,es/* ifElse */.KJl)(
      (0,es/* anyPass */.H50)([
        (0,es/* propEq */.OH4)('size', 'large'),
        (0,es/* propEq */.OH4)('size', ''),
      ]),
      (0,es/* always */.Bxt)(''),
      (0,es/* pipe */.zGw)(
        (0,es/* prop */.vgT)('size'),
        (0,es/* concat */.zoF)('c-text-field_'),
      ),
    ),

    computedClasses: (0,es/* pipe */.zGw)(
      (0,es/* pick */.eiS)(['classNameByMode', 'classNameBySize']),
      (0,es/* pickBy */.D95)(isNotNilOrEmpty),
      es/* values */.VO0,
    ),

    fieldClasses: vm => [...vm.customClasses, ...vm.computedClasses],

    visibilityIcon: (0,es/* ifElse */.KJl)(
      (0,es/* propEq */.OH4)('currentType', 'password'),
      (0,es/* path */.ETc)(['icons', 'googleVisibilityOffBaseline']),
      (0,es/* path */.ETc)(['icons', 'googleVisibilityBaseline']),
    ),

    showLabel: (0,es/* anyPass */.H50)([
      (0,es/* path */.ETc)(['$slots', 'label']),
      (0,es/* path */.ETc)(['$scopedSlots', 'label']),
      (0,es/* prop */.vgT)('label'),
      (0,es/* path */.ETc)(['$slots', 'label-icon']),
      (0,es/* path */.ETc)(['$scopedSlots', 'label-icon']),
      (0,es/* prop */.vgT)('labelIcon'),
    ]),

    showLabelIcon: (0,es/* anyPass */.H50)([
      (0,es/* path */.ETc)(['$slots', 'label-icon']),
      (0,es/* path */.ETc)(['$scopedSlots', 'label-icon']),
      (0,es/* prop */.vgT)('labelIcon'),
    ]),

    showPrepend: (0,es/* anyPass */.H50)([
      (0,es/* path */.ETc)(['$slots', 'prepend']),
      (0,es/* path */.ETc)(['$scopedSlots', 'prepend']),
      (0,es/* prop */.vgT)('prependIcon'),
    ]),

    showPrependInner: (0,es/* anyPass */.H50)([
      (0,es/* path */.ETc)(['$slots', 'prepend-inner']),
      (0,es/* path */.ETc)(['$scopedSlots', 'prepend-inner']),
      (0,es/* prop */.vgT)('prependInnerIcon'),
    ]),

    showVisibilityToggle: (0,es/* allPass */.sv4)([
      (0,es/* prop */.vgT)('passwordToggle'),
      (0,es/* propEq */.OH4)('type', 'password'),
    ]),

    showAppendInner: (0,es/* anyPass */.H50)([
      (0,es/* path */.ETc)(['$slots', 'append-inner']),
      (0,es/* path */.ETc)(['$scopedSlots', 'append-inner']),
      (0,es/* prop */.vgT)('appendInnerIcon'),
    ]),

    showAppend: (0,es/* anyPass */.H50)([
      (0,es/* path */.ETc)(['$slots', 'append']),
      (0,es/* path */.ETc)(['$scopedSlots', 'append']),
      (0,es/* prop */.vgT)('appendIcon'),
    ]),

    showUnderline: (0,es/* anyPass */.H50)([
      (0,es/* path */.ETc)(['shownErrors', 'length']),
      (0,es/* path */.ETc)(['shownWarnings', 'length']),
      (0,es/* prop */.vgT)('showUnderlineHelper'),
      (0,es/* prop */.vgT)('showCounter'),
      (0,es/* prop */.vgT)('persistentUnderline'),
    ]),

    showUnderlineIcon: (0,es/* anyPass */.H50)([
      (0,es/* path */.ETc)(['$slots', 'underline-icon']),
      (0,es/* path */.ETc)(['$scopedSlots', 'underline-icon']),
      (0,es/* prop */.vgT)('underlineIcon'),
    ]),

    shownErrors: vm => (0,es/* slice */.tPi)(0, parseInt(vm.errorCount, 10), vm.validationErrors),
    shownWarnings: vm => (0,es/* slice */.tPi)(0, parseInt(vm.warningCount, 10), vm.warningMessages),

    showUnderlineHelper: (0,es/* allPass */.sv4)([
      (0,es/* anyPass */.H50)([
        (0,es/* prop */.vgT)('focused'),
        (0,es/* prop */.vgT)('persistentHint'),
      ]),
      (0,es/* anyPass */.H50)([
        (0,es/* path */.ETc)(['$slots', 'helper']),
        (0,es/* path */.ETc)(['$scopedSlots', 'helper']),
        (0,es/* prop */.vgT)('hint'),
      ]),
    ]),

    showCounter: (0,es/* anyPass */.H50)([
      (0,es/* prop */.vgT)('counter'),
      (0,es/* path */.ETc)(['$slots', 'counter']),
      (0,es/* path */.ETc)(['$scopedSlots', 'counter']),
    ]),

    counterValue: vm => `${vm.localValue?.length || 0} / ${parseInt(vm.counter, 10)}`,

    initialFieldColor: (0,es/* cond */.wVM)([
      [(0,es/* prop */.vgT)('color'), pathTo(['color'], hexColor)],
      [es.T, (0,es/* always */.Bxt)('accent')],
    ]),

    isVarColor: pathTo(['initialFieldColor'], checkVarColor),

    computedColor: vm => (0,es/* cond */.wVM)([
      [(0,es/* prop */.vgT)('disabled'), obj],
      [(0,es/* prop */.vgT)('isVarColor'), (0,es/* always */.Bxt)({ '--ctf-color-accent': `var(--theme_${vm.initialFieldColor}_rgb)` })],
      [es.T, (0,es/* pipe */.zGw)((0,es/* prop */.vgT)('initialFieldColor'), colorToRGB, (0,es/* objOf */.RVN)('--ctf-color-accent'))],
    ])(vm),

    computedColors: propsTo(
      ['computedColor'],
      es/* mergeAll */.Jnq,
    ),

    computedIconSize: (0,es/* pipe */.zGw)(
      (0,es/* cond */.wVM)([
        [(0,es/* propEq */.OH4)('size', 'small'), (0,es/* path */.ETc)(['iconSizesDict', 'small'])],
        [es.T, (0,es/* path */.ETc)(['iconSizesDict', 'large'])],
      ]),
      es/* toString */.BBt,
    ),

    computedLabelIconSize: (0,es/* pipe */.zGw)(
      (0,es/* cond */.wVM)([
        [(0,es/* propEq */.OH4)('size', 'small'), (0,es/* path */.ETc)(['labelIconSizesDict', 'small'])],
        [es.T, (0,es/* path */.ETc)(['labelIconSizesDict', 'large'])],
      ]),
      es/* toString */.BBt,
    ),

    slotProps: (0,es/* pipe */.zGw)(
      template({
        value: (0,es/* prop */.vgT)('localValue'),
        // NOTE: for cButtons:
        disabled: (0,es/* prop */.vgT)('disabled'),
        small: (0,es/* propEq */.OH4)('size', 'small'),
        // NOTE: for cIcons:
        size: (0,es/* prop */.vgT)('computedIconSize'),
        // NOTE: don't need `sizes` in the options object, which used for v-bind
        //       of slot-props defaults (and `sizes` are not)
        sizes: {
          default: (0,es/* prop */.vgT)('computedIconSize'),
          label: (0,es/* prop */.vgT)('computedLabelIconSize'),
          underline: '12',
        },
      }),
      assocComputed('options', (0,es/* dissoc */.anz)('sizes')),
    ),
  },

  methods: {
    onBodyClick(e) {
      this.$refs[this.fieldID].focus();
      this.$emit('click', e);
    },

    setFocus(e) {
      if (this.focused) return;

      this.focused = true;
      this.$emit('focus', e);
    },

    removeFocus(e) {
      if (this.focused) {
        this.focused = false;
        this.$emit('blur', e);
      }
    },

    clearInput() {
      this.localValue = '';
    },

    toggleVisibility() {
      this.currentType = (this.currentType === 'password') ? 'text' : 'password';
    },
  },
});

;// CONCATENATED MODULE: ./ui/src/components/cTextField.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_cTextFieldvue_type_script_lang_js_ = (cTextFieldvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/cTextField.vue



;


/* normalize component */

var cTextField_component = (0,componentNormalizer/* default */.Z)(
  components_cTextFieldvue_type_script_lang_js_,
  cTextFieldvue_type_template_id_40f68b43_scoped_true_lang_pug_render,
  cTextFieldvue_type_template_id_40f68b43_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "40f68b43",
  null
  
)

/* harmony default export */ const cTextField = (cTextField_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[1]!./node_modules/pug-plain-loader/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/NumberItem.vue?vue&type=template&id=5c3e3b09&scoped=true&lang=pug&
var NumberItemvue_type_template_id_5c3e3b09_scoped_true_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _vm.value
    ? _c(
        "div",
        { staticClass: "number" },
        [
          _vm.prependIcon
            ? _c("span", { domProps: { innerHTML: _vm._s(_vm.prependIcon) } })
            : _vm._e(),
          _vm._l(_vm.integer, function (digit, index) {
            return _c(
              "span",
              { key: `${digit}-${index}`, staticClass: "number__item" },
              [_vm._v(_vm._s(digit))]
            )
          }),
          _vm.decimalPoint[1]
            ? _c("span", { staticClass: "assistive-color" }, [
                _vm._v("." + _vm._s(_vm.decimalPoint[1])),
              ])
            : _vm._e(),
        ],
        2
      )
    : _c("div", { staticClass: "text--disabled" }, [_vm._v("—")])
}
var NumberItemvue_type_template_id_5c3e3b09_scoped_true_lang_pug_staticRenderFns = []
NumberItemvue_type_template_id_5c3e3b09_scoped_true_lang_pug_render._withStripped = true


;// CONCATENATED MODULE: ./ui/src/components/NumberItem.vue?vue&type=template&id=5c3e3b09&scoped=true&lang=pug&

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/NumberItem.vue?vue&type=script&lang=js&







// getPrecision returns precision by number
// getPrecision :: Number -> Number
// getPrecision :: 0.0001 -> 4
const getPrecision = (0,es/* pipe */.zGw)(
  toFixed(10),
  (0,es/* replace */.gxs)(/(^[0-9]*\.)|(0*$)/g, ''),
  es/* length */.kE,
);

const getFormattedNumber = (0,es/* replace */.gxs)(/\B(?=(\d{3})+(?!\d))/g, ' ');

/* harmony default export */ const NumberItemvue_type_script_lang_js_ = ({
  props: {
    value: {
      type: Number,
      required: true,
    },

    precision: {
      type: Number,
      default: 0,
    },

    prependIcon: String,
  },

  computed: {
    decimalPoint: (vm) => {
      const precision = getPrecision(vm.precision);
      const number = vm.value.toFixed(precision);

      return (number.toString()).split('.');
    },

    integer: vm => getFormattedNumber((0,es/* head */.YMb)(vm.decimalPoint)).split(' '),
  },
});

;// CONCATENATED MODULE: ./ui/src/components/NumberItem.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_NumberItemvue_type_script_lang_js_ = (NumberItemvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/NumberItem.vue



;


/* normalize component */

var NumberItem_component = (0,componentNormalizer/* default */.Z)(
  components_NumberItemvue_type_script_lang_js_,
  NumberItemvue_type_template_id_5c3e3b09_scoped_true_lang_pug_render,
  NumberItemvue_type_template_id_5c3e3b09_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "5c3e3b09",
  null
  
)

/* harmony default export */ const NumberItem = (NumberItem_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTable/cTablePagination.vue?vue&type=script&lang=js&



















const defaultPaginationOptions = () => [
  10,
  20,
  50,
  100,
];

const allOption = { value: Infinity, text: 'All' };

const paginationPositions = {
  top: 'top',
  bottom: 'bottom',
};

const paginationElementsTypes = {
  anotherPage: 'cButton',
  severalPagesMore: 'span',
  currentPage: 'div',
};


/* harmony default export */ const cTablePaginationvue_type_script_lang_js_ = ({
  mixins: [
    mixins_sync([
      { prop: 'pagination', local: 'localPagination' },
    ]),
  ],

  components: {
    NumberItem: NumberItem,
    cButton: cButton,
    cMenu: cMenu,
    cTextField: cTextField,
  },

  props: {
    count: Number,
    total: Number,

    options: {
      type: Array,
      default: defaultPaginationOptions,
    },

    pagination: {
      type: Object,
      required: true,
    },

    position: {
      type: String,
      default: paginationPositions.bottom,
    },

    allOption: Boolean,
    onlyRightPart: Boolean,
    hideGoToPageSection: {
      type: Boolean,
      default: false,
    },

    hideRowsPerPageSection: {
      type: Boolean,
      default: false,
    },

    hideAllSections: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localPagination: {
        page: 1,
        rowsPerPage: (0,es/* head */.YMb)(this.options),
      },

      icons: {
        googleChevronLeftBaseline: chevron_left_baseline/* default */.Z,
        googleChevronRightBaseline: chevron_right_baseline/* default */.Z,
        googleArrowDropDownBaseline: arrow_drop_down_baseline/* default */.Z,
        googleMoreVertBaseline: more_vert_baseline/* default */.Z,
      },

      paginationElementsTypes,
      cButtonModesDict: cButtonModesDict,
    };
  },

  computed: {
    preparedOptions: pathTo(['options'], (0,es/* map */.UID)(value => ({ value, text: value }))),
    previousItemsCount: vm => (0,es/* dec */.E_m)(vm.localPagination.page) * vm.localPagination.rowsPerPage,
    isFirstPage: (0,es/* pathEq */.uF6)(['localPagination', 'page'], 1),
    pageStart: vm => vm.previousItemsCount + 1,

    pageStop: vm => alt(
      vm.total,
      vm.previousItemsCount + vm.count,
      vm.isLastPage,
    ),

    isAllOptionSelected: (0,es/* pathEq */.uF6)(['localPagination', 'rowsPerPage'], allOption.value),

    allOptions: vm => alt(
      [...vm.preparedOptions, allOption],
      vm.preparedOptions,
      vm.allOption,
    ),

    showLeftPart: (0,es/* both */.HkC)(propTo('onlyRightPart', es/* not */.ffD), propTo('hideAllSections', es/* not */.ffD)),
    showGoToPage: (0,es/* both */.HkC)(propTo('hideGoToPageSection', es/* not */.ffD), pathNotEq(['lastPage'], 1)),
    showRowsPerPage: (0,es/* both */.HkC)(propTo('hideRowsPerPageSection', es/* not */.ffD), propTo('hideAllSections', es/* not */.ffD)),

    lastPage: vm => Math.ceil(vm.total / vm.localPagination.rowsPerPage),
    isLastPage: vm => vm.isAllOptionSelected || (0,es/* equals */.fS0)(
      vm.localPagination.page,
      vm.lastPage,
    ),

    beforePages: ({ makeBefore, makeSpanMore, localPagination }) => alt(
      [
        makeBefore(1),
        makeSpanMore({ locator: 'before-more' }),
        makeBefore(localPagination.page - 2),
        makeBefore(localPagination.page - 1),
      ],
      (0,es/* map */.UID)(makeBefore, (0,es/* range */.w6H)(1, localPagination.page)),
      moreThan(4 + 1, localPagination.page),
    ),

    currentPage: ({ makeCurrentPage, localPagination }) => makeCurrentPage({ page: localPagination.page, locator: 'current-page' }),

    afterPages: ({ makeAfter, makeSpanMore, localPagination, lastPage }) => alt(
      [
        makeAfter(localPagination.page + 1),
        makeAfter(localPagination.page + 2),
        makeSpanMore({ locator: 'after-more' }),
        makeAfter(lastPage),
      ],
      (0,es/* map */.UID)(makeAfter, (0,es/* range */.w6H)(localPagination.page + 1, lastPage + 1)),
      lessThan(lastPage - 4, localPagination.page),
    ),

    paginationElementsConfig:
      ({ beforePages, currentPage, afterPages }) => [...beforePages, currentPage, ...afterPages],

    rowsMenuPositionY: (0,es/* ifElse */.KJl)(
      (0,es/* propEq */.OH4)('position', paginationPositions.bottom),
      (0,es/* always */.Bxt)('top'),
      (0,es/* always */.Bxt)('bottom'),
    ),

    // NOTE: for c-menu-list

    dynamicClassesMenu: template({
      'c-menu-list_at-top': (0,es/* propEq */.OH4)('rowsMenuPositionY', 'top'),
      'c-menu-list_at-bottom': (0,es/* propEq */.OH4)('rowsMenuPositionY', 'bottom'),
    }),

    rowsPerPageBtnLabel: vm => String(
      (vm.localPagination.rowsPerPage === Infinity)
        ? 'All'
        : vm.localPagination.rowsPerPage,
    ),
  },

  methods: {
    toPrevPage() {
      this.localPagination.page -= 1;
    },

    toNextPage() {
      this.localPagination.page += 1;
    },

    validateInputAndGoTo(pageNumber) {
      const validatedNumber = (0,es/* clamp */.uZ5)(1, this.lastPage, pageNumber);
      this.goToPage(validatedNumber);
    },

    goToPage(pageNumber) {
      this.localPagination.page = parseInt(pageNumber, 10);
    },

    setRowPerPageTo(value) {
      this.localPagination.rowsPerPage = value;
    },

    getRowsBtnClass: (rowsPerPage, btnValue) => ({
      'pagination__rows-selection-btn_current': btnValue === rowsPerPage,
    }),

    makeSpanMore: ({ locator }) => ({
      type: 'span',
      classes: ['pagination__more'],
      locator,
      innerText: '...',
    }),

    makeBefore: (i) => ({
      type: 'cButton',
      classes: ['pagination__button'],
      locator: `before-${i}-page`,
      label: String(i),
      value: i,
      small: true,
      mode: 'outlined',
      upperCase: false,
    }),

    makeCurrentPage: ({ page, locator }) => ({
      type: 'div',
      classes: ['pagination__button-current'],
      innerText: page,
      locator,
    }),

    makeAfter: (i) => ({
      type: 'cButton',
      classes: ['pagination__button'],
      locator: `after-${i}-page`,
      label: String(i),
      value: i,
      small: true,
      mode: 'outlined',
      upperCase: false,
    }),

  },

  watch: {
    'localPagination.rowsPerPage': {
      handler() {
        this.localPagination.page = 1;
      },
    },
  },
});

;// CONCATENATED MODULE: ./ui/src/components/cTable/cTablePagination.vue?vue&type=script&lang=js&
 /* harmony default export */ const cTable_cTablePaginationvue_type_script_lang_js_ = (cTablePaginationvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/cTable/cTablePagination.vue



;


/* normalize component */

var cTablePagination_component = (0,componentNormalizer/* default */.Z)(
  cTable_cTablePaginationvue_type_script_lang_js_,
  cTablePaginationvue_type_template_id_f7453a9e_scoped_true_lang_pug_render,
  cTablePaginationvue_type_template_id_f7453a9e_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "f7453a9e",
  null
  
)

/* harmony default export */ const cTablePagination = (cTablePagination_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cTable.vue?vue&type=script&lang=js&






















/* harmony default export */ const cTablevue_type_script_lang_js_ = ({
  $module: 'c-table',

  mixins: [
    mixins_sync([
      { prop: 'value', local: 'localValue' },
      { prop: 'pagination', local: 'localPagination' },
      {
        prop: 'headers',
        local: 'localHeaders',
        propImmediate: false,
      },
      {
        prop: 'headersWidths',
        local: 'localHeadersWidths',
        propImmediate: false,
      },
    ]),
  ],

  directives: {
    overflowHint: directives,
  },

  components: {
    cTableHeader: cTableHeader,
    cTablePagination: cTablePagination,
  },

  props: {
    value: {
      type: Array,
      required: true,
    },

    padding: {
      type: String,
      default: '8px',
    },

    headers: {
      type: Array,
      default: arr,
    },

    itemKey: String,
    pagination: {
      type: Object,
      default: null,
    },

    paginationOptions: {
      type: Array,
      default: defaultPaginationOptions,
    },

    allowDisplayAll: Boolean,
    hideGoToPageSection: Boolean,
    hideRowsPerPageSection: Boolean,
    hideAllPaginationSections: Boolean,
    totalItems: {
      type: Number,
      default: 0,
    },

    hideHeaders: {
      type: Boolean,
      default: false,
    },

    hideActions: {
      type: Boolean,
      default: false,
    },

    fixLayout: Boolean,

    isFirstColumnFixed: {
      type: Boolean,
      default: null,
    },

    locator: {
      type: String,
      default: 'data-table',
    },

    noDataText: {
      type: String,
    },

    refreshable: {
      type: Boolean,
      default: true,
    },

    showPlaceholder: {
      type: Boolean,
      default: false,
    },

    manageable: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    hideLoader: {
      type: Boolean,
      default: false,
    },

    prepareRow: {
      type: Function,
      default: es/* identity */.yRu,
    },

    resizable: {
      type: Boolean,
      default: true,
    },

    headersWidths: Object,
    hideEmptyTable: {
      type: Boolean,
      default: false,
    },

    dense: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    const localHeadersWidths = {};
    const localHeaders = (0,es/* clone */.d9v)(this.headers);
    localHeaders.forEach((header) => {
      localHeadersWidths[header.value] = null;
      // eslint-disable-next-line no-prototype-builtins
      if (header.hasOwnProperty('width')) localHeadersWidths[header.value] = header.width;
    });

    return {
      localValue: [],
      localPagination: null,
      localHeaders,
      visibleHeadersValues: (0,es/* pipe */.zGw)(
        (0,es/* filter */.hXT)(isHideableHeader),
        (0,es/* filter */.hXT)(({ defaultVisibility = true }) => defaultVisibility),
        (0,es/* pluck */.jge)('value'),
      )(this.headers),

      table: null,
      localHeadersWidths,
      isTableResized: false,
      addedHeaders: [],
      skeletonsWidths: getSkeletonsArray(localHeaders.length),
      icons: {
        googleRefreshBaseline: refresh_baseline/* default */.Z,
      },
    };
  },

  computed: {
    /** Preprocess row items. By default using identity function. */
    rows: vm => vm.localValue.map(vm.prepareRow),

    isAnyItemPresent: pathTo(['localValue'], (0,es/* complement */.CyQ)(es/* isEmpty */.xbD)),

    showPagination: (0,es/* where */.arb)({
      pagination: Boolean,
      isAnyItemPresent: Boolean,
      hideActions: es/* not */.ffD,
    }),

    visibleHeaders: ({ localHeaders, visibleHeadersValues }) => (0,es/* pipe */.zGw)(
      (0,es/* filter */.hXT)(isHeaderVisible(visibleHeadersValues)),
    )(localHeaders),

    fixFirstColumnWidth: (0,es/* ifElse */.KJl)(
      propTo('isFirstColumnFixed', (0,es.is)(Boolean)),
      (0,es/* prop */.vgT)('isFirstColumnFixed'),
      (0,es/* pipe */.zGw)(
        propTo('localHeaders', (0,es/* pluck */.jge)('value')),
        (0,es/* anyPass */.H50)([(0,es/* includes */.q9t)('expander'), (0,es/* includes */.q9t)('dragHandle')]),
      ),
    ),

    style: template({
      '--padding': ['padding'],
    }),

    isInteractiveState: (0,es/* whereEq */.goX)({
      loading: false,
      showPlaceholder: false,
    }),

    isTableVisible: vm => (0,es/* not */.ffD)(vm.showPlaceholder && vm.hideEmptyTable),

    placeholderTransitionName: pathAlt(['hideEmptyTable'], 'snap', 'fade'),
  },

  watch: {
    showPlaceholder: {
      immediate: true,
      // async
      handler(newVal, prevVal) {
        if (prevVal && !newVal) {
          // this.initSortable();
        }
      },
    },

    async visibleHeadersValues(cur, prev) {
      if (this.resizable) {
        if (cur.length > prev.length) {
          await this.$nextTick();
          const [firstRow, ...tableRows] = this.table.getElementsByTagName('tr');

          firstRow.appendChild(firstRow.querySelector('.empty_header'));

          tableRows.forEach((tr) => {
            tr.appendChild(tr.querySelector('.emptyTd'));
          });
        }
      }
    },

    localHeaders(cur, prev) {
      if (notEquals(cur.length, prev.length)) {
        this.skeletonsWidths = getSkeletonsArray(cur.length);
      }

      let addedHeaderValue;
      cur.forEach((header) => {
        const width = Number(header.width) ? header.width : null;
        // eslint-disable-next-line no-prototype-builtins
        if (!this.localHeadersWidths.hasOwnProperty(header.value)) {
          addedHeaderValue = header.value;
          this.$set(this.localHeadersWidths, addedHeaderValue, width);
          this.addedHeaders.push(addedHeaderValue);
        }
      });

      this.visibleHeadersValues = this.visibleHeadersValues.concat(this.addedHeaders);
    },
  },
});

;// CONCATENATED MODULE: ./ui/src/components/cTable.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_cTablevue_type_script_lang_js_ = (cTablevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/cTable.vue



;


/* normalize component */

var cTable_component = (0,componentNormalizer/* default */.Z)(
  components_cTablevue_type_script_lang_js_,
  cTablevue_type_template_id_295c8ef7_lang_pug_render,
  cTablevue_type_template_id_295c8ef7_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const cTable = (cTable_component.exports);
;// CONCATENATED MODULE: ./ui/src/tools/tableHelpers.js





// calcOffset :: Number -> Number -> Number
const calcOffset = (0,es/* curry */.WAo)((page, rowsPerPage) => (0,es/* pipe */.zGw)(
  es/* dec */.E_m,
  (0,es/* multiply */.JpY)(rowsPerPage),
)(page));

/**
 * Retruns element DOM path string.
 *
 * @param {null|HTMLElement} elm
 * @returns {string}
 */
const getDomPath = (el) => {
  let stack = '';

  if (!el) {
    return stack;
  }

  let element = el;
  while (element.parentNode != null) {
    stack += `${element.localName}.${element.className} `;
    element = element.parentNode;
  }

  return stack;
};

const getStyleVal = (0,es/* curry */.WAo)(
  (element, css) => window.getComputedStyle(element, null).getPropertyValue(css),
);

const getHeaderCells = (table) => {
  const [firstRow] = table.getElementsByTagName('tr');

  return firstRow.children;
};

const addEmptyCell = (table, isTableResized) => {
  const [firstRow] = table.getElementsByTagName('tr');
  const emptyTh = document.createElement('th');
  emptyTh.classList.add('empty_header');
  if (!isTableResized) emptyTh.style.width = '4px';

  firstRow.appendChild(emptyTh);
};

const getCellsForResize = (table, firstColNonResizable) => {
  const allHeaderCells = [...getHeaderCells(table)];

  if (!firstColNonResizable) return allHeaderCells;

  return tail(allHeaderCells);
};

const tableHelpers_getSkeletonsArray = number => (new Array(10)).fill(null)
  .map(() => (new Array(number)).fill(null)
    .map(() => Math.floor(Math.random() * 51) + 50));

/** Drops object with hide prop
 * @type {Function}
 * @param {Array} objs - objects
 * @return {Any}
 *
 * @summary Array -> Array
 * @example
 * Input:: dropHidden([{v: '1', hide: true}, {v: '2'}])
 * Output:: [{v: '2'}]
 */
const tableHelpers_dropHidden = (0,es/* reject */.d1t)((0,es/* propEq */.OH4)('hide', true));

const idFilter = (0,es/* curry */.WAo)((field, prefix, value) => alt(
  { [field]: { $ilike: { start: value } } },
  { [field]: { $ilike: value ? { pattern: `${prefix}*${value}*` } : '' } },
  (0,es/* test */.Bul)(new RegExp(`^${prefix}`), value),
));



/** Implements a fallbacks chain for filter value
 *
 * @param {[Rule]} rules - An array of objects defining a rule and replacement value
 * @param {string} value - The filter's value
 *
 * <Rule>
 *   @property {string} field - A field for which filter should search if value satisfies a rule
 *   @property {function} rule - Default: () => true. A test function that takes a filter value and
 *      should return boolean defining whenever passed value satisfies given rule or not.
 *   @property {boolean} exact - Default: false. A flag that defines should filter value be set
 *      as is (true) or wrapped into { $ilike: ... } (false)
 *   @paroperty {function} transform - Default: identity. A transformation function for passed value
 *      allows f.e. overriding passed value based on some custom logic
 */
const fallbackFilter = (0,es/* curry */.WAo)((rules, value) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rules.length; i++) {
    const { field, exact = false, start = false, rule = es.T, transform = es/* identity */.yRu } = rules[i];
    let input = transform(value);

    if (start) input = { $ilike: { start: input } };
    else if (!exact) input = { $ilike: input };

    if (rule(value)) {
      if (Array.isArray(field)) return { $or: field.map(f => ({ [f]: input })) };

      return { [field]: input };
    }
  }

  return undefined;
});


/**
 * Creates a filter to search for id. Accepts the '-' value to search for unassigned.
 *
 * @param {string} tableEntity - The entity where the filter will be applied.
 * Eg: 'assignee', 'agent' ...
 * @param {string} value - The filter's value
 * @return {Object}
 *
 * @example
 * ```js
 * Input:: idNoPrefixFilter('assignee', 'UR-123-456');
 * Output:: {
 *  $or: [
 *    { 'assignee.id': { $ilike: 'UR-123-456' } },
 *  ]
 * }
 * ```
 */
const idNoPrefixFilter = (0,es/* curry */.WAo)((tableEntity, value) => {
  const expression = alt('null()', { $ilike: value }, (0,es/* equals */.fS0)('-', value));

  return { $or: [{ [`${tableEntity}.id`]: expression }] };
});


/**
 * Returns the '(Me)' string when the current user id equals the given value. Returns an empty
 * string otherwise.
 *
 * @param {Object} context - The $context
 * @param {string} value - The value to compare
 * @return {string}
 *
 * @example
 * ```js
 * // currentUserPrefix will be called with the value
 * assignee: ({ $context }) => ({
 *   ...
 *   filters: [
 *     filters.optionsSearch({
 *       ...
 *       props: {
 *         ...
 *         prefix: currentUserPrefix($context),
 *       },
 *     }),
 *   ],
 * })
 * ```
 */
const currentUserPrefix = (0,es/* curry */.WAo)((context, value) => alt(
  '(Me)',
  '',
  value === context.user.id,
));

const isInvalidOffset = (total, offset) => (0,es/* allPass */.sv4)([(0,es.lt)(0), (0,es/* gte */.egL)(offset)])(total);

/* harmony default export */ const tableHelpers = ({
  isInvalidOffset: (total, offset) => (0,es/* allPass */.sv4)([(0,es.lt)(0), (0,es/* gte */.egL)(offset)])(total),
  calcOffset,
  getStyleVal,
  getHeaderCells,
  addEmptyCell,
  getSkeletonsArray: tableHelpers_getSkeletonsArray,
  dropHidden: tableHelpers_dropHidden,
  idFilter,
  idNoPrefixFilter,
  currentUserPrefix,
});

;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/components/cDataTable.vue?vue&type=script&lang=js&
























const isNotEqualsTotal = (
  { totalItems: newTotal },
  { totalItems: oldTotal },
) => newTotal !== oldTotal;

const computeTotal = (
  total,
  oldCollection,
  newCollection,
) => total - oldCollection.length + newCollection.length;



const isValidResponse = (0,es/* both */.HkC)(
  (0,es/* propIs */.yTy)(Number, 'total'),
  (0,es/* either */.wEe)(
    (0,es/* propIs */.yTy)(Array, 'collection'),
    (0,es/* propIs */.yTy)(Array, 'requests'),
  ),
);

const invalidResponseError = response => 'Unexpected data returned from \'update\''
    + ' function. Must contain \'total\', \'collection\' or \'requests\' fields.'
    + `But got ${JSON.stringify(response)}`;


/* harmony default export */ const cDataTablevue_type_script_lang_js_ = ({
  $module: 'c-data-table',

  mixins: [
    mixins_sync([
      { prop: 'updating', local: 'localUpdating' },
      { prop: 'value', local: 'items' },
    ]),
  ],

  components: {
    cTable: cTable,
    cIcon: cIcon,
  },

  inheritAttrs: false,

  props: {
    value: {
      type: Array,
      required: true,
    },

    update: {
      type: Function,
    },

    updating: Boolean,
    headers: {
      type: Array,
      default: () => [],
    },

    prepareItem: {
      type: Function,
      default: es/* identity */.yRu,
    },

    paginationOptions: {
      type: Array,
      default: defaultPaginationOptions,
    },

    hideGoToPageSection: Boolean,
    hideRowsPerPageSection: Boolean,
    hideAllPaginationSections: Boolean,

    totalItems: {
      type: Number,
      default: 0,
    },

    showLoader: Boolean,
    showPlaceholder: Boolean,
    padding: {
      type: String,
    },

    fixLayout: Boolean,
    hideEmptyTable: {
      type: Boolean,
      default: false,
    },

    noDataText: {
      type: String,
    },

    fixedFirstColumn: {
      type: Boolean,
      default: null,
    },
  },

  data() {
    const headersWidths = {};
    const localHeaders = (0,es/* clone */.d9v)(this.headers);
    localHeaders.forEach((header) => {
      headersWidths[header.value] = null;
      // eslint-disable-next-line no-prototype-builtins
      if (header.hasOwnProperty('width')) headersWidths[header.value] = header.width;
    });

    return {
      items: [],
      localTotal: 0,
      localUpdating: true,
      isInitialLoading: true,
      pagination: {
        page: 1,
        rowsPerPage: (0,es/* head */.YMb)(this.paginationOptions),
      },

      table: null,
      localHeaders,
      headersWidths,
      icons: {
        googleHourglassBottomBaseline: baseline/* default */.Z,
        connectLoaderAnimated: animated/* default */.Z,
      },
    };
  },

  computed: {
    isAnyItemPresent: pathTo(['items'], (0,es/* complement */.CyQ)(es/* isEmpty */.xbD)),

    isInvalidOffset: ({ totalItems, offset }) => isInvalidOffset(totalItems, offset),

    isPlaceholderShown: (0,es/* ifElse */.KJl)(
      (0,es/* prop */.vgT)('update'),
      (0,es/* where */.arb)({
        isAnyItemPresent: es/* not */.ffD,
        localUpdating: es/* not */.ffD,
        isInitialLoading: es/* not */.ffD,
        $slots: (0,es/* prop */.vgT)('placeholder'),
      }),
      (0,es/* prop */.vgT)('showPlaceholder'),
    ),

    /**
     * Forward specific listeners to child table.
     * Don't introduce methods to just re-emit events.
     */
    listeners: (0,es/* pipe */.zGw)((0,es/* prop */.vgT)('$listeners'), (0,es/* pick */.eiS)(['selected', 'sorted'])),

    isLoaderShown: (0,es/* ifElse */.KJl)(
      (0,es/* prop */.vgT)('update'),
      (0,es/* where */.arb)({
        isInitialLoading: es/* identity */.yRu,
        update: es/* identity */.yRu,
      }),
      (0,es/* prop */.vgT)('showLoader'),
    ),

    offset: ({ pagination: { page, rowsPerPage } }) => calcOffset(page, rowsPerPage),

    needToUpdateAfterTotalItemsChange: ({
      localUpdating, localTotal, totalItems,
    }) => !localUpdating && (localTotal !== totalItems),

    needToUpdateAfterUpdatingChange: ({ localUpdating, updating }) => !localUpdating && updating,

    params: vm => ({
      limit: vm.pagination.rowsPerPage,
      offset: vm.offset,
    }),

    paramsHash: pathTo(['params'], (hash_sum_default())),
  },

  methods: {
    refresh(opts = {}) {
      this.$emit('refresh');
      this.updateItems({ ...opts, forceUpdate: true });
    },

    prepareItems(items) {
      return (0,es/* pipe */.zGw)(
        (0,es/* map */.UID)(this.prepareItem),
        es/* clone */.d9v,
      )(items);
    },

    checkResponse(response) {
      if (!isValidResponse(response)) {
        throw new Error(invalidResponseError(response));
      }
    },

    processError(e) {
      this.localUpdating = false;
      this.logger.logException(e);
    },

    processRequests({ total, requests }, oldParamsHash) {
      this.localTotal = total;
      let result = [];
      let doneRequestsCount = 0;
      const lastRequestsIndex = requests.length - 1;

      return requests.map((request, i) => request.then(items => {
        if (oldParamsHash !== this.paramsHash) return;
        doneRequestsCount += 1;

        // offset to insert in result
        const offset = i === lastRequestsIndex
          ? total - items.length
          : i * items.length;

        result = updateIndex(offset, items, result);

        // we should show data after first finished request
        if (doneRequestsCount === 1) {
          // add null to show loading instad of last row
          this.items = this.prepareItems(items).concat(null);
          this.localUpdating = false;


          // show data from other requests, when all requests finished
        } else if (doneRequestsCount === requests.length) {
          this.items = this.prepareItems(result);
        }
      }));
    },

    processCollection({ collection, total }) {
      this.items = this.prepareItems(collection);
      this.localTotal = computeTotal(total, collection, this.items);
    },

    async processResponse(response, oldParamsHash) {
      if (response.requests) await Promise.any(this.processRequests(response, oldParamsHash));
      else this.processCollection(response);
    },

    async fetchAndUpdateItems() {
      const oldParamsHash = this.paramsHash;
      let res;

      try {
        res = await this.update(this.params);
        this.checkResponse(res);
        await this.processResponse(res, oldParamsHash);
        if (oldParamsHash !== this.paramsHash) return;
      } catch (e) {
        if (oldParamsHash !== this.paramsHash) return;
        this.processError(e);

        return;
      }

      this.$emit('update:totalItems', this.localTotal);

      if (this.isInitialLoading) await this.setIsEmptyCollectionValue();
      this.localUpdating = false;
    },

    async updateItems(opts = {}) {
      if (this.update) {
        await this.fetchAndUpdateItems(opts);
      } else {
        this.items = (0,es/* clone */.d9v)(this.value);
        this.localTotal = this.totalItems;
      }

      if (this.isInitialLoading) {
        this.isInitialLoading = false;
      }
    },

    async checkForEmptyCollection() {
      const result = await this.update({ limit: 0 });

      return result.total === 0;
    },

    async setIsEmptyCollectionValue() {
      if (this.items.length) this.isEmptyCollectionWithoutFilters = false;
      else if (this.update) {
        this.isEmptyCollectionWithoutFilters = await this.checkForEmptyCollection();
      }
    },
  },

  watch: {
    pagination: {
      deep: true,
      handler(newPagination, oldPagination) {
        if (this.isInitialLoading || isNotEqualsTotal(newPagination, oldPagination)) return;
        this.updateItems();
      },
    },

    totalItems() {
      if (!this.needToUpdateAfterTotalItemsChange) return;

      // Correct page number to prevent displaying empty table
      // after deleting last item on last pagination page. Otherwise offset will be incorrect.
      if (this.isInvalidOffset && this.pagination.page > 1) {
        this.pagination.page -= 1;

        // Will trigger `pagination` watcher, so return.
        return;
      }

      this.updateItems();
    },

    updating() {
      if (!this.needToUpdateAfterUpdatingChange) return;
      this.updateItems({ forceUpdate: true });
    },

    isPlaceholderShown: {
      immediate: true,
      handler(newVal) {
        this.$emit('update:showPlaceholder', newVal);
      },
    },

    isLoaderShown: {
      immediate: true,
      async handler(newVal) {
        this.$emit('update:showLoader', newVal);

        if ((0,es/* equals */.fS0)(newVal, false)) {
          await this.$nextTick();

          this.table = this.$refs['c-table'].$el.querySelector('table');
        }
      },
    },

    headers(value) {
      this.localHeaders = (0,es/* clone */.d9v)(value);
    },

    localHeaders(value) {
      value.forEach((header) => {
        const width = Number(header.width) ? header.width : null;
        // eslint-disable-next-line no-prototype-builtins
        if (!this.headersWidths.hasOwnProperty(header.value)) {
          this.$set(this.headersWidths, header.value, width);
        }
      });
    },
  },

  async mounted() {
    if (!this.showManagePanel) {
      await this.$nextTick();
      this.updateItems();
    }
  },
});

;// CONCATENATED MODULE: ./ui/src/components/cDataTable.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_cDataTablevue_type_script_lang_js_ = (cDataTablevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/components/cDataTable.vue



;


/* normalize component */

var cDataTable_component = (0,componentNormalizer/* default */.Z)(
  components_cDataTablevue_type_script_lang_js_,
  cDataTablevue_type_template_id_520b2abd_scoped_true_lang_pug_render,
  cDataTablevue_type_template_id_520b2abd_scoped_true_lang_pug_staticRenderFns,
  false,
  null,
  "520b2abd",
  null
  
)

/* harmony default export */ const cDataTable = (cDataTable_component.exports);
;// CONCATENATED MODULE: ./node_modules/vue-loader/lib/index.js??vue-loader-options!./ui/src/pages/App.vue?vue&type=script&lang=js&



/* harmony default export */ const Appvue_type_script_lang_js_ = ({
  components: {
    cDataTable: cDataTable
  },
   data() {
    return {
      localValue: [{ id: 45 }],
      headers: [ {
        text: 'Customer',
        value: 'customer',
        align: 'left',
      }],
    };
  },

  methods: {
  },
});

;// CONCATENATED MODULE: ./ui/src/pages/App.vue?vue&type=script&lang=js&
 /* harmony default export */ const pages_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./ui/src/pages/App.vue





/* normalize component */
;
var App_component = (0,componentNormalizer/* default */.Z)(
  pages_Appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const App = (App_component.exports);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/connect-ui-toolkit/dist/index.js
var dist = __webpack_require__(4164);
;// CONCATENATED MODULE: ./ui/src/components.js
/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
// prepare UI components
const prepareMarketplaces = (marketplaces) => {
  try {
    return marketplaces.reduce((list, marketplace) => `${list}<li class="list-item">
        <div class="list-item-image">
          <img src="${marketplace.icon}" alt="Thumbnail">
        </div>
        <div class="list-item-content">
          <h4>${marketplace.id} - ${marketplace.name}</h4>
          <p>${marketplace.description}</p>
        </div>
      </li>`, '');
  } catch (e) { return ''; }
};

const components_prepareMarketplacesWithSwitch = (marketplaces) => {
  try {
    return marketplaces.reduce((list, marketplace) => `${list}<li class="list-item">
        <div class="list-item-image">
          <img src="${marketplace.icon}" alt="Thumbnail">
        </div>
        <div class="list-item-content">
          <h4>${marketplace.name}</h4>
          <p>${marketplace.description}</p>
        </div>
        <div class="list-item switch">
          <label class="switch">
              <input type="checkbox" role="switch" value="${marketplace.id}"${marketplace.checked ? ' checked' : ''}>
              <span></span>
          </label>
        </div>
      </li>`, '');
  } catch (e) { return ''; }
};

const prepareChart = (chartData) => `<img src="https://quickchart.io/chart?c=${encodeURI(JSON.stringify(chartData))}">`;

// render UI components
const components_renderMarketplaces = (marketplaces) => {
  const element = document.getElementById('marketplaces');
  element.innerHTML = marketplaces;
};

const renderChart = (chart) => {
  const element = document.getElementById('chart');
  element.innerHTML = chart;
};

// render UI components - buttons
const components_enableButton = (id, text) => {
  const element = document.getElementById(id);
  element.disabled = false;
  if (text) element.innerText = text;
};

const components_disableButton = (id, text) => {
  const element = document.getElementById(id);
  element.disabled = true;
  if (text) element.innerText = text;
};

const components_addEventListener = (id, event, callback) => {
  const element = document.getElementById(id);
  element.addEventListener(event, callback);
};

// render UI components - show/hide
const components_showComponent = (id) => {
  if (!id) return;
  const element = document.getElementById(id);
  element.classList.remove('hidden');
};

const components_hideComponent = (id) => {
  if (!id) return;
  const element = document.getElementById(id);
  element.classList.add('hidden');
};

;// CONCATENATED MODULE: ./ui/src/pages.js
/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/




const saveSettingsData = async (app) => {
  if (!app) return;
  disableButton('save', 'Saving...');
  try {
    const allMarketplaces = await getMarketplaces();
    const checkboxes = processCheckboxes(document.getElementsByTagName('input'));
    const marketplaces = processSelectedMarketplaces(allMarketplaces, checkboxes);
    await updateSettings({ marketplaces });
    app.emit('snackbar:message', 'Settings saved');
  } catch (error) {
    app.emit('snackbar:error', error);
  }
  enableButton('save', 'Save');
};

const index = () => {
  components_hideComponent('app');
  components_showComponent('loader');

  components_hideComponent('loader');
  components_showComponent('app');
};

const settings = async (app) => {
  if (!app) return;
  showComponent('loader');
  hideComponent('app');
  hideComponent('error');
  try {
    const allMarketplaces = await getMarketplaces();
    const { marketplaces: selectedMarketpaces } = await getSettings();
    const preparedMarketplaces = processMarketplaces(allMarketplaces, selectedMarketpaces);
    const marketplaces = prepareMarketplacesWithSwitch(preparedMarketplaces);
    renderMarketplaces(marketplaces);
    enableButton('save', 'Save');
    addEventListener('save', 'click', saveSettingsData.bind(null, app));
    showComponent('app');
  } catch (error) {
    app.emit('snackbar:error', error);
    showComponent('error');
  }
  hideComponent('loader');
};

;// CONCATENATED MODULE: ./ui/src/pages/index.js
/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/








(0,dist/* default */.ZP)({
  'main-card': dist/* Card */.Zb,
  'ui-tab': dist/* Tab */.OK,
  'ui-tabs': dist/* Tabs */.mQ,
  'ui-pad': dist/* Pad */.vh,
}).then(() => { index(); });


const app = new vue_esm/* default */.ZP({
  render: h => h(App),
});

app.$mount('#app');


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	(() => {
/******/ 		__webpack_require__.j = 826;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			826: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkconnect_extension_xvs"] = self["webpackChunkconnect_extension_xvs"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [216], () => (__webpack_require__(7701)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;