<template lang="pug">
  .item-row(ref="item-row")
    .item-label(ref="item-label")
      span(v-if="!$slots.label") {{ label }}

      slot(name="label")

    .item-value(
      ref="item-value",
      :locator="locator",
    )
      span(v-if="!$slots.value")
        span(v-if="value") {{ value }}
        span.text--disabled(v-else) —

      slot(name="value")
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: false,
    },

    value: {
      type: [String, Number],
      required: false,
    },

    locator: {
      type: String,
      required: false,
      default: 'grid-item',
    },

    columnWidth: Number,
    rowOffset: Number,

    truncate: Boolean,
    truncateLabel: Boolean,
    truncateValue: Boolean,
  },

  methods: {
    setFirstColumnWidth() {
      this.$refs['item-row'].style.gridTemplateColumns = `var(--grid-item-first-col, ${this.columnWidth}px) 1fr`;
    },

    setFirstRowOffset() {
      this.$refs['item-row'].style.marginTop = `var(--grid-item-row-offset, ${this.rowOffset}px)`;
    },

    addTruncateLabel() {
      this.$refs['item-label'].classList.add('truncate-text');
    },

    addTruncateValue() {
      this.$refs['item-value'].classList.add('truncate-text');
    },
  },

  mounted() {
    if (this.truncateLabel || this.truncate) {
      this.addTruncateLabel();
    }

    if (this.truncateValue || this.truncate) {
      this.addTruncateValue();
    }

    if (this.columnWidth) this.setFirstColumnWidth();
    if (this.rowOffset) this.setFirstRowOffset();
  },
};
</script>

<style lang="stylus">
@import '~styles/common';

.item-row {
  display: grid;
  grid-template-columns: var(--grid-item-first-col, 60px) 1fr;
  grid-column-gap: 16px;
  align-items: start;

  & + & {
    margin-top: var(--grid-item-row-offset, 12px); // NOTE: use variable, 12 or 8
  }
}

.item-label {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: $base-text-color;
}
</style>
