import {useContext, useEffect, useState} from "react";
import {Divider, Table, TableBody, TableCell, TableRow} from "@mui/material";

import {
    getChapter,
    getDocumentDetails,
    updateDocument
} from "../../util/ApiFunction";



const EditChapter = (chapterId) => {

    const [chapter, setDocument]=useState({
        course_id:"",
        document_name:"",
        description:""
    })

    const handleChange=(e)=>{
        const {name, value}=e.target;
        setDocument({...document,[name]:value})

    }

    const handleGetDocument=async ()=>{
        try{
            const data= await getChapter(27);
            console.log(data.documents)

        }catch (e) {
            console.log(e)
        }
    }

    const handleUpdateDocuent= async ()=>{

        console.log(document)
        const updatedResponse=await  updateDocument(chapterId,document);
        console.log(updatedResponse)
    }
    useEffect(()=>{
        handleGetDocument();
    },[])


    return (
        <div className="border border-gray-800 rounded-md flex flex-col mx-40 m-5">
            <img src="/images/Tài%20liệu.png" alt="hình" className="w-8 h-8"/>

            <Divider style={{backgroundColor: '#171717', margin: '5px'}}/>

            <Table className="sm:w-fit md:w-1/2 m-2 flex-1" sx={{border: 'none'}}>
                <TableBody>

                    <TableRow>
                        <TableCell component="th" scope="row" sx={{padding: '2px', width: '50px'}}>
                            <label className="mr-2 font-semibold" htmlFor="document_name">Title</label>
                        </TableCell>
                        <TableCell align="left" sx={{paddingY: '8px',}}>
                            <input
                                type="text"
                                name="document_name"
                                defaultValue={document.document_name}
                                onChange={handleChange}
                                className="border border-slate-500 bg-[#EBF8FF] rounded w-[200px] lg:w-[400px]  h-[30px] mx-3"
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell component="th" scope="row"
                                   sx={{paddingX: '2px', paddingY: "8px", display: 'flex', alignItems: 'flex-start'}}>
                            <label className="mr-2 font-semibold" htmlFor="description">Description</label>
                        </TableCell>
                        <TableCell align="left" sx={{paddingY: '8px',}}>
                            <input
                                type="text"
                                name="description"
                                defaultValue={document.description}
                                onChange={handleChange}
                                className="border border-slate-500 bg-[#EBF8FF] rounded w-[200px] lg:w-[400px]  h-[100px] lg:h-[300px] mx-3"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="flex justify-center mb-2 mr-6">
                <button
                    onClick={handleUpdateDocuent}
                    className=" bg-[#6DB9D2] text-white uppercase py-2 px-4 w-18
            rounded-xl font-semibold cursor-pointer
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out"
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default EditChapter;