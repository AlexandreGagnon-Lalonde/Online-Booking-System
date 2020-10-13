const initialState = {
  user: null,
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
        status: "Idle",
      };
    }
    case "RECEIVE_OTHER_USER_PROFILE": {
      return {
        ...state, 
        otherUser: action.user,
        status: 'Idle'
      }
    }
    case "RECEIVE_USER_ERROR": {
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
