<template lang="pug">
  .app(:style="styles")
    portal-target(name="destination", multiple)
    router-view

</template>

<script>
export default {
  props: {
    // This is the toolkit instance itself
    toolkit: Object,
  },

  data: () => ({
    height: '',
  }),

  computed: {
    styles: vm => ({
      minHeight: vm.height,
    }),
  },

  created() {
    this.toolkit.listen('containerSize', ({ height }) => {
      this.height = height;
    });
    window.addEventListener('dragover', e => e.preventDefault(), false);
    window.addEventListener('drop', e => e.preventDefault(), false);
  },
};
</script>
