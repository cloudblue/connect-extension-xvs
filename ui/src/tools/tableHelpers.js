import {
  T,
  allPass,
  curry,
  dec,
  equals,
  gte,
  identity,
  lt,
  multiply,
  pipe,
  propEq,
  reject,
  tail,
  test,
} from 'ramda';


import {
  alt,
} from '~utils';

// calcOffset :: Number -> Number -> Number
export const calcOffset = curry((page, rowsPerPage) => pipe(
  dec,
  multiply(rowsPerPage),
)(page));

/**
 * Retruns element DOM path string.
 *
 * @param {null|HTMLElement} elm
 * @returns {string}
 */
export const getDomPath = (el) => {
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

export const getStyleVal = curry(
  (element, css) => window.getComputedStyle(element, null).getPropertyValue(css),
);

export const getHeaderCells = (table) => {
  const [firstRow] = table.getElementsByTagName('tr');

  return firstRow.children;
};

export const addEmptyCell = (table, isTableResized) => {
  const [firstRow] = table.getElementsByTagName('tr');
  const emptyTh = document.createElement('th');
  emptyTh.classList.add('empty_header');
  if (!isTableResized) emptyTh.style.width = '4px';

  firstRow.appendChild(emptyTh);
};

export const getCellsForResize = (table, firstColNonResizable) => {
  const allHeaderCells = [...getHeaderCells(table)];

  if (!firstColNonResizable) return allHeaderCells;

  return tail(allHeaderCells);
};

export const getSkeletonsArray = number => (new Array(10)).fill(null)
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
export const dropHidden = reject(propEq(true, 'hide'));

export const idFilter = curry((field, prefix, value) => alt(
  { [field]: { $ilike: { start: value } } },
  { [field]: { $ilike: value ? { pattern: `${prefix}*${value}*` } : '' } },
  test(new RegExp(`^${prefix}`), value),
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
export const fallbackFilter = curry((rules, value) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rules.length; i++) {
    const { field, exact = false, start = false, rule = T, transform = identity } = rules[i];
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
export const idNoPrefixFilter = curry((tableEntity, value) => {
  const expression = alt('null()', { $ilike: value }, equals('-', value));

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
export const currentUserPrefix = curry((context, value) => alt(
  '(Me)',
  '',
  value === context.user.id,
));

export const isInvalidOffset = (total, offset) => allPass([lt(0), gte(offset)])(total);

export default {
  isInvalidOffset: (total, offset) => allPass([lt(0), gte(offset)])(total),
  calcOffset,
  getStyleVal,
  getHeaderCells,
  addEmptyCell,
  getSkeletonsArray,
  dropHidden,
  idFilter,
  idNoPrefixFilter,
  currentUserPrefix,
};
