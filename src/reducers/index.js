import { combineReducers } from "redux";

import user from "./user-reducer";
import calendar from "./calendar-reducer";

export default combineReducers({ auth, artists });
