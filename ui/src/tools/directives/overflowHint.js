import {
  gt,
  gte,
  lt,
} from 'ramda';


import {
  debounce,
} from '~utils';


export const OVERFLOW_STATUS = {
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
export const getOverflowStatus = ({ offsetWidth, scrollLeft, scrollWidth }) => {
  if (gte(offsetWidth, scrollWidth)) return OVERFLOW_STATUS.NONE;

  const isOverflowingLeft = gt(scrollLeft, 0);
  const isOverflowingRight = lt(Math.ceil(scrollLeft + offsetWidth), scrollWidth);

  let status = OVERFLOW_STATUS.NONE;

  if (isOverflowingLeft) status = OVERFLOW_STATUS.LEFT;
  if (isOverflowingRight) status = OVERFLOW_STATUS.RIGHT;
  if (isOverflowingLeft && isOverflowingRight) status = OVERFLOW_STATUS.BOTH;

  return status;
};

export const setClasses = (el, status) => {
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
export default {
  async bind(el, { value: selector }, { context }) {
    await context.$nextTick();

    const container = selector ? el.querySelector(selector) : el;

    const overflowElement = document.createElement('div');
    overflowElement.classList.add('overflow-container');
    container.append(overflowElement);

    const calculateOverflowStatus = debounce(16, () => {
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
};
