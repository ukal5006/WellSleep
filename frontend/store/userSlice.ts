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
    profileImage: string | null;
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
        updateUserInfo(state, action: PayloadAction<Partial<UserInfo>>) {
            if (state.userInfo) {
                state.userInfo = { ...state.userInfo, ...action.payload };
            }
        },
    },
});

export const { setUserInfo, clearUserInfo, updateUserInfo } = userSlice.actions; // updateUserInfo 추가
export default userSlice.reducer;
