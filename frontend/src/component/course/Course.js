import {useEffect, useState} from "react";
import {getCourseByCategory, getCourses} from "../../util/ApiFunction";
import CourseCard from "./CourseCard";
import {Alert, CircularProgress, Pagination} from "@mui/material";
import {useParams} from "react-router-dom";

const Course = () => {
    const [course, setCourse] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const [coursePerPage] = useState(8);
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const {category_id} = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const response = await getCourseByCategory(category_id);
                setCourse(response);
                setCategory(response[0].category);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchCourse()
    },[category_id])

    if (loading) {
        return <div className="flex justify-center items-center"><CircularProgress /></div>
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>
    }

    if (success) {
        return <Alert severity="success">{success}</Alert>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const totalPages = Math.ceil(course.length / coursePerPage);

    const renderCourse = () => {
        const startIndex = (currentPage - 1) * coursePerPage;
        const endIndex = startIndex + coursePerPage;
        return course.slice(startIndex, endIndex).map((course) => <CourseCard key={course.course_id} course={course}/>);
    }

    return (
        <>
            <div className=" container mx-auto px-36">
                <div className="drop-shadow-2xl text-5xl pb-4">
                    Category > {category}
                </div>

                <div className="grid lg:grid-cols-4 gap-x-42 gap-y-20">
                    {renderCourse()}
                </div>

                <div className="flex mt-12 -mx-3">
                    <div className="w-full px-3 flex items-center justify-center">
                        <Pagination variant="outlined" shape="rounded" count={totalPages} page={currentPage}
                                    onChange={handlePageChange}/>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Course;
