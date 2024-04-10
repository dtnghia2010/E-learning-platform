import React from "react";


export  default function Navbar(){
    return(
        <>
            <nav className=" ml-6 flex justify-between items-center py-4">
                <div className="flex space-x-4">
                    <button
                        className=" hover:bg-blue-light text-blue-500 border border-blue-500 px-4 py-2 rounded font-medium">Home
                    </button>
                    <button
                        className=" hover:bg-blue-light text-blue-500 border border-blue-500 px-4 py-2 rounded font-medium">Courses
                    </button>
                    <button
                        className=" hover:bg-blue-light text-blue-500 border border-blue-500 px-4 py-2 rounded font-medium">Quizzes
                    </button>
                </div>
                <div className="flex items-center space-x-2 w-full max-w-xl">
                    <input type="search" placeholder="Search..." className=" w-full px-2 py-1 border rounded"/>
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
            </nav>
        </>
    )
}