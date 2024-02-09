<template>
  <div class="rounded-xl h-max px-8 py-4 my-auto border-2 border-current">
    <!-- TODO: pagesheet in mobile -->
    <!-- <hr class="dark:bg-gray-200 w-10 h-2 my-1 bg-gray-700 border-0" /> -->
    <div class="md:flex-row flex flex-col justify-between gap-4">
      <h2 class="dark:text-violet-600 text-2xl font-bold text-indigo-600">Controls</h2>
      <div class="md:mb-6 flex mb-3 space-x-4 text-sm font-medium">
        <div class="flex flex-auto space-x-4">
          <!-- TODO: AWS Lambda API  -->
          <fwb-button class="btn btn-primary" @click="saveConfiguration">
            <template #prefix>
              <svg width="24" height="24" fill="currentColor" aria-hidden="true">
                <path d="m12.7 20.7 6.2-7.1c2.7-3 2.6-6.5.8-8.7A5 5 0 0 0 16 3c-1.3 0-2.7.4-4 1.4A6.3 6.3 0 0 0 8 3a5 5 0 0 0-3.7 1.9c-1.8 2.2-2 5.8.8 8.7l6.2 7a1 1 0 0 0 1.4 0Z"/>
              </svg>
            </template>
            Save
          </fwb-button>
          <fwb-button class="btn btn-secondary font-semibold" outline @click="store.$reset()">
            Reset
          </fwb-button>
        </div>
      </div>
    </div>
    <form class="my-3">
      <fieldset class="flex flex-col gap-2 mb-4 space-x-2">
        <legend class="mb-3 font-bold">Radii of curvature:</legend>
        <!-- TODO: handle negative values -->
        <div class="relative mb-6">
          <fwb-range
            :label="`Front ---  ${FriendlyIntegerConverter.transform(frontRadius, 'mm')}`"
            :min="200"
            :max="500"
            :step="1"
            :model-value="frontRadius"
            @update:model-value="patchIntValue('frontRadius', $event)"
          />
          <span class="dark:text-gray-400 end-0 absolute top-0 text-sm text-gray-500">Default (400mm)</span>
          <span class="dark:text-gray-400 start-0 -bottom-6 absolute text-sm text-gray-500">200mm</span>
          <span class="dark:text-gray-400 end-0 -bottom-6 absolute text-sm text-gray-500">500mm</span>
        </div>
        <div class="gap-x-4 flex items-center justify-center">
          <fwb-radio
            class="gap-x-2 w-auto"
            v-model="frontSurface"
            label="Convex"
            value="convex"
            @update:model-value="patchStringValue('frontSurface', $event)"
          />
          <fwb-radio
            class="gap-x-2 w-auto"
            v-model="frontSurface"
            label="Concave"
            value="concave"
            @update:model-value="patchStringValue('frontSurface', $event)"
          />
        </div>
        <div class="relative mb-6">
          <fwb-range
            :label="`Back ---  ${FriendlyIntegerConverter.transform((backRadius), 'mm')}`"
            :min="300"
            :max="500"
            :step="1"
            :model-value="backRadius"
            @update:model-value="patchIntValue('backRadius', $event)"
          />
          <span class="dark:text-gray-400 end-0 absolute top-0 text-sm text-gray-500">Default (300mm)</span>
          <span class="dark:text-gray-400 start-0 -bottom-6 absolute text-sm text-gray-500">300mm</span>
          <span class="dark:text-gray-400 end-0 -bottom-6 absolute text-sm text-gray-500">500mm</span>
        </div>
        <div class="gap-x-4 flex items-center justify-center">
          <fwb-radio
            class="gap-x-2 w-auto"
            v-model="backSurface"
            label="Convex"
            value="convex"
            @update:model-value="patchStringValue('backSurface', $event)"
          />
          <fwb-radio
            class="gap-x-2 w-auto"
            v-model="backSurface"
            label="Concave"
            value="concave"
            @update:model-value="patchStringValue('backSurface', $event)"
          />
        </div>
      </fieldset>
      <fieldset class="flex flex-col gap-2 mb-4 space-x-2">
        <legend class="mb-3 font-bold">Properties:</legend>
        <div class="relative mb-6">
          <fwb-range
            :label="`Thickness ---  ${thickness}mm`"
            :min="0"
            :max="100"
            :step="1"
            :model-value="thickness"
            @update:model-value="patchIntValue('thickness', $event)"
          />
          <span class="dark:text-gray-400 end-0 absolute top-0 text-sm text-gray-500">Default (10mm)</span>
          <span class="dark:text-gray-400 start-0 -bottom-6 absolute text-sm text-gray-500">0mm</span>
          <span class="dark:text-gray-400 end-0 -bottom-6 absolute text-sm text-gray-500">100mm</span>
        </div>
        <fwb-select
          class="mb-6"
          label="Refraction index of glass ---  (1.5-1.9)"
          placeholder="Choose refraction index"
          :options="options"
          :underline="true"
          :model-value="refractionIndex?.toString()"
          @update:model-value="patchFloatValue('refractionIndex', $event)"
        />
        <div class="grid items-center grid-flow-row md:grid-cols-[100px_auto] gap-y-2 gap-x-4 mb-4">
          <label>Focal length</label>
          <vue-mathjax class="md:block hidden" :formula="focalLengthFormula" />
          <fwb-input
            type="text"
            size="md"
            class="w-fit col-span-2"
            :model-value="`${FriendlyFloatConverter.transform(focalLength, 2, 'mm')}`"
            @update:model-value="patchFloatValue('focalLength', $event)"
            readonly
          />
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { FwbRange, FwbInput, FwbSelect, FwbButton, FwbRadio } from 'flowbite-vue'
  import type { OptionsType } from 'flowbite-vue/components/FwbSelect/types.js'
  import useControlsStore from '@/stores/controls.store'
  import ConfigurationService from '@/services/configuration.service'
  import FriendlyIntegerConverter from '@/helpers/friendly-integer.converter'
  import FriendlyFloatConverter from '@/helpers/friendly-float.converter'
  import type { InitialConfiguration } from '@/types/configuration.type'

  const store = useControlsStore()
  const {
    frontRadius,
    backRadius,
    thickness,
    refractionIndex,
    frontSurface,
    backSurface,
    focalLength,
  } = storeToRefs(store)
  const options: OptionsType[] = [
    { name: "1.5", value: "1.5" },
    { name: "1.6", value: "1.6" },
    { name: "1.7", value: "1.7" },
    { name: "1.8", value: "1.8" },
    { name: "1.9", value: "1.9" },
  ]

  const focalLengthFormula = "$ {1 \\over f} = {(n - 1)\\left[{1\\over R_{1}} - {1\\over R_{2}} + {(n - 1) d \\over nR_{1}R_{2}} \\right]} $"

  function patchIntValue(controlName: string, value: string) {
    const valueToNumber = parseInt(value, 10)
    if (isNaN(valueToNumber))
      return

    store.$patch({ [controlName]: valueToNumber })
  }

  function patchFloatValue(controlName: string, value: string) {
    const valueToNumber = parseFloat(value)
    if (isNaN(valueToNumber))
      return

    store.$patch({ [controlName]: valueToNumber })
  }

  function patchStringValue(controlName: string, value: string) {
    store.$patch({ [controlName]: value })
  }

  function saveConfiguration() {
    const config: InitialConfiguration = {
      thickness: store.$state.thickness,
      frontRadius: store.$state.frontRadius,
      backRadius: store.$state.backRadius,
      frontSurface: store.$state.frontSurface,
      backSurface: store.$state.backSurface,
      refractionIndex: store.$state.refractionIndex
    }
    ConfigurationService.addConfiguration(config)
      .subscribe(({ data }) => {
        console.log(data)
        store.$patch((state) => {
          state.configurations?.push(data)
        })
      })
  }
</script>

<style scoped>
  .btn {
    @apply
      font-medium
      text-sm
      rounded-lg
      h-9
      px-5
      me-2
      mb-2
      text-center
      focus:outline-none
      focus:ring-4

  }
  .btn-primary {
    @apply
      text-white 
      bg-indigo-600
      hover:bg-indigo-700
      focus:ring-indigo-300
      dark:bg-violet-800
      dark:hover:bg-violet-700
      dark:focus:ring-violet-900
  }

  .btn-secondary {
    @apply
      border
      border-indigo-200
      text-indigo-600
      hover:text-white
      hover:bg-indigo-500
      focus:ring-purple-300
      dark:border-purple-400
      dark:text-white
      dark:hover:text-white
      dark:hover:bg-violet-500
      dark:focus:ring-violet-700
  }
</style>