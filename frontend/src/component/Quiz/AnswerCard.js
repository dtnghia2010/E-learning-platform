const AnswerCard = ({answers}) => {
    const colors = ['rgba(66, 133, 244, 0.32)', 'rgba(234, 67, 53, 0.32)', 'rgba(52, 168, 83, 0.32)', 'rgba(247, 88, 202, 0.32)']

    return (
        <div className='flex'>
            {Object.keys(answers).map((key, index) => (
                <div key={index} style={{backgroundColor: colors[index], width: '25%', height: '237px'}}>
                    <p>{answers[key]}</p>
                </div>
            ))}

        </div>
    );
};

export default AnswerCard;
