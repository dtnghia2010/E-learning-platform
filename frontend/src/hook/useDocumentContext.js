import {useContext} from "react";
import {DocumentContext} from "../context/DocumentContext";

const useDocumentContext = () => {
    const context = useContext(DocumentContext)

    if(!context) {
        throw Error('useDocumentContext must be used inside an DocumentContextProvider')
    }

    return context
};

export default useDocumentContext;
