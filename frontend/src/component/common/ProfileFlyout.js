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
            <Paper elevation={3} className='profile-menu-bar'>
                <MenuList dense>
                    <MenuItem className='profile-menu create-menu'>
                        <motion.button
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}
                            className="create"
                            onClick={() => setModalOpen(!modalOpen)}
                        >
                            <i class="fa-solid fa-plus mr-4"></i>
                            Create
                        </motion.button>
                    </MenuItem>
                <Link to={"/profile"}>
                    <MenuItem className='profile-menu'>
                    <i class="fa-regular fa-user mr-4"></i>
                    Profile</MenuItem>
                </Link>

                <Link to={"/"}>
                    <MenuItem className='profile-menu'>
                    <i class="fa-solid fa-gear mr-4"></i>
                    Setting</MenuItem>
                </Link>

                <Link to={"/"}>
                    <MenuItem className='profile-menu'> 
                    <i class="fa-regular fa-bookmark mr-4"></i>
                    Bookmark</MenuItem>
                </Link>

                <Link to={"/login"}>
                    <MenuItem className='profile-menu' onlick={handleLogout}>
                    <i class="fa-solid fa-arrow-right-from-bracket mr-4"></i>
                        Logout</MenuItem>
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