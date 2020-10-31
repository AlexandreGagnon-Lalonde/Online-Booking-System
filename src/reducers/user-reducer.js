const initialState = {
  user: null,
  otherUser: null,
  status: "idle",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_USER": {
      return {
        ...state,
        status: "Loading",
      };
    }
    case "RECEIVE_USER": {
      return {
        ...state,
        user: action.user,
        status: "Logged In",
      };
    }
    case "RECEIVE_OTHER_USER_PROFILE": {
      return {
        ...state,
        otherUser: action.otherUser,
        status: "Logged In",
      };
    }
    case "RECEIVE_USER_ERROR": {
      return {
        ...state,
        status: "Error",
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        otherUser: null,
        status: "idle",
      };
    }
    default: {
      return state;
    }
  }
}
