import React from 'react';
import ReactDOM from 'react-dom';
import {motion} from "framer-motion";
import BackDropCreate from "./BackDropCreate";
import {Link} from "react-router-dom";

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
                className="modal bg-blue-200 flex flex-col justify-center items-center"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <Link to="/create_quizz">
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >Create Quiz</motion.button>

                </Link>
                <Link to="/addDocument">
                    <motion.button
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                    >Create Document</motion.button>


                </Link>
                <button onClick={handleClose}>Close</button>
            </motion.div>
        </BackDropCreate>),
        document.getElementById('modal-root') // Render into this element
    );
};

export default Modal;