import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:10000/api';
const setToken = token => {
    if (token) {
        return axios.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    axios.defaults.headers.common.authorization = '';
};
export const getAllUsers = createAsyncThunk('users', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get('users');
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const getUserById = createAsyncThunk('users', async (id, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get(`users/${id}`);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    setToken(state.network.token);
    try {
        const { data } = await axios.post('/auth/logout');
        setToken();
        return data;
    } catch (error) {
        console.log(error);


    }
})
export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.network.token;
    if (token === null) return state;
    setToken(token);
    try {
        const { data } = await axios.post('/auth/current')
        return data;
    } catch (error) {
        console.log(error);
    }
})