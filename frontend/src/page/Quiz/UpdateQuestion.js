import React, {useEffect, useState} from 'react';
import { useParams} from "react-router-dom";
import {getQuizzById, updateQuestion} from "../../util/ApiFunction";
import useQuizzContext from "../../hook/useQuizzContext";
import QuizzHeader from "../../component/Quiz/QuizzHeader";
import StepperControl from "../../component/common/StepperControl";


function UpdateQuestion() {
    const quizzId= useParams().id;
    const {quizz, dispatch} = useQuizzContext();
    const [currentStep, setCurrentStep] = useState(1);

    const [question, setQuestion]=useState({})

    const [error, setError] = useState(null);

    const colors = ["#BB0E00", "#00751F", "#0053DB"]


    const fetchQuizz = async () => {
        try {

            const resData = await getQuizzById(quizzId)
            const quizzData = resData.questions.map(question => ({
                ...question,
                choose_answer: '',
                answers: [].concat(...question.answers.map(answerObj => {
                    return [answerObj.answer1, answerObj.answer2, answerObj.answer3];
                }))
            }));

            dispatch({type: 'GET_QUIZZ', payload: quizzData});

            setError(null);
            // setLoading(false);
        } catch (error) {
            setError(error);

        }
    }

    useEffect(() => {
        fetchQuizz()
    }, [quizzId])

    useEffect(() => {
        if (quizz && quizz.length > currentStep - 1) {
            setQuestion(quizz[currentStep - 1]);
        } else {
            console.error('Current question is undefined');
        }
        console.log(question)
    }, [quizz, currentStep]);

    const handleChange= (event)=>{
        const {name, value}= event.target

        setQuestion(prevQuestion => ({
            ...prevQuestion,
            [name]: value
        }));
        console.log(question)
    }
    const handleSubmit=async ()=>{
        try{
            const data= await updateQuestion(quizzId, quizz.question_id, question);
            console.log(data);
            handleClick("next");

        }catch (e) {
            console.log(e)
            throw  e
        }
    }

    const handleClick = (direction) => {
        let newStep = currentStep;
        direction === "next" ? newStep++ : newStep--;

        //check steps are in bounded or not
        newStep > 0 && newStep <= quizz.length && setCurrentStep(newStep);
    }

    const shadow =  'shadow-xl';

    return (
        <>
            <div>
                {/*    The header of quizz  */}
                <QuizzHeader currentStep={currentStep} numberQuestion={quizz.length}/>
            </div>
            <div className="border-4 border-gray-400">
                <div
                    className="flex justify-center  align-center space-x-2.5 size-1/2 w-full h-full mt-20 border-2 border-gray-300 rounded-md p-4  ">
                    <input className="flex justify-center font-semibold text-5xl p-5 rounded-md"
                           placeholder="Enter question name" name="question" value={question.question}
                           onChange={handleChange}/>
                </div>
                <div className="flex justify-center align-center size-1/2 space-x-2.5 w-full h-full mt-20">

                    <div className="flex justify-between items-center  mt-5 ml-3 " style={{width: '60vw'}}>
                        {question && question.answers && question.answers.map((answer, index) => (
                            answer !== null && answer !== undefined ? (
                                <input
                                    key={index}
                                    className="flex justify-center items-center text-white text-xl sm:text-4xl font-semibold
            w-[240px] h-[200px] rounded-md border border-secondary-400 cursor-pointer hover:shadow-xl"
                                    style={{backgroundColor: ["#BB0E00", "#0053DB", "#00751F"][index % 3]}}
                                    name={`answer${index + 1}`}
                                    onChange={handleChange}
                                    value={answer}
                                    placeholder="Please enter the answer"
                                />
                            ) : (
                                <input
                                    key={index}
                                    className="flex justify-center items-center text-white text-xl sm:text-4xl font-semibold
            w-[240px] h-[200px] rounded-md border border-secondary-400 cursor-pointer hover:shadow-xl"
                                    style={{backgroundColor: ["#BB0E00", "#0053DB", "#00751F"][index % 3]}}
                                    name={`answer${index + 1}`}
                                    onChange={handleChange}
                                    value=""
                                    placeholder="Please enter the answer"
                                />
                            )
                        ))}
                    </div>
                </div>

                <div className="flex justify-center align-center size-1/2 space-x-2.5 w-full h-full mt-20">
                    <button

                        className={`bg-[#6DB9D2] text-white uppercase py-2 px-4
            rounded-xl font-semibold cursor-pointer
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out`} onClick={handleSubmit}>
                        Save Question
                    </button>
                </div>
            </div>
            <div className="pt-20">
                <StepperControl
                    handleClick={handleClick}
                    currentStep={currentStep}
                    steps={quizz}
                    isQuiz={true}
                />
            </div>
        </>
    );
}

export default UpdateQuestion;
