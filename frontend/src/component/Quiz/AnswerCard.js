// AnswerCard.js
const AnswerCard = ({answer, color, selectedAnswer, onAnswerClick, borderColor}) => {
    const isSelected = answer === selectedAnswer;
    const backgroundColor = isSelected ? 'rgba(128, 128, 128, 0.7)' : `${color}`;
    const shadow = isSelected ? '' : 'shadow-xl';

    return (
        <button className={`flex justify-center items-center text-myWhite text-xl sm:text-4xl font-normal
        w-[280px] h-[200px] rounded-2xl cursor-pointer hover:${shadow}`} style={{backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: '2px'}}
             onClick={isSelected ? null : () => onAnswerClick(answer)}
        >
            {answer}
        </button>
    );
};

export default AnswerCard;