<template>
  <PathElement
    id="ray"
    title="Ray of light"
    :path="rayPath"
    fill="none"
    stroke="red"
    :stroke-width="`${2 / scale}`"
  />
  <PathElement
    id="guideline"
    title="Guide line"
    :path="normalPath"
    fill="none"
    stroke="green"
    stroke-width="2"
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
    canvasWidth,
    thickness,
    height,
    focalLength,
  } = storeToRefs(store)

  const opticalCenterX = computed(() => (offsetX.value ?? 0 + (thickness.value ?? 0) / 2))
  const opticalCenterY = computed(() => (offsetY.value ?? 0) + (height.value ?? 0) / 2)

  const rayStartY = computed(() => (offsetY.value ?? 0) + (height.value ?? 0) / 4)

  const intersectionPointX = computed(() => Math.abs(focalLength.value + opticalCenterX.value))
  const intersectionPointY = opticalCenterY

  const rayPath = computed(() => {
    return [
      `M 0 ${rayStartY.value}`,
      `h ${opticalCenterX.value}`,
      `l ${intersectionPointX.value} ${intersectionPointY.value}`,
    ].join(" ")
  })

  const normalPath = computed(() => {
    return [
      `M 0 ${opticalCenterY.value}`,
      `H ${(canvasWidth.value ?? 0) * 10}`,
    ].join(" ")
  })
</script>
