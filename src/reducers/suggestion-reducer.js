const initialState = {
  suggestion: null,
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
        status: "sent",
        suggestion: action.suggestion
      };
    }
    case "SUGGESTION_SENT": {
      return {
        ...state,
        status: 'idle'
      }
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
