import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";


const CourseCard = ({course}) => {
    return (
        <>
            <Link to={`/document/${course.course_id}`} className="h-32 sm:h-52 w-40 sm:w-64 cursor-pointer">
                <img src="/images/folderImg.png" alt="" className=" hover:shadow-xl"/>
                <div>
                    <p className="card-title">{course.course_name} </p>
                </div>
            </Link>
        </>
    );
};

export default CourseCard;
