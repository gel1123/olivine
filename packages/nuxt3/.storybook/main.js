const path = require('path');
const Components = require('unplugin-vue-components/vite');
const AutoImport = require('unplugin-auto-import/vite');
const {
  loadConfigFromFile,
  mergeConfig
} = require('vite');
module.exports = {
  "stories": ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  "addons": ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-mdx-gfm'],
  "framework": {
    name: "@storybook/vue3-vite",
    options: {}
  },
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config) {
    // https://github.com/storybookjs/storybook/issues/17274#issuecomment-1251737371
    config.plugins = [...config.plugins.filter(p => !Array.isArray(p)), require("@vitejs/plugin-vue-jsx")({
      exclude: [/\.stories\.(t|j)sx?$/, /node_modules/]
    })];
    config.plugins.push(AutoImport({
      imports: ['vue', 'vue-router'],
      dts: '.storybook/auto-imports.d.ts'
    }));
    config.plugins.push(Components({
      dirs: ['components'],
      directoryAsNamespace: true,
      dts: '.storybook/components.d.ts'
    }));
    return {
      ...config,
      resolve: {
        alias: {
          ...config.resolve.alias,
          '@': `${path.resolve(__dirname, '..')}/`,
          '~~': `${path.resolve(__dirname, '..')}/`,
          'vue': 'vue/dist/vue.esm-bundler.js'
        }
      }
    };
  },
  docs: {
    autodocs: true
  }
};