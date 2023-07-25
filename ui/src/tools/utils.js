import convert from 'color-convert';

import {
  T,
  __,
  all,
  always,
  anyPass,
  apply,
  applyTo,
  assoc,
  assocPath,
  chain,
  clone,
  complement,
  concat,
  cond,
  curry,
  either,
  equals,
  find,
  findIndex,
  flatten,
  flip,
  fromPairs,
  gt,
  head,
  identity,
  ifElse,
  is,
  isEmpty,
  isNil,
  join,
  keys,
  lens,
  lt,
  map,
  nth,
  of,
  omit,
  or,
  over,
  path,
  pathEq,
  pipe,
  prop,
  propEq,
  props,
  reduce,
  repeat,
  replace,
  split,
  tail,
  times,
  toLower,
  toPairs,
  trim,
  type,
  unless,
  useWith,
  values,
  when,
} from 'ramda';


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
export const flattenObj = (source) => {
  const go = obj_ => chain(([k, v]) => {
    if (type(v) === 'Object' || type(v) === 'Array') {
      return map(([k_, v_]) => [`${k}.${k_}`, v_], go(v));
    }

    return [[k, v]];
  }, toPairs(obj_));

  return fromPairs(go(source));
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
export const pathOrPath = curry((a, b, source) => or(path(a, source), path(b, source)));

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
export const pathTo = curry((p, cb, target) => pipe(path(p), cb)(target));

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
export const isObjectStrict = pipe(type, equals('Object'));

/**
 * Verify all elements are number or string.
 *
 * @function
 * @param {array} arr
 * @returns {boolean}
 */
const isAllPrimitive = all(anyPass([is(Number), is(String)]));

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
export const template = curry((tpl, src) => {
  /* eslint-disable no-use-before-define */
  function processTpl(v) {
    return map(cond([
      // Result of function
      [is(Function), applyTo(src)],

      // Empty is constant data
      [isEmpty, identity],

      // Array may be path or template
      [is(Array), processArray],

      // Object is always template part
      [isObjectStrict, template(__, src)],

      // Everything else is constant data
      [T, identity],
    ]))(v);
  }

  function processArray(v) {
    return cond([
      // if array is path
      [isAllPrimitive, path(__, src)],

      // In other cases array is template part
      [T, processTpl],
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
export const pathIfElse = curry((p, i, e) => pathTo(p, ifElse(identity, i, e)));

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
export const propsTo = curry((p, cb, source) => pipe(props(p), cb)(source));

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
export const alt = curry((t, f, c) => {
  if (is(Function, c)) {
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
export const isNilOrEmpty = anyPass([isEmpty, isNil]);

/**
 * Returns `true` if value is not empty and not `null`/`undefined`, otherwise `false`.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 */
export const isNotNilOrEmpty = complement(isNilOrEmpty);

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
export const notProp = complement(prop);

/**
 * Returns new empty object.
 *
 * @function
 * @returns {object}
 */
export const obj = () => ({});

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
export const pathAlt = curry((p, t, f) => pathTo(p, alt(t, f)));

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
export const propTo = curry((p, cb, target) => pipe(prop(p), cb)(target));

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
export const safeSplit = curry((s, str) => when(is(String), split(s))(str));

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
export const dpath = useWith(path, [safeSplit('.')]);

export const random = (min = 0, max = 1) => Math.floor(Math.random() * (max - min + 1) + min);

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
export const debounce = curry((ms, cb) => {
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
export const kebabCase = pipe(
  toLower,
  replace(/[-_]+/g, ' '),
  trim,
  replace(/\s+/g, '-'),
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
export const propOrProp = curry((a, b, source) => or(prop(a, source), prop(b, source)));

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
export const assocDPath = useWith(assocPath, [safeSplit('.')]);

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
export const pathHead = pipe(safeSplit('.'), head);

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
export const dassoc = useWith(assocPath, [safeSplit('.')]);

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
export const mutatePath = (p, v, o) => {
  const set = (oo, nextProp, ...otherProps) => {
    if (isEmpty(otherProps)) {
      oo[nextProp] = v;

      return o;
    }

    if (isNil(oo[nextProp])) oo[nextProp] = {};

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
export const pathTail = pipe(safeSplit('.'), tail);

/**
 * Returns true if the `value` is string.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 */
export const isString = is(String);

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
export const ensureString = cond([
  [isNilOrEmpty, always('')],
  [is(Array), join('')],
  [is(String), identity],
  [T, toString],
]);

export const biarg = curry((f, a, b) => f(a)(b));

// ensureArray parse to array if it is not
// ensureArray :: Any -> Array
export const ensureArray = unless(is(Array), of);

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
export const findByPath = curry((k, a, v) => find(pathEq(v, k), a));

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
export const nest = v => [v];

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
export const enrich = curry((bysrc, bytrg, to, s, t) => {
  const src = clone(s);
  const trg = clone(t);
  const trgPath = when(is(String), nest)(bytrg);
  const srcPath = when(is(String), nest)(bysrc);
  const enrichByPath = map(i => assoc(
    to,
    pipe(
      path(trgPath),
      findByPath(srcPath, src),
    )(i),
  )(i));

  return ifElse(
    is(Array),
    enrichByPath,
    pipe(
      nest,
      enrichByPath,
      nth(0),
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
export const findByProp = curry((p, v, a) => find(propEq(v, p), a));

/**
 * Standarizes a format for an alias with a prefix
 *
 * @param {String} contextProp - the name of the aliased prop
 *
 * @param {Object} opts
 * @param {String} opts.prefix - generated prefix
 */
export const getAlias = (contextProp, { prefix } = {}) => (prefix ? `${prefix}:${contextProp}` : contextProp);

export const hasMultipleElements = collection => is(Array, collection) && collection.length > 1;

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
export const isDeepNilOrEmpty = ifElse(
  isObjectStrict,
  pipe(flattenObj, values, all(isNilOrEmpty)),
  isNilOrEmpty,
);

/**
 * Return new empty array.
 *
 * @function
 * @returns {array}
 */
export const arr = () => ([]);

/** Gets index of first object with equal prop with value in array
 *
 * @function
 * @param {string}    propName    name of object property in each object
 * @param {string}     value     finding value
 * @param {array}     array     array of similar objects
 *
 * @return {number}
 */
export const findIndexByProp = curry(
  (propName, value, array) => findIndex(propEq(value, propName))(array),
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
export const notEquals = complement(equals);

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
export const notEmpty = complement(isEmpty);

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
export const snapshot = (val, cb = identity) => unless(
  either(equals(undefined), is(Function)),
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
export const lessThan = flip(lt);

/**
 * Returns `true` if the second argument is greater than the first; `false` otherwise.
 *
 * @function
 * @param {*} a Comparable value
 * @param {*} b Comparable value
 * @returns {boolean}
 */
export const moreThan = flip(gt);

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
export const pathNotEq = complement(pathEq);

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
export const safeConcat = curry((o1, o2) => concat(
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
export const valuesDeep = source => pipe(
  keys,
  reduce((r, v) => pipe(
    prop(v),
    when(isObjectStrict, valuesDeep),
    concat(r),
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
export const isEmptyObjWithExceptions = curry((excludeProps, params) => pipe(
  omit(excludeProps),
  valuesDeep,
  all(isNilOrEmpty),
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
export const propsApply = curry((p, cb, source) => pipe(props(p), apply(cb))(source));

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
export const updateIndex = curry((idx, data, collection) => {
  let trg = snapshot(collection);

  if (trg.length < idx) trg = trg.concat(repeat(null, idx - trg.length));
  trg.splice(idx, data.length, data);

  return flatten(trg);
});

/**
 *
 * @param fns
 * @returns {*|[(function(*): boolean)]|string|boolean}
 *
 * @example
 * triargPipe(assoc, lens(identity), over)('a', pathEq(['b'], c), {b: c}) // => {a: true, b: c}
 */
export const triargPipe = (...fns) => curry((a, b, c) => pipe(...fns)(a)(b)(c));

/**
 *
 * @type {*}
 *
 * @example
 * assocComputed('a', pathEq(['b'], c), {b: c}) // => {a: true, b: c}
 */
export const assocComputed = triargPipe(assoc, lens(identity), over);

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
export const rhx = pipe(times(() => Math.floor(Math.random() * 16).toString(16)), join(''));

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
export const toFixed = curry((precision, v) => v.toFixed(precision));

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
export const hexBrightness = curry((delta, color) => pipe(
  convert.hex.rgb,
  map((v) => {
    const val = v + delta;

    if (val < 0) {
      return 0;
    }

    if (val > 255) {
      return 255;
    }

    return val;
  }),
  convert.rgb.hex,
  concat('#'),
)(color));

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
export const hexToRGB = hex => convert.hex.rgb(hex);

/**
 * Check is color bright or not.
 * https://www.w3.org/TR/AERT/#color-contrast
 *
 * @function
 * @param {string} color Color in hex (supports `#` at start)
 * @returns {boolean} Is color bright or not
 */
export const isBright = pipe(
  replace('#', ''),
  convert.hex.rgb,
  ([r, g, b]) => r * 0.299 + g * 0.587 + b * 0.114 > 180,
);
