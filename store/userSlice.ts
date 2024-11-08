import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
    id: number;
    email: string;
    name: string;
    createdAt: string;
    constellation: string | null;
    emg: number;
    o2: number;
    pulse: number;
}

interface UserState {
    userInfo: UserInfo | null; // 사용자 정보
}

const initialState: UserState = {
    userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<UserInfo>) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.userInfo = null;
        },
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
