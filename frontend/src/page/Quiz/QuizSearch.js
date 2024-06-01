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
        navigator(`/quizz/${code}`);
    }

    return(
        <div className=" flex justify-center align-center size-1/2 space-x-2.5 w-full h-full mt-24 ">
            <div className="bg-white rounded-2xl p-10 pl-20 pr-20 shadow-md">


            <input onChange={handleChangeCode} value={code} placeholder="Enter a join code" className="border-2 border-gray-500 w-50 rounded-md p-4 pr-40 mr-30"/>
            <button onClick={handleJoin} className=" ml-12 bg-myYellow p-4 pr-8 pl-8 text-center text-xl rounded-lg font-vietnam-pro font-medium">Join</button>
            </div>
        </div>
    )
}

export default QuizSearch;

