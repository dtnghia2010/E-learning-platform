import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";


const CourseCard = ({course}) => {
    return (
        <>
            <a href="#" className="h-32 sm:h-52 w-40 sm:w-64">
                <img src="/images/folderImg.png" alt="" className=" hover:shadow-xl"/>
                <div>
                    <p className="card-title">{course.course_name} </p>
                </div>
            </a>
        </>
    );
};

export default CourseCard;
