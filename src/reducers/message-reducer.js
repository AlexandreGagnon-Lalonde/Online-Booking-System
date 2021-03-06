const initialState = {
  message: null,
  status: "idle",
  toggleIndex: -1,
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_MESSAGE": {
      return {
        ...state,
        status: "Loading",
      };
    }
    case "SEND_MESSAGE": {
      return {
        ...state,
        status: "Sent",
      };
    }
    case "MESSAGE_ERROR": {
      return {
        ...state,
        status: "Error",
      };
    }
    case "RECEIVE_MESSAGES": {
      return {
        ...state,
        message: action.messages,
        status: "Received",
      };
    }
    case "CHANGE_TOGGLE": {
      return {
        ...state,
        toggleIndex: action.newIndex,
      };
    }
    case "DELETE_MESSAGES": {
      return {
        ...state,
        message: null,
        status: "idle",
      };
    }
    default: {
      return state;
    }
  }
}
