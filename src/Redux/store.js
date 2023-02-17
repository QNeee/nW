import { configureStore } from '@reduxjs/toolkit'
import { networkReducer } from './networkSlice'
import { persistStore } from 'redux-persist'
export const store = configureStore({
    reducer: {
        network: networkReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persistor = persistStore(store)