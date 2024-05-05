import {Divider, Table, TableBody, TableCell, TableRow} from "@mui/material";
import Selector from "../common/Selector";
import {useContext, useEffect, useRef, useState} from "react";
import {StepperContext} from "../../context/StepperContext";
import {createChapter, createCourse, getAllCategory, getCourseByCategory} from "../../util/ApiFunction";
import Button from "@mui/material/Button";

const AddChapter = () => {

    const {newDocument, setNewDocument} = useContext(StepperContext);
    const formRef = useRef(null);
    const [newChapter, setNewChapter]=useState({
        chapter_id:"",
        chapter_name:"",
        code:"",
        content:"",
        document_id:""
    })
    function handleChange(event) {
        const { name, value } = event.target;
        setNewChapter({ ...newChapter, [name]: value });
    }

    const handleAddChapter = async () => {
        const chapter = {
            chapter_name: newChapter.chapter_name,
            code: newChapter.code,
            content: newChapter.content
        }
        try {
            console.log(newDocument.document_id)
            const newCourse = await createChapter(newDocument.document_id,chapter);
            console.log(newCourse)
            setNewChapter({
                chapter_id:"",
                chapter_name:"",
                code:"",
                content:"",
                document_id:""
            })
        }catch (e){
            console.log(e)
            throw e
        }
    }

    return (
        <div className="border border-gray-800 rounded-md flex flex-col mx-40 m-5">
            <img src="/images/Tài%20liệu.png" alt="hình" className="w-8 h-8"/>

            <Divider style={{backgroundColor: '#171717', margin: '5px'}}/>

                <Table className="sm:w-fit md:w-1/2 m-2 flex-1" sx={{border: 'none'}}>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row" sx={{padding: '2px', width: '50px'}}>
                                <label className="mr-2 font-semibold" htmlFor="document_name">Name</label>
                            </TableCell>
                            <TableCell align="left" sx={{paddingY: '8px',}}>
                                <input
                                    type="text"
                                    name="chapter_name"
                                    value={newChapter.chapter_name}
                                    onChange={handleChange}
                                    className="border border-slate-500 bg-[#EBF8FF] rounded w-[200px] lg:w-[400px]  h-[30px] mx-3"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row"
                                       sx={{
                                           paddingX: '2px',
                                           paddingY: "8px",
                                           display: 'flex',
                                           alignItems: 'flex-start'
                                       }}>
                                <label className="mr-2 font-semibold" htmlFor="description">Code</label>
                            </TableCell>
                            <TableCell align="left" sx={{paddingY: '8px',}}>
                                <input
                                    type="text"
                                    name="code"
                                    value={newChapter.code}
                                    onChange={handleChange}
                                    className="border border-slate-500 bg-[#EBF8FF] rounded w-[200px] lg:w-[400px]  h-[30px] mx-3"
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell component="th" scope="row"
                                       sx={{
                                           paddingX: '2px',
                                           paddingY: "8px",
                                           display: 'flex',
                                           alignItems: 'flex-start'
                                       }}>
                                <label className="mr-2 font-semibold" htmlFor="description">Content</label>
                            </TableCell>
                            <TableCell align="left" sx={{paddingY: '8px',}}>
                                <input
                                    type="text"
                                    name="content"
                                    value={newChapter.content}
                                    onChange={handleChange}
                                    className="border border-slate-500 bg-[#EBF8FF] rounded w-[200px] lg:w-[400px]  h-[100px] lg:h-[300px] mx-3"
                                />
                            </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>
                <div className="flex justify-center mb-2 mr-6">
                    <button
                        onClick={handleAddChapter}
                        className=" bg-[#6DB9D2] text-white uppercase py-2 px-4 w-18
            rounded-xl font-semibold cursor-pointer
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out"
                    >
                        Create
                    </button>
                </div>

        </div>
);
};

export default AddChapter;
