import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

const plainAxios = axios.create({
  timeout: 10000,
});


export const useAuthStore = create(
  persist(
    immer((set, get) => ({
      token: null,
      refreshTokenValue: null,
      userId: null,
      userName: null,

      isAuthenticated: () => !!get().token,

      setAuth: ({ token, refreshToken, userId, userName }) =>
        set((state) => {
          
            console.log(token)
          state.token = token;
          state.refreshTokenValue = refreshToken;
          state.userId = userId ?? null;
          state.userName = userName ?? null;
        }),

      setToken: (token) =>
        set((state) => {
          state.token = token;
        }),

      clearAuth: () =>
        set((state) => {
          state.token = null;
          state.refreshTokenValue = null;
          state.userId = null;
          state.userName = null;
        }),

        isTokenExpired: () => {
            const token = get().token;
            if (!token) return true;

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.exp * 1000 < Date.now();
            } catch {
                return true;
            }
        },

        // 자동 로그아웃 기능
        logout: () => {
            set((state) => {
                state.token = null;
                state.refreshTokenValue = null;
                state.userId = null;
                state.userName = null;
            });
            // API 호출로 서버에서도 로그아웃 처리
        },
    })),
    {
      name: "auth-store",
      partialize: (state) => ({
        token: state.token,
        refreshTokenValue: state.refreshTokenValue,
        userId: state.userId,
        userName: state.userName,
      }),
    }
  )
);