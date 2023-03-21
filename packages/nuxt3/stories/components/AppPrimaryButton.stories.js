import AppPrimaryButton from '~~/components/AppPrimaryButton.vue';
import { generateSource } from '~~/stories/generateSource';

export default {
  title: 'components/基底コンポーネント/AppPrimaryButton',
  component: AppPrimaryButton,
};

const template = `
<AppPrimaryButton v-bind="args">
  click!
</AppPrimaryButton>
`;
const Template = args => ({
  components: { AppPrimaryButton },
  setup () {
    return { args };
  },
  template,
});

export const Example = Template.bind({});
Example.args = {
  // propsがあれば、ここに書く
  onClick: () => alert('clicked!'),
};
Example.parameters = {
  docs: {
    source: {
      code: generateSource(template, Example.args),
    },
  },
};
