export function transform(integer?: number | string, unit: string = ""): string {
  if (typeof integer !== "number" || typeof unit !== "string")
    return "N/A"

  return `${integer < 0 ? `(${integer}${unit})` : `${integer}${unit}`}`
}