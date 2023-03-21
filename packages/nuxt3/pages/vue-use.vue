<script setup lang="ts">
const { x, y } = useMouse();
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center text-6xl">
    pos: {{ x }}, {{ y }}
  </div>
</template>
