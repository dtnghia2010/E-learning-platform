import React from 'react';
import {motion} from "framer-motion";
import BackDropCreate from "./BackDropCreate";

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

const Modal = ({handleClose, text}) => {
    return (
        <BackDropCreate onclick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="modal bg-blue-200"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <button onClick={handleClose}>Close</button>

            </motion.div>
        </BackDropCreate>
    );
};

export default Modal;