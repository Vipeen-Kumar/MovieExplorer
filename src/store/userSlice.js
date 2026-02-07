import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoggedIn: false,
    favoriteGenres: JSON.parse(localStorage.getItem('favoriteGenres')) || [],
    hasSelectedGenres: !!localStorage.getItem('favoriteGenres'),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        setFavoriteGenres: (state, action) => {
            state.favoriteGenres = action.payload;
            state.hasSelectedGenres = true;
            localStorage.setItem('favoriteGenres', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.favoriteGenres = [];
            state.hasSelectedGenres = false;
            localStorage.removeItem('favoriteGenres');
        },
    },
});

export const { setUser, setFavoriteGenres, logout } = userSlice.actions;

export default userSlice.reducer;
