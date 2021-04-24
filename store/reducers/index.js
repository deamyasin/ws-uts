import { combineReducers } from "redux";
import mahasiswaReducer from "./mahasiswa";

const rootReducer = combineReducers({
	mahasiswa: mahasiswaReducer,
});

export default rootReducer;
