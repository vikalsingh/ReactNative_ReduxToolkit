import {createSlice} from '@reduxjs/toolkit';

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userList: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.userList.push(action.payload);
    },
    editUser: (state, action) => {
      let temp = state.userList;
      console.log("slice: ", action.payload)
      temp.map((item, index) => {
        if(index == action.payload.index) {
            item.name = action.payload.name;
            item.email = action.payload.email;
            item.phone = action.payload.phone;
            item.city = action.payload.city;
        }
        // index === action.payload.index ? action.payload.newContent : item;
      });
      state.userList = temp;
    },
    deleteUser: (state, action) => {
        let temp = state.userList
        let final = temp.filter((item, index) => {
            return index != action.payload
        })
        state.userList = final;
    }
  },
});

export const {addUser, editUser, deleteUser} = UserSlice.actions;

export default UserSlice.reducer;
