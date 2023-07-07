import {
  __,
  always,
  identity,
  ifElse,
  is,
  pipe,
  prop,
  reduce,
  unless,
  when,
} from 'ramda';


import {
  nest,
  propOrProp,
} from '~utils';

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
    [localErrors]: pipe(
      propOrProp(externalErrors, 'validate__rulesApplianceResult'),
      when(is(String), nest),
      unless(is(Array), always([])),
    ),
  },

  methods: {
    async validateField(value) { // NOTE: return True|False|Array<String>
      if (!this[rules].length) return true;

      this[processing] = true;

      // NOTE: array with results of appliance each rule against value accordingly true|false|String
      const validationResults = await Promise.all(this.rules.map(r => r(value)));

      // NOTE: array of strings (error messages), or `true`, if all rules passed
      return reduce((acc, res) => {
        let result = acc;

        if (res === true) return result;
        if (acc === true) result = [];
        if (is(String, res)) result.push(res);

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
        const middlewareFn = ifElse(
          is(String),
          prop(__, this),
          identity,
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

export default validateMixinFactory;
