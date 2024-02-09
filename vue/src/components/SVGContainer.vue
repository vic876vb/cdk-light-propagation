<template>
  <svg
    ref="svgContainerRef"
    class="w-full min-h-[300px]"
    version="1.1"
    id="svg10"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <slot></slot>
  </svg>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import useControlsStore from '@/stores/controls.store'

  const store = useControlsStore()
  const svgContainerRef = ref<HTMLElement>()

  onMounted(() => {
    if (!svgContainerRef.value) return

    store.$patch({
      canvasWidth: svgContainerRef.value?.clientWidth,
      canvasHeight: svgContainerRef.value?.clientHeight,
    })
  })
</script>@/stores/controls.store