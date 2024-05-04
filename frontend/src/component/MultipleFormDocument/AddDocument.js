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

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try{
                const resData = await getAllCategory();
                setCategories(resData);
                setLoading(false)
                setError('')
            }catch (e) {
                setError(e.message);
            }

        };

        fetchCategories();
    }, []);


    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try{
                if (selectedCategory) {
                    const resData = await getCourseByCategory(selectedCategory.category_id);
                    setCourses(resData);
                    setLoading(false)
                    setError('')
                }
            }catch (e){
                setError(e.message)
            }
        };

        fetchCourses();
    }, [selectedCategory]);


    // useEffect(() => {
    //     console.log(newDocument)
    // }, [newDocument])

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'category') {
            // Find the selected category object from the categories array
            const selectedCategory = categories.find(category => category.category_name === value);

            if (selectedCategory) {
                // Update the newDocument state with the new category name and id
                setNewDocument({
                    ...newDocument,
                    category_name: selectedCategory.category_name,
                    category_id: selectedCategory.category_id
                });

                // Set the selectedCategory state
                setSelectedCategory(selectedCategory);
            }
        } else if (name === 'course') {
            // Update the newDocument state with the new course value
            const selectedCourse = courses.find(course => course.course_name === value);

            setNewDocument({
                ...newDocument,
                course_name: selectedCourse.course_name,
                course_id: selectedCourse.course_id
            });
        } else {
            // For other inputs, just update the newDocument state
            setNewDocument({
                ...newDocument,
                [name]: value
            });
        }
    }

    // console.log(newDocument)
    // console.log(selectedCategory)


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
                                loading={loading}
                                error={error}
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
