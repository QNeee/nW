import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { login, logOut, refresh, register } from './authOperations';
import { addFriend, getAllFriends } from './friendsOperations';
import { getAllOutboxMessages, getAllMessages, sendMessage, getOutboxMessageById, getInboxMessageById, getAllInboxMessage, changeStatusReadMessage, getNextInboxLimit, getPrevInboxLimit } from './messageOperaions';
import { getAllUsers, getUserById, getUserByNickName } from './userOperaions';


const initialState = {
    auth: {
        user: { email: null, nickName: null, id: null },
        userData: {
            messages: { inbox: [], outbox: [], archive: [] },
            messageContent: { inbox: [], outbox: [], archive: [] },
            messagesCount: { inbox: 0, outbox: 0, archive: 0 },
            info: [],
            friends: [],
            findFriend: [],
            allUsers: [],
            unReadMessages: [],
            readMessages: [],
            page: 1,
            totalHits: null
        },
    },
    email: null,
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
            state.email = action.payload.data.newUser.email;
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
            state.auth.user.id = action.payload.user.id;
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
                state.auth.user.id = action.payload.response.id;
            })
            .addCase(refresh.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllMessages.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllOutboxMessages.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOutboxMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.messages.outbox = action.payload.data
            })
            .addCase(getAllOutboxMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getOutboxMessageById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOutboxMessageById.fulfilled, (state, action) => {

                state.auth.userData.messageContent.outbox = action.payload.data;

            })
            .addCase(getOutboxMessageById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllInboxMessage.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllInboxMessage.fulfilled, (state, action) => {
                state.auth.userData.messages.inbox = action.payload.data.messages;
                state.auth.userData.totalHits = action.payload.data.totalHits;
            })
            .addCase(getAllInboxMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getNextInboxLimit.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNextInboxLimit.fulfilled, (state, action) => {
                state.auth.userData.messages.inbox = action.payload.data.messages;
                state.auth.userData.page = action.payload.data.page;
                state.auth.userData.totalHits = action.payload.data.totalHits;
            })
            .addCase(getNextInboxLimit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getPrevInboxLimit.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPrevInboxLimit.fulfilled, (state, action) => {
                state.auth.userData.messages.inbox = action.payload.data.messages;
                state.auth.userData.page = action.payload.data.page;
                state.auth.userData.totalHits = action.payload.data.totalHits;
            })
            .addCase(getPrevInboxLimit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(changeStatusReadMessage.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeStatusReadMessage.fulfilled, (state, action) => {
                // state.auth.userData.unReadMessages = action.payload.data;
                // console.log(state.auth.userData.unReadMessages);
            })
            .addCase(changeStatusReadMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getInboxMessageById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInboxMessageById.fulfilled, (state, action) => {

                state.auth.userData.messageContent.inbox = action.payload.data;
            })
            .addCase(getInboxMessageById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(sendMessage.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                // state.auth.userData.messages.outbox = [...state.auth.userData.messages.outbox, action.payload.data.message]
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllUsers.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {

                state.auth.userData.allUsers = action.payload.data;
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserByNickName.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserByNickName.fulfilled, (state, action) => {
                console.log(action.payload);
                state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getUserByNickName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.auth.userData.info = [action.payload.data];
                state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllFriends.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllFriends.fulfilled, (state, action) => {
                state.auth.userData.friends = action.payload.data;
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getAllFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(addFriend.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                console.log(action.payload);
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(addFriend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }

});

const persistConfig = {
    key: 'local-key',
    storage,
    whitelist: ['token', 'isLoggedIn', 'email'],
};
export const networkReducer = persistReducer(
    persistConfig,
    networkSlice.reducer
);
export const getUserEmail = state => state.network.email;
export const getError = state => state.network.error;
export const gettotalHits = state => state.network.auth.userData.totalHits;
export const getPage = state => state.network.auth.userData.page;
export const getAllUsersData = state => state.network.auth.userData.allUsers;
export const getIsLoggedIn = state => state.network.isLoggedIn;
export const getUserInfo = state => state.network.auth.userData.info;
export const getToken = state => state.network.token;
export const getUserId = state => state.network.auth.user.id;
export const getUserNickName = state => state.network.auth.user.nickName;
export const getUserOutbox = state => state.network.auth.userData.messages.outbox
export const getUserInbox = state => state.network.auth.userData.messages.inbox
export const getInboxContent = state => state.network.auth.userData.messageContent.inbox
export const getOutboxContent = state => state.network.auth.userData.messageContent.outbox
export const getUserUnreadMessages = state => state.network.auth.userData.unReadMessages;
export const getReadMessages = state => state.network.auth.userData.readMessages;
export const getFindFriend = state => state.network.auth.userData.findFriend;
export const getUserFriends = state => state.network.auth.userData.friends;
export const getUserMessagesCount = state => state.network.auth.userData.messagesCount