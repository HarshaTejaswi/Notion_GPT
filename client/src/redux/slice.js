import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'NotionGPT',
    initialState: {
        access_token: "",
        // token: ""
    },
    reducers: {
        addAccessTokenToLocalStorage: (state, action) => {
            console.log("action.payload.access_token");
            console.log(action.payload.access_token);
            state.access_token = action.payload.access_token;
        },
        // getAccessToken: (state, action) => {
        //     state.token = action.payload.token;
        // }
    },
});

export const {
    addAccessTokenToLocalStorage,
    // getAccessToken
} = slice.actions;

export default slice.reducer;
