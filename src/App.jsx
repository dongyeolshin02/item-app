import { QueryClient } from '@tanstack/react-query';
import './App.css'


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
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
     </Routes>
     </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
