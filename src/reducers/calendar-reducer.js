const initialState = {
  calendar: null,
  calendarDisplay: 'timeGridWeek',
  status: "idle",
};

export default function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_CALENDAR": {
      return {
        ...state,
        status: "Loading",
      };
    }
    // Will have to play around here once the app is a little bit more complete
    case "RECEIVE_CALENDAR": {
      return {
        ...state,
        status: "idle",
        calendar: action.calendar
      };
    }
    case "RECEIVE_CALENDAR_ERROR": {
      return {
        ...state,
        status: "Error",
      };
    }
    case "CALENDAR_DAY": {
      return {
        ...state,
        status: "idle",
        calendarDisplay: 'timeGridDay',
      };
    }
    case "CALENDAR_WEEK": {
      return {
        ...state,
        status: "idle",
        calendarDisplay: 'timeGridWeek',
      };
    }
    default: {
      return state;
    }
  }
}
