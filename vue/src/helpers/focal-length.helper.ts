import type { LensSurfaceType } from "@/types/configuration.type"
import { computed } from "vue"

type LensProps = {
  radius?: number,
  surface?: LensSurfaceType
}
type LensOptions = {
  thickness?: number,
  refractionIndex?: number,
}
export default {
  calculate(
    front: LensProps = { surface: "convex" },
    back: LensProps = { surface: "concave" },
    { thickness = 0, refractionIndex = 1.5 }: LensOptions
  ): number {
    if (front.radius === undefined || back.radius === undefined) return 0

    const signedFrontRadius = computed(() => (front.surface === "convex" ? 1 : -1) * (front.radius ?? 0))
    const signedBackRadius = computed(() => (back.surface === "convex" ? -1 : 1) * (back.radius ?? 0))
    const frontRadiusReciprocal = computed(() => 1 / signedFrontRadius.value)
    const backRadiusReciprocal = computed(() => 1 / signedBackRadius.value)

    // 1 / f = (n - 1) * (1 / R1 - 1 / R2 + (n - 1) * d / (n * R1 * R2)
    return 1 / ((refractionIndex - 1) * (frontRadiusReciprocal.value - backRadiusReciprocal.value + ((refractionIndex - 1) * thickness) / (refractionIndex * signedFrontRadius.value * signedBackRadius.value)))
  }
}