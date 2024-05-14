import useQuizzContext from "../../hook/useQuizzContext";
import AnswerCard from "./AnswerCard";
import {useEffect, useState} from "react";

const QuizzDetail = ({step}) => {
    const {quizz, dispatch} = useQuizzContext();
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const colors = ['rgba(66, 133, 244, 0.32)', 'rgba(234, 67, 53, 0.32)', 'rgba(52, 168, 83, 0.32)']

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
        return quizz[step - 1].answers.map((answer, index) => {
            return <AnswerCard
                key={index}
                answer={answer}
                color={colors[index]}
                selectedAnswer={selectedAnswer}
                onAnswerClick={handleAnswerClick}
            ></AnswerCard>
        })
    }


    return (
    <div className="flex flex-col justify-center items-center max-w-7xl">
    {/*    Display Question     */}
        <div className="flex justify-center font-semibold text-5xl p-20">
            {quizz[step - 1].question}
        </div>

    {/*    Display Answer card */}

        <div className="flex justify-between items-center pd-5 " style={{width: '60vw'}}>
            {renderAnswers()}
        </div>
    </div>
    );
};

export default QuizzDetail;
