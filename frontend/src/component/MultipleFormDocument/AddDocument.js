import {StepperContext} from "../../context/StepperContext";
import {useContext, useEffect, useState} from "react";
import {Divider, Table, TableBody, TableCell, TableRow} from "@mui/material";
import Selector from "../common/Selector";
import {getAllCategory, getCourseByCategory} from "../../util/ApiFunction";



const AddDocument = () => {
    const {newDocument, setNewDocument} = useContext(StepperContext);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            // const categories = await getAllCategory();
            const categories = [
                { category_id: 1, category_name: 'Math' },
                { category_id: 2, category_name: 'Science' },
                { category_id: 3, category_name: 'English' },
                // Add more categories as needed
            ];
            setCategories(categories);
        };

        fetchCategories();
    }, []);


    useEffect(() => {
        const fetchCourses = async () => {
            if (selectedCategory) {
                // const courses = await getCourseByCategory(selectedCategory.category_id);
                const courses = [
                    { course_id: 1, course_name: 'Algebra', category_id: 1 },
                    { course_id: 2, course_name: 'Geometry', category_id: 1 },
                    { course_id: 3, course_name: 'Physics', category_id: 2 },
                    { course_id: 4, course_name: 'Chemistry', category_id: 2 },
                    { course_id: 5, course_name: 'Grammar', category_id: 3 },
                    { course_id: 6, course_name: 'Literature', category_id: 3 },

                    // Add more courses as needed
                ];
                setCourses(courses);
            }
        };

        fetchCourses();
    }, [selectedCategory]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewDocument({
            ...newDocument,
            [name]: value
        });

        if (name === 'category') {
            setSelectedCategory(value);
            setNewDocument({
                ...newDocument,
                category_name: value
            });
        }

        if (name === 'course') {
            // Update the newDocument state with the new course value
            setNewDocument({
                ...newDocument,
                course_name: value
            });
        }
    }


    return (
        <div className="border border-gray-800 rounded-md flex flex-col mx-40 m-5">
            <img src="/images/Tài%20liệu.png" alt="hình" className="w-8 h-8"/>

            <Divider style={{backgroundColor: '#171717',margin:'5px'}}/>

            <Table className="sm:w-fit md:w-1/2 m-2 flex-1" sx={{ border: 'none' }}>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: '2px', width: '50px' }}>
                            <label className="mr-2 font-semibold" htmlFor="category_name">Category</label>
                        </TableCell>
                        <TableCell align="left" sx={{ paddingY: '8px', }}>
                            <Selector
                                handleObjectInputChange={handleChange}
                                newObject={newDocument.category_name}
                                data={categories}
                                input={"category"}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: '2px'}}>
                            <div className="flex">
                                <img src="/images/folderImg.png" alt="folder" className="w-4 h-4 mt-3"/>
                                <label className=" m-3 font-semibold" htmlFor="course_name">Course</label>
                            </div>

                        </TableCell>
                        <TableCell align="left" sx={{ paddingY: '8px', }}>
                        <Selector
                                handleObjectInputChange={handleChange}
                                newObject={newDocument.course_name}
                                data={courses}
                                input={"course"}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: '2px', width: '50px'}}>
                            <label className="mr-2 font-semibold" htmlFor="document_name">Title</label>
                        </TableCell>
                        <TableCell align="left" sx={{ paddingY: '8px', }}>
                            <input
                                type="text"
                                name="document_name"
                                value={newDocument.document_name}
                                onChange={handleChange}
                                className="border border-slate-500 bg-[#EBF8FF] rounded w-[200px] lg:w-[400px]  h-[30px] mx-3"
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ paddingX: '2px', paddingY: "8px", display: 'flex', alignItems: 'flex-start'}}>
                            <label className="mr-2 font-semibold" htmlFor="description">Description</label>
                        </TableCell>
                        <TableCell align="left" sx={{ paddingY: '8px', }}>
                            <input
                                type="text"
                                name="description"
                                value={newDocument.description}
                                onChange={handleChange}
                                className="border border-slate-500 bg-[#EBF8FF] rounded w-[200px] lg:w-[400px]  h-[100px] lg:h-[300px] mx-3"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default AddDocument;
