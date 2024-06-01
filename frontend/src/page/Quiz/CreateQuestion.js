import React, { useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {createQuestion} from "../../util/ApiFunction";
import { FiCheckCircle } from "react-icons/fi";



function CreateQuestion() {
    const quizzId= useParams().id;
    const navigator= useNavigate();
    const [question, setQuestion]=useState({
        question:"",
        answer1:"",
        answer2:"",
        answer3:"",
    })

    const handleChange= (event)=>{
        const {name, value}= event.target

        setQuestion({...question, [name]:value })
    }
    const handleSubmit=async ()=>{
        console.log(question)
        try{
            const data= await createQuestion(quizzId,question);
            console.log(data);
            handleReset()
        }catch (e) {
            console.log(e)
            throw  e
        }
    }
    const handleReset=()=>{
        setQuestion({
            question:"",
            answer1:"",
            answer2:"",
            answer3:"",
        })
    }
    const handleChoose=(index)=>{
        const tempQuestion= question
        if(index===1){
            tempQuestion.answer1=tempQuestion.answer1+"&True";
        }else if(index===2){
            tempQuestion.answer2=tempQuestion.answer2+"&True";
        }else {
            tempQuestion.answer3=tempQuestion.answer3+"&True";
        }
        setQuestion(tempQuestion)

    }


    const shadow =  'shadow-xl';

    return (
        <div className="flex items-center justify-center">
        <div className="p-5 rounded-2xl shadow-inner size-full" style={{backgroundColor: "#D9D9D9"}}>
            <div className="flex justify-center align-center mt-3">
                <input className="flex justify-center font-semibold size-full text-xl p-20 border-2 border-gray-400 rounded-2xl text-center" placeholder="Type question here" name="question" value={question.question} onChange={handleChange} style={{backgroundColor: "#D9D9D9"}}/>
            </div>
            <div className="flex justify-center align-center space-x-3 size-1/2 w-full h-full">
                <div className="flex justify-between items-center mt-10 ml-3 " style={{width: '70vw'}}>
                    <div className="flex relative ">
                        <input type="checkbox" defaultCheck className="checkbox absolute ml-52 mt-3 text-lg hover:text-white "/>

                        <input className={`text-center placeholder-white placeholder-opacity-55 flex justify-center items-center text-white text-xl sm:text-xl font-normal
        w-[240px] h-[270px] rounded-2xl cursor-pointer hover:${shadow}`}
                           style={{backgroundColor: "#77A4EE", borderColor: "#0053DB", borderWidth: '1px'}}
                           name="answer1"
                           onChange={handleChange}
                           value={question.answer1}
                           placeholder="Type answer option here"/>
                </div>
                    <div className="flex relative ">
                        <input type="checkbox" defaultCheck className="checkbox absolute ml-52 mt-3 text-lg hover:text-white "/>
                        <input className={`text-center placeholder-white placeholder-opacity-55 flex justify-center items-center text-white text-xl sm:text-xl font-normal
        w-[240px] h-[270px] rounded-2xl cursor-pointer hover:${shadow}`}
                               style={{backgroundColor: "#EA8179", borderColor: "#BB0E00", borderWidth: '1px'}}
                               name="answer2"
                               onChange={handleChange}
                               value={question.answer2}
                               placeholder="Type answer option here"
                        />
                    </div>
                    <div className="flex relative  ">
                        <input type="checkbox" defaultCheck className="checkbox absolute ml-52 mt-3 text-lg hover:text-white "/>

                        <input className={`text-center placeholder-white placeholder-opacity-55 flex justify-center items-center text-white text-xl sm:text-xl font-normal
        w-[240px] h-[270px] rounded-2xl cursor-pointer hover:${shadow}`}
                               style={{backgroundColor: "#6BC483", borderColor: "#00751F", borderWidth: '1px'}}
                               name="answer3"
                               onChange={handleChange}
                               value={question.answer3}
                               placeholder="Type answer option here"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center align-center size-1/2 space-x-2.5 w-full h-full mt-20">
                <button

                    className={`bg-white text-slate-500 uppercase py-2 px-4
            rounded-xl font-semibold cursor-pointer border-2 border-slate-300
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out `} onClick={handleReset}>
                    Reset
                </button>


                <button

                    className={`bg-[#6DB9D2] text-white uppercase py-2 px-4
            rounded-xl font-semibold cursor-pointer
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out`} onClick={handleSubmit}>
                    Save Question
                </button>
                <button

                    className={`bg-[#6DB9D2] text-white uppercase py-2 px-4
            rounded-xl font-semibold cursor-pointer
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out`} onClick={()=>{navigator("/search_quiz")}}>
                    Finish
                </button>
            </div>
        </div>
        </div>
    );
}

export default CreateQuestion;
