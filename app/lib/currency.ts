export function currency(value: number): string {
  let rounded = Math.round((value + Number.EPSILON) * 100) / 100;

  let result = rounded.toString();

  result = result.replace(".", ",")

  if (result.indexOf(",") === -1) result += ",";

  const delta = 2 - result.split(",")[1].length;

  for (let i = 0; i < delta; i++) {
    result += "0";
  }

  return result + " €";
}
