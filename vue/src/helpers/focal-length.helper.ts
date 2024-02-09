import type { LensSurfaceType } from "@/types/configuration.type"

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

    const signedFrontRadius = (front.surface === "convex" ? 1 : -1) * front.radius
    const signedBackRadius = (back.surface === "convex" ? -1 : 1) * back.radius
    const frontRadiusReciprocal = Math.ceil((1 / signedFrontRadius) * 100) / 100
    const backRadiusReciprocal = Math.ceil((1 / signedBackRadius) * 100) / 100
    
    // 1 / f = (n - 1) * (1 / R1 - 1 / R2 + (n - 1) * d / (n * R1 * R2)
    if (thickness === 0) {
      return 1 / ((refractionIndex - 1) * (frontRadiusReciprocal - backRadiusReciprocal))
    } else {
      return 1 / ((refractionIndex - 1) * (frontRadiusReciprocal - backRadiusReciprocal + ((refractionIndex - 1) * thickness) / (refractionIndex * signedFrontRadius * signedBackRadius)))
    }
  }
}