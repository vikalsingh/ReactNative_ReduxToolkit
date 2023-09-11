import {createSlice} from '@reduxjs/toolkit';

const WeatherSlice = createSlice({
  name: 'weather',
  initialState: {
    cityData: [],
  },
  reducers: {
    addCity: (state, action) => {
        console.log(action.payload)
      state.cityData.push(action.payload);
    },
    // editUser: (state, action) => {
    //   let {userList} = state;
    //   state.userList = userList.map(item =>
    //     item.id === action.payload.id ? action.payload : item,
    //   );
    // },
    // deleteUser: (state, action) => {
    //   let {userList} = state;
    //   state.userList = userList.filter(item => item.id !== action.payload);
    // },
  },
});

export const {addCity} = WeatherSlice.actions;
export default WeatherSlice.reducer;
