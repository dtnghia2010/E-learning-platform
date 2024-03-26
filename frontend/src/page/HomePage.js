import Recent from "../component/Recent";
import Recommend from "../component/Recommend";
import useAuthContext from "../hook/useAuthContext";

const HomePage = () => {
    const {userState} = useAuthContext();
    return (
        <div className="container mx-auto flex flex-col justify-start font-vietnam-pro px-36 py-6" >
            {!userState && <header className="flex items-center drop-shadow-2xl text-5xl">Let's start
                learning, Thang cute</header> }
            {!userState && <div className="mt-12">
                <div className="pb-3">
                    <header className="text-2xl">Recently viewed</header>
                </div>
                <Recent/>
            </div> }
            <div className="mt-12 pb-28">
                <div className="pb-7">
                    <header className="text-3xl">Top Lectures for you</header>
                </div>
                <Recommend/>
            </div>
        </div>

    );
};

export default HomePage;
