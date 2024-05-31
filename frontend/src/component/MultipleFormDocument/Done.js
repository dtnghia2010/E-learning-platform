
import {useNavigate} from "react-router-dom";

const Done = () => {
    const navigator= useNavigate();
    const handleUpdate=()=>{
        window.location.reload()
    }

    return (
        <div>
            <div className="flex items-center justify-center mt-5 ">
                <div className="bg-white rounded-lg shadow-md px-8 py-10 max-w-md">
                    <image ></image>
                    <h1 className="text-3xl font-bold text-center mb-4">Thank you</h1>
                    <p className="text-gray-700 text-center">
                        Your documents will help thousands of students to perform better in their studies.
                    </p>
                    <div className=" done-document justify-center mt-5 flex-col text-xl">
                        <button
                            onClick={()=>{handleUpdate()}}
                            className="px-4 mb-6 py-3 rounded-3xl bg-myBlue hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300 button">
                            <span>
                            <i class="fa-solid fa-cloud-arrow-up mr-2"></i>
                            </span>
                            <span>Upload more documents</span>
                        </button>
                        <button
                            onClick={()=>{navigator("/")}}
                            className="px-4 py-3 rounded-3xl border bg-myYellow border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 button">
                            Go back to Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Done;
