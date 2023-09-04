<template lang="pug">
c-dialog(
  v-model="localValue",
  ref="dialog",
  title="Create Deployment Request",
  :actions="currentTabActions",
  :error-text.sync="errorText",
  :status="currentStepText",
  :tabs="tabs",
  height="640px",
  width="800px",
  is-wizard,
  @change-tab="onTabChange",
)
  template(#product="")
    products-tab(
      v-model="form.product",
      @error="setError",
    )

  template(#hub="")
    hubs-tab(
      v-model="form.hub",
      :product-id="form.product?.id",
      @error="setError",
    )

  template(#ppr="")
    ppr-tab(
      v-model="form.ppr",
      :deployment-id="deployment?.id",
      @error="setError",
    )

  template(#marketplaces="")
    marketplaces-tab(
      v-model="form.marketplaces",
      :deployment-id="deployment?.id",
      @error="setError",
    )

  template(#options="")
    options-tab(v-model="form.options")

  template(#summary="")
    summary-tab(
      :request-id="createdRequest?.id",
      :product="form.product",
      :hub="form.hub",
      :ppr="form.ppr",
      :marketplaces="form.marketplaces",
      :options="form.options",
    )

</template>

<script>
import cDialog from '~components/cDialog.vue';
import HubsTab from './HubsTab.vue';
import MarketplacesTab from './MarketplacesTab.vue';
import OptionsTab from './OptionsTab.vue';
import ProductsTab from './ProductsTab.vue';
import PprTab from './PprTab.vue';
import SummaryTab from './SummaryTab.vue';

import sync from '~mixins/sync';

import {
  createDeploymentRequest,
  getDeployments,
} from '@/utils';


const defaultForm = () => ({
  product: {},
  hub: {},
  ppr: {},
  marketplaces: {
    choices: [],
    all: false,
  },
  options: {
    manual: false,
    delegate: false,
  },
});

export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    cDialog,
    HubsTab,
    MarketplacesTab,
    OptionsTab,
    ProductsTab,
    PprTab,
    SummaryTab,
  },

  props: {
    value: Boolean,
  },

  data: () => ({
    localValue: false,
    currentTab: null,
    form: defaultForm(),
    createdRequest: null,
    deployment: null,
    errorText: '',
  }),

  computed: {
    tabs: vm => [
      {
        key: 'product',
        label: 'Product',
        assistiveText: vm.form.product?.name,
      },
      {
        key: 'hub',
        label: 'Hub',
        assistiveText: vm.form.hub?.name,
      },
      {
        key: 'ppr',
        label: 'PPR',
        assistiveText: vm.form.ppr?.version ? `Version ${vm.form.ppr.version}` : undefined,
      },
      {
        key: 'marketplaces',
        label: 'Marketplaces',
        assistiveText: vm.form.marketplaces.all ? 'All' : vm.form.marketplaces?.choices.map(mp => mp.id).join(', '),
      },
      {
        key: 'options',
        label: 'Options',
      },
      {
        key: 'summary',
        label: 'Summary',
      },
    ],

    currentStep: vm => vm.tabs.findIndex(tab => tab.key === vm.currentTab?.key) + 1,

    currentStepText: ({ currentStep, isLastStep }) => (isLastStep ? 'Summary' : `Step ${currentStep}`),
    isLastStep: ({ tabs, currentStep }) => currentStep === tabs.length,
    isFirstStep: ({ currentStep }) => currentStep === 1,
    isPreviousToLastStep: ({ tabs, currentStep }) => currentStep === tabs.length - 1,

    isCurrentTabValid: vm => {
      const key = vm.currentTab?.key;
      const currentTabForm = vm.form[key];

      if (!key || !currentTabForm) return false;

      if (key === 'product' || key === 'hub') return !!currentTabForm.id;
      if (key === 'ppr') return !!currentTabForm.version;
      if (key === 'marketplaces') return !!currentTabForm.all || !!currentTabForm.choices.length;

      return true;
    },

    defaultTabActions: vm => [
      {
        label: 'Cancel',
        closeAfterHandle: true,
        color: '#212121',
      },
      { type: 'spacer' },
      {
        label: 'Back',
        handler: vm.goToPreviousStep,
        disabled: vm.isFirstStep,
        closeAfterHandle: false,
        color: '#212121',
      },
      {
        label: vm.isPreviousToLastStep ? 'Create' : 'Next',
        handler: vm.nextStepHandler,
        disabled: !vm.isCurrentTabValid,
        closeAfterHandle: false,
        color: '#2C98F0',
      },
    ],

    nextStepHandler: vm => {
      // Create deployment request before summary tab
      if (vm.isPreviousToLastStep) return vm.createDeploymentRequest;
      // Fetch deployment after we get product and hub
      if (vm.currentTab?.key === 'hub') return vm.fetchDeployment;

      return vm.goToNextStep;
    },

    summaryTabActions: vm => [
      {
        label: 'Go to details',
        handler: vm.goToDetails,
        closeAfterHandle: true,
        color: '#212121',
      },
      {
        label: 'Close',
        handler: () => vm.$emit('request-created'),
        closeAfterHandle: true,
        color: '#212121',
      },
    ],

    currentTabActions: vm => (vm.isLastStep ? vm.summaryTabActions : vm.defaultTabActions),
  },

  methods: {
    goToPreviousStep() {
      this.$refs.dialog.previousStep();
    },

    goToNextStep() {
      this.$refs.dialog.nextStep();
    },

    async createDeploymentRequest() {
      this.createdRequest = await createDeploymentRequest({
        marketplaces: this.form.marketplaces,
        deployment: { id: this.deployment.id },
        ppr: { id: this.form.ppr.id },
        manually: this.form.options.manual,
        delegate_l2: this.form.options.delegate,
      });

      this.goToNextStep();
    },

    async fetchDeployment() {
      [this.deployment] = await getDeployments({
        hubId: this.form.hub.id,
        productId: this.form.product.id,
      });

      this.goToNextStep();
    },

    goToDetails() {
      this.$router.push({ name: 'RequestDetails', params: { id: this.createdRequest.id } });
    },

    onTabChange(tab) {
      this.currentTab = tab;
    },

    setError(e) {
      this.errorText = e.message;
    },
  },

  watch: {
    localValue(v) {
      if (!v) {
        this.form = defaultForm();
      }
    },
  },
};

</script>
