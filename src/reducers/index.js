import { combineReducers } from "redux";

import user from "./user-reducer";
import calendar from "./calendar-reducer";
import message from './message-reducer'

export default combineReducers({ user, calendar, message });
