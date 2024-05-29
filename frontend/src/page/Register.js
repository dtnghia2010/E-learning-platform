import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import useAuthContext from "../hook/useAuthContext";


export default  function Register(){
    const [email, setEmail]= useState("");
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [mobilePhone, stepPhone]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi
    const navigator= useNavigate();

    const { dispatch } = useAuthContext();

    const  handleInputEmail= (e)=>{
        setEmail(e.target.value);
    }
    const handleInputUsername=(e)=>{

        setUsername(e.target.value);
    }
    const handleInputPassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleInputConfirm=(e)=>{
        setConfirmPassword(e.target.value)

    }


    const handleSubmit= async (e)=>{
        e.preventDefault()
        if(email.match(regex)===false){
            alert("Please enter correct email form");
        }else if(password.length<5){
            alert("Password is too short")
        } else {
            if (password === confirmPassword) {
                const user = {
                    username: username,
                    email: email,
                    password: password
                }
                const response= await axios.post("http://127.0.0.1:8000/register/",user)
                console.log(response.data)
                // submit api hear with axios
                navigator("/login")

            } else {
                alert("Pass word do not match")
            }
        }
    }




    return (

        //remove Header custom
        <div>
       <div className="flex items-center justify-center  w-full h-screen  bg-gray-100">
        <div className="bg-gray-tone  rounded-lg  px-4 py-10 max-w-sm mx-auto w-full h-screen ">
            <h1 className="text-5xl font-bold text-center mb-6">Sign up</h1>
            <p className="font-semibold text-center text-black mt-4 mb-10">Create an account to unlock exclusive features</p>
            <form >
                <div className="mb-6">
                    <label htmlFor="email" className="text-sm text-gray-700 block mb-2"> Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        className="w-full px-3 py-2 rounded-lg bg-gray-200 border focus:outline-none focus:ring-indigo-500 focus:ring-1"
                        onChange={handleInputEmail}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="text-sm text-gray-700 block mb-2"> User Name</label>
                    <input
                        type="email"
                        id="email"
                        value={username}
                        onChange={handleInputUsername}
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
                <div className="mb-6">
                    <label htmlFor="password" className="text-sm text-gray-700 block mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={confirmPassword}
                        onChange={handleInputConfirm}
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
                    className="w-full px-3 py-2 rounded-lg bg-blue-light text-white font-bold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 hover:scale-[1.01] ease-in-out hover:opacity-1"
                >
                    Sign up
                </button>
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500 mb-2">OR</p>
                    <button type="submit"
                            className="w-full px-3 py-2 rounded-lg bg-blue-light text-white font-bold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 hover:scale-[1.01] ease-in-out hover:opacity-1 ">
                        Login with Google
                    </button>

                </div>
            </form>
        </div>
       </div>
        </div>



    )
}