import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
axios.defaults.baseURL = 'https://nw.onrender.com/api';
const setToken = token => {
    if (token) {
        return axios.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    axios.defaults.headers.common.authorization = '';
};
export const register = createAsyncThunk('auth/register', async (data, { dispatch, rejectWithValue }) => {
    try {
        const result = await axios.post('auth/register', data);
        // if (result.id) {
        //     dispatch(login(data));
        // }
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const result = await axios.post('/auth/login', data);
        setToken(result.data.token);
        return result.data;
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
        const { data } = await axios.post('/auth/current');
        return data;
    } catch (error) {
        console.log(error);
    }
})