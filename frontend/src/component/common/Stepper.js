import {useContext, useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import {StepperContext} from "../../context/StepperContext";

const Stepper = ({steps, currentStep}) => {
    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef()

    const updateStep = (stepNumber, steps) => {
        const newSteps = [...steps]
        let count = 0
        while (count < newSteps.length ){
            if (count === stepNumber){
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected : true,
                    completed:true
                }
                count ++;
            }
            //step completed
            else if (count < stepNumber){
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected : true,
                    completed:true
                }
                count ++
            }
            //step pending
            else{
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected : false,
                    completed: false
                }
                count ++
            }
        }

        return newSteps
    }
    useEffect(() => {
        //create object
        const stepState = steps.map((step, index) =>
        Object.assign(
            {},
            {
                description : step,
                completed: false,
                highlighted : index === 0,
                selected: index === 0
            }
        )
        );

        stepRef.current = stepState
        const current = updateStep(currentStep - 1, stepRef.current)
        setNewStep(current)
    }, [steps, currentStep])



    const displaySteps = newStep.map((step, index) => {
        return( (

        <div key={index} className={index !== newStep.length ? "mx-8 flex justify-center items-center" : ""}>
            <div className=" relative flex flex-wrap ">
                <div className="flex justify-center items-center text-teal-600">
                    <div
                        className={`rounded-full text-xl font-bold transition duration-500 ease-in-out 
                    border-2 border-gray-300 h-10 w-10 flex justify-center items-center py-2 ${step.selected ?
                            "text-slate-900 font-bold border border-green-600 bg-blue-light" : "text-gray-300 bg-blue-200"}`}>
                        {/*    Display number   */}

                        {step.completed ? (
                            <span className="text-white font-bold text-xl">&#10003;</span>
                        ) : (
                            index + 1
                        )}
                    </div>

                    <div className={`px-6 w-32 text-lg font-semibold uppercase ${step.highlighted ?
                        "text-teal-900" : "text-gray-300"}`}>
                        {/*   Display description   */}

                        {step.description}
                    </div>


                    <motion.div
                        className="absolute -bottom-4 w-56 h-2 bg-blue-light bg-opacity-100 rounded-full flex-auto"
                        initial={{scaleX: 0, originX: 0}}
                        animate={{scaleX: step.completed ? 1 : 0}}
                        transition={{duration: 0.3, ease: "easeOut"}}
                    >
                        {/* Display line */}
                    </motion.div>

                </div>
            </div>
        </div>
        ))
    })

    return (
        <div className="mx-64 p-4 flex justify-between items-center">
            {displaySteps}
        </div>
    );
};

export default Stepper;
