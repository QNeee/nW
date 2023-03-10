import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { getUserById } from './userOperaions';
import Notiflix from 'notiflix';
import { HOST } from 'host';
axios.defaults.baseURL = HOST;
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
export const postProfile = createAsyncThunk('profiles/post', async (data, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        const id = state.network.auth.user.id;
        setToken(state.network.token);
        const result = await axios.post('profiles/', data);
        await dispatch(getUserById(id));
        await dispatch(getProfileById(id));
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const patchProfile = createAsyncThunk('profiles/patch', async (data, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.patch(`profiles/${data.id}`, data.dataToPatch);
        await dispatch(getProfileById(data.id));
        Notiflix.Notify.success('Changes Saved');
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})