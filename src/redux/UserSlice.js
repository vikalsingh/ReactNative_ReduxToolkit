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
      let {userList} = state;
      state.userList = userList.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    deleteUser: (state, action) => {
      let {userList} = state;
      state.userList = userList.filter(item => item.id !== action.payload);
    },
  },
});

export const {addUser, editUser, deleteUser} = UserSlice.actions;

export default UserSlice.reducer;
