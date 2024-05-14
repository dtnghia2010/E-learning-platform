
import {useContext} from "react";
import {QuizzContext} from "../context/QuizzContext";

const useQuizzContext = () => {
    const context = useContext(QuizzContext)

    if(!context) {
        throw Error('useQuizzContext must be used inside an QuizzContextProvider')
    }

    return context
};

export default useQuizzContext;
