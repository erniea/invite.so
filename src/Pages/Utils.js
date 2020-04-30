import axios from "axios";

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
export function toStateStr(inState) {
  switch (inState) {
    case 0:
      return "Request";
    case 1:
      return "Canceled";
    case 2:
      return "Confirmed";
    default:
      return "Undefined";
  }
}

export function getBooked(callback) {
  let result = {};

  axios.get("https://api.invite.so/reservation/").then((res) => {
    if (res.data.lenth === 0) return;

    res.data.map((reserv) => {
      const fromDate = new Date(reserv.fromDate);
      const toDate = new Date(reserv.toDate);

      for (let i = fromDate; i < toDate; i.setDate(i.getDate() + 1)) {
        if (!result[i.getMonth()]) {
          result[i.getMonth()] = [];
        }

        result[i.getMonth()].push(i.getDate());
      }
    });
    callback(result);
  });
}
