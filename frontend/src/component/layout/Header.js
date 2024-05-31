import useAuthContext from "../../hook/useAuthContext";
import CategoryContent from "../common/CategoryContent";
import { useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";
import FlyoutLink from "../common/FlyoutLink";
import Profile from "../../page/Profile";
import ProfileFlyout from "../common/ProfileFlyout";
import React from 'react';


export default function Header(){
    const {user} = useAuthContext();
    const location = useLocation();
    
    return (

        <div>
            <div className="bg-blue-light p-2 flex justify-center">
                <div className="container mx-auto flex justify-center items-center font-semibold text-lg">
                    <div className="text-sm text-gray-600 text-center flex ">
                        Free Courses, Get it now! →
                    </div>

                </div>
            </div>
            <nav className={`${location.pathname === '/addDocument' ? 'bg-myLightYellow' : ''}`} aria-label="Global">
                <div className="mx-auto max-w-7xl flex  items-center justify-between p-4 lg:px-8">
                <div className="flex justify-between items-center  ">
                    <FlyoutLink children="Home" href="/"/>

                    <FlyoutLink children="Course" FlyoutContent={<CategoryContent/>}/>

                    <FlyoutLink children="Quizz" href="/search_quiz"/>
                </div>
                <div className="flex justify-end">
                    {user ? (
                        <div className="flex justify-center items-center">
                        <div>
                        <div className="relative">
                            <input 
                                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ml-2"
                                placeholder="Search..." 
                                type="text" 
                                name="search"
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-2 top-1/2 transform -translate-y-1/2 ml-3 text-slate-400"></i>
                        </div>
                    </div>
                        <div className="">
                        <FlyoutLink 
                        children={<img src="images/avatar.JPG" alt="Profile" style={{ width: '76px', height: '76px', marginBottom: '10px',  border: '4px solid', borderColor: '#6DB9D2', borderRadius: '50%' }} />} 
                        FlyoutContent={<ProfileFlyout/>}
                        />
                        </div>
                    </div>


                        ) :
                    (<div>
                        <Link to={"/register"}>
                            <button className="text-black px-4 py-2 rounded font-medium">Sign Up</button>
                        </Link>
                        <Link to={"/login"}>
                            <button
                                className="bg-blue-light text-blue-500 border border-blue-500 px-4 py-2 rounded font-medium">Login
                            </button>
                        </Link>
                    </div> )}
                </div>
                </div>
            </nav>
        </div>

    )
        ;
}