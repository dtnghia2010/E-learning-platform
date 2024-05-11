import React, {useEffect, useState} from 'react';
import {FcBusinessman, FcDocument, FcEditImage, FcFullTrash, FcManager, FcReading} from 'react-icons/fc';
import Navbar from "../component/Navbar";
import {deleteDocument, getDocumentByUser} from "../util/ApiFunction";
import Header from "../component/layout/Header";
import {Alert, CircularProgress, MenuItem} from "@mui/material";
import useDocumentContext from "../hook/useDocumentContext";

const Profile = () => {
    const {documents, dispatch} = useDocumentContext();

    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

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

        fetchDocument();
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
    }

    return (
        <div>
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
                        {error && (
                            <Alert severity="error">{error.message}</Alert>
                        )}
                        {loading ? (
                            <div className="flex justify-center items-center"><CircularProgress /></div>
                        ): (documents.map((document) => (
                        <div key={document.document_id} className="flex justify-between items-center">
                            <a href="" className="text-gray-700">{document.document_name}</a>
                            <div className="flex items-center space-x-1">
                                <FcEditImage onClick={() =>handleUpdate(document.document_id)} className="cursor-pointer"/>
                                <FcFullTrash onClick={() => handleDelete(document.document_id)} className="cursor-pointer"/>
                            </div>
                        </div>
                        ))
                        )}
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