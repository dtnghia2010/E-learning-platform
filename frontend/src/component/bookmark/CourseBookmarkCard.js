import {Card, CardContent, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import {DeleteIcon} from '@mui/icons-material/Delete';


const CourseBookmark = ({course, onClickDelete}) => {
    return (
        <>
            <a href="#" className="h-32 sm:h-52 w-40 sm:w-64">
                <img src="/images/folderImg.png" alt="" className=" hover:shadow-xl"/>
                <div>
                    <Typography variant="h5" component="div"
                                style={{fontWeight: "bold"}}>{course.courseName}</Typography>
                    <Typography variant="h6" component="div"
                                style={{color: "gray"}}>{course.author}</Typography>
                </div>
                <div className="delete_badge">
                    <IconButton aria-label="delete" onclick={() => onClickDelete(course.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </a>
        </>
    );
};

export default CourseBookmark;
