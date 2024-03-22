import {useEffect, useState} from "react";
import {getCourses} from "../../util/ApiFunction";
import CourseCard from "./CourseCard";
import {Alert, CircularProgress, Pagination} from "@mui/material";

const Course = () => {
    const [course, setCourse] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [coursePerPage] = useState(8);
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const response = await getCourses();
                setCourse(response);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
    })

    if (loading) {
        return <CircularProgress/>
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
        return course.slice(startIndex, endIndex).map((course) => <CourseCard key={course.id} course={course}/>);
    }

    return (
        <>
            <div className=" container mx-auto px-4">

                <div className="flex flex-wrap -mx-1 lg:-mx-4">
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
