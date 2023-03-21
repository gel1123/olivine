<script setup lang="ts">
defineProps<{
  href: string;
}>();
</script>
<template>
  <NuxtLink
    class="rounded py-2 px-4 font-semibold text-blue-500 hover:text-blue-700 hover:underline"
    :href="href"
  >
    <slot />
  </NuxtLink>
</template>
