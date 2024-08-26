import { getMonthAbbreviation } from "./MonthFormatter";

export const formatXAxis = (timestamp: number) => {
  const date = new Date(timestamp * 1000).toLocaleDateString();
  const splitDate = date.split("/");
  const formatedDate = `${getMonthAbbreviation(parseInt(splitDate[0]))} ${splitDate[2]}`;
  return formatedDate;
};
