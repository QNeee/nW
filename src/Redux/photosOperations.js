import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:10000/api';
const setToken = token => {
    if (token) {
        return axios.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    axios.defaults.headers.common.authorization = '';
};
export const addPhoto = createAsyncThunk('photo/add', async (file, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.network.token;
    setToken(token);
    try {
        const formData = new FormData();
        formData.append('avatar', file);
        const { data } = await axios.post('/photos', formData);
        dispatch(getAllUserPhotos())
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const getAllUserPhotos = createAsyncThunk('photos/get', async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.network.token;
    setToken(token);
    try {
        const { data } = await axios.get('/photos');
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const getAllAnotherUserPhotos = createAsyncThunk('photos/another', async (query, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.network.token;
    setToken(token);
    try {
        const { data } = await axios.get(`/photos?${query}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const getUserPhotoById = createAsyncThunk('photos/id', async (id, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.network.token;
    setToken(token);
    try {
        const { data } = await axios.get(`/photos/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const postComment = createAsyncThunk('photos/comment', async (comment, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.network.token;
    setToken(token);
    try {
        const { data } = await axios.post(`/photos/comment`, comment);
        await dispatch(getUserPhotoById(comment.id));
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const postLike = createAsyncThunk('photos/like', async (like, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.network.token;
    setToken(token);
    try {
        const { data } = await axios.post(`/photos/like`, like);
        await dispatch(getUserPhotoById(like.id));
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const unLike = createAsyncThunk('photos/unLike', async (like, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const token = state.network.token;
    setToken(token);
    try {
        const { data } = await axios.post(`/photos/unLike`, like);
        await dispatch(getUserPhotoById(like.id));
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})