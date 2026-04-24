// src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store'; // Adjust the path to your store file
import type {  UserApiType} from '@/core/modals/userT';

interface AdminState {
        users: UserApiType[]
        categories: string[]
}

const initialState: AdminState = {
  users: [],
  categories: []
}

const adminSlice = createSlice({
  name: 'adminSlice',
  initialState,
  reducers: {
        setAllUsers: (state, { payload }: PayloadAction<UserApiType[]>) => {
                state.users = payload;
        },
         updateUserInList: (state, { payload }: PayloadAction<UserApiType>) => {
                 const index = state.users.findIndex(u => u.id === payload.id);
                 if (index !== -1) {
                         state.users[index] = payload;
                 }
         },
          removeUserFromList: (state, { payload }: PayloadAction<number>) => {
                  state.users = state.users.filter(u => u.id !== payload);
          },
           addUserToList: (state, { payload }: PayloadAction<UserApiType>) => {
                   state.users.push(payload);
           },
           clearUsers: (state) => {
                   state.users = [];
           }
  },
});

export const { setAllUsers, updateUserInList, removeUserFromList, addUserToList, clearUsers } = adminSlice.actions;
export default adminSlice.reducer;
// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectCurrentToken = (state: RootState) => state.auth.token;