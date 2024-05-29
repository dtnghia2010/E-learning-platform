
import Button from "@mui/material/Button";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getChapter} from "../../util/ApiFunction";

const CustomDivider = () => {
    return (
        <hr style={{
            border: "none",
            height: "1px",
            background: "black",
            backgroundImage: "linear-gradient(to right, black, black 50%, white 50%, white)",
            backgroundSize: "4px 100%"
        }}/>
    );
};

const Chapter = () => {
    const [chapter, setChapter]= useState({
        chapter_id:"",
        chapter_name:"",
        content:"",
        code:"",
        quizz_id:"",
        document_id:""
    })
    const id= useParams().id;

    const handleGetChapter=async ()=>{
        try{
            const data= await getChapter(id);
            console.log(data)
            setChapter(data)
        }catch (e) {
            console.log(e)
            throw  e
        }
    }

    useEffect(()=>{
        handleGetChapter()
    },[])
    return (
        <div>
            <header className="flex-row justify-center items-center">
                <div className="text-2xl font-bold">
                    Lecture {chapter.chapter_id}: {chapter.chapter_name}
                </div>
            </header>
            <CustomDivider/>
            <div className="chapter-content">
                {chapter.content}
            </div>
        </div>

    );
};

export default Chapter;
