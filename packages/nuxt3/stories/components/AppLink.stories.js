import AppLink from '~~/components/AppLink.vue';
import { generateSource } from '~~/stories/generateSource';

export default {
  title: 'components/基底コンポーネント/AppLink',
  component: AppLink,
};

/**
 * AppLinkはNuxtLinkをラップしているが、
 * このNuxtLinkはStorybook上では動作しない。
 * （ただしStorybookとしてはUIカタログとして動けばいいので、この問題は放置する）
 * https://github.com/nuxt-community/storybook/issues/330#issuecomment-1216614822
 */

const template = `
<AppLink v-bind="args">
  link
</AppLink>
`;
const Template = args => ({
  components: { AppLink },
  setup () {
    return { args };
  },
  template,
});

export const Example = Template.bind({});
Example.args = {
  // propsがあれば、ここに書く
  href: 'https://example.com',
};
Example.parameters = {
  docs: {
    source: {
      code: generateSource(template, Example.args),
    },
  },
};
