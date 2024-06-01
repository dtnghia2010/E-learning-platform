import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getCourseByCategory, getDocumentsbyCourse} from "../../util/ApiFunction";
import {Alert, CircularProgress, Pagination} from "@mui/material";
import CourseCard from "../course/CourseCard";
import DocumentCard from "./DocumentCard";

const Document = () => {
    const [documents, setDocuments] = useState([]);
    const [course, setCourse] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [coursePerPage] = useState(8);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const {course_id} = useParams();
    const navigator= useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const response = await getDocumentsbyCourse(course_id);
                setDocuments(response.documents);
                setCourse(response.course_name);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchCourse()
    },[course_id])

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

    const totalPages = Math.ceil(documents.length / coursePerPage);


    const renderDocuments = () => {
        const startIndex = (currentPage - 1) * coursePerPage;
        const endIndex = startIndex + coursePerPage;
        return documents.slice(startIndex, endIndex).map((document) => <DocumentCard key={document.document_id} document={document}/>);
    }

    return (
        <>
            <div className=" container mx-auto px-36">
                <div className="drop-shadow-2xl text-5xl pb-10">
                    Course > {course}
                </div>

                <div className="grid lg:grid-cols-4 gap-x-42 gap-y-20">
                    {renderDocuments()}
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

export default Document;
