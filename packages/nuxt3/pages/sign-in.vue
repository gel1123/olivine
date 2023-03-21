<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

// Authenticatorをカスタマイズする
// https://docs.amplify.aws/ui/auth/authenticator/q/framework/vue#customizing-the-authenticator

// ※注意
// Cognitoにおける電話番号ログインは「プラス記号から始まる文字列での入力が必要。
// 参考：https://stackoverflow.com/questions/53542905/invalid-phone-number-format-on-cognito-signup

</script>
<template>
  <div class="mt-24">
    <Authenticator>
      <template #default="{ user, signOut }">
        <div class="m-4">
          <h2 class="text-xl font-bold">
            user.username
          </h2>
          <p>{{ user.username }}</p>
        </div>
        <button
          class="m-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          @click="signOut"
        >
          Sign Out
        </button>
      </template>
    </Authenticator>
  </div>
</template>
