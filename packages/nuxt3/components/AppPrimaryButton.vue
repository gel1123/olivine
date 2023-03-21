<script setup lang="ts">
defineProps<{
  onClick:() => void;
}>();
</script>
<template>
  <button
    class="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
    @click="onClick"
  >
    <slot />
  </button>
</template>
