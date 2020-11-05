const initialState = {
  comment: [],
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
        comment: action.comment
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
