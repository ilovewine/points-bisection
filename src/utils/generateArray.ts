export function generateArray1th (n: number): number[] {
  return generateArray0th(n).map((el) => el + 1);
}

export function generateArray0th (n: number): number[] {
  return [...Array(n).keys()];
}
