export default {
  transform(integer?: number | string, unit: string = ""): string {
    if (typeof integer !== "number")
      return "N/A"

    return `${integer < 0 ? `(${integer}${unit})` : `${integer}${unit}`}`
  }
}