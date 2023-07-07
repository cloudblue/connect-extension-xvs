<template lang="pug">
.date-item(
  v-if="date",
)
  span {{ date }}
  template(v-if="!dateOnly")
    span.inline-block.ml-1(v-if="oneLine") {{ date }}
.text--disabled(v-else) —
</template>


<script>
import {
  timeFormats,
} from '~constants';


export default {
  props: {
    date: [String, Date],
    dateOnly: Boolean,
    oneLine: Boolean,
    timeFormat: {
      default: timeFormats.TIME,
      type: String,
    },
  },
};
</script>
