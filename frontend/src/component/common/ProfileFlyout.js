import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import useAuthContext from "../../hook/useAuthContext";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import {Box, Input, Modal, Typography} from "@mui/material";
import {ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import Button from "@mui/material/Button";

const ProfileFlyout = () => {
    const {dispatch} = useAuthContext();
    const router= useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
        dispatch({type: 'LOGOUT'});
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="p-3 flex items-center justify-center">
                        <button
                            className=" bg-yellow-light text-black uppercase py-2 px-4 w-18
            rounded-xl font-semibold cursor-pointer
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out"
                             onClick={()=>{
                                 router("/addDocument")
                                 handleClose()
                             }}
                        >
                            Create Document
                        </button>
                        <button onClick={()=>{
                            router("/create_quizz")
                            handleClose()
                        }}
                            className=" bg-yellow-light text-black uppercase py-2 px-4 w-18
            rounded-xl font-semibold cursor-pointer
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out ml-5"
                        >
                            Create Quizz
                        </button>
                    </div>

                </Box>
            </Modal>
            <Paper elevation={3}>
                <MenuList dense>
                    <MenuItem onClick={() => {
                        handleOpen()
                    }}>
                        Create
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
        </div>
    );
};

export default ProfileFlyout;