import {Divider, Table, TableBody, TableCell, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import {createQuizz, getAllCategory} from "../../util/ApiFunction";


const CreateQuizz=()=>{
    const [categories,setCategories]=useState([]);
    const [quizz, setQuizz]= useState({
        category_name:"",
        quizz_name:"",
        code:""
    })

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
            <div className="border border-gray-800 rounded-md flex flex-col mx-40 m-5">

                <div className="flex items-center">
                    <img src="/images/Tài%20liệu.png" alt="hình" className="w-8 h-8 mr-4"/>
                    <h1 className="text-2xl font-semibold">Create Quizz</h1>
                </div>
                <Divider style={{backgroundColor: '#171717', margin: '5px'}}/>

                <Table className="sm:w-fit md:w-1/2 m-2 flex-1" sx={{border: 'none'}}>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row" sx={{padding: '2px', width: '50px'}}>
                                <label className="mr-2 font-semibold" htmlFor="document_name">Categories</label>
                            </TableCell>
                            <TableCell align="left" sx={{paddingY: '8px',}}>
                                <select
                                    className="border border-slate-500 bg-[#EBF8FF] rounded w-[200px] lg:w-[400px]  h-[30px] mx-3"
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
                            <TableCell component="th" scope="row" sx={{padding: '2px', width: '50px'}}>
                                <label className="mr-2 font-semibold" htmlFor="document_name">Quizz Name</label>
                            </TableCell>
                            <TableCell align="left" sx={{paddingY: '8px',}}>
                                <input
                                    type="text"
                                    name="quizz_name"
                                    onChange={handleChange}
                                    value={quizz.quizz_name}
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
                                <label className="mr-2 font-semibold" htmlFor="description">Quizz Code</label>
                            </TableCell>
                            <TableCell align="left" sx={{paddingY: '8px',}}>
                                <input
                                    type="text"
                                    name="code"
                                    onChange={handleChange}
                                    value={quizz.code}
                                    className="border border-slate-500 bg-[#EBF8FF] rounded w-[200px] lg:w-[400px]  h-[30px] mx-3"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="flex justify-center mb-2 mr-6">
                    <button

                        className=" bg-[#6DB9D2] text-white uppercase py-2 px-4 w-18
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