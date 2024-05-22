import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getQuizzById, updateQuestion} from "../../util/ApiFunction";
import useQuizzContext from "../../hook/useQuizzContext";
import QuizzHeader from "../../component/Quiz/QuizzHeader";
import StepperControl from "../../component/common/StepperControl";


function UpdateQuestion() {
    const quizzId= useParams().id;
    const {quizz, dispatch} = useQuizzContext();
    const [currentStep, setCurrentStep] = useState(1);

    const [question, setQuestion]=useState({question: "",
        answers: ["", "", ""]
    })

    const [error, setError] = useState(null);

    const navigate= useNavigate();


    const fetchQuizz = async () => {
        try {

            const resData = await getQuizzById(quizzId)

            const quizzData = resData.questions.map(question => {
                let answers = question.answers.map(answerObj => {
                    return [answerObj.answer1, answerObj.answer2, answerObj.answer3];
                });

                // Flatten the array
                answers = [].concat(...answers);

                // If the answers array is empty, replace it with an array of three empty strings
                if (answers.length === 0) {
                    answers = ["", "", ""];
                }

                return {
                    ...question,
                    choose_answer: answers.length === 0 ? "" : question.choose_answer,
                    answers: answers
                };
            });

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
        const answerIndex = parseInt(name.replace("answer", "")) - 1;

        setQuestion(prevQuestion => ({
            ...prevQuestion,
            answers: prevQuestion.answers.map((answer, index) => index === answerIndex ? value : answer)
        }));
        console.log(question)
    }
    const handleSubmit=async ()=>{
        try{
            const data= await updateQuestion(quizzId, quizz[currentStep - 1].question_id, question);
            console.log(data);
            handleClick("next");

        }catch (e) {
            console.log(e)
            throw  e
        }
    }

    const handleConfirm = () => {
        navigate(`/quizz/${quizzId}`)
    }


    const handleClick = (direction) => {
        let newStep = currentStep;
        direction === "next" ? newStep++ : newStep--;

        //check steps are in bounded or not
        newStep > 0 && newStep <= quizz.length && setCurrentStep(newStep);

        // If it's the last step, navigate to the quiz page
        if (newStep > quizz.length) {
            handleConfirm();
        }
    }

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
                        {question.answers.map((answer, index) => (
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
