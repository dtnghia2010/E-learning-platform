
import Button from "@mui/material/Button";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getChapter} from "../../util/ApiFunction";
import {useNavigate} from "react-router-dom";

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
    const navigator= useNavigate();
    useEffect(()=>{
        handleGetChapter()
    },[])
    return (
        <div>
            <header className="flex-row justify-center items-center">
                <button className="rounded-lg bg-myBlue p-3 absolute left-56 back-to-content hover:bg-myGray  "
                        onClick={()=>{navigator(`/lecture/${chapter.document_id}`)}}>  
                <span><i class="fa-solid fa-arrow-left mr-2"></i></span> 
                <span>Back to Content</span>  </button>
                <button className="rounded-lg bg-myBlue p-3 absolute right-56 next-lecture hover:bg-myGray  ">  
                <span>Next Lecture</span>
                <span><i class="fa-solid fa-arrow-right ml-2"></i></span>  </button>
                <div className="text-2xl font-bold">
                   <h1 className="text-center mb-8 mt-5">{chapter.chapter_name}</h1> 
                </div>

            </header>
            <CustomDivider/>
            <div className="chapter-content px-20">
            {chapter.content.split('\n').map((line, index) => (
                <p key={index} className="px-32">{line}</p>
            ))}
            </div>
        </div>
    );
};

export default Chapter;
