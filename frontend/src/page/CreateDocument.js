import Stepper from "../component/common/Stepper";
import StepperControl from "../component/common/StepperControl";
import AddDocument from "../component/MultipleFormDocument/AddDocument";
import AddChapter from "../component/MultipleFormDocument/AddChapter";
import Done from "../component/MultipleFormDocument/Done";
import {useState} from "react";
import {StepperContext} from "../context/StepperContext";

const CreateDocument = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [newDocument, setNewDocument] = useState(
        {
            category_name: "",
            category_id: "",
            course_name: "",
            course_id: "",
            document_name: "",
            description: "",
        }
    );

    const [finalDocument, setFinalDocument] = useState([]);


    const steps = [
        "Details",
        "Content",
        "Done"
    ];

    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <AddDocument/>
            case 2:
                return <AddChapter/>
            case 3:
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
                    <StepperContext.Provider value={{
                        newDocument,
                        setNewDocument,
                        finalDocument,
                        setFinalDocument
                    }}>
                        {displayStep(currentStep)}
                    </StepperContext.Provider>
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

export default CreateDocument;
