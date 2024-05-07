import {useContext, useEffect, useState} from "react";
import {Divider, Table, TableBody, TableCell, TableRow} from "@mui/material";
import Selector from "../common/Selector";
import {createCourse, getAllCategory, getCourseByCategory} from "../../util/ApiFunction";



const AddDocument = () => {
    const [course,setCourse]= useState("")
    const [category, setCategory]=useState("")

    const handleGetDocument=async ()=>{

    }

    const handleUpdateDocuent= async ()=>{

    }
    useEffect(()=>{
        handleGetDocument();
    },[])


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
                            <p>{category}</p>
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
                            <TableCell align="left" sx={{ paddingY: '8px', }}>
                                <p>{course}</p>
                            </TableCell>
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
                                // value={newDocument.document_name}
                                // onChange={handleChange}
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
                                // value={newDocument.description}
                                // onChange={handleChange}
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