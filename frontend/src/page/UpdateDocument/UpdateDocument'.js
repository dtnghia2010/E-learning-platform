import Stepper from "../../component/common/Stepper";
import StepperControl from "../../component/common/StepperControl";
import {useState} from "react";
import EditDocument from "../../component/document/EditDocument";
import {UpdateDone} from "./UpdateDone";
import {useParams} from "react-router-dom";



const UpdateDocument = () => {
    const {documentId} = useParams();
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
                 <h1 className="flex justify-center items-center font-bold text-2xl  w-full share-document ">
                    Share your&nbsp;
                    <span className="text-myBlue">documents</span>
                    &nbsp;to everyone
                </h1>
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
                {currentStep !== 2 &&
                <StepperControl
                    handleClick = {handleClick}
                    currentStep = {currentStep}
                    steps = {steps}
                />}
            </div>
    );
};

export default UpdateDocument;
