import { configureStore } from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import weatherReducer from './WeatherSlice';

const AppStore = configureStore({
    reducer: {
        user: userReducer,
        weather: weatherReducer,
    },
});

export default AppStore;