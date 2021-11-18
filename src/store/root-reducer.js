import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";

const allReducers = combineReducers({
    users:userReducer,
});

export default allReducers;