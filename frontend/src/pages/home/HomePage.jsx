
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/authUser';

export default function HomePage() {
  const {user}= useAuthStore();
  return (
    <div className='relative h-screen text-white bg-black'>
      {/* <h1>this is home page</h1> */}
   {user?<HomeScreen/> :<AuthScreen/>}
    </div>
  );
}
