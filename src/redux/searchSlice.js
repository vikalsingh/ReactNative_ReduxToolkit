const { createSlice } = require("@reduxjs/toolkit");

const searchSlice = createSlice({
    name: 'searchData',
    initialState: {
        searchData: [],
    },
    reducers: {
        addSearchData: (state, action) => {
            console.log("action", action.payload)
            state.searchData.push(action.payload);
        },
    }
});

export const {addSearchData} = searchSlice.actions;
export default searchSlice.reducer;