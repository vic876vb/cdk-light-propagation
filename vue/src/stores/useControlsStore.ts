import { defineStore } from "pinia"
import { ref } from "vue"
import type { Configuration } from "@/services/ConfigurationService"

export type ControlsState = Configuration & {
  height?: number,
  offsetX?: number,
  offsetY?: number,
}

const useControlsStore = defineStore('controls', () => {
  const fillColor = ref<string>()
  const strokeColor = ref<string>()
  const thickness = ref<number>()
  const height = ref<number>()
  const offsetX = ref<number>()
  const offsetY = ref<number>()
  const frontRadius = ref<number>()
  const backRadius = ref<number>()
  const refractionIndex = ref<number>()

  $reset()

  function $reset() {
    fillColor.value = "none"
    strokeColor.value = "#7393B3"
    thickness.value = 10
    height.value = 200
    offsetX.value = 150
    offsetY.value = 50
    frontRadius.value = 500
    backRadius.value = 300
    refractionIndex.value = 1.5
  }

  return {
    fillColor,
    strokeColor,
    thickness,
    height,
    offsetX,
    offsetY,
    frontRadius,
    backRadius,
    refractionIndex,
    $reset
  }
})

// const useControlsStore = defineStore('controls', {
//   state: (): ControlsState => {
//     return {
//       fillColor: "none",
//       strokeColor: "red",
//       width: 10,
//       height: 100,
//       offsetX: 95,
//       offsetY: 50,
//       frontRadius: 500,
//       backRadius: 300,
//     }
//   }
// })

export default useControlsStore