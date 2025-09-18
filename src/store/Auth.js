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

      login: async ({ userId, password }) => {
        const resp = await plainAxios.post("api/v1/login", { userId, password });
        const { accessToken, refreshToken, user } = resp.data;
        
        set((state) => {
          state.token = accessToken;
          state.refreshTokenValue = refreshToken;
          state.userId = user?.userId ?? userId;
          state.userName = user?.userName ?? null;
        });
        
        return true;
      },

      logout: async () => {
        try {
          await plainAxios.post("api/v1/logout");
        } catch (error) {
          console.error("로그아웃 실패", error);
        }
        
        set((state) => {
          state.token = null;
          state.refreshTokenValue = null;
          state.userId = null;
          state.userName = null;
        });
      },

      refreshToken: async () => {
        const { refreshTokenValue } = get();
        if (!refreshTokenValue) return false;

        try {
          const resp = await plainAxios.post("api/v1/refresh", {
            refreshToken: refreshTokenValue,
          });
          const { accessToken, refreshToken } = resp.data || {};
          if (!accessToken) return false;

          set((state) => {
            state.token = accessToken;
            if (refreshToken) {
              state.refreshTokenValue = refreshToken;
            }
          });
          
          return accessToken;
        } catch {
          return false;
        }
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