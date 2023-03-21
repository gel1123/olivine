import AppH2 from '~~/components/AppH2.vue';
import { generateSource } from '~~/stories/generateSource';

export default {
  title: 'components/基底コンポーネント/AppH2',
  component: AppH2,
};

const template = `
<AppH2 v-bind="args">
  heading
</AppH2>
`;
const Template = args => ({
  components: { AppH2 },
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
