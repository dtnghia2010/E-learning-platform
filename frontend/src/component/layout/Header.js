import useAuthContext from "../../hook/useAuthContext";
import CategoryContent from "../common/CategoryContent";
import {Link} from "react-router-dom";
import FlyoutLink from "../common/FlyoutLink";


export default function Header(){
    const {user} = useAuthContext();

    return (

        <div>
            <div className="bg-blue-light p-2 flex justify-center">
                <div className="container mx-auto flex justify-center items-center font-semibold text-lg">
                    <div className="text-sm text-gray-600 text-center flex ">
                        Free Courses, Get it now! →
                    </div>

                </div>
            </div>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex justify-between items-center p-4 ">
                    <FlyoutLink children="Home" href="/"/>

                    <FlyoutLink children="Course" FlyoutContent={<CategoryContent/>}/>

                    <FlyoutLink children="Quizz" href="/search_quiz"/>
                </div>
                <div className="flex justify-end">
                    {user && <div>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            placeholder="Search..." type="text" name="search"/>
                    </div> }
                    {!user &&<div>
                        <Link to={"/register"}>
                            <button className="text-black px-4 py-2 rounded font-medium">Sign Up</button>
                        </Link>


                        <Link to={"/login"}>
                            <button
                                className="bg-blue-light text-blue-500 border border-blue-500 px-4 py-2 rounded font-medium">Login
                            </button>
                        </Link>

                    </div> }
                </div>
            </nav>
        </div>

    )
        ;
}