import {createContext, useReducer} from "react";

export const DocumentContext = createContext();

export const documentReducer = (state, action) => {
    switch (action.type) {
        case 'GET_DOCUMENTS':
            return {
                ...state,
                documents: action.payload
            }
        case 'ADD_DOCUMENT':
            return {
                ...state,
                documents: [...state.documents, action.payload]
            }
        case 'DELETE_DOCUMENT':
            return {
                ...state,
                documents: state.documents.filter(document => document.document_id !== action.payload)
            }
        default:
            return state;
    }

}

export const DocumentContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(documentReducer, {
        documents: []
    });

    return(
        <DocumentContext.Provider value={{...state, dispatch}}>
            {children}
        </DocumentContext.Provider>
    )
}