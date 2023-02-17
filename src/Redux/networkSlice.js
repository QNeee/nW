import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { login, logOut, refresh, register } from './authOperations';


const initialState = {
    auth: {
        user: { email: null, nickName: null },
        userData: {
            messages: { inbox: [], outbox: [], archive: [] },
            messagesCount: { inbox: 0, outbox: 0, archive: 0 },
            friends: [],
        },
    },
    isLoggedIn: false,
    token: null,
    error: null,
    loading: false,
};
const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(register.pending, (state, action) => {
            state.error = null;

        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false;

        }).addCase(register.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }).addCase(login.pending, (state, action) => {
            state.loading = true;
            state.error = null;

        }).addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.token = action.payload.token;
            state.auth.user.email = action.payload.user.email;
            state.auth.user.nickName = action.payload.user.nickName;

        }).addCase(login.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }).addCase(logOut.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        }).addCase(logOut.fulfilled, (state, action) => {
            state.auth.user = { email: null, nickName: null };
            state.token = null;
            state.isLoggedIn = false;
            state.loading = false;
        }).addCase(logOut.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(refresh.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(refresh.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.user.email = action.payload.response.email;
                state.auth.user.nickName = action.payload.response.nickName;
                state.token = action.payload.response.token;
            })
            .addCase(refresh.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }

});

const persistConfig = {
    key: 'local-key',
    storage,
    whitelist: ['token', 'isLoggedIn'],
};
export const networkReducer = persistReducer(
    persistConfig,
    networkSlice.reducer
);
export const getIsLoggedIn = state => state.network.isLoggedIn;
export const getToken = state => state.network.token;