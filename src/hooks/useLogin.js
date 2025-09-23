import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../service/AxiosApi';
import { useAuthStore } from '../store/Auth';

import React from 'react';
import {useNavigate} from "react-router";

export const useLogin = () => {
    const{setAuth} = useAuthStore();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn :  async (credentials) => {
            try {
                const response = await api.post('/api/v1/login', credentials, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                return response.data;
            } catch (error) {
                throw error.response?.data || error;
            }
        },
        onSuccess : (data) =>{
            console.log(data);
            //캐시무효화 
            queryClient.invalidateQueries({ queryKey: ['users'] });
            //토클 저장
            setAuth(data.content);
            navigate('/board');
        },
    })

    return { loginMutation };
}
