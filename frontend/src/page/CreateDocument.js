import Stepper from "../component/common/Stepper";
import StepperControl from "../component/common/StepperControl";
import AddDocument from "../component/MultipleFormDocument/AddDocument";
import AddChapter from "../component/MultipleFormDocument/AddChapter";
import Done from "../component/MultipleFormDocument/Done";
import {useState} from "react";
import {StepperContext} from "../context/StepperContext";
import {createChapter, createDocument} from "../util/ApiFunction";

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
    const [newChapter, setNewChapter]=useState({
        chapter_id:"",
        chapter_name:"",
        code:"",
        content:"",
        document_id:""
    })


    const steps = [
        "Details",
        "Chapters",
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

    const handleNext = async () => {
        if (currentStep === 1) {
            // Prepare the document data
            const documentData = {
                document_name: newDocument.document_name,
                description: newDocument.description
            };

            try {
                // Call the createDocument API function
                const newDoc = await createDocument(documentData, newDocument.course_id);
                console.log(newDoc)
                // Update the newDocument state with the response data
                setNewDocument({
                    ...newDocument,
                    document_id: newDoc.document_id,
                    course_id: newDoc.course_id,
                    document_name: newDoc.document_name,
                    description: newDoc.description,
                    user_id: newDoc.user_id
                });
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleClick = (direction) => {

        if (direction === "next") {
            handleNext();
        }

        let newStep = currentStep;
        direction === "next" ? newStep++ : newStep--;

        //check steps are in bounded or not
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    return (
        <StepperContext.Provider value={{
            newDocument,
            setNewDocument
        }}>
        <div className="relative flex-col  justify-center pb-4 relative">
            <h1 className="flex justify-center items-center font-bold text-2xl bg-myLightYellow w-full share-document z-0">
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
            <div className={currentStep === 2 ? 'modified-button-create-document' : ''}>
            
            {currentStep !== 3 && 
                <StepperControl
                    handleClick = {handleClick}
                    currentStep = {currentStep}
                    steps = {steps}
                />
            }
            
            </div>
        </div>
        </StepperContext.Provider>
    );
};
export default CreateDocument;
