export default {
  transform(float?: number | string, fractionDigits: number = 2, unit: string = ""): string {
    if (typeof float !== "number")
      return "N/A"

    return `${float.toFixed(fractionDigits)}${unit}`
  }
}