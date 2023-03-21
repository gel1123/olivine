import AppPre from '~~/components/AppPre.vue';
import { generateSource } from '~~/stories/generateSource';

export default {
  title: 'components/基底コンポーネント/AppPre',
  component: AppPre,
};

const template = `
<AppPre v-bind="args">
  console.log("hoge");
</AppPre>
`;
const Template = args => ({
  components: { AppPre },
  setup () {
    return { args };
  },
  template,
});

export const Example = Template.bind({});
Example.args = {
  // propsがあれば、ここに書く
};
Example.parameters = {
  docs: {
    source: {
      code: generateSource(template, Example.args),
    },
  },
};
