<script lang="ts" setup>
const { data, pending, error, refresh } = await useAsyncGql({
  operation: 'GetCountries',
  variables: {
    // filter: {
    //   continent: {
    //     // continent.code
    //     eq: 'EU',
    //   },
    // },
  },
});
</script>
<template>
  <AppContainer>
    <div>
      <AppH2>Countries</AppH2>
      <AppPrimaryButton :on-click="() => refresh()">
        Refresh
      </AppPrimaryButton>
    </div>
    <p v-if="pending">
      Loading...
    </p>
    <p v-if="error">
      Error: {{ error }}
    </p>
    <ul>
      <li v-for="country in data?.countries" :key="country.name">
        {{ country.name }} / {{ country.continent.name }} ( {{ country.continent.code }} )
      </li>
    </ul>
  </AppContainer>
</template>
