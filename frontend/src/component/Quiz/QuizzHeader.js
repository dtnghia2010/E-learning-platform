import {Link} from "react-router-dom";

const QuizzHeader = ({currentStep, numberQuestion}) => {
    return (

        <nav className="flex justify-between items-center max-w-full p-3 lg:px-5 bg-myYellow font-semibold" aria-label="Global">
            <div>
                Group 9
            </div>
            <div className="bg-white rounded h-[33px] w-[58px] flex justify-center
            items-center shadow-md text-xl font-semibold ml-60 mr-36">
                {currentStep}/{numberQuestion}
            </div>
            <button className=" bg-white rounded flex justify-center
            items-center h-[40px] w-[200px] shadow-md text-xl font-semibold">
                <Link to={"/"}>My Home Page</Link>
            </button>
        </nav>
    );
};

export default QuizzHeader;
