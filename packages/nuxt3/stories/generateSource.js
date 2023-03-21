// https://stackoverflow.com/questions/66529241/storybook-is-displaying-everything-in-show-code
const stringifyArguments = (key, value) => {
  switch (typeof value) {
  case 'string':
    return `${key}="${value}"`;
  case 'boolean':
    return value ? key : '';
  default:
    return `:${key}="${value}"`;
  }
};

export const generateSource = (templateSource, args) => {
  const stringifiedArguments = Object.keys(args)
    .map(key => stringifyArguments(key, args[key]))
    .join(' ');

  return templateSource.replace('v-bind="args"', stringifiedArguments);
};
