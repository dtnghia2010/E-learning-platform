import React, {useEffect, useState} from 'react';
import {FcBusinessman, FcDocument, FcEditImage, FcFullTrash, FcManager, FcReading} from 'react-icons/fc';
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import {deleteDocument, getDocumentByUser, getQuizzByUser, getUserInfo} from "../util/ApiFunction";
import {Alert, CircularProgress, MenuItem} from "@mui/material";
import useDocumentContext from "../hook/useDocumentContext";
import { useNavigate } from 'react-router-dom'; // import useHistory


function ConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto justify-center items-center">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 rounded-2xl">
                <span className=" sm:inline-block sm:align-middle sm:h-screen" >&#8203;</span>
                <div className="inline-block align-bottom bg-myBeige rounded-2xl text-center shadow transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                    <div className="bg-myBeige px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-2xl text-center">
                        <div className="justify-center">
                            <div className=" text-center sm:mt-0">
                                
                                <div className="mt-2">
                                    <p className="font-bold text-gray-900 text-xl">
                                        Do you really want to delete it? 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-5">
                        <button
                            type="button"
                            className="w-full mx-4 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-myYellow text-base font-medium text-gray-700 hover:bg-answerRed hover:text-myWhite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onConfirm}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="w-full mx-4 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-myBlue hover:text-myWhite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Profile = () => {
    const [open, setOpen] = React.useState(false);
    const {documents, dispatch} = useDocumentContext();

    const [quizzes, setQuizzes] = useState([]);

    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [user, setUser]=useState({
        username: "",
        user_id: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocument = async () => {
            setLoading(true);
            try {
                const resData = await getDocumentByUser();

                dispatch({type: "GET_DOCUMENTS",payload: resData});
                setLoading(false);
                setError(false)
            } catch (error) {
                setError(error);
                setLoading(false)
            }
        }

        const fetchQuizz = async () => {
            setLoading(true);
            try{
                const resData = await getQuizzByUser();
                setQuizzes(resData);
                setLoading(false);
                setError(false);

            }catch (e){
                setError(e);
                setLoading(false);
            }
        }

        const fetchUserInfo = async () => {
            try{
                const data = await getUserInfo();
                if(data!== null) {
                    setUser({
                        username: data.username,
                        user_id: data.user_id,
                    })
                }
            }catch (e){
                setError(e);
            }
        }
        fetchDocument();
        fetchQuizz();
        fetchUserInfo();
    },[])

    const handleDelete = async (documentId) => {
        try{
             await deleteDocument(documentId);
            dispatch({type: "DELETE_DOCUMENT",payload: documentId});
            setError(false);
        }catch (e){
            setError(e)
        }
    }

    const handleUpdate = async (documentId) => {
        //switch to update document page
        navigate(`/update_document/${documentId}`);
    }

    const handleUpdateQuizz = async (quizzId) => {
        //switch to update document page
        navigate(`/update_quizz/${quizzId}`);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className=" flex justify-around w-screen bg-blue-light  items-center p-8">
                <div className="flex items-center space-x-4 bg-white p-4 rounded-3xl shadow-lg">
                <img src="/images/PNG.png" alt="Profile" className='avatar' style={{ width: '80px', height: '80px', marginBottom: '10px', borderRadius:'50%'}} />
                    <span className="text-xl font-bold">{user.username}</span>
                </div>
                <div className="flex flex-col items-center ml-8 p-5 rounded-lg bg-myBeige shadow-lg border border-secondary-400">
                    <div className="flex items-center ">
                        <IoDocumentTextOutline className="text-2xl"/>
                        <span className="ml-2 text-xl font-normal justify-center text-center">Your Documents & Quizzes</span>
                    </div>
                    <hr className="w-64 h-0.5 my-2 border-1 rounded md:my-4 dark:bg-gray-700"/>
                    <span className=" text-lg">{documents.length + quizzes.length} Uploads</span>
                </div>
            </div>

            <div className="  flex-col items-center justify-center w-full bg-myWhite p-6">
                <div className="mb-4 flex-col-reverse justify-center items-center px-40 text-xl ">
                    <div className="space-y-1 ">
                        <h2 className="text-2xl font-bold mb-1">Lectures of {user.username}</h2>
                        <div className="flex justify-between">
                            <h4 className="mb-1 text-left font-medium text-xl">Name</h4>
                            <h4 className="mb-1 text-right font-medium text-xl">Edits</h4>
                        </div>
                        {error && (
                            <Alert severity="error">{error.message}</Alert>
                        )}
                        {loading ? (
                            <div className="flex justify-center items-center "><CircularProgress /></div>
                        ): (documents.map((document) => (
                        <div key={document.document_id} className="flex justify-between items-center">
                            <a href={`/lecture/${document.document_id}`} className="text-gray-700">
                                <span><i class="fa-regular fa-file-lines mr-3"></i></span>
                                <span>{document.document_name}</span>
                            </a>
                            <div className="flex items-center space-x-4">
                                <FiEdit onClick={() =>handleUpdate(document.document_id)} className="cursor-pointer"/>
                                <FaTrash
                                    onClick={handleClickOpen}
                                    className="cursor-pointer"
                                />

                                <ConfirmModal
                                    isOpen={open}
                                    onClose={handleClose}
                                    onConfirm={() => { handleDelete(document.document_id); handleClose(); }}
                                />
                            </div>
                        </div>
                        ))
                        )}
                    </div>
                    <div className="space-y-1 mt-2">
                        <h2 className="text-2xl font-bold mb-1">Quizzes of {user.username}</h2>
                        <div className="flex justify-between">
                            <h4 className="mb-1 text-left font-medium text-xl">Name</h4>
                            <h4 className="mb-1 text-right font-medium text-xl">Edits</h4>
                        </div>
                        {error && (
                            <Alert severity="error">{error.message}</Alert>
                        )}
                        {loading ? (
                                <div className="flex justify-center items-center"></div>
                            ):
                            (quizzes.map((quiz) => (
                            <div key={quiz.quizz_id} className="flex justify-between items-center">
                                <a href={`/quizz/${quiz.quizz_id}`} className="text-gray-700 pt-4">
                                    <span><i class="fa-regular fa-file-lines mr-3"></i></span>
                                    <span>{quiz.quizz_name}</span>
                                    </a>
                                <div className="flex items-center space-x-4">
                                    <FiEdit className="cursor-pointer" onClick={() => handleUpdateQuizz(quiz.quizz_id)}/>
                                    <FaTrash className="cursor-pointer"/>
                                </div>
                            </div>
                            ))
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
    ;
};

export default Profile;