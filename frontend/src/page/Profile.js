import React from 'react';
import {FcBusinessman, FcDocument, FcEditImage, FcFullTrash, FcManager, FcReading} from 'react-icons/fc';
import { AiOutlineFileText } from 'react-icons/ai';
import Navbar from "../component/Navbar";
import {FaAngleDown} from "react-icons/fa";
import {IoBookOutline} from "react-icons/io5";
import {LuFileEdit} from "react-icons/lu";

const Profile = () => {
    return (
        <div>
            <div className="bg-blue-light p-2 flex justify-center">
                <div className="container mx-auto flex justify-center items-center font-semibold text-lg">
                    <div className="text-sm text-gray-600 text-center flex ">
                        Free Courses, Get it now! →
                    </div>

                </div>
            </div>
            <Navbar/>
            <div className=" flex justify-around w-screen bg-blue-light  items-center p-8">
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
                    <FcBusinessman className="text-4xl"/>
                    <span className="text-xl font-bold">taylor123</span>
                </div>
                <div className="flex flex-col items-center ml-8 p-4 rounded-lg bg-white shadow-lg">
                    <div className="flex items-center mb-2">
                        <FcDocument className="text-2xl"/>
                        <span className="ml-2 text-xl font-bold">Your Documents</span>
                    </div>
                    <hr className="w-full"/>
                    <span className="mt-2 text-lg">5 Uploads</span>
                </div>
            </div>
            <div className="  flex-col items-center justify-center w-screen bg-white p-6">
                <div className="mb-4 flex-col-reverse justify-center items-center ">
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold mb-1">Lectures of taylor123</h2>
                        <h4 className="  mb-1">Name</h4>
                        {["IELTS Writing Made Easy", "IELTS Speaking Made Easy", "IELTS Reading Made Easy"].map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <a href="" className="text-gray-700">{item}</a>
                                <div className="flex items-center space-x-1">
                                    <FcEditImage className="cursor-pointer"/>
                                    <FcFullTrash className="cursor-pointer"/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-1 mt-2">
                        <h2 className="text-xl font-bold mb-1">Quizzes of taylor123</h2>
                        <h4 className=" mb-1">Name</h4>
                        {["Chemistry Mock Test", "Mathematics Mock Test"].map((quiz, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <a href="" className="text-gray-700">{quiz}</a>
                                <div className="flex items-center space-x-1">
                                    <FcEditImage className="cursor-pointer"/>
                                    <FcFullTrash className="cursor-pointer"/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
    ;
};

export default Profile;