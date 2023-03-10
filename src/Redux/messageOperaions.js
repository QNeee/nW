import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { HOST } from 'host';
import { setDataToSendLength, setPage } from './networkSlice';
import { getUserById } from './userOperaions';
axios.defaults.baseURL = HOST;
const setToken = token => {
    if (token) {
        return axios.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    axios.defaults.headers.common.authorization = '';
};
export const getAllMessages = createAsyncThunk('messages', async (_, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get('messages');
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const getAllSortedMessages = createAsyncThunk('messages/sort', async (data, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        if (data) {
            const result = await axios.get(`messages/sorted?sorted=${data}`);
            await dispatch(makeDialogReadStatus(data));
            await dispatch(getAllMessages());
            return result;
        }
        const result = await axios.get(`messages/sorted`);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const sendMessage = createAsyncThunk('messages/send', async (data, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.post('messages/send', data);
        await dispatch(getUserById(state.network.auth.user.id));
        await dispatch(getAllSortedMessages(data.receiver));
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
export const getAllInboxMessage = createAsyncThunk('messages/inbox', async (data, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        if (data) {
            const result = await axios.get(`messages/inbox/?page=${data.page}&skip=${data.skip}`)
            dispatch(setDataToSendLength(result.data.messages.length))
            return result;
        }
        const result = await axios.get('messages/inbox');
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const getInboxMessageById = createAsyncThunk('messages/inbox/:id', async (id, { getState, dispatch, rejectWithValue }) => {
    try {
        const readMessage = {
            _id: id,
            read: { marked: "true" }
        }
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get(`messages/outbox/${id}`);
        await dispatch(changeStatusReadMessage(readMessage));
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const changeStatusReadMessage = createAsyncThunk('messages/inbox/unread', async (data, { getState, dispatch, rejectWithValue }) => {
    try {
        const read = data.read;
        const dataToPatch = { read };
        const state = getState();
        setToken(state.network.token);
        const result = await axios.patch(`messages/inbox/${data._id}`, dataToPatch);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const deleteInboxMessage = createAsyncThunk('messages/inbox/delete', async (id, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        const userId = state.network.auth.user.id;
        let page = state.network.auth.userData.page;
        let dataLength = state.network.auth.userData.dataToSendLength;
        const data = {
            page,
            skip: 5
        }
        setToken(state.network.token);
        const result = await axios.delete(`messages/inbox/${id}`);
        dispatch(setDataToSendLength(dataLength--))
        if (dataLength === 0 && page !== 1) {
            dispatch(setPage(page - 1));
        }
        await dispatch(getAllInboxMessage(data));
        await dispatch(getUserById(userId));
        await dispatch(getAllMessages());
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const deleteOutboxMessage = createAsyncThunk('messages/outbox/delete', async (id, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.delete(`messages/outbox/${id}`);
        await dispatch(getAllOutboxMessages());
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})

export const getAllUserDialogues = createAsyncThunk('messages/dialog/', async (_, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.get(`messages/dialog`);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
export const makeDialogReadStatus = createAsyncThunk('messages/dialog/patch', async (dialogue, { getState, dispatch, rejectWithValue }) => {
    try {
        const state = getState();
        setToken(state.network.token);
        const result = await axios.patch(`messages/dialog/${dialogue}`);
        return result;
    } catch (error) {

        return rejectWithValue(error);
    }
})
