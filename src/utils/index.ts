export function formatDateTime(
  dateTimeString: string,
  format: any = "YYYY-MM-DD"
) {
  const date = new Date(dateTimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  let formattedDateTime = format;
  formattedDateTime = formattedDateTime.replace("YYYY", year);
  formattedDateTime = formattedDateTime.replace("MM", month);
  formattedDateTime = formattedDateTime.replace("DD", day);
  formattedDateTime = formattedDateTime.replace("HH", hours);
  formattedDateTime = formattedDateTime.replace("mm", minutes);
  formattedDateTime = formattedDateTime.replace("ss", seconds);

  return formattedDateTime;
}
// 生成9条随机数据，10到40之间
export const handleRandomData = (
  len: number,
  start: number,
  last: number
): number[] => {
  const res = [];
  for (let i = 0; i < len; i++) {
    res.push(Math.floor(Math.random() * (last - start) + start));
  }
  return res;
};
