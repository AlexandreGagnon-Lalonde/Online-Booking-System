const initialState = {
  suggestion: [],
  status: "idle",
};

export default function suggestionReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_SUGGESTION": {
      return {
        ...state,
        status: "Loading",
      };
    }
    case "RECEIVE_SUGGESTION": {
      return {
        ...state,
        status: "idle",
        suggestion: action.suggestion,
      };
    }
    case "RECEIVE_SUGGESTION_ERROR": {
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
