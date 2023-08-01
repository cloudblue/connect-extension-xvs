<template lang="pug">
.mark-down(
  v-html="text",
  :class="{ 'mark-down_escaped': escaped, 'truncated': truncated }",
  locator="mark-down",
)
</template>


<script>
import {
  marked,
} from 'marked';

import {
  pipe,
  replace,
} from 'ramda';

import removeMarkdown from 'remove-markdown';
import xss from 'xss';


const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
  const html = linkRenderer.call(renderer, href, title, text);

  return html.replace(/^<a /, '<a target="_blank" ');
};

const MAX_NESTED_QUOTES = 3;
const blockquoteRegExp = new RegExp(`(<blockquote>\\s?){${MAX_NESTED_QUOTES}}`);

const blockquoteRenderer = renderer.blockquote;
renderer.blockquote = (str) => {
  if (!str) return '';
  if (blockquoteRegExp.test(str)) return str;

  return blockquoteRenderer.call(renderer, str);
};

marked.use({
  mangle: false,
  headerIds: false,
});

marked.setOptions({
  renderer,
});

const stripDoubleLineBreaks = replace(/\n\n/gm, '\n');

export default {
  props: {
    content: {
      type: String,
      default: '',
    },

    onlyLists: {
      type: Boolean,
      default: false,
    },

    removeMarkdown: Boolean,

    escaped: {
      type: Boolean,
      default: false,
    },

    truncated: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    text() {
      let preparedContent = this.content;

      if (this.removeMarkdown) {
        preparedContent = pipe(removeMarkdown, stripDoubleLineBreaks)(this.content);
      } else if (this.onlyLists) {
        preparedContent = removeMarkdown(this.content, { stripListLeaders: false });
      }

      return pipe(
        marked,
        xss,
      )(preparedContent);
    },
  },
};
</script>


<style lang="stylus">
@import '~styles/common';

.mark-down {
  font-size: $general-font-size;
  line-height: $general-line-height;

  > :first-child {
    margin-top: 0;
  }
  > :last-child {
    margin-bottom: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: $font-weight-bold;
  }

  h1 {
    margin-top: 40px;
    margin-bottom: 28px;
    font-size: 24px;
    line-height: 1.1;
  }

  h2 {
    margin-top: 32px;
    margin-bottom: 24px;
    font-size: 20px;
    line-height: 1.2;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    margin-top: 28px;
    line-height: 24px;
  }

  h4 {
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 24px;
  }

  h5 {
    font-size: 14px;
    margin-bottom: 20px;
    margin-top: 24px;
  }

  p {
    white-space: break-spaces;
  }

  blockquote {
    border-left: 2px solid $accent;
    padding-left: 1em;
    margin: 20px 20px 20px 18px;

    > * {
      white-space: pre-wrap;
    }

    > blockquote {
      white-space: normal;
    }
  }

  p,
  table,
  pre,
  ol,
  ul {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  hr {
    margin-top: 30px;
    margin-bottom: 30px;
    border: 1px solid $light-grey;
  }

  ol,
  ul {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 20px;

    ol,
    ul {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  li {
    margin-left: 1em;
    margin-bottom: 4px;
    margin-top: 4px;
  }

  ul li::marker {
    color: #444;
  }

  img {
    max-width: 100%;
    max-height: 400px;
  }

  code {
    padding-left: 6px;
    padding-right: 6px;

    font-family: "Roboto Mono", monospace;

    background-color: #eeeeee;
    border-radius: 3px;
    font-size: 13px;
    font-weight: 500;

    color: inherit;

    box-shadow: none;

    line-break: anywhere;

    &:after,
    &:before {
      content: none;
    }
  }

  pre {
    padding: 8px;
    border-radius: 3px;
    background-color: #eeeeee;
  }

  table {
    border-collapse: collapse;
    border: 1px solid $light-grey;
    max-width: 100%;

    td {
      border: 1px solid $light-grey;
    }
    td,
    th {
      padding: 8px 12px;
    }
    th {
      border-width: 1px 1px 2px;
      border-style: solid;
      border-color: $light-grey;
    }
  }

  &.truncated p {
    white-space: break-spaces;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.mark-down_escaped {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  b,
  strong,
  em,
  i,
  a,
  blockquote,
  ul,
  ol,
  li,
  pre,
  code {
    display: inline;
    margin: 0;
    padding: 0;
    border: none;

    font-family: 'Roboto', sans-serif;
    font-size: $general-font-size;
    line-height: $general-line-height;
    font-weight: normal;
    font-style: normal;
    color: inherit;
    text-decoration: none;

    background: none;
    border-radius: 0;

    pointer-events: none;
  }

  img,
  table,
  hr {
    display: none;
  }
}
</style>
