import api from './AxiosApi';

export const boardAPI = {
    getBoardList: async ({ page, size }) => {
        const response = await api.get(`/api/v1/board?page=${page}&size=${size}`);
        return response.data;
    }
}
