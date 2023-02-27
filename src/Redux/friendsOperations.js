import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { getUserById } from './userOperaions';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'http://localhost:10000/api';
const setToken = token => {
    if (token) {
        return axios.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    axios.defaults.headers.common.authorization = '';
};
export const addFriend = createAsyncThunk('friends/add', async (data, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        const userId = state.network.auth.user.id;
        setToken(state.network.token);
        const result = await axios.post('friends/', data);
        dispatch(getUserById(userId));
        Notiflix.Notify.success('Added');
        return result;

    } catch (error) {

        return rejectWithValue(error);
    }
})
export const getAllFriends = createAsyncThunk('friends/get', async (_, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get('friends');
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const removeFriend = createAsyncThunk('friends/remove', async (id, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        const userId = state.network.auth.user.id;
        setToken(state.network.token);
        const result = await axios.delete(`friends/${id}`);
        dispatch(getUserById(userId));
        Notiflix.Notify.success('Removed');
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})