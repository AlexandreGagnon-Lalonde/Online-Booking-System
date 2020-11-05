const initialState = {
  comments: [],
  status: "idle",
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_COMMENT": {
      return {
        ...state,
        status: "Loading",
      };
    }
    case "RECEIVE_COMMENT": {
      return {
        ...state,
        status: "idle",
        comments: action.comments
      };
    }
    case "RECEIVE_COMMENT_ERROR": {
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
