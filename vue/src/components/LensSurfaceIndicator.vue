<template>
  <span class="text-xs font-bold" v-if="surfaceType !== undefined">
    {{ surfaceType === "convex" ? "CVX" : "CNV" }}
  </span>
</template>

<script setup lang="ts">
  import type { LensSurfaceType } from '@/types/configuration.type'

  type LensSurfaceIndicatorProps ={
    surfaceType?: LensSurfaceType
  }

  defineProps<LensSurfaceIndicatorProps>()
</script>