import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const plainAxios = axios.create({
  timeout: 10000,
});

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      refreshTokenValue: null,
      user: null,

      isAuthenticated: () => !!get().token,
      setAuth: ({ token, refreshToken, user }) =>
        set({ token, refreshTokenValue: refreshToken, user: user ?? null }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ token: null, refreshTokenValue: null, user: null }),

      login: async ({ userId, password }) => {
        const resp = await plainAxios.post("api/v1/login", { userId, password });
        const { accessToken, refreshToken, user } = resp.data;
        set({
          token: accessToken,
          refreshTokenValue: refreshToken,
          user: user ?? null,
        });
        return true;
      },

      logout: async () => {
        try {
          await plainAxios.post("api/v1/logout");
        } catch(error) {
            console.error("로그아웃 실패", error);
        }
        set({ token: null, refreshTokenValue: null, user: null });
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

          set((state) => ({
            token: accessToken,
            refreshTokenValue: refreshToken ?? state.refreshTokenValue,
          }));
          return accessToken;
        } catch {
          return false;
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (s) => ({
        token: s.token,
        refreshTokenValue: s.refreshTokenValue,
        user: s.user,
      }),
    }
  )
);
