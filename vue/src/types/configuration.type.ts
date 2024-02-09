export type Configuration = {
  id: string,
  thickness?: number,
  frontRadius?: number,
  frontSurface?: LensSurfaceType,
  backRadius?: number,
  backSurface?: LensSurfaceType,
  refractionIndex?: number,
  focalLength?: number,
}

export type InitialConfiguration = Omit<Configuration, "id">

export type LensSurfaceType = "convex" | "concave"