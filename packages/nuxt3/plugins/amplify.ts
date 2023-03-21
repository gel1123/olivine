import { Amplify, Auth } from 'aws-amplify';

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig();
  Amplify.configure(Amplify.configure({
    Auth: {
      // https://docs.amplify.aws/lib/client-configuration/configuring-amplify-categories/q/platform/js/#scoped-configuration
      region: config.public.REGION,
      userPoolId: config.public.USER_POOL_ID,
      userPoolWebClientId: config.public.USER_POOL_WEB_CLIENT_ID,
    },
  }));
  return {
    provide: {
      auth: Auth,
    },
  };
});
