import React from 'react';
import {motion} from "framer-motion";

const BackDropCreate = ({children, onclick}) => {
    return (
        <motion.div
            className="backdrop"
            onClick={onclick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            {children}
        </motion.div>
    );
};

export default BackDropCreate;