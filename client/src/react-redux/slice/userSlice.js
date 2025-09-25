import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    currentUser: null, // this one for login
    isAuthenticated: false

    // allUser: [],
    // singleUser: null
}


const userSlices = createSlice({

    name: "userslc",
    initialState,

    reducers: {

        UserLoggedIn: (state, action) => {
            state.currentUser = action.payload
            state.isAuthenticated = true
        },

        UserLoggedOut: (state, action) => {
            state.currentUser = null
            state.isAuthenticated = false
        },


        // StartLoading: (state) => {
        //     state.loading = true;
        // },

        // EndLoading: (state) => {
        //     state.loading = false;
        // },

        // SetAuthUser: (state, action) => {
        //     state.currentUser = action.payload
        // },

        // SetAllUser: (state, action) => {
        //     state.allUser = action.payload
        // },

        // SetSingleUser: (state, action) => {
        //     state.singleUser = action.payload
        // },

        // SetDeleteUserById: (state, action) => {
        //     state.allUser = state.allUser.filter(user => user.id !== action.payload);
        // },

    }

});

export const { UserLoggedIn, UserLoggedOut } = userSlices.actions
export default userSlices.reducer

// export const { StartLoading, EndLoading, SetAuthUser, SetAllUser, SetSingleUser, SetDeleteUserById } = userSlices.actions

