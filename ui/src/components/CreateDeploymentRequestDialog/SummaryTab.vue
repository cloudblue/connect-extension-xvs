<template lang="pug">
.summary
  p.summary__title Summary
  .summary__row
    p.summary__key ID
    .summary__value.request-id
      span {{ requestId }}
      c-chip(
        v-if="options?.manual",
        text="Manual",
        type="pale",
        small,
      )

  .summary__row
    p.summary__key Product
    detail-item.summary__value
      template(#image="")
        pic.object-image(
          :src="product?.icon",
          :width="32",
          :height="32",
          size="contain",
        )
      template(#body-text="")
        .truncate-text
          span {{ product?.name }}
      template(#assistive-text="")
        span {{ product?.id }}

  .summary__row
    p.summary__key Hub
    detail-item.summary__value
      template(#body-text="")
        .truncate-text
          span {{ hub?.name }}
      template(#assistive-text="")
        span {{ hub?.id }}

  .summary__row
    p.summary__key PPR
    .summary__value.ppr-version
      c-icon(
        :icon="icons.googleDescriptionBaseline",
        size="16px",
      )
      span Version {{ ppr?.version }}

  .summary__row
    p.summary__key Marketplace
    p.summary__value {{ computedMarketplacesText }}
  .summary__row
    p.summary__key L2 Resellers
    .summary__value.delegate
      c-icon(
        :icon="delegateIcon",
        size="16px",
      )
      span {{ delegateText }}

</template>

<script>
import {
  googleCheckCircleBaseline,
  googleDescriptionBaseline,
  googleRemoveCircleBaseline,
} from '@cloudblueconnect/material-svg';

import cChip from '~components/cChip.vue';
import cIcon from '~components/cIcon.vue';
import DetailItem from '~components/DetailItem.vue';
import Pic from '~components/Pic.vue';


export default {
  components: {
    cChip,
    cIcon,
    DetailItem,
    Pic,
  },

  props: {
    requestId: {
      type: String,
      required: true,
    },

    product: {
      type: Object,
      required: true,
    },

    hub: {
      type: Object,
      required: true,
    },

    ppr: {
      type: Object,
      required: true,
    },

    marketplaces: {
      type: Object,
      required: true,
    },

    options: {
      type: Object,
      default: () => ({
        delegate: false,
        manual: false,
      }),
    },
  },

  data: () => ({
    icons: {
      googleCheckCircleBaseline,
      googleDescriptionBaseline,
      googleRemoveCircleBaseline,
    },
  }),

  computed: {
    computedMarketplacesText: ({ marketplaces }) => (marketplaces.all ? 'All' : marketplaces.choices.map(mp => mp.id).join(', ')),
    delegateText: ({ options }) => (options?.delegate ? 'Delegated' : 'Not delegated'),
    delegateIcon: ({ options, icons }) => (
      options?.delegate
        ? icons.googleCheckCircleBaseline
        : icons.googleRemoveCircleBaseline
    ),
  },
};

</script>

<style lang="stylus" scoped>
.summary {
  &__title {
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    color: #212121;
  }

  &__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 48px;
    border-bottom: 1px solid #E0E0E0;

    &:last-child {
      border-bottom: none;
    }
  }

  &__key {
    margin: 0;
    width: 164px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }

  &__value {
    margin: 0;

    &p {
      font-size: 14px;
      line-height: 20px;
    }
  }

  .ppr-version,
  .delegate,
  .request-id {
    display: flex;
    align-items: center;

    :first-child {
      margin-right: 4px;
    }
  }
}
</style>
