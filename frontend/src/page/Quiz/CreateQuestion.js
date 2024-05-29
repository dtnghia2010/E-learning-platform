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
        // try{
        //     const data= await createQuestion(quizzId,question);
        //     console.log(data);
        //     handleReset()
        // }catch (e) {
        //     console.log(e)
        //     throw  e
        // }
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
            if(tempQuestion.answer1.includes("&True")){
                tempQuestion.answer1=tempQuestion.answer1.split("&")[0]
            }else {
                tempQuestion.answer1=tempQuestion.answer1+"&True";
            }
        }else if(index===2){
            if(tempQuestion.answer2.includes("&True")){
                tempQuestion.answer2=tempQuestion.answer2.split("&")[0]
            }else {
                tempQuestion.answer2=tempQuestion.answer2+"&True";
            }
        }else {
            if(tempQuestion.answer3.includes("&True")){
                tempQuestion.answer3=tempQuestion.answer3.split("&")[0]
            }else {
                tempQuestion.answer3=tempQuestion.answer3+"&True";
            }
        }
        setQuestion(tempQuestion)

    }


    const shadow =  'shadow-xl';

    return (
        <div className="flex items-center justify-center ">
        <div className="border-4 border-gray-400 size-1/2 p-5 rounded-lg">
            <div className="flex justify-center  align-center space-x-2.5 size-1/2 w-full h-full mt-20 border-2 border-gray-300 rounded-md p-4  ">
                <input className="flex justify-center font-semibold text-5xl p-5 rounded-md" placeholder="Enter question name" name="question" value={question.question} onChange={handleChange}/>
            </div>
            <div className="flex justify-center align-center space-x-3 size-1/2 w-full h-full mt-20">

                <div className="flex justify-between items-center  mt-5 ml-3 " style={{width: '60vw'}}>
                    <div className="flex relative ">
                        <FiCheckCircle onClick={()=>{
                            handleChoose(1)
                        }} className="absolute ml-52 mt-3 text-lg hover:text-white cursor-pointer" />

                        <input className={`text-white text-xl sm:text-4xl font-semibold
        w-[240px] h-[200px] rounded-md border border-secondary-400 cursor-pointer hover:${shadow}`}
                           style={{backgroundColor: "#BB0E00"}}
                           name="answer1"
                           onChange={handleChange}
                           value={question.answer1}
                           placeholder="Please enter the answer"/>
                </div>
                    <div className="flex relative ">
                        <FiCheckCircle onClick={()=>{
                            handleChoose(2)
                        }} className="absolute ml-52 mt-3 text-lg hover:text-white cursor-pointer"/>
                        <input className={` flex justify-center items-center text-white text-xl sm:text-4xl font-semibold
        w-[240px] h-[200px] rounded-md border border-secondary-400 cursor-pointer hover:${shadow}`}
                               style={{backgroundColor: "#0053DB"}}
                               name="answer2"
                               onChange={handleChange}
                               value={question.answer2}
                               placeholder="Please enter the answer"
                        />
                    </div>
                    <div className="flex relative ">
                        <FiCheckCircle onClick={()=>{
                            handleChoose(3)
                        }} className="absolute ml-52 mt-3 text-lg hover:text-white cursor-pointer"/>

                        <input className={`flex justify-center items-center text-white text-xl sm:text-4xl font-semibold
        w-[240px] h-[200px] rounded-md border border-secondary-400 cursor-pointer hover:${shadow}`}
                               style={{backgroundColor: "#00751F"}}
                               name="answer3"
                               onChange={handleChange}
                               value={question.answer3}
                               placeholder="Please enter the answer"
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
