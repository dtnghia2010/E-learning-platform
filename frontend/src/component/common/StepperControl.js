import {useContext} from "react";
import {StepperContext} from "../../context/StepperContext";

const StepperControl = ({handleClick, currentStep, steps}) => {

    const {newDocument, setNewDocument} = useContext(StepperContext);


    return (
        <div className="container flex justify-around mt-4 mb-8">
            {/*back button*/}
            <button
                onClick={() => handleClick("back")}
                className={`bg-white text-slate-500 uppercase py-2 px-4
            rounded-xl font-semibold cursor-pointer border-2 border-slate-300
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out ${currentStep ===1 ? 
                    "opacity-50 cursor-not-allowed" : ""}`}>
                Back
            </button>

            {/*next button*/}
            <button
                onClick={() => handleClick("next")}
                className={`bg-[#6DB9D2] text-white uppercase py-2 px-4
            rounded-xl font-semibold cursor-pointer
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out`}>
                {currentStep === steps.length -1 ? "Confirm": "Next"}
            </button>

        </div>
    );
};

export default StepperControl;
