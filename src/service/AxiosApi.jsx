import axios from "axios";
import { useAuthStore } from "../store/Auth";


const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// 인증 토큰 추가
 api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
          console.log(token)
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
 );


 // ====== 전역 리프레시 락 ======
let isRefreshing = false;
let refreshQueue = [];

 //응답 오류
 api.interceptors.response.use(
    (response) => response, // 정상 응답은 그대로 통과
    async (error) => {
      const originalRequest = error.config;
  
      // 401 Unauthorized 처리
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 무한루프 방지 플래그
  
        try {
          if (!isRefreshing) {
            // 첫 번째 401 진입 → refresh 진행
            isRefreshing = true;
            const newToken = await useAuthStore
              .getState()
              .refreshToken(); // Zustand store 메서드 
  
            // refreshQueue에 쌓인 대기 요청들 처리
            refreshQueue.forEach((cb) => cb(newToken));
            refreshQueue = [];
            isRefreshing = false;
  
            // 헤더 안전하게 교체
            if (originalRequest.headers?.set) {
              originalRequest.headers.set(
                "Authorization",
                `Bearer ${newToken}`
              );
            } else {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${newToken}`,
              };
            }
  
            return api(originalRequest); // 원래 요청 재전송
          } else {
            // 다른 요청들이 동시에 401 → 큐에 넣고 대기
            return new Promise((resolve) => {
              refreshQueue.push((token) => {
                if (originalRequest.headers?.set) {
                  originalRequest.headers.set(
                    "Authorization",
                    `Bearer ${token}`
                  );
                } else {
                  originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${token}`,
                  };
                }
                resolve(api(originalRequest));
              });
            });
          }
        } catch (refreshError) {
          // 토큰 재발급 실패 → 로그아웃 처리
          useAuthStore.getState().clearAuth();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error); // 다른 에러는 그대로 리턴
    }
  );

export default api;