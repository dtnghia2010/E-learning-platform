import {useState} from "react";
import { useNavigate} from "react-router-dom";


const QuizSearch= ()=>{
    const [code, setCode]= useState("");
    const navigator= useNavigate();
    const handleChangeCode=(e)=>{
        setCode(e.target.value);
    }
    const handleJoin=()=> {
        if (code === "") {
            alert("Do not have code ?")
            return;
        }
        navigator("/quizz/:id", {state: code});
    }

    return(
        <div className=" flex justify-center align-center size-1/2 space-x-2.5 w-full h-full mt-20 ">
            <div className="bg-white rounded-2xl p-10 ">


            <input onChange={handleChangeCode} value={code} placeholder="Enter Quiz Code" className="border-2 border-gray-900 w-50 rounded-md p-4"/>
            <button onClick={handleJoin} className=" ml-12 bg-yellow-light p-4 rounded-lg ">Join</button>
            </div>
        </div>
    )
}

export default QuizSearch;

