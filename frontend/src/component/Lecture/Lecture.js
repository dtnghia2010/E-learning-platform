import React, {useState} from 'react';
import {useEffect} from "react";
import {FcBookmark, FcOk} from 'react-icons/fc';
import { IoBookOutline } from "react-icons/io5";
import { LuFileEdit } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa";
import {getDocumentDetails} from "../../util/ApiFunction";
import {useParams} from "react-router-dom";
//css cho t
const CoursePage = () => {
    const id= useParams().id;
    const [chapter, setChapter]=useState({
        author_name: "",
        chapters_info: [],
        course_id: "",
        course_name: "",
        description: "",
        document_name: "",
    })
    const  handleGetData=async ()=> {
        try {
            const data = await getDocumentDetails(id)
            console.log(data)
            if(data!== null) {
                setChapter({
                    author_name: data.documents.author_name,
                    chapters_info: data.documents.chapters_info || [],
                    course_id: data.documents.course_id,
                    course_name: data.documents.course_name,
                    description: data.documents.description,
                    document_name: data.documents.document_name
                })
            }
        }catch (e) {
            console.log(e)
        }
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
        <div className="flex w-screen bg-blue-light justify-between ">
                <div className=" ml-4 w-1/2 bg-blue-100 space-y-2 p-8 rounded-md">
                    <h1 className="text-4xl font-bold text-blue-900">{chapter.document_name}</h1>
                    <p className="text-blue-800">Created by {chapter.author_name}</p>
                    <button className="bg-yellow-light   hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded inline-flex items-center">
                        <FcBookmark className="mr-2"/> Bookmark
                    </button>
                </div>
            <div className="w-1/3 h-100 bg-white p-8 mt-5 mr-6 flex rounded-md items-start">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">What you'll learn</h2>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center text-gray-600">
                            <FcOk className="mr-2"/> {chapter.description}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            <div className="bg-gray-tone mt-5">
                <section className="flex flex-col justify-center items-center w-screen rounded-md ">
                    <div className="w-1/2 bg-blue-100 p-8 rounded-md">
                        <h1 className="text-4xl font-bold text-blue-900">Course Content</h1>
                    </div>
                    <div className="w-1/2 p-8">
                        <div className="list-none space-y-4">
                            <li>
                                <div className=" flex items-center bg-yellow-light border border-blue-900 rounded p-4">
                                    <FaAngleDown className="mr-2" /> <h2 className="text-3xl font-bold text-blue-900">Chapter</h2>
                                </div>
                                {chapter.chapters_info.length > 0 && (
                                    <div className="border border-blue-900 rounded p-4">
                                        {chapter.chapters_info.map((chapter, index) => (
                                            <div key={index} className="mb-2">
                                                <div className="flex items-center">
                                                    <IoBookOutline className="mr-2 text-2xl" />
                                                    <a href={`/chapter/${chapter.chapter_id}`} className="text-blue-800 text-2xl">
                                                        {chapter.chapter_name}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </li>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </div>
    );
};

export default CoursePage;
