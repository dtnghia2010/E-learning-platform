// the parent component to contain stepper control and the steps content of quizz

import StepperControl from "../common/StepperControl";
import {useEffect, useState} from "react";
import useQuizzContext from "../../hook/useQuizzContext";
import QuizzHeader from "./QuizzHeader";
import QuizzDetail from "./QuizzDetail";
import {getQuizzById} from "../../util/ApiFunction";
import {useNavigate, useParams} from "react-router-dom";

const Quizz = () => {
    const navigator= useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const {quizz, dispatch} = useQuizzContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {id} = useParams()

        const fetchQuizz = async () => {
            setLoading(true);
            try {

                const resData = await getQuizzById(id)
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
        }, [id])
        const displayStep = (step) => {
            console.log("step: "+ step)
            //     the page quizz detail

                return <QuizzDetail step={step}/>;

        }



    const handleClick = (direction) => {
        let newStep = currentStep;
        direction === "next" ? newStep++ : newStep--;
        console.log(newStep)
        console.log(quizz)
        if( newStep>quizz.length){
            navigator(`/result/${id}`, { state: { quizResults: quizz } });
        }
        //check steps are in bounded or not
        newStep > 0 && newStep <= quizz.length && setCurrentStep(newStep);
    }

        return (
            <div>
                {/*    The header of quizz  */}
                <div className="justify-center items-center">
                    <QuizzHeader currentStep={currentStep} numberQuestion={quizz.length}/>
                </div>
                <div className="flex flex-col justify-center items-center pd-4">

                    {/*    Display component */}
                    <div className="flex">
                        {displayStep(currentStep - 1)}
                    </div>
                    {/*    Stepper Controller   */}
                    <div className="pt-20">
                        <StepperControl
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={quizz}
                            isQuiz={true}
                        />
                    </div>


            </div>
        </div>
    );
};

export default Quizz;
