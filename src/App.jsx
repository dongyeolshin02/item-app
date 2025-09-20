import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './pages/login/LoginForm';
import MainPage from './pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router';


// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
    },
  },
});


function App() {

  return (
    <QueryClientProvider client={queryClient}>
     <BrowserRouter>
      <Routes>
      <Route path='/' element={<MainPage />} />
       <Route path='/login' element={<LoginForm />} />
     </Routes>
     </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
