import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { type Configuration, type LensSurfaceType } from "@/types/configuration.type"
import FocalLengthHelper from '@/helpers/focal-length.helper'

export type ControlsState = Configuration & {
  height?: number,
  offsetX?: number,
  offsetY?: number,
  canvasWidth?: number,
  canvasHeight?: number,
}

const useControlsStore = defineStore('controls', () => {
  const configurations = ref<Configuration[]>()
  const currentConfigurationForControls = ref<ControlsState>()
  const fillColor = ref<string>()
  const strokeColor = ref<string>()
  const thickness = ref<number>()
  const height = ref<number>()
  const offsetX = ref<number>()
  const offsetY = ref<number>()
  const canvasWidth = ref<number>()
  const canvasHeight = ref<number>()
  const frontRadius = ref<number>()
  const backRadius = ref<number>()
  const frontSurface = ref<LensSurfaceType>()
  const backSurface = ref<LensSurfaceType>()
  const refractionIndex = ref<number>()
  const focalLength = computed<number>(
    () => FocalLengthHelper.calculate(
      { radius: frontRadius.value, surface: frontSurface.value },
      { radius: backRadius.value, surface: backSurface.value },
      { thickness: thickness.value, refractionIndex: refractionIndex.value }
    )
  )

  $reset()

  function $reset() {
    fillColor.value = "none"
    strokeColor.value = "#7393B3"
    thickness.value = 10
    height.value = 200
    offsetX.value = 150
    offsetY.value = 50
    canvasWidth.value = 300
    canvasHeight.value = 300
    frontRadius.value = 400
    backRadius.value = 300
    frontSurface.value = "convex"
    backSurface.value = "concave"
    refractionIndex.value = 1.5
  }

  return {
    configurations,
    currentConfigurationForControls,
    fillColor,
    strokeColor,
    thickness,
    height,
    offsetX,
    offsetY,
    canvasWidth,
    canvasHeight,
    frontRadius,
    backRadius,
    frontSurface,
    backSurface,
    refractionIndex,
    focalLength,
    $reset
  }
})

export default useControlsStore