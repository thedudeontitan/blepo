import numeral from "numeral";

export const formatNumber = (num: number): string => {
  return numeral(num).format("0.00a");
};
