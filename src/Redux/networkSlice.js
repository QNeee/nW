import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { login, logOut, refresh, register } from './authOperations';
import { addFriend, getAllFriends, getOnPendingFriends, getYourPendings, removeFriend, verifyFriend } from './friendsOperations';
import { getAllOutboxMessages, getAllMessages, sendMessage, getOutboxMessageById, getInboxMessageById, getAllInboxMessage, changeStatusReadMessage, deleteInboxMessage, deleteOutboxMessage, getAllSortedMessages, getAllUserDialogues, makeDialogReadStatus } from './messageOperaions';
import { addPhoto, deletePhoto, getAllAnotherUserPhotos, getAllUserPhotos, getUserPhotoById, patchAvatar, postComment, postLike, unLike } from './photosOperations';
import { getAllProfiles, getProfileById, patchProfile, postProfile } from './profileOperations';
import { findUserById, getAllUsers, getUserById, getUserByNickName } from './userOperaions';


const initialState = {
    auth: {
        user: { email: null, nickName: null, id: null },
        userData: {
            allMessages: [],
            messages: { inbox: [], outbox: [], archive: [] },
            messageContent: { inbox: [], outbox: [], archive: [] },
            messagesCount: { inbox: 0, outbox: 0, archive: 0 },
            info: [],
            friends: [],
            findFriend: [],
            allUsers: [],
            usersByLimit: [],
            page: 1,
            totalHits: null,
            dataToSendLength: null,
            answerData: '',
            onlyUnread: false,
            onlyRead: false,
            find: '',
            profile: [],
            allProfiles: [],
            dialogues: [],
            dialogue: [],
            sortedMessages: [],
            friendsOnPending: [],
            yourPendings: [],
            friendsVerifyData: [],
            userPhotos: [],
            userPhoto: [],
            likesPhotoNames: [],
            anotherUserPhotos: [],
            patchedDialogues: [],
        },
    },
    email: null,
    isLoggedIn: false,
    token: null,
    error: null,
    loading: false,
    modal: { id: '', open: false },
    setPhotoId: '',
    filter: '',
    friendsList: '',
};
const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.modal.id = action.payload.id;
            state.modal.open = action.payload.open;
        },
        setPage: (state, action) => {
            state.auth.userData.page = action.payload;
        },
        setDataToSendLength: (state, action) => {

            state.auth.userData.dataToSendLength = action.payload;
        },
        setAnswerData: (state, action) => {
            state.auth.userData.answerData = action.payload;
        },
        setOnlyUnread: (state, action) => {
            state.auth.userData.onlyRead = false;
            state.auth.userData.onlyUnread = action.payload;
        },
        setOnlyRead: (state, action) => {
            state.auth.userData.onlyUnread = false;
            state.auth.userData.onlyRead = action.payload;
        },
        setReturn: (state, action) => {
            state.auth.userData.onlyUnread = false;
            state.auth.userData.onlyRead = false;
        },
        setFindedUserId: (state, action) => {
            state.auth.userData.find = action.payload;
        },
        setFilterValue: (state, action) => {
            state.filter = action.payload;
        },
        setMessageClear: (state, action) => {
            state.auth.userData.sortedMessages = [];
        },
        setFriendsList: (state, action) => {

            state.friendsList = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(register.pending, (state, action) => {
            state.error = null;
            state.loading = true;
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
            state.email = action.payload.user.email;
        }).addCase(login.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }).addCase(logOut.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        }).addCase(logOut.fulfilled, (state, action) => {
            state.auth.user = { email: null, nickName: null, id: null };
            state.token = null;
            state.isLoggedIn = false;
            state.loading = false;
            state.email = null;
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
                state.auth.userData.allMessages = action.payload.data;
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
                state.loading = false;
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
                state.loading = false;
                state.auth.userData.messages.inbox = action.payload.data.messages;
                state.auth.userData.totalHits = action.payload.data.totalHits;
            })
            .addCase(getAllInboxMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(changeStatusReadMessage.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeStatusReadMessage.fulfilled, (state, action) => {
                state.loading = false;


            })
            .addCase(changeStatusReadMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getInboxMessageById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInboxMessageById.fulfilled, (state, action) => {
                state.loading = false;

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
                state.loading = false;

                // state.auth.userData.messages.outbox = [...state.auth.userData.messages.outbox, action.payload.data.message]
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(deleteInboxMessage.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteInboxMessage.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteInboxMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(deleteOutboxMessage.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOutboxMessage.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteOutboxMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllUsers.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.allUsers = action.payload.data.allUsersData;
                state.auth.userData.totalHits = action.payload.data.totalHits;
                state.auth.userData.page = action.payload.data.page;
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
                state.loading = false;

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
                state.loading = false;

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
                console.log(action.payload);
                state.loading = false;
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
                state.loading = false;
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(addFriend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(removeFriend.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFriend.fulfilled, (state, action) => {
                state.loading = false;
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(removeFriend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(findUserById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(findUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(findUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(postProfile.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.firstProfile = true;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(postProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllProfiles.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProfiles.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getAllProfiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getProfileById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfileById.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.profile = action.payload.data;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getProfileById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(patchProfile.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(patchProfile.fulfilled, (state, action) => {
                state.loading = false;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(patchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllSortedMessages.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSortedMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.sortedMessages = action.payload.data;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getAllSortedMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllUserDialogues.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUserDialogues.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.dialogues = action.payload.data;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getAllUserDialogues.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getOnPendingFriends.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOnPendingFriends.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.friendsOnPending = action.payload.data;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getOnPendingFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getYourPendings.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getYourPendings.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.yourPendings = action.payload.data;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getYourPendings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(verifyFriend.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyFriend.fulfilled, (state, action) => {
                state.loading = false;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(verifyFriend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(addPhoto.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPhoto.fulfilled, (state, action) => {
                state.loading = false;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(addPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllUserPhotos.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUserPhotos.fulfilled, (state, action) => {

                state.loading = false;

                state.auth.userData.userPhotos = action.payload;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getAllUserPhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getUserPhotoById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserPhotoById.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.userPhoto = [action.payload];

                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getUserPhotoById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(postComment.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.loading = false;

                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(postComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(postLike.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postLike.fulfilled, (state, action) => {

                state.loading = false;
                state.auth.userData.likesPhotoNames = action.payload.likes;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(postLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(unLike.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(unLike.fulfilled, (state, action) => {
                state.loading = false;

                state.auth.userData.likesPhotoNames = action.payload.likes;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(unLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllAnotherUserPhotos.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAnotherUserPhotos.fulfilled, (state, action) => {
                state.loading = false;
                state.auth.userData.anotherUserPhotos = action.payload;
                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(getAllAnotherUserPhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(makeDialogReadStatus.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(makeDialogReadStatus.fulfilled, (state, action) => {

                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(makeDialogReadStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(deletePhoto.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {

                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(patchAvatar.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(patchAvatar.fulfilled, (state, action) => {

                // state.auth.userData.allProfiles = action.payload.data;
                // state.auth.userData.findFriend = [action.payload.data];
                // state.auth.userData.messagesCount = action.payload.data.messageCount;
                // state.auth.user.nickName = action.payload.response.nickName;
                // state.token = action.payload.response.token;
            })
            .addCase(patchAvatar.rejected, (state, action) => {
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
export const { setModal, setFriendsList, setMessageClear, setPage, setDataToSendLength, setFilterValue, setFindedUserId, setAnswerData, setReturn, setOnlyRead, setOnlyUnread } = networkSlice.actions;
export const getAnotherUserPhotos = state => state.network.auth.userData.anotherUserPhotos;
export const getUserLikesNames = state => state.network.auth.userData.likesPhotoNames;
export const getUserPhoto = state => state.network.auth.userData.userPhoto;
export const getUserPhotos = state => state.network.auth.userData.userPhotos;
export const getUserToken = state => state.network.token;
export const getFriendsVerifyData = state => state.network.auth.userData.friendsVerifyData;
export const getFriendList = state => state.network.friendsList;
export const getFriendsOnPending = state => state.network.auth.userData.friendsOnPending;
export const getAllYourPendings = state => state.network.auth.userData.yourPendings;
export const getSortedMessages = state => state.network.auth.userData.sortedMessages;
export const getAllDialogues = state => state.network.auth.userData.dialogues;
export const getUserDialogue = state => state.network.auth.userData.dialogue;
export const getFirstProfile = state => state.network.firstProfile;
export const getProfile = state => state.network.auth.userData.profile;
export const getFilter = state => state.network.filter;
export const getFind = state => state.network.auth.userData.find;
export const getOnlyRead = state => state.network.auth.userData.onlyRead;
export const getOnlyUnread = state => state.network.auth.userData.onlyUnread;
export const getAnswerData = state => state.network.auth.userData.answerData;
export const getDataToSendLength = state => state.network.auth.userData.dataToSendLength;
export const getModal = state => state.network.modal;
export const getAllUserMassages = state => state.network.auth.userData.allMessages;
export const getUserUnreadMessages = state => state.network.auth.userData.unreadMessages;
export const getLoading = state => state.network.loading;
export const getUserEmail = state => state.network.email;
export const getError = state => state.network.error;
export const getTotalHits = state => state.network.auth.userData.totalHits;
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
export const getReadMessages = state => state.network.auth.userData.readMessages;
export const getFindFriend = state => state.network.auth.userData.findFriend;
export const getUserFriends = state => state.network.auth.userData.friends;
export const getUserMessagesCount = state => state.network.auth.userData.messagesCount