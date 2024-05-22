import React from 'react';
import {Link} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import useAuthContext from "../../hook/useAuthContext";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";

const ProfileFlyout = () => {
    const {dispatch} = useAuthContext();

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
        dispatch({type: 'LOGOUT'});
    }


    return (
        <Paper elevation={3}>
            <MenuList dense>
                <MenuItem>
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
    );
};

export default ProfileFlyout;