import useQuizzContext from "../../hook/useQuizzContext";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAllResult, getQuizzById} from "../../util/ApiFunction";
import Button from "@mui/material/Button";


const FinalResult=()=>{
    const location = useLocation(); // Get the location object
    const navigator= useNavigate()
    const id= useParams().id;
    const quizResults = location.state?.quizResults; // Access the quizResults data
    const [rightAnswer, setRightAnswer]= useState([])
    const [res, setRes]= useState(0)
    const [resShow, setResShow]= useState([])

   const handleCalculate=(rightAnswer)=>{
        let count=0;
        const result=[];
        const chooseAnswer= quizResults.map((answer)=>{
            return {answer: answer.choose_answer, question: answer.question }

        })
        for (let i = 0; i < chooseAnswer.length; i++) {
            if(rightAnswer[i].toLowerCase().includes(chooseAnswer[i].answer)===true){
                result.push({
                    question: chooseAnswer[i].question,
                    answer:rightAnswer[i]});
                count+=10;
            }else {
                let wrongAnswer= rightAnswer[i]+"&wrong"
                result.push({
                    question: chooseAnswer[i].question,
                    answer:wrongAnswer})
            }
        }
        setRes(count);
        setResShow(result)
        console.log(result)

    }
    const handleFetchAnswer=async ()=>{
        try{
            const resData = await getAllResult(id)
            const answerList =resData.map((answer)=>{
                return answer.answer;
            })
            console.log(resData)
            if(answerList.length>0) {
                setRightAnswer(answerList)
                handleCalculate(answerList)
                console.log(resShow)
            }
        }catch (e) {
            console.log(e)
            throw  e;
        }
    }
    const handleDoAgain=()=>{
        navigator(`/quizz/${id}`)
    }
    const handleReturn =()=>{
        navigator(`/search_quiz`)
    }
    useEffect(()=>{
        handleFetchAnswer()

    },[])
    return(
        <>
            <div className="">
                <div className=" flex justify-center align-center">
                    <h1 className="text-3xl font-bold">Congratulations on finishing your quiz!! Here is your result <span className="text-bubble-gum ">{res}</span> scores!!</h1>
                </div>
                <div className="flex items-center justify-center">
                <div className=" mt-5 border-4 border-gray-800 flex-col items-center p-4 rounded-md bg-blue-300 size-1/2" >
                    {resShow.length>0 ?resShow.map((answer)=>{

                        return (

                            <div className="">
                                <h3 className="text-3xl font-bold">Question: {answer.question}</h3>
                                <p
                                    style={{
                                        color: answer.answer.includes("wrong") ? "red" : "green"
                                    }}
                                    className="text-2xl"
                                >
                                    Answer: {answer.answer.split("&")[0]}
                                </p>
                            </div>

                        )

                    }) : null}
                </div>
                </div>
                <div className="flex justify-center items-center space-x-10 mt-5">
                    <Button variant="contained" onClick={handleDoAgain} >Do again</Button>
                    <Button variant="contained" onClick={handleReturn}>Return</Button>
                </div>
            </div>
        </>
    )
}

export default FinalResult;