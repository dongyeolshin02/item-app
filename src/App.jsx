import { useState } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from "react-router/dom";
import Layout from "./pages/layout/Layout.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LoginForm from "./pages/login/LoginForm.jsx";
import BoardList from "./pages/board/BoardList.jsx";
import BoardDetail from './pages/board/BoardDetail.jsx';


// React Query 클라이언트 생성
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 5 * 60 * 1000,   // 5분간 데이터를 fresh로 간주
            cacheTime: 10 * 60 * 1000,  // 10분간 캐시 유지 (기본값: 5분)
            refetchOnWindowFocus: false, // 윈도우 포커스시 재요청 비활성화
        },
    },
});


const router = createBrowserRouter([
    {
        path:'/',
        Component : Layout,
        children:[
            {
                path: 'board',
                children:[
                    {index: true , Component : BoardList},
                    {path: ':brdId' , Component : BoardDetail },
                ]
            },
        ]
    },
    {
        path : '/login',
        Component : LoginForm
    }
]);


function App() {
    return(
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        </QueryClientProvider>
    )
}

export default App
