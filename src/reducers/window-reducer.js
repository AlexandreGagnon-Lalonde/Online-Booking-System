const initialState = {
  width: window.innerWidth,
};

export default function windowReducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_WINDOW_WIDTH": {
      return {
        ...state,
        width: action.width,
      };
    }
    default: {
      return state;
    }
  }
}
