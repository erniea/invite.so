export function toDateStr(inDate) {
  let year = inDate.getFullYear(); //yyyy
  let month = 1 + inDate.getMonth(); //M
  month = month >= 10 ? month : "0" + month; //month 두자리로 저장
  let day = inDate.getDate(); //d
  day = day >= 10 ? day : "0" + day; //day 두자리로 저장
  return year + "-" + month + "-" + day;
}
export function toTimeStr(inTime) {
  let hour = inTime.getHours();
  hour = hour >= 10 ? hour : "0" + hour;
  let min = inTime.getMinutes();
  min = min >= 10 ? min : "0" + min;
  return hour + ":" + min;
}
export function toReqStr(inDate) {
  return toDateStr(inDate) + "T" + toTimeStr(inDate);
}
