import {useContext} from "react";
import {StepperContext} from "../../context/StepperContext";

const StepperControl = ({handleClick, currentStep, steps, isQuiz}) => {
    return (
        <div className="container flex justify-around mt-3 mb-8">
            {/*back button*/}
            <button
                onClick={() => handleClick("back")}
                className={`bg-white text-slate-800 uppercase py-2 px-4 mr-7
            rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out shadow-md ${currentStep ===1 ? 
                    "opacity-50 cursor-not-allowed" : ""}`}>
                Back
            </button>

            {/*next button*/}
            <button
                onClick={() => handleClick("next")}
                className={`bg-[#6DB9D2] text-white uppercase py-2 px-4 ml-7
            rounded-xl font-semibold cursor-pointer shadow-md
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out`}>
                {isQuiz ? (currentStep === steps.length ? "Confirm" : "Next") : (currentStep === steps.length - 1 ? "Confirm" : "Next")}
            </button>

        </div>
    );
};

export default StepperControl;
