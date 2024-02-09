<template>
  <template v-if="!!configurations?.length">
    <fwb-list-group class="w-full">
      <fwb-list-group-item
        :key="config.id"
        class="group" v-for="(config, index) in configurations"
        hover>
        <template #prefix v-if="index !== undefined">
          <span class="flex w-8 font-bold">{{ index + 1 }}</span>
        </template>
        <ConfigurationItem @click="applyConfiguration(config)" v-bind="config" :index="index" />
        <template #suffix>
          <span class="justify-self-end flex font-bold" @click="deleteFromList(config.id)">
            <svg class="dark:text-white group-hover:text-red-700 w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>
          </span>
        </template>
      </fwb-list-group-item>
    </fwb-list-group>
  </template>
  <template v-else>
    <div class="dark:text-gray-300 p-4 text-center text-gray-500">No Configurations Yet.</div>
  </template>
</template>

<script setup lang="ts">
  import { onUnmounted, watchEffect } from 'vue'
  import { FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
  import ConfigurationItem from '@/components/ConfigurationItem.vue'
  import useControlsStore from '@/stores/controls.store'
  import { storeToRefs } from 'pinia'
  import ConfigurationService from '@/services/configuration.service'
  import type { Subscription } from 'rxjs/internal/Subscription'
  import type { Configuration } from '@/types/configuration.type'

  const store = useControlsStore()
  const { configurations } = storeToRefs(store)

  let configurationSub: Subscription | undefined

  watchEffect(() => {
    configurationSub = ConfigurationService.getConfigurations()
      .subscribe((data) => configurations.value = data)
  })


  onUnmounted(() => {
    if (configurationSub) {
      configurationSub.unsubscribe()
    }
  })

  function applyConfiguration(config: Configuration) {
    store.$patch({ ...config })
  }

  function deleteFromList(id: string) {
    configurationSub = ConfigurationService.deleteConfiguration(id)
      .subscribe(({ data }) => {
        const itemIndex = configurations.value?.findIndex((conf) => conf.id === data)
        if (itemIndex !== undefined) configurations.value?.splice(itemIndex, 1)
      })
  }
</script>