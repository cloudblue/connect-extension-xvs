<!-- Detail Item Component

View:

title  subtitle
[ image ] [ content ]
          [ body-text ]
          assistive-text

Usage notes:

- All params are optional.
- "title" can be a slot or a property, the slot has highest priority
- "body-text" slot intended to show text and links
  (may have [!]inline[!] controls, like icon buttons),
  related to item, that need to look consistent in case of component
- "content" slot intended to show any other rich content like status marks,
    other external content, related to item, and may look different
- "image" slot intended to show image (or other image-like content) related to item,
  image container places left and indents the content, body-text and assistive-text.
  image container may be placed to the right with "imageRight" param, it will be shown at
  the right side, after the longest content ends.

Example:

detail-item(
  title="Example detail Item Title",   // Item title, shows bold
  subtitle="Visible only for you",     // Subtitle, shows dimmed after title text
  assistive-text="ID-124-123",         // Assistive text, shows dimmed at the bottom
  image-right,                         // Places image container to the right
  dense,                               // Decreases margin between image and text to 4px
)
  template(#image="")
    img(src="cat.jpg")                 // Image
  template(#content="")
    .status-mark Active  // Rich content
  template(#body-text="")
    span Example text   // Text-like content
      c-button.ml-1(                        // Inline control
        :icon="icons.googleEditBaseline",
        small,                           // [!] Required for proper appearance
        @click="openNoteDialog()",
      )
-->

<template lang="pug">
.detail-item(:locator="locator" :class="{ 'detail-item_dense': dense }")
  .detail-item__head(v-if="title || $slots.title")
    span(v-if="!$slots.title", :locator="`${locator}-title`") {{ title }}

    slot(name="title")

    span.detail-item__subhead(v-if="subtitle")  {{ subtitle }}

    slot(name="buttons")

  .detail-item__content-holder(@click="$emit('click')")
    .detail-item__image(
      v-if="$slots.image",
      :class="{ 'detail-item__image_right': imageRight }",
    )
      slot(name="image")

    .detail-item__content
      slot(name="content")

      .detail-item__text(
        v-if="bodyText || $slots['body-text']",
        :locator="`${locator}-text`",
      )
        slot(name="body-text")
          | {{ bodyText }}

      .detail-item__assistive-text(
        v-if="assistiveText || $slots['assistive-text']",
        :locator="`${locator}-assistive-text`",
      )
        slot(name="assistive-text")
          | {{ assistiveText }}
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },

    subtitle: {
      type: String,
      required: false,
    },

    locator: {
      type: String,
      required: false,
      default: 'detail-item',
    },

    assistiveText: {
      type: String,
      required: false,
    },

    bodyText: {
      type: String,
      required: false,
    },

    imageRight: {
      type: Boolean,
      required: false,
      default: false,
    },

    dense: Boolean,
  },
};
// NOTE: styles is in the main layout.styl file
</script>
