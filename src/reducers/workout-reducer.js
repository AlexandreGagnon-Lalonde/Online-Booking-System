const initialState = {
  workout: null,
  errorMessage: null,
  status: "idle",
};

export default function workoutReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_WORKOUT": {
      return {
        ...state,
        status: "Loading",
      };
    }
    case "RECEIVE_WORKOUT": {
      return {
        ...state,
        status: "idle",
        workout: action.workout,
      };
    }
    case "RECEIVE_WORKOUT_ERROR": {
      return {
        ...state,
        errorMessage: action.errorMessage,
        status: "Error",
      };
    }
    default: {
      return state;
    }
  }
}
