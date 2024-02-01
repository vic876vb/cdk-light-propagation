<template>
  <LensPath
    :path="path"
    :fill-color="fillColor"
    :stroke-color="strokeColor"
  />
</template>

<script setup lang="ts">
  import { storeToRefs, MutationType } from 'pinia'
  import useControlsStore from '@/stores/useControlsStore'
  import LensPath from './LensPath.vue'
  import { computed } from 'vue'

  const store = useControlsStore()
  const {
    fillColor,
    strokeColor,
    offsetX,
    offsetY,
    thickness,
    height,
    frontRadius,
    backRadius,
  } = storeToRefs(store)

  

  // store.$subscribe((mutation, state) => {
  //   if (mutation.type === MutationType.patchObject) {
  //     Object.keys(storeToRefs(store))
  //     // mutation.payload[]
  //   }
  //   console.log(mutation, state)
    
  
  //   console.log(path)
  // })

  const path = computed(() => {
    const transformations = [
      `M ${offsetX.value} ${offsetY.value}`,
      `a ${frontRadius.value} ${frontRadius.value} 0 0 0 0 ${height.value}`,
      `l ${thickness.value} 0`,
      `a ${backRadius.value} ${backRadius.value} 0 0 0 0 -${height.value}`,
      "Z",
    ]
    console.log(transformations.join(" "))
    return transformations.join(" ")
  })

</script>
