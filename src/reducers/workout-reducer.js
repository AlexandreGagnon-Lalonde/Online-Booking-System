const initialState = {
  workout: null,
  allWorkouts: null,
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
    case "RECEIVE_ALL_WORKOUTS": {
      return {
        ...state,
        status: "idle",
        allWorkouts: action.allWorkouts,
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
