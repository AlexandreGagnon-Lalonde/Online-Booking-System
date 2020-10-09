const initialState = {
  currentArtist: null,
  status: "idle",
};

export default function artistsReducer(state = initialState, action) {
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
        status: "Idle",
        calendar: action.calendar
      };
    }
    case "RECEIVE_CALENDAR_ERROR": {
      return {
        ...state,
        status: "Error",
      };
    }
    default: {
      return state;
    }
  }
}
