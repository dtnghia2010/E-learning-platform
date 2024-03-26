import React, {useState} from 'react';
import Header from "../component/Header";
import axios from "axios";

const Login = () => {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi


    const handleInputEmail=  (e)=>{
        setEmail(e.target.value)
    }
    const handleInputPassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
            if(email.match(regex)===false) {
                alert("Please enter correct email form")
            }else {
                const  user= {
                    email: email,
                    password: password
                }
                const response=await axios.post("http://127.0.0.1:8000/login/",user)
                localStorage.setItem('access_token',response.data.access_token); // set user in local storage
                console.log(user)
            }
    }

    return (
        <div>
        <div className="flex items-center justify-center  w-full h-screen  bg-gray-100">
            <div className="bg-gray-tone  rounded-lg  px-4 py-10 max-w-sm mx-auto w-full h-screen ">
                <h1 className="text-5xl font-bold text-center mb-6">Login</h1>
                <p className="font-semibold text-center text-black mt-4 mb-10"> Welcome back, Please log in to your account</p>
                <form action="#">
                    <div className="mb-6">
                        <label htmlFor="email" className="text-sm text-gray-700 block mb-2"> Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleInputEmail}
                            className="w-full px-3 py-2 rounded-lg bg-gray-200 border focus:outline-none focus:ring-indigo-500 focus:ring-1"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="text-sm text-gray-700 block mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleInputPassword}
                            className="w-full px-3 py-2 rounded-lg bg-gray-200 border focus:outline-none focus:ring-indigo-500 focus:ring-1"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember-me"
                                className="w-4 h-4 text-indigo-600 border focus:ring-indigo-500 focus:ring-1"
                            />
                            <label htmlFor="remember-me" className="text-sm text-gray-700 ml-2">
                                Remember Me
                            </label>
                        </div>
                        <a href="#" className="text-sm text-indigo-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full px-3 py-2 rounded-lg bg-blue-light text-white font-bold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-500 mb-2">OR</p>
                        <button type="submit" className="w-full px-3 py-2 rounded-lg bg-blue-light text-white font-bold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                            Login with Google
                        </button>

                    </div>
                </form>
            </div>
        </div>
        </div>

    );
};

export default Login;