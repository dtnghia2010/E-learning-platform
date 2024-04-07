import React, {useState} from 'react';
import {useEffect} from "react";
import {FcBookmark, FcCheckmark, FcOk} from 'react-icons/fc';
import { IoBookOutline } from "react-icons/io5";
import { LuFileEdit } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa";
import Navbar from "../Navbar";
import {getDocumentDetails} from "../../util/ApiFunction";

const DocumentPage = () => {
    const [document, setDocument]= useState({})
    const [chapter, setChapter]= useState([])
    const  handleGetData= async ()=>{
        const  res= await getDocumentDetails(2);
        setDocument(res.documents)
        setChapter(res.documents.chapters_info)
        console.log(res.documents)
        console.log(document)
        console.log(document.author_name)
    }

    useEffect(() => {
        handleGetData()
    }, []);
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
        <Navbar />
        <div className="flex w-screen bg-blue-light  ">
                <div className=" ml-4 w-1/2 bg-blue-100 space-y-2 p-8">
                    <h1 className="text-4xl font-bold text-blue-900">{document.document_name}</h1>
                    <p className="text-blue-800">{document.author_name}</p>
                    <button className="bg-yellow-light   hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded inline-flex items-center">
                        <FcBookmark className="mr-2"/> Bookmark
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
            <div className="bg-gray-tone">
                <section className="flex flex-col justify-center items-center w-screen ">
                    <div className="w-1/2 bg-blue-100 p-8">
                        <h1 className="text-4xl font-bold text-blue-900">Course Content</h1>
                    </div>
                    <div className="w-1/2 p-8">
                        <ul className="list-none space-y-4">
                            {chapter.map((element, index)=>(
                            <li>
                                <div className=" flex items-center bg-yellow-light border border-blue-900 rounded p-4">
                                    <FaAngleDown className="mr-2" /> <h2 className="text-3xl font-bold text-blue-900">Lecture {index+1}</h2>
                                </div>
                                <div className="border   border-blue-900 rounded p-4">
                                    <div className="flex items-center">
                                        <IoBookOutline className="mr-2 text-2xl"/><a href="" className="text-blue-800 text-2xl" onClick={()=>{console.log("click")}}>{element.chapter_name}</a>
                                    </div>
                                    <div className="flex items-center">
                                        <LuFileEdit className="mr-2 text-2xl"/> <p className="text-blue-800 text-2xl">Test</p>
                                    </div>
                                </div>
                            </li>
                            ))}

                        </ul>
                    </div>
                </section>
            </div>
        </div>
        </div>
    );
};

export default DocumentPage;
