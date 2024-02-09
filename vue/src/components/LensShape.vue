<template>
  <PathElement
    id="lens"
    title="Lens"
    :path="path"
    stroke="#7393B3"
    stroke-width="2"
    fill="none"
  />
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import useControlsStore from '@/stores/controls.store'
  import { computed } from 'vue'
  import PathElement from './PathElement.vue'

  const store = useControlsStore()
  const {
    offsetX,
    offsetY,
    thickness,
    height,
    frontRadius,
    backRadius,
    frontSurface,
    backSurface,
  } = storeToRefs(store)

  const path = computed(() => {
    return [
      `M ${offsetX.value} ${offsetY.value}`,
      `a ${frontRadius.value} ${frontRadius.value} 0 0 ${frontSurface.value === "convex" ? 0 : 1} 0 ${height.value}`,
      `l ${thickness.value} 0`,
      `a ${backRadius.value} ${backRadius.value} 0 0 ${backSurface.value === "convex" ? 0 : 1} 0 -${height.value}`,
      "Z",
    ].join(" ")
  })

</script>
