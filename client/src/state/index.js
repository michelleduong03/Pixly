import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"; // if its dark, move it to light, but if its light change it to dark
        },
        setLogin: (state, action) => { // action includes all the args
             state.user = action.payload.user;  
             state.token = action.payload.token;
        },
        setLogout: (state) => { // when logged out, it will reset
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log("user friends non-existent")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => { // grab our lists of posts, map
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
     }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;