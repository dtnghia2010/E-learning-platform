import {createContext, useEffect, useReducer} from "react";

export const QuizzContext = createContext();

export const quizzReducer = (state, action) => {
    switch (action.type) {
        case 'GET_QUIZZ':
            console.log(action.payload)
            return {
                ...state,
                quizz: action.payload
            }
        case 'CHOOSE_ANSWER':
            return{
                ...state,
                quizz: state.quizz.map((question, index) => {
                    if (index === action.payload.step - 1) {
                        return {
                            ...question,
                            choose_answer: action.payload.answer
                        };
                    } else {
                        return question;
                    }
                })
            }
        case 'ADD_QUIZZ':
            return {
                ...state,
                quizz: [...state.quizz, action.payload]
            }
        case 'DELETE_QUIZZ':
            return {
                ...state,
                quizz: state.quizz.filter(quizz => quizz.quizz_id !== action.payload)
            }
        default:
            return state;
    }


}

export const QuizzContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(quizzReducer, {
        quizz: []
    });

    return(
        <QuizzContext.Provider value={{...state, dispatch}}>
            {children}
        </QuizzContext.Provider>
    )
}