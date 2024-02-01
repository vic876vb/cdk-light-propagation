<template>
  <div class="rounded-xl px-8 py-4 border-2 border-current">
    <!-- TODO: pagesheet in mobile -->
    <!-- <hr class="dark:bg-gray-200 w-10 h-2 my-1 bg-gray-700 border-0" /> -->
    <div class="md:flex-row flex flex-col justify-between gap-4">
      <h2 class="dark:text-violet-600 text-2xl font-bold text-indigo-600">Controls</h2>
      <div class="md:mb-6 flex mb-3 space-x-4 text-sm font-medium">
        <div class="flex flex-auto space-x-4">
          <!-- TODO: AWS Lambda API  -->
          <button
            type="submit"
            class="dark:bg-violet-800 dark:hover:bg-violet-700 hover:bg-indigo-700 px-6 font-semibold text-white bg-indigo-600 rounded-md">
            Fetch
          </button>
          <button
            type="button"
            class="dark:text-white dark:hover:bg-violet-500 dark:hover:border-violet-500 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white px-6 font-semibold text-indigo-600 border border-indigo-200 rounded-md"
            @click="store.$reset()">
            Reset
          </button>
        </div>
        <!-- TODO: save configuration -->
        <button
          type="button"
          class="w-9 h-9 dark:text-white dark:hover:text-violet-500 dark:hover:border-violet-500 hover:text-indigo-400 flex items-center justify-center flex-none text-indigo-200 border border-indigo-200 rounded-md"
          aria-label="Favourites"
          @click="saveConfiguration">
          <svg width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z"/>
          </svg>
<!--   
          <svg width="20" height="20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg> -->
        </button>
      </div>
    </div>
    <form class="my-3">
      <fieldset class="flex flex-col gap-4 mb-4 space-x-2">
        <legend class="mb-3 font-bold">Radii of curvature:</legend>
        <!-- TODO: handle negative values -->
        <div class="relative mb-6">
          <FwbRange
            :label="`Front ---  ${friendlyIntegerConverter.transform(frontRadius, 'mm')}`"
            :min="-500"
            :max="1000"
            :step="100"
            :model-value="frontRadius"
            @update:model-value="updateRange('frontRadius', $event)"
          />
          <span class="dark:text-gray-400 end-0 absolute top-0 text-sm text-gray-500">Default (500mm)</span>
          <span class="dark:text-gray-400 start-0 -bottom-6 absolute text-sm text-gray-500">-500mm</span>
          <span class="dark:text-gray-400 end-0 -bottom-6 absolute text-sm text-gray-500">1000mm</span>
        </div>
        <div class="relative mb-6">
          <FwbRange
            :label="`Back ---  ${friendlyIntegerConverter.transform(backRadius, 'mm')}`"
            :min="-500"
            :max="1000"
            :step="100"
            :model-value="backRadius"
            @update:model-value="updateRange('backRadius', $event)"
          />
          <span class="dark:text-gray-400 end-0 absolute top-0 text-sm text-gray-500">Default (300mm)</span>
          <span class="dark:text-gray-400 start-0 -bottom-6 absolute text-sm text-gray-500">-500mm</span>
          <span class="dark:text-gray-400 end-0 -bottom-6 absolute text-sm text-gray-500">1000mm</span>
        </div>
      </fieldset>
      <fieldset class="flex flex-col gap-4 mb-4 space-x-2">
        <legend class="mb-3 font-bold">Properties:</legend>
        <div class="relative mb-6">
          <FwbRange
            :label="`Thickness ---  ${thickness}mm`"
            :min="0"
            :max="100"
            :step="1"
            :model-value="thickness"
            @update:model-value="updateRange('thickness', $event)"
          />
          <span class="dark:text-gray-400 end-0 absolute top-0 text-sm text-gray-500">Default (10mm)</span>
          <span class="dark:text-gray-400 start-0 -bottom-6 absolute text-sm text-gray-500">0mm</span>
          <span class="dark:text-gray-400 end-0 -bottom-6 absolute text-sm text-gray-500">100mm</span>
        </div>
        <FwbSelect
          class="mb-6"
          label="Refraction index of glass ---  (1.5-1.9)"
          placeholder="Choose refraction index"
          :options="options"
          :underline="true"
          :model-value="refractionIndex?.toString()"
          @update:model-value="updateSelect('refractionIndex', $event)"
        />
        <div class="flex items-center justify-between mb-4 space-x-4">
          <FwbInput
            type="text"
            label="Focal length"
            size="md"
            class="w-fit"
            :model-value="focalLength.toString()"
            disabled
          />
          <!-- TODO: add formula with vue-mathjax-next -->
          <label class="flex self-end mb-2 text-lg">formula</label>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { FwbRange, FwbInput, FwbSelect } from 'flowbite-vue'
  import type { OptionsType } from 'flowbite-vue/components/FwbSelect/types.js'
  import useControlsStore, { type ControlsState } from '@/stores/useControlsStore'
  import { postConfiguration, type Configuration } from '@/services/ConfigurationService'
  import { computed, ref } from 'vue'
  import * as friendlyIntegerConverter from '@/helpers/friendlyIntegerConverter'

  const store = useControlsStore()
  const {
    frontRadius,
    backRadius,
    thickness,
    refractionIndex,
  } = storeToRefs(store)
  const options: OptionsType[] = [
    { name: "1.5", value: "1.5" },
    { name: "1.6", value: "1.6" },
    { name: "1.7", value: "1.7" },
    { name: "1.8", value: "1.8" },
    { name: "1.9", value: "1.9" },
  ]
  const focalLength = computed(() => 10)

  function updateRange(controlName: string, value: string) {
    const valueToNumber = parseInt(value, 10)
    if (isNaN(valueToNumber))
      return

    store.$patch({ [controlName]: valueToNumber })
  }

  function updateSelect(controlName: string, value: string) {
    const valueToNumber = parseFloat(value)
    if (isNaN(valueToNumber))
      return

    store.$patch({ [controlName]: valueToNumber })
  }

  function saveConfiguration() {
    console.log(store)
  }

</script>
