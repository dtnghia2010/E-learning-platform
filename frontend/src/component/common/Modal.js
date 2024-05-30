import React from 'react';
import ReactDOM from 'react-dom';
import {motion} from "framer-motion";
import BackDropCreate from "./BackDropCreate";
import {Link} from "react-router-dom";
//co xai
const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            damping: 10,
            stiffness: 100
        }
    },
    exit: {
        y: '100vh',
        opacity: 0
    }
}

const Modal = ({handleClose}) => {
    return ReactDOM.createPortal((
        <BackDropCreate onclick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal bg-myBeige flex flex-col justify-center items-center"//css cho khung show create quiz and document
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <Link to="/create_quizz">
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        onClick={handleClose}
                        className='create-quiz-button'
                    >
                        Create a Quiz
                    </motion.button>

                </Link>
                <Link to="/addDocument">
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        onClick={handleClose}
                        className='create-document-button'
                    >Create a Document</motion.button>
                </Link>
                {/* <button onClick={handleClose} 
                className='close-button'>Close</button> */}
            </motion.div>
        </BackDropCreate>),
        document.getElementById('modal-root') // Render into this element
    );
};

export default Modal;