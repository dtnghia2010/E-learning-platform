import React, {useState, useEffect} from 'react';
import { Button } from "@material-tailwind/react";
import { FaCheck, FaSave, FaPencilAlt } from 'react-icons/fa';
import { IoDocumentOutline } from "react-icons/io5";

 const CreateLecture = ()=> {
    const [title, setTitle] =useState('');
    const [content, setContent] =useState('');
    const[quizId, setQuizId]= useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
     const handleQuizIdChange = (event) => {
         setQuizId(event.target.value)
     }
     const handleContentChange = (event) => {
         setContent(event.target.value)
     }

     const handleSubmit = (event) => {
        event.preventDefault()
         // submit to form and refresh page
     }
     const handleSave=(e)=>{
        e.preventDefault()
         // submit and save and store in database
     }




    return(

        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-end">
                <button
                    className="flex items-center bg-blue-light hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2 mr-2">
                    <FaCheck className="mr-2 text-xl"
                    onClick={handleSubmit}
                    />
                    Finish
                </button>
                <button
                    onClick={handleSave}
                    className="flex items-center bg-yellow-tone hover:bg-gray-200 text-gray font-bold py-2 px-4 rounded-full mb-2">
                    <FaPencilAlt className="mr-2"/>
                    Save
                </button>
            </div>


            <div className="flex items-center justify-center ">

                <form className="w-1/2 border rounded-md px-4 py-2 mt-10">
                    <div className="flex items-center border-b pb-4 mb-4"> {/* Wrapper with border */}
                        <IoDocumentOutline className="w-8 h-8 mb-2"/> <h3 className="text-lg font-bold">Lecture</h3>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-0.5">
                            <label htmlFor="title" className="mr-1 w-1/3">Title:</label>
                            <input
                            onChange={handleTitleChange}
                                type="text" name="title" id="title"
                                   className="border rounded-md px-1 py-0.5 text-sm w-2/3"
                                   placeholder="Enter your title"/>
                        </div>

                        <div className="flex items-center space-x-0.5">
                            <label htmlFor="quizID" className="mr-1 w-1/3">Quiz ID:</label>
                            <input
                                onChange={handleQuizIdChange}
                                type="text" name="quizID" id="quizID"
                                   className="border rounded-md px-1 py-0.5 text-sm w-2/3"
                                   placeholder="Enter your Quiz ID"/>
                        </div>

                        <div className="flex items-start space-x-2">
                            <label htmlFor="content" className="w-1/3">Content:</label>
                            <textarea
                                onChange={handleContentChange}
                                name="content" id="content" cols="30" rows="21"
                                      className="border rounded-md px-2 py-1 text-sm w-2/3"
                                      placeholder="Type your content"></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
 }

export default CreateLecture;