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
        <div className="absolute inset-0 border border-gray-800 rounded-md flex flex-col add-chapter bg-myWhite ">
                  {/* <StepperControl step={step} setStep={setStep} /> */}
                                <input
                                    type="text"
                                    name="chapter_name"
                                    value={newChapter.chapter_name}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    className="rounded w-[200px] lg:w-full h-[30px]  input-chapter chapter-name text-center "
                                />
                                <label htmlFor="chapter_name"></label>
                                <Divider style={{backgroundColor: 'transparent', margin: '5px 140px', borderStyle: 'dashed', borderWidth: '2px'}}/>
                                <input
                                    type="text"
                                    name="code"
                                    value={newChapter.code}
                                    onChange={handleChange}
                                    placeholder="Enter Quiz Code"
                                    className="rounded w-[200px] lg:w-full  h-[30px] input-chapter chapter-code text-right"
                                />
                                <label htmlFor="code"></label>
                                <textarea
                                    type="text"
                                    name="content"
                                    value={newChapter.content}
                                    onChange={handleChange}
                                    placeholder="Type your text"
                                    className="rounded w-[200px] lg:w-full input-chapter chapter-text text-left inline-block"
                                />
                                <label htmlFor="content"></label>
                <div className="flex justify-center mb-2 mr-6 absolute save-button">
                    <button
                        onClick={handleAddChapter}
                        className=" bg-[#6DB9D2]  hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out button"
                    >
                        Save
                    </button>
                </div>

        </div>
);
};
export default AddChapter;
