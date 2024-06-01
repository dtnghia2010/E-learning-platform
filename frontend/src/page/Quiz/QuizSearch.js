import axios from "axios";
import {useState} from "react";
import { useNavigate} from "react-router-dom";
export const getHeaders = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    }

}

const QuizSearch = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleChangeCode = (e) => {
        setCode(e.target.value);
    }

    const handleJoin = async (event) => {
        event.preventDefault();
        if (code === "") {
            alert("Do not have code ?")
            return;
        }
        try {
            const response= await axios.get(`http://localhost:8000/quizz/code/${code}/`,{
                headers:getHeaders()
            })
            console.log(response);
            if (response.data) {
                navigate(`/quizz/${response.data.quizz_id}`);
            }
        } catch (e) {
            console.log(e);
            alert("Failed to join the quiz. Please check the code and try again.");
        }
    }

    return (
        <div className="flex justify-center align-center size-1/2 space-x-2.5 w-full h-full mt-24 ">
            <div className="bg-white rounded-2xl p-10 pl-20 pr-20 shadow-md">
                <input onChange={handleChangeCode} value={code} placeholder="Enter a join code" className="border-2 border-gray-500 w-50 rounded-md p-4 pr-40 mr-30"/>
                <button onClick={handleJoin} className="ml-12 bg-myYellow p-4 pr-8 pl-8 text-center text-xl rounded-lg font-vietnam-pro font-medium">Join</button>
            </div>
        </div>
    )
}

export default QuizSearch;