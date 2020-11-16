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

export const receiveUserError = (errorMessage) => ({
  type: "RECEIVE_USER_ERROR",
  errorMessage,
});

export const requestCalendar = () => ({
  type: "REQUEST_CALENDAR",
});

export const receiveCalendar = (calendar) => ({
  type: "RECEIVE_CALENDAR",
  calendar,
});

export const receiveCalendarError = (errorMessage) => ({
  type: "RECEIVE_CALENDAR_ERROR",
  errorMessage,
});

export const calendarDay = () => ({
  type: "CALENDAR_DAY",
});

export const calendarWeek = () => ({
  type: "CALENDAR_WEEK",
});

export const requestMessage = () => ({
  type: "REQUEST_MESSAGE"
})

export const sendMessage = () => ({
  type: "SEND_MESSAGE"
})

export const messageError = (errorMessage) => ({
  type: "MESSAGE_ERROR",
  errorMessage,
})

export const receiveMessages = (messages) => ({
  type: "RECEIVE_MESSAGES",
  messages,
})

export const toggleIndex = (newIndex) => ({
  type: "CHANGE_TOGGLE",
  newIndex,
})

export const deleteMessages = () => ({
  type: "DELETE_MESSAGES"
})

export const requestSuggestion = () => ({
  type: "REQUEST_SUGGESTION",
});

export const receiveSuggestion = (suggestion) => ({
  type: "RECEIVE_SUGGESTION",
  suggestion,
});

export const receiveSuggestionError = (errorMessage) => ({
  type: "RECEIVE_SUGGESTION_ERROR",
  errorMessage,
});

export const requestComment = () => ({
  type: "REQUEST_COMMENT",
});

export const receiveComment = (comments) => ({
  type: "RECEIVE_COMMENT",
  comments,
});

export const receiveCommentError = (errorMessage) => ({
  type: "RECEIVE_COMMENT_ERROR",
  errorMessage,
});

export const requestWorkout = () => ({
  type: "REQUEST_WORKOUT",
});

export const receiveWorkout = (workout) => ({
  type: "RECEIVE_WORKOUT",
  workout,
});

export const receiveWorkoutError = (errorMessage) => ({
  type: "RECEIVE_WORKOUT_ERROR",
  errorMessage,
});
