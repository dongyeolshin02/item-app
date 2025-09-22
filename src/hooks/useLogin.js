import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../service/AxiosApi';
import { useAuthStore } from '../store/Auth';

import React from 'react';
import {useNavigate} from "react-router";

export const useLogin = () => {

    const{setAuth} = useAuthStore();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn :  async (credentials) => {
            try {
                const response = await api.post('/api/login', credentials, {
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
            setAuth(data);
            navigate('/board');
        },
    })

    return { loginMutation };
}
