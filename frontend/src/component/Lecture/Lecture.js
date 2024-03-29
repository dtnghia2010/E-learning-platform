import React from 'react';
import {FcBookmark, FcCheckmark, FcOk} from 'react-icons/fc';

const CoursePage = () => {
    return (
        <div>
        <div className="bg-blue-light p-2 flex justify-center">
            <div className="container mx-auto flex justify-center items-center font-semibold text-lg">
                <div className="text-sm text-gray-600 text-center flex ">
                    Free Courses, Get it now! →
                </div>

            </div>
        </div>
        <div className=" mx-auto w-screen h-screen">
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
        <div className="flex w-screen bg-blue-light  ">
                <div className=" ml-4 w-1/2 bg-blue-100 p-8">
                    <h1 className="text-4xl font-bold text-blue-900">Digital Marketing Done Right!</h1>
                    <p className="text-blue-800">Created by KC Tan</p>
                    <button className="bg-yellow-300  hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded inline-flex items-center">
                        Bookmark
                    </button>
                </div>
            <div className="w-1/3 h-100 bg-white p-8 mt-5 mr-3">
                <h2 className="text-3xl font-bold text-gray-800">What you'll learn</h2>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center text-gray-600">
                            <FcOk className="mr-2"/> Gain the skills to generate more online traffic for your business.
                        </li>
                        <li className="flex items-center text-gray-600">
                            <FcOk className="mr-2"/> Maximize your marketing resources and gain more leverage in your career.
                        </li>
                        <li className="flex items-center text-gray-600">
                            <FcOk className="mr-2"/> Gain the skill to nurture your leads and convert them into paying
                            customers!
                        </li>
                    </ul>
                </div>
        </div>
            <div>
                <section className="flex flex-col justify-center items-center w-screen ">
                    <div className="w-1/2 bg-blue-100 p-8">
                        <h1 className="text-4xl font-bold text-blue-900">Course Content</h1>
                    </div>
                    <div className="w-1/2 p-8">
                        <ul className="list-none space-y-4">
                            <li>
                                <div className="border border-blue-900 rounded p-4">
                                    <div className="bg-yellow-300">
                                <h2 className="text-2xl font-bold text-blue-900">Lecture 1</h2>
                                    </div>
                                <p className="text-blue-800">First Thing First</p>
                                <p className="text-blue-800">Test</p>
                                </div>
                            </li>
                            <li>
                                <div className="border border-blue-900 rounded p-4">
                                <h2 className="text-2xl font-bold text-blue-900">Lecture 2</h2>
                                <p className="text-blue-800">Search Engine Marketing</p>
                                <p className="text-blue-800">Test</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
        </div>
        </div>
        </div>
    );
};

export default CoursePage;
