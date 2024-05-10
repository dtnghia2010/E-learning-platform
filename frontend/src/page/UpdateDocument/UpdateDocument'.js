import Stepper from "../../component/common/Stepper";
import StepperControl from "../../component/common/StepperControl";
import {useState} from "react";
import EditDocument from "../../component/document/EditDocument";
import {UpdateDone} from "./UpdateDone";



const UpdateDocument = (documentId) => {

    const [currentStep, setCurrentStep] = useState(1);



    const steps = [
        "Document",
        "Done"
    ];

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <EditDocument documentId={documentId}/>
            case 2:
                return <UpdateDone/>
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
