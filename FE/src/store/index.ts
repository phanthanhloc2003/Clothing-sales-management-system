import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import storage from 'redux-persist/lib/storage'; // localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// 🔹 Cấu hình redux-persist
const persistConfig = {
  key: 'root', // key để lưu trong localStorage
  storage,     // dùng localStorage
  whitelist: ['auth'], // chỉ lưu reducer 'auth'
};

// 🔹 Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

// 🔹 Tạo reducer có persist (áp dụng cho root)
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Tạo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 🔹 Tạo persistor để dùng trong app
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;