import Stepper from "../component/common/Stepper";
import StepperControl from "../component/common/StepperControl";
import AddDocument from "../component/MultipleFormDocument/AddDocument";
import AddChapter from "../component/MultipleFormDocument/AddChapter";
import Done from "../component/MultipleFormDocument/Done";
import {useState} from "react";
import EditDocument from "../component/document/EditDocument";
// import {StepperContext} from "../context/StepperContext";


const UpdateDocument = () => {

    const [currentStep, setCurrentStep] = useState(1);



    const steps = [
        "Document",
        "Done"
    ];

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <EditDocument/>
            case 2:
                return <Done/>
            default:
                return null
        }
    }


    const handleClick = (direction) => {


        let newStep = currentStep;
        direction === "next" ? newStep++ : newStep--;

        //check steps are in bounded or not
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    return (

            <div className="flex-col mx-8 justify-center pb-4">
                <h1>Share your documents to every one</h1>
                <div className="container mt-5">
                    <Stepper
                        steps = {steps}
                        currentStep = {currentStep}
                    />

                    {/*    Display component    */}
                    <div>
                        {displayStep(currentStep)}
                    </div>


                </div>

                <StepperControl
                    handleClick = {handleClick}
                    currentStep = {currentStep}
                    steps = {steps}
                />
            </div>
    );
};

export default UpdateDocument;
