import {useContext} from "react";
import { useLocation } from 'react-router-dom';

import {StepperContext} from "../../context/StepperContext";
//back button với confirm button và next button, cần css
const StepperControl = ({handleClick, currentStep, steps, isQuiz}) => {
    const location = useLocation();
    const isAddDocumentAndStep2 = location.pathname === '/addDocument' && currentStep === 2;
    return (
        <div className="container flex justify-around mt-4 mb-8 ">
            {/*back button*/}
            <button
                onClick={() => handleClick("back")}
                className={`bg-myWhite
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out button ${currentStep ===1 ?
                    "opacity-50 cursor-not-allowed " : ""}`}>
                Back
            </button>

            {/*next button*/}
            <button
                onClick={() => handleClick("next")}
                className={`bg-myBlue
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out button ${isAddDocumentAndStep2 ? 'next-finish-button1' : 'next-finish-button'}`}>
                {isQuiz ? (currentStep === steps.length ? "Finish" : "Next") : (currentStep === steps.length - 1 ? "Finish" : "Next")}
            </button>

        </div>
    );
};

export default StepperControl;
