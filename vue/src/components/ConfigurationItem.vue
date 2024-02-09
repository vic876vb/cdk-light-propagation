<template>
  <div class="gap-x-4 gap-y-2 lg:grid-cols-2 lg:grid w-full">
    <p>
      <span><b>Front radius:</b> {{ frontRadius }}mm</span>
      <LensSurfaceIndicator class="ml-2" :surface-type="frontSurface" />
    </p> 
    <p v-if="backRadius !== undefined">
      <span><b>Back radius:</b> {{ backRadius }}mm</span>
      <LensSurfaceIndicator class="ml-2" :surface-type="backSurface" />
    </p>
    <p class="" v-if="thickness !== undefined"><b>Thickness:</b> {{ thickness }}mm</p>
    <p v-if="refractionIndex !== undefined"><b>Refraction index:</b> {{ refractionIndex }}</p>
    <p v-if="focalLength !== undefined"><b>ƒ:</b> {{ focalLength }}</p>
  </div>
</template>

<script setup lang="ts">
  import type { Configuration } from '@/types/configuration.type'
  import LensSurfaceIndicator from './LensSurfaceIndicator.vue'

  defineProps<Configuration>()
</script>