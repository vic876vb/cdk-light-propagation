<template>
  <div class="relative w-full min-h-[200px] overflow-x-scroll rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 ">
    <svg
      class="absolute h-full"
      viewBox="0 0 1000 300"
      ref="svgContainerRef"
      version="1.1"
      id="svg10"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">
      <slot></slot>
    </svg>
  </div>
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