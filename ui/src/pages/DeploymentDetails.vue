<template lang="pug">
  .deployment-details
    .title Deployment Details
    ui-tabs
      ui-tab(default tab="Foo") Foo
      ui-tab(tab="Bar") Bar
      ui-tab(tab="Baz") Baz
      ui-pad(pad="Foo")
        .foo-tab Foo
      ui-pad(pad="Bar")
        .bar-tab Bar
      ui-pad(pad="Baz")
        .baz-tab Baz

</template>

<script>
export default {
};
</script>
