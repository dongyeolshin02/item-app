import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from "./pages/layout/Layout.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LoginForm from "./pages/login/LoginForm.jsx";
import BoardList from "./pages/board/BoardList.jsx";


// React Query 클라이언트 생성
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5분
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
