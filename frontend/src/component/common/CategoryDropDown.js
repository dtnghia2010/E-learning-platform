

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import {useEffect, useRef, useState} from "react";
import {getAllCategory} from "../../util/ApiFunction";
import {Link} from "react-router-dom";
import {Alert, Box, CircularProgress} from "@mui/material";

const CategoryDropDown = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try{
                const resData = await getAllCategory();

                setCategories(resData);
                setLoading(false)
                setError('')
            }catch (error){
                setError(error.message);
                setLoading(false)
            }
        }
        fetchCategories();
    }, []);

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
            <div>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    Courses
                </Button>
                <Box style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Box className="my-paper" style={{ zIndex: 9999 }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {error && (<MenuItem>
                                            <Alert severity={"error"}>{error}</Alert>
                                        </MenuItem>)}
                                        {loading ?(
                                            <MenuItem>
                                                <CircularProgress />
                                            </MenuItem>
                                        ): (
                                            categories.map((category) => (

                                                <MenuItem key={category.category_id} value={category.category_name}>{category.category_name}</MenuItem>

                                            ))
                                        )}
                                    </MenuList>
                                </ClickAwayListener>
                            </Box>
                        </Grow>
                    )}
                </Popper>
                </Box>
            </div>
        </Stack>
    );
}

export default CategoryDropDown;