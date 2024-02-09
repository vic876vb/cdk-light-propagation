<template>
  <div class="md:columns-2 md:flex-nowrap container xl:max-w-[1200px] flex flex-wrap gap-4 mx-auto">
    <main class="md:basis-2/3 mx-4 md:my-4 lg:my-10 gap-y-8 flex-auto flex flex-col max-w-[650px]">
      <SVGContainer>
          <LensShape />
          <RayLine />
      </SVGContainer>
      <ConfigurationListPanel />
    </main>
    <aside class="md:basis-1/3 md:flex flex-grow mx-4">
      <ControlPanel />
    </aside>
  </div>
  
</template>

<script setup lang="ts">
  import SVGContainer from '@/components/SVGContainer.vue'
  import LensShape from '@/components/LensShape.vue'
  import RayLine from '@/components/RayLine.vue'
  import ControlPanel from '@/components/ControlPanel.vue'  
  import ConfigurationListPanel from '@/components/ConfigurationListPanel.vue'
</script>

