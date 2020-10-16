export const requestUser = () => ({
  type: "REQUEST_USER",
});

export const receiveUser = (user) => ({
  type: "RECEIVE_USER",
  user,
});

export const receiveOtherUser = (otherUser) => ({
  type: "RECEIVE_OTHER_USER_PROFILE",
  otherUser,
});

export const logoutUser = () => ({
  type: "LOGOUT",
})

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

export const requestMessage = () => ({
  type: "REQUEST_MESSAGE"
})

export const sendMessage = () => ({
  type: "SEND_MESSAGE"
})

export const messageError = () => ({
  type: "MESSAGE_ERROR"
})

export const receiveMessages = (messages) => ({
  type: "RECEIVE_MESSAGES",
  messages,
})

export const deleteMessages = () => ({
  type: "DELETE_MESSAGES"
})