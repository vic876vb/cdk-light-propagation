<template>
  <div class="md:columns-2 md:flex-nowrap container flex flex-wrap gap-4 mx-auto">
    <main class="md:basis-3/4 flex flex-col flex-auto">
      <SVGContainer>
        <LensShape />
      </SVGContainer>
    </main>
    <aside class="md:basis-1/3 md:flex flex-grow">
      <ControlPanel class="md:mx-8 mx-4" />
    </aside>
  </div>
  
</template>

<script setup lang="ts">
  import SVGContainer from '@/components/SVGContainer.vue'
  import LensShape from '@/components/LensShape.vue'
  import ControlPanel from '@/components/ControlPanel.vue'  
</script>

