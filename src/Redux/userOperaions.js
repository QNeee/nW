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
export const getUserById = createAsyncThunk('users/id', async (id, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get(`users/${id}`);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const getUserByNickName = createAsyncThunk('users/nickname', async (nickName, { dispatch, getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get(`users/nickName/${nickName}`);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})