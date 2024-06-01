import React, {useEffect, useState} from 'react';
import {FcBusinessman, FcDocument, FcEditImage, FcFullTrash, FcManager, FcReading} from 'react-icons/fc';
import {deleteDocument, getDocumentByUser, getQuizzByUser, getUserInfo} from "../util/ApiFunction";
import {Alert, CircularProgress, MenuItem} from "@mui/material";
import useDocumentContext from "../hook/useDocumentContext";
import { useNavigate } from 'react-router-dom'; // import useHistory


const Profile = () => {
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

    return (
        <div>
            <div className=" flex justify-around w-screen bg-blue-light  items-center p-8">
                <div className="flex items-center space-x-4 bg-white p-4 rounded-3xl shadow-lg">
                <img src="images/PNG.png" alt="Profile" className='avatar' style={{ width: '80px', height: '80px', marginBottom: '10px', borderRadius:'50%'}} />
                    <span className="text-xl font-bold">{user.username}</span>
                </div>
                <div className="flex flex-col items-center ml-8 p-4 rounded-lg bg-white shadow-lg">
                    <div className="flex items-center mb-2">
                        <FcDocument className="text-2xl"/>
                        <span className="ml-2 text-xl font-bold">Your Documents</span>
                    </div>
                    <hr className="w-full"/>
                    <span className="mt-2 text-lg">{documents.length + quizzes.length} Uploads</span>
                </div>
            </div>

            <div className="  flex-col items-center justify-center w-screen bg-myWhite p-6">
                <div className="mb-4 flex-col-reverse justify-center items-center px-40 text-xl ">
                    <div className="space-y-1 ">
                        <h2 className="text-2xl font-bold mb-1">Lectures of {user.username}</h2>
                        {/* <h4 className="  mb-1">Name</h4> */}
                        {error && (
                            <Alert severity="error">{error.message}</Alert>
                        )}
                        {loading ? (
                            <div className="flex justify-center items-center "><CircularProgress /></div>
                        ): (documents.map((document) => (
                        <div key={document.document_id} className="flex justify-between items-center">
                            <a href={`/lecture/${document.document_id}`} className="text-gray-700 pt-4">
                            <span><i class="fa-regular fa-file-lines mr-3"></i></span>
                            <span>{document.document_name}</span>
                            </a>
                            <div className="flex items-center space-x-4">
                                <i class="fa-regular fa-pen-to-square cursor-pointer" onClick={() =>handleUpdate(document.document_id)}></i>
                                <i class="fa-solid fa-trash cursor-pointer" onClick={() => handleDelete(document.document_id)}></i>
                            </div>
                        </div>
                        ))
                        )}
                    </div>
                    <div className="space-y-1 mt-2">
                        <h2 className="text-2xl font-bold mb-1">Quizzes of {user.username}</h2>
                        {/* <h4 className=" mb-1">Name</h4> */}
                        {error && (
                            <Alert severity="error">{error.message}</Alert>
                        )}
                        {loading ? (
                                <div className="flex justify-center items-center"><CircularProgress /></div>
                            ):
                            (quizzes.map((quiz) => (
                            <div key={quiz.quizz_id} className="flex justify-between items-center">
                                <a href={`/quizz/${quiz.quizz_id}`} className="text-gray-700 pt-4">
                                    <span><i class="fa-regular fa-file-lines mr-3"></i></span>
                                    <span>{quiz.quizz_name}</span>
                                    </a>
                                <div className="flex items-center space-x-4">
                                    <i class="fa-regular fa-pen-to-square cursor-pointer"></i>
                                    <i class="fa-solid fa-trash cursor-pointer" onClick={() => handleUpdateQuizz(quiz.quizz_id)}></i>
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