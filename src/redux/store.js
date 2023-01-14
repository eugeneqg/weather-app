import {createStore} from "redux";
import { combineReducers } from "redux";
import weatherReducer from "./reducers/weatherData";
import weeklyReducer from "./reducers/weeklyWeather";

const rootReducer = combineReducers({
    weather: weatherReducer,
    weekly: weeklyReducer
})


const store = createStore(rootReducer);

export default store;