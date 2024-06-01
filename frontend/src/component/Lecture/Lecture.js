import React, {useState} from 'react';
import {useEffect} from "react";
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";
import {getDocumentDetails} from "../../util/ApiFunction";
import {useParams} from "react-router-dom";
import {Alert, CircularProgress, MenuItem} from "@mui/material";

//css cho t
const CoursePage = () => {
    const id= useParams().id;
    const [clicked, setClicked] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state
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
                    document_name: data.documents.document_name,
                })
                setLoading(false);
                setError(false)
            }
        }catch (e) {
            setLoading(false);
            setError(false)
        }
    }

    useEffect(() => {
        handleGetData()
    }, []);
    return (

        <div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>
            ) : (
        <div className=" mx-auto w-screen h-screen">
        <div className="flex w-screen bg-myBlue justify-between relative ">
                <div className=" document-intro-box ">
                    <h3 className="text-2xl font-bold text-blue-900 mb-2" >Course > {chapter.course_name}</h3>
                    <h1 className="text-4xl font-bold text-blue-900 mb-2">{chapter.document_name}</h1>
                    <p className="text-xl text-blue-900 mb-2 mt-3">Created by {chapter.author_name}</p>
                    <button onClick={() => setClicked(!clicked)} className="mt-3 text-xl bg-myYellow hover:bg-myLightYellow text-black text-blue-900 py-2 px-4 rounded-2xl inline-flex items-center">
                        <span className="mr-4 ">Bookmark</span>
                        <span>
                            {clicked ? (
                                <i class="fa-solid fa-bookmark"></i>
                            ) : (
                                <i className="fa-regular fa-bookmark"></i>
                            )
                            }
                        </span>
                    </button>
                </div>
            <div className=" h-100 bg-myGray document-description-box flex items-start absolute -bottom-20 right-5">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">What you'll learn</h2>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center text-gray-600">
                            
                            <p>
                            {chapter.description.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                <span>
                                    <i class="fa-solid fa-check mr-2"> </i>
                                </span>
                                <span>{line}</span>
                                <br />
                                </React.Fragment>
                            ))}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            <div className="bg-myWhite mt-5">
                <section className="flex flex-col w-screen rounded-md document-content-box ">
                    <div className="mt-20 mb-5 ">
                        <h1 className="text-4xl font-bold text-blue-900  ">Document Content</h1>
                    </div>
                    <div >
                        <div className="list-none ">
                            {chapter.chapters_info.length > 0 && (
                                <li>
                                        {chapter.chapters_info.map((chapter, index) => (
                                            <div key={index} className='document-content-box1' >
                                                <div className=" flex items-center bg-yellow-light border border-blue-900 p-4">
                                                    <FaAngleDown className="mr-2" /> <h2 className="text-3xl font-bold text-blue-900">Lecture {index+1} </h2>
                                                </div>
                                                <div className="border border-blue-900 py-4 px-10 ">
                                                    <div className='flex items-center'>
                                                    <i class="fa-solid fa-book-open text-2xl mr-4"></i>
                                                    <Link to={`/chapter/${chapter.chapter_id}`} className="text-2xl ">
                                                        {chapter.chapter_name}
                                                    </Link>
                                                    </div>
                                                    <div className='flex items-center mt-5'>
                                                    <i class="fa-solid fa-pencil text-2xl mr-4"></i>
                                                    <Link to={`/quizz/${chapter.quizz_id}`} className="text-2xl">
                                                        Test
                                                    </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    {/* </div> */}
                                 </li>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>)}
        </div>
    );
};

export default CoursePage;
