import React, { Component } from "react";
import { Typography, Box } from "@material-ui/core";
import { LocalizationProvider, Calendar as MuiCal } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import { getBooked } from "./Utils";

function generateCalendar(month, reserved) {
  let baseDate = new Date();
  baseDate = new Date(baseDate.getFullYear(), month, 1);
  let calendar = [];

  const lastDate = new Date(baseDate.getFullYear(), month + 1, 0);

  const startingDay = baseDate.getDay();
  const weekCount = Math.ceil(
    (lastDate.getDate() - baseDate.getDate() + startingDay + 1) / 7
  );

  const pushWeek = (week, key, justify) => {
    calendar.push(
      <Box key={key} display="flex" height={35} justifyContent={justify}>
        {week}
      </Box>
    );
  };

  const header = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
  pushWeek(
    header.map((e) => {
      return (
        <Box key={e} width={30} alignItems="center">
          <Typography align="center">{e}</Typography>
        </Box>
      );
    }),
    "header",
    "center"
  );

  for (let i = 0; i < weekCount; ++i) {
    let week = [];

    for (let j = 0; j < 7; ++j) {
      const dayNum = i * 7 + j - startingDay + 1;
      const dayText = dayNum >= 10 ? dayNum : "0" + dayNum;
      const realDay = dayNum > 0 && dayNum <= lastDate.getDate();
      if (realDay) {
        week.push(
          <Box
            key={dayNum}
            width={30}
            alignItems="center"
            bgcolor={reserved.includes(dayNum) ? "error.main" : "success.main"}
          >
            <Typography align="center">{dayNum}</Typography>
          </Box>
        );
      }
    }
    pushWeek(
      week,
      i + 1,
      i === 0 ? "flex-end" : i === weekCount - 1 ? "flex-start" : "center"
    );
  }

  return (
    <Box>
      <Typography>{month + 1}</Typography>
      <Box p={2} maxWidth={210}>
        {calendar}
      </Box>
    </Box>
  );
}

function generateMuiCal(month, booked) {
  let baseDate = new Date();
  baseDate.setMonth(month);
  const nextmonth = new Date(
    baseDate.getFullYear(),
    baseDate.getMonth() + 3,
    0
  );

  return (
    <Box>
      <MuiCal
        currentMonth={baseDate}
        isDateDisabled={(e) => {
          return booked && booked.includes(e.getDate());
        }}
        date={new Date(0)}
        changeFocusedDay={(e) => {}}
        onChange={(e) => {}}
        maxDate={nextmonth}
      />
    </Box>
  );
}

class Calendar extends Component {
  constructor() {
    super();

    this.state = { booked: {} };
  }

  componentDidMount() {
    getBooked((e) => {
      this.setState({ booked: e });
    });
  }

  render() {
    let nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);

    const today = new Date();
    console.log(today);

    return (
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <Box display="flex" flexWrap="wrap" m="auto" justifyContent="center">

          {generateMuiCal(3, this.state.booked[3])}
          {generateMuiCal(4, this.state.booked[4])}
        </Box>
        <Box display="flex" flexWrap="wrap" m="auto" justifyContent="center">
          {generateCalendar(3, [24, 25])}
          {generateCalendar(4, [])}
        </Box>
      </LocalizationProvider>
    );
  }
}

export default Calendar;
