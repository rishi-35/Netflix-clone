import axios from "axios";
import {create} from 'zustand';
import toast from 'react-hot-toast';
import { User } from "lucide-react";

export const useAuthStore= create((set)=>({
    user:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLogingout:false,
    isLoging:false,
    signUp:async (credentials) => {
        set({isSigningUp:true});
        try {
            const response = await axios.post("/api/v1/auth/signup",credentials);
            set({user:response.data.user,isSigningUp:false})
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message || "SignUp failed");
            set({isSigningUp:false,user:null})
        }
    },
    login: async (credentials) => {
        set({isLoging:true});
        try {
            const response=await axios.post("/api/v1/auth/login",credentials);
            set({user:response.data.user,isLoging:false})
            toast.success("Login successfull");
        } catch (error) {
            toast.error(error.response.data.message || "Login failed");
            set({isLoging:false,user:null})
        }
    },
    logout: async () => {
        set({isLogingout:true})
        try {
             await axios.post('/api/v1/auth/logout')
            set({isLogingout:false,user:null})
            toast.success("Logout is Successfull");
        } catch (error) {
            set({isLogingout:false})
            toast.error(error.response.data.message || "logout is failed");
        }
    },
    authCheck: async () => {
        set({isCheckingAuth:true});
        try {
            const response=await axios.get('/api/v1/auth/authcheck');
            set({user:response.data.user,isCheckingAuth:false})
            // console.log("testing ",JSON.stringify(response.data.user));
        } catch (error) {
            console.log("error occured in store in authcheck function"+error.message);
            set({user:null,isCheckingAuth:false})
        }
    },
}))