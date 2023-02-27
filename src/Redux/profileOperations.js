import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:10000/api';
const setToken = token => {
    if (token) {
        return axios.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    axios.defaults.headers.common.authorization = '';
};

export const getAllProfiles = createAsyncThunk('profiles', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get('profiles/');
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const getProfileById = createAsyncThunk('profiles/id', async (id, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get(`profiles/${id}`);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const postProfile = createAsyncThunk('profiles/post', async (data, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.post('profiles/', data);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const patchProfile = createAsyncThunk('profiles/patch', async (data, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.patch(`profiles/${data.id}`);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})