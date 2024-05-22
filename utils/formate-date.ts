export function formateDate(date: Date, format: string) {
  const padStart = (d: number) => d.toString().padStart(2, "0");
  const o: { [key: string]: string } = {
    yyyy: date.getFullYear().toString(), // year
    "M+": padStart(date.getMonth() + 1), // month
    "d+": padStart(date.getDate()), // day
    "h+": padStart(date.getHours()), // hour
    "m+": padStart(date.getMinutes()), // minute
    "s+": padStart(date.getSeconds()), // second
    "q+": Math.floor((date.getMonth() + 3) / 3).toString(), // quarter
    S: date.getMilliseconds().toString(), // millisecond
  };
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      const regex = new RegExp("(" + k + ")");
      format = format.replace(regex, o[k]);
    }
  }

  return format;
}
formateDate(new Date(), "yyyy-MM-dd hh:mm:ss"); // 2020-01-01 12:00:00
