import {Link} from "react-router-dom";

const QuizzHeader = ({currentStep, numberQuestion}) => {
    return (

        <nav className="flex justify-between items-center max-w-full p-4 lg:px-8 bg-yellow-light" aria-label="Global">
            <div>
                something here
            </div>
            <div className="bg-white rounded h-[33px] w-[58px] flex justify-center
            items-center shadow-md text-xl font-semibold">
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
