// src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store'; // Adjust the path to your store file
import type {  UserT } from '@/core/modals/userT';
import conf from '@/common/config';
import { jwtDecode } from "jwt-decode";

interface AuthState {
  user: UserT | null;
  token: string | null;
  isAdmin?: boolean;
  loading?: boolean;
}

interface JwtPayload {
  roles: string[],
  sub: string,
  rememberMe: boolean,
  exp: number,
  iat: number       
}


// const localSavedUser = localStorage.getItem('kmirco_user') as string | null;;
const localSavedUser = localStorage.getItem(conf.userLocalStorageUser);
const localData : AuthState = localSavedUser ? JSON.parse(localSavedUser) : null;

const initialState: AuthState = {
  user:  localData &&localData.user,
  token: localData && localData.token, 
  isAdmin: localData && localData.isAdmin,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token} }: PayloadAction<{ user: UserT; token: string; }>) => {
      state.user = user;
      state.token = token;
      const userToken = jwtDecode<JwtPayload>(token);
        userToken?.roles.filter((role: string) => role === "ROLE_ADMIN" ? state.isAdmin = true : state.isAdmin = false);
//       state.isAdmin = false;
//       localStorage.setItem(conf.userLocalStorageToken, token);
      localStorage.setItem(conf.userLocalStorageUser, JSON.stringify({
                user: state.user,
                token: state.token,
                isAdmin: state.isAdmin
      }));

    },
        setAdminCredentials: (state, { payload: { user, token} }: PayloadAction<{ user: UserT; token: string; }>) => {
                state.user = user;
                state.token = token;
                state.isAdmin = true;
                //       localStorage.setItem(conf.userLocalStorageToken, token);
                localStorage.setItem(conf.userLocalStorageUser, JSON.stringify({
                                user: user,
                                token: token,
                                isAdmin: true
                        }));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
//       localStorage.removeItem(conf.userLocalStorageToken);
      localStorage.removeItem(conf.userLocalStorageUser);
    },
    updateUser: (state, { payload }: PayloadAction<UserT>) => {
      state.user = payload;
      localStorage.setItem(conf.userLocalStorageUser, JSON.stringify(payload));
    },
  },
});

export const { setCredentials, logout, updateUser,setAdminCredentials } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;