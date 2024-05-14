// AnswerCard.js
const AnswerCard = ({answer, color, selectedAnswer, onAnswerClick}) => {
    const isSelected = answer === selectedAnswer;
    const backgroundColor = isSelected ? 'rgba(128, 128, 128, 0.7)' : `${color}`;
    const shadow = isSelected ? '' : 'shadow-xl';

    return (
        <button className={`flex justify-center items-center text-white text-xl sm:text-4xl font-semibold
        w-[240px] h-[200px] rounded-md border border-secondary-400 cursor-pointer hover:${shadow}`} style={{backgroundColor: backgroundColor}}
             onClick={isSelected ? null : () => onAnswerClick(answer)}
        >
            {answer}
        </button>
    );
};

export default AnswerCard;