import { combineReducers } from "redux";

import user from "./user-reducer";
import calendar from "./calendar-reducer";
import message from './message-reducer';
import suggestion from './suggestion-reducer';

export default combineReducers({ user, calendar, message, suggestion });
