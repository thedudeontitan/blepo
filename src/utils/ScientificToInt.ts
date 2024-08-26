export function ScientificToInt(str: string): string {
  const num = parseFloat(str) * Math.pow(10, 9);
  return num.toFixed(13);
}
