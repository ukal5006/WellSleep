// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // userSlice 경로를 확인하세요.

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;
