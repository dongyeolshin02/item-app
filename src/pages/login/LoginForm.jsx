import React, { useState } from 'react';
import'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useLogin} from "../../hooks/useLogin.js";

const schema = yup.object().shape({
    username: yup.string().required('아이디를 입력하십시오'),
    password: yup.string().required('비밀번호를 입력하십시오'),
});

function LoginForm() {

    const {loginMutation} = useLogin();

    const {register, handleSubmit, formState:{errors}}
                    = useForm({resolver : yupResolver(schema)});
                    
      const sumbmitEvt = (data) =>{
          loginMutation.mutate(data);
      }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='w-25 border p-4 rounded'>
                <h1 className='text-center mb-4'>Login</h1>
                <form onSubmit={handleSubmit(sumbmitEvt)}>
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>Username</label>
                        <input type=' text'  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                         id='username'
                         {...register('username')}
                         />
                   {errors.username && (
                                <div className="invalid-feedback">{errors.username.message}</div> )}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>password</label>
                        <input type='password'  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                         id='password'  {...register('password')}  />
                           {errors.password && (
                                <div className="invalid-feedback">{errors.password.message}</div> )}
                    </div>
                    <div className="text-center">
                        <button type='submit' className='btn btn-primary me-2'>Login</button>
                        <button type='button' className='btn btn-secondary'>join</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;