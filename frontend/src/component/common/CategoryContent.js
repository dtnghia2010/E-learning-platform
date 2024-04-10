

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
import {Alert, CircularProgress} from "@mui/material";

const CategoryContent = () => {
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

    return (

            <Paper elevation={3}>
                <MenuList dense>
                    {error && (<MenuItem>
                        <Alert severity={"error"}>{error}</Alert>
                    </MenuItem>)}
                    {loading ?(
                        <MenuItem>
                            <CircularProgress />
                        </MenuItem>
                    ): (
                        categories.map((category) => (
                            <Link to={`/course/${category.category_id}`} >
                                <MenuItem key={category.category_id} value={category.category_name}>{category.category_name}</MenuItem>
                            </Link>
                        ))
                    )}
                </MenuList>
            </Paper>

    );
}

export default CategoryContent;