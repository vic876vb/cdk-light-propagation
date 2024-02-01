<template>
  <path id="lens" 
    :d="path"
    :stroke="strokeColor"
    :stroke-width="2"
    :fill="fillColor"
  />
</template>

<script setup lang="ts">
  const {path} = defineProps<LensPathProps>()
  console.log(path)
</script>

<script lang="ts">
  type LensPathProps = {
    strokeColor?: string,
    fillColor?: string,
    path?: string,
  }
</script>
