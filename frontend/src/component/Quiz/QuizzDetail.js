import useQuizzContext from "../../hook/useQuizzContext";
import AnswerCard from "./AnswerCard";
import {useEffect, useState} from "react";

const QuizzDetail = ({step}) => {
    const {quizz, dispatch} = useQuizzContext();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    console.log(quizz)
    const colors = ['rgba(66, 133, 244, 0.68)', 'rgba(234, 67, 53, 0.68)', 'rgba(52, 168, 83, 0.68)'];
    const borderColors = ['rgba(0, 83, 219, 1)', 'rgba(187, 14, 0, 1)', 'rgba(0, 117, 31, 1)']

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);

        dispatch({
            type: 'CHOOSE_ANSWER',
            payload: {
                step,
                answer
            }
        });
    };

    const renderAnswers = () => {
        return quizz[step].answers.map((answer, index) => {
            return <AnswerCard
                key={index}
                answer={answer}
                color={colors[index]}
                borderColor={borderColors[index]}
                selectedAnswer={selectedAnswer}
                onAnswerClick={handleAnswerClick}
            ></AnswerCard>
        })
    }


    return (
    <div className="flex flex-col justify-center items-center max-w-7xl">
    {/*    Display Question     */}
        <div className="flex justify-center font-normal text-5xl p-20 text-center">
            {quizz[step] && quizz[step].question}
        </div>

    {/*    Display Answer card */}

        <div className="flex justify-between items-center" style={{width: '70vw'}}>
            {quizz[step] &&renderAnswers()}
        </div>
    </div>
    );
};

export default QuizzDetail;
