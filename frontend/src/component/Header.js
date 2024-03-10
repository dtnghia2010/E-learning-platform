

export default function Header(){
    return (

            <div>
                <div className="bg-blue-light p-2 flex justify-center">
                    <div className="container mx-auto flex justify-center items-center font-semibold text-lg">

                        <div className="text-sm text-gray-600 text-center flex ">
                            Free Courses, Get it now! →
                        </div>

                    </div>
                </div>
                <div className="flex justify-between items-center h-16 bg-gray-100 px-4">
                    <div className="flex justify-between items-center p-4 ">
                        <a href="#" className=" ml-10 text-black hover:text-gray-700 font-medium">Home</a>
                        <a href="#" className=" ml-10 text-black hover:text-gray-700 font-medium">Courses</a>
                        <a href="#" className=" ml-10 text-black hover:text-gray-700 font-medium">Quizzes</a>
                        <a href="#" className=" ml-10 text-black hover:text-gray-700 font-medium">Meeting</a>
                    </div>
                    <div className="flex justify-end">
                        <button className="text-black px-4 py-2 rounded font-medium">Sign Up</button>
                        <button
                            className="bg-blue-light text-blue-500 border border-blue-500 px-4 py-2 rounded font-medium">Login
                        </button>
                    </div>
                </div>
            </div>

    );
}