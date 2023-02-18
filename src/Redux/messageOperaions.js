import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:10000/api';
const setToken = token => {
    if (token) {
        return axios.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    axios.defaults.headers.common.authorization = '';
};
export const getAllMessages = createAsyncThunk('messages', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get('messages');
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const sendMessage = createAsyncThunk('messages/send', async (data, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.post('messages/send', data);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const getAllOutboxMessages = createAsyncThunk('messages/outbox', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get('messages/outbox');
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const getOutboxMessageById = createAsyncThunk('messages/outbox/:id', async (id, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get(`messages/outbox/${id}`);

        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const getAllInboxMessage = createAsyncThunk('messages/inbox', async (_, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get('messages/inbox');
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const getInboxMessageById = createAsyncThunk('messages/inbox/:id', async (id, { getState, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get(`messages/outbox/${id}`);

        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
