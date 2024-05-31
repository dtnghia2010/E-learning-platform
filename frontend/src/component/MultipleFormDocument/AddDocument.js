import {StepperContext} from "../../context/StepperContext";
import {useContext, useEffect, useState} from "react";
import {Divider, Table, TableBody, TableCell, TableRow} from "@mui/material";
import Selector from "../common/Selector";
import {createCourse, getAllCategory, getCourseByCategory} from "../../util/ApiFunction";



const AddDocument = () => {
    const {newDocument, setNewDocument} = useContext(StepperContext);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loadingCategory, setLoadingCategory] = useState("");
    const [errorCategory, setErrorCategory] = useState("");

    const [loadingCourse, setLoadingCourse] = useState("");
    const [errorCourse, setErrorCourse] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategory(true);
            try{
                const resData = await getAllCategory();
                setCategories(resData);
                setLoadingCategory(false)
                setErrorCategory('')
            }catch (e) {
                setErrorCategory(e.message);
                setLoadingCategory(false)
            }

        };

        fetchCategories();
    }, []);


    useEffect(() => {
        const fetchCourses = async () => {
                if (selectedCategory) {
                    setLoadingCourse(true);
                    try{
                        const resData = await getCourseByCategory(selectedCategory.category_id);
                        setCourses(resData);
                        setLoadingCourse(false)
                        setErrorCourse('')
                    }catch (e){
                        setErrorCourse(e.message)
                        setLoadingCourse(false)
                    }
                }
        };

        fetchCourses();
    }, [selectedCategory]);

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

    const handleAddCourse = async (newCourseName) => {
       const course = {
           category_name: newDocument.category_name,
           course_name: newCourseName
       }

       try {
            const newCourse = await createCourse(course);
            setNewDocument({
                ...newDocument,
                course_name: newCourse.course_name,
                course_id: newCourse.course_id
            });
       }catch (e){
           setErrorCourse(e.message)
       }
    }


    return (
        <div className="border border-gray-800 rounded-md flex flex-col mx-40 m-5">
            <img src="/images/Tài%20liệu.png" alt="hình" className="w-10 h-10"/>

            <Divider style={{backgroundColor: '#171717',margin:'5px'}}/>

            <Table className="sm:w-fit md:w-1/2 m-2 flex-1 ml-5 " sx={{ border: 'none' }}>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: '2px', width: '50px' }}>
                            <label className="mr-2 text-lg" htmlFor="category_name">Category</label>
                        </TableCell>
                        <TableCell align="left" sx={{ paddingY: '8px', }}>
                            <Selector
                                handleObjectInputChange={handleChange}
                                newObject={newDocument.category_name}
                                data={categories}
                                input={"category"}
                                loading={loadingCategory}
                                error={errorCategory}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: '2px'}}>
                            <div className="flex">
                                <i class="fa-solid fa-folder text-lg mt-3"></i>
                                <label className=" m-3 text-lg" htmlFor="course_name">Course</label>
                            </div>

                        </TableCell>
                        <TableCell align="left" sx={{ paddingY: '8px', }}>
                        <Selector
                                handleObjectInputChange={handleChange}
                                newObject={newDocument.course_name}
                                data={courses}
                                input={"course"}
                                loading={loadingCourse}
                                error={errorCourse}
                                handleSubmit={handleAddCourse}
                                className="fixed-create-document"
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ padding: '2px', width: '50px'}}>
                            <label className="mr-2 text-lg" htmlFor="document_name">Title</label>
                        </TableCell>
                        <TableCell align="left" sx={{ paddingY: '8px', }}>
                            <input
                                type="text"
                                name="document_name"
                                value={newDocument.document_name}
                                onChange={handleChange}
                                className="border border-slate-500 bg-[#ffffff] rounded w-[200px] lg:w-[700px]  h-[30px] mx-3 px-3 py-2"
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ paddingX: '2px', paddingY: "8px", display: 'flex', alignItems: 'flex-start'}}>
                            <label className="mr-2 text-lg" htmlFor="description">Description</label>
                        </TableCell>
                        <TableCell align="left" sx={{ paddingY: '8px', }}>
                            <textarea
                                type="text"
                                name="description"
                                value={newDocument.description}
                                onChange={handleChange}
                                placeholder="Please give as much information as possible"
                                className="border text-base border-slate-500 bg-[#ffffff] rounded w-[200px] lg:w-[700px]  h-[100px] lg:h-[300px] mx-3 px-3 py-2"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default AddDocument;
