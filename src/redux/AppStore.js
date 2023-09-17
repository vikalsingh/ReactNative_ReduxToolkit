import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import weatherReducer from './WeatherSlice';
import searchSlice from "./searchSlice";

const AppStore = configureStore({
    reducer: {
        user: userReducer,
        weather: weatherReducer,
        searchData: searchSlice,
    },
});

export default AppStore;