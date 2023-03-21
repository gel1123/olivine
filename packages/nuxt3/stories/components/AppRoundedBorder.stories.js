import AppH2 from '~~/components/AppH2.vue';
import AppRoundedBorder from '~~/components/AppRoundedBorder.vue';
import { generateSource } from '~~/stories/generateSource';

export default {
  title: 'components/基底コンポーネント/AppRoundedBorder',
  component: AppRoundedBorder,
};

const template = `
<AppRoundedBorder v-bind="args">
  <AppH2>heading</AppH2>
  <p>contents</p>
  <p>contents</p>
  <p>contents</p>
</AppRoundedBorder>
`;
const Template = args => ({
  components: { AppRoundedBorder, AppH2 },
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
