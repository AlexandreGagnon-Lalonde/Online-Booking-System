export const requestUser = () => ({
  type: "REQUEST_USER",
});

export const receiveUser = (user) => ({
  type: "RECEIVE_USER",
  user,
});

export const receiveUserError = () => ({
  type: "RECEIVE_USER_ERROR",
});

export const requestCalendar = () => ({
  type: "REQUEST_CALENDAR",
});

export const receiveCalendar = (calendar) => ({
  type: "RECEIVE_CALENDAR",
  calendar,
});

export const receiveCalendarError = () => ({
  type: "RECEIVE_CALENDAR_ERROR",
});