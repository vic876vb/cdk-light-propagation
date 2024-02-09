<template>
  <path :d="path" />
</template>

<script setup lang="ts">
  type PathElementProps = {
    path?: string,
  }

  defineProps<PathElementProps>()
</script>