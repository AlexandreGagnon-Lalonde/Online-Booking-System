import { combineReducers } from "redux";

import user from "./user-reducer";
import calendar from "./calendar-reducer";
import message from "./message-reducer";
import suggestion from "./suggestion-reducer";
import comment from "./comment-reducer";
import workout from "./workout-reducer";
import window from "./window-reducer";

export default combineReducers({
  window,
  user,
  calendar,
  message,
  suggestion,
  comment,
  workout,
});
