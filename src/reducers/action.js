export const requestUser = () => ({
  type: "REQUEST_USER",
});

export const receiveUser = (currentUser) => ({
  type: "RECEIVE_USER",
  currentUser,
});

export const receiveOtherUser = (otherUser) => ({
  type: "RECEIVE_OTHER_USER_PROFILE",
  otherUser,
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