import React, {useState} from 'react';
import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import useAuthContext from "../../hook/useAuthContext";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import {motion, AnimatePresence} from "framer-motion";
import Modal from "./Modal";
//Sửa menu bar của profile
const ProfileFlyout = ({toggleModal}) => {
    const {dispatch} = useAuthContext();
    const [ modalOpen, setModalOpen] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
        dispatch({type: 'LOGOUT'});
    }


    return (
        <>
            <Paper elevation={3}>
                <MenuList dense>
                    <MenuItem>
                        <motion.button
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                            className="create"
                            onClick={() => setModalOpen(!modalOpen)}
                        >
                            Create
                        </motion.button>
                    </MenuItem>
                <Link to={"/profile"}>
                    <MenuItem>Profile</MenuItem>
                </Link>

                <Link to={"/"}>
                    <MenuItem>Setting</MenuItem>
                </Link>

                <Link to={"/login"}>
                    <MenuItem onlick={handleLogout}>Logout</MenuItem>
                </Link>
                </MenuList>
            </Paper>
            <AnimatePresence>
            {modalOpen && <Modal modalOpen={modalOpen} handleClose={() => setModalOpen(false)} />}
            </AnimatePresence>
        </>

    );
};

export default ProfileFlyout;