<template lang="pug">
  c-dialog.request-task-info-dialog(
    v-model="localValue",
    title="Task Info",
  )
    div(v-if="item")
      grid-item(
        label="ID",
        :value="item.id",
        :column-width="85",
      )

      grid-item(
        label="Created",
        :value="item.created | utcToLocal",
        :column-width="85",
      )

      grid-item(
        label="Elapsed time",
        :value="item.elapsed",
        :column-width="85",
      )

      grid-item(
        label="Status",
        :column-width="85",
      )
        template(#value="")
          c-status(:status="item.status")

      .request-task-info-dialog__divider.divider

      grid-item(
        label="Event",
        :value="item.event",
        :column-width="85",
      )

</template>

<script>
import cDialog from '~components/cDialog.vue';
import cStatus from '~components/cStatus.vue';
import GridItem from '~components/GridItem.vue';

import sync from '~mixins/sync';


export default {
  mixins: [sync([{ prop: 'value', local: 'localValue' }])],

  components: {
    cDialog,
    cStatus,
    GridItem,
  },

  props: {
    value: Boolean,
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    localValue: false,
  }),
};

</script>

<style lang="stylus">
.request-task-info-dialog {
  &__divider {
    margin: 24px 0;
  }
}

</style>
