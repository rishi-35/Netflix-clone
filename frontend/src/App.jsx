
import './App.css'
import {Navigate, Route,Routes} from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'
import { useAuthStore } from './store/authUser'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import WatchPage from './pages/WatchPage'
import SearchPage from './pages/SearchPage'
import SearchHistoryPage from './pages/SearchHistoryPage'
import NotFoundPage from './pages/NotFoundPage'
function App() {
  const {user,isCheckingAuth,authCheck}= useAuthStore();
  useEffect(()=>{
    authCheck();
  },[authCheck])
  if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}
  return (
    <>
    <Routes>

    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/login' element={ !user?<LoginPage/>:<Navigate to={'/'}/> }></Route>
    <Route path='/signup' element={ !user?<SignUpPage/>:<Navigate to={'/'}/> }></Route>
    <Route path="/watch/:id" element={user?<WatchPage/>:<Navigate to={'/login'}/> }></Route>
    <Route path="/search/" element={user?<SearchPage/>:<Navigate to={'/login'}/> }></Route>
    <Route path="/history/" element={user?<SearchHistoryPage/>:<Navigate to={'/login'}/> }></Route>
    <Route path="/*" element={<NotFoundPage/> }></Route>
    </Routes>
    <Footer/>
    <Toaster/> 
    </>
  )
}

export default App
