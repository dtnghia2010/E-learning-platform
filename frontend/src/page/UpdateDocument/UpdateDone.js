
import {useNavigate} from "react-router-dom";

export   const UpdateDone = () => {
    const navigator= useNavigate();


    return (
        <div>
            <div className="flex items-center justify-center mt-5 ">
                <div className="bg-white rounded-lg shadow-md px-8 py-12 max-w-md">
                    <image ></image>
                    <h1 className="text-3xl font-bold text-center mb-4">Thank you</h1>
                    <p className="text-gray-700 text-center">
                        Your documents will help thousands of students to perform better in their studies.
                    </p>
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={()=>{navigator("/homepage")}}
                            className="ml-4 px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300">
                            Go back to Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};