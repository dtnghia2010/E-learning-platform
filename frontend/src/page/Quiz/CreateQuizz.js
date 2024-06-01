import {Divider, Table, TableBody, TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {createQuizz, getAllCategory} from "../../util/ApiFunction";
import {useNavigate} from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";


const CreateQuizz=()=>{
    const [categories,setCategories]=useState([]);
    const [quizz, setQuizz]= useState({
        category_name:"",
        quizz_name:"",
        code:""
    })
    const navigator= useNavigate();

    const handleGetAllCategories= async ()=>{
        try{
            const resData = await getAllCategory();
            console.log(resData)
            setCategories(resData);
        }catch (e){
            console.log(e)
            throw e
        }
    }
    const handleChange=(event)=>{
        try{
            const {name, value}= event.target
            setQuizz({...quizz,[name]:value})

        }catch (e) {
            console.log(e)
            throw  e
        }
    }
    const handleSubmit =async ()=>{
        try{
            const response= await createQuizz(quizz);
            console.log(response)
            navigator(`/create_question/${response.quizz_id}`)
        }catch (e) {
            console.log(e)
            throw e
        }
    }

    useEffect(()=>{
        handleGetAllCategories()
    },[])

    return(
        <>
            <div className="border border-gray-800 rounded-md flex flex-col mx-40 m-3 bg-myBlue">

                <div className="flex items-center p-2 bg-myYellow rounded-t-md">
                    <IoDocumentTextOutline class="w-[25px] h-[25px]"/>
                    <h1 className="text-2xl font-semibold pl-2">Create Quizz</h1>
                </div>
                <Divider style={{backgroundColor: '#171717'}}/>

                <Table className="sm:w-fit md:w-1/2 m-2 flex-1" sx={{border: 'none'}}>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row" sx={{padding: '10px', width: '130px'}}>
                                <label className="mr-2 font-semibold text-base" htmlFor="document_name">Categories</label>
                            </TableCell>
                            <TableCell align="left" sx={{paddingY: '20px',}}>
                                <select
                                    className="border border-secondary-400 bg-myLightYellow rounded w-[200px] lg:w-[400px]  h-[30px] mx-3"
                                    onChange={handleChange} name="category_name" value={quizz.category_name}>
                                    {/* Options for the select menu */}
                                    <option > Select category
                                    </option>
                                    {categories.length > 0 && categories.map((category) => (
                                        <option key={category.id} value={category.value}>
                                            {category.category_name}
                                        </option>
                                    ))}

                                    {/* Add more options as needed */}
                                </select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row" sx={{padding: '10px', width: '130px'}}>
                                <label className="mr-2 font-semibold text-base" htmlFor="document_name">Quizz Name</label>
                            </TableCell>
                            <TableCell align="left" sx={{paddingY: '20px',}}>
                                <input
                                    type="text"
                                    name="quizz_name"
                                    onChange={handleChange}
                                    value={quizz.quizz_name}
                                    className="border border-secondary-400 bg-myLightYellow rounded w-[200px] lg:w-[400px]  h-[30px] mx-3"
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell component="th" scope="row" sx={{padding: '10px', width: '130px'}}>
                                <label className="mr-2 font-semibold text-base" htmlFor="description">Quizz Code</label>
                            </TableCell>
                            <TableCell align="left" sx={{paddingY: '20px',}}>
                                <input
                                    type="text"
                                    name="code"
                                    onChange={handleChange}
                                    value={quizz.code}
                                    className="border border-secondary-400 bg-myLightYellow rounded w-[200px] lg:w-[400px]  h-[30px] mx-3"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="flex justify-center mb-2 items-center p-3">
                    <button
                        className=" bg-myYellow text-gray-900 uppercase py-2 px-4 w-18
            rounded-xl font-semibold cursor-pointer
            hover:bg-slate-700 hover:text-white transition duration-2 ease-in-out"
                        onClick={handleSubmit}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </>
    );
}
export default CreateQuizz;