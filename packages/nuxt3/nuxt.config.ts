// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  modules: [
    'nuxt-graphql-client',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@formkit/nuxt',
  ],
  'graphql-client': {
    clients: {
      default: {
        host: 'https://countries.trevorblades.com/graphql',
        schema: './schema.graphql',
      },
    },
  },
  runtimeConfig: {
    public: {
      GQL_HOST: 'https://countries.trevorblades.com/graphql',
      REGION: process.env.REGION,
      USER_POOL_ID: process.env.USER_POOL_ID,
      USER_POOL_WEB_CLIENT_ID: process.env.USER_POOL_WEB_CLIENT_ID,
    },
  },
  alias: {
    // aws-amplifyを動作させるために必要
    './runtimeConfig': './runtimeConfig.browser',
  },
  vite: {
    define: {
      // aws-amplifyを動作させるために必要
      'window.global': {},
    },
  },
});
