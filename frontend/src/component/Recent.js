const Recent = () => {
    return (
        <div className=" grid lg:grid-cols-6 gap-x-52 " style={{zIndex:1}}>
                <a href="/document/46" className="card">
                    <span  className="text-xl"> English Language </span>
                    <span className="badge"> Course</span>
                </a>
                <a href="/document/37" className="card">
                    <span className="text-xl"> Electrical Engineering</span>
                    <span className="badge"> Course</span>
                </a>
                <a href="/document/36" className="card">
                    <span className="text-xl"> Mechanical Engineering</span>
                    <span className="badge"> Course</span>
                </a>
                <a href="/document/69" className="card">
                    <span className="text-xl"> Advanced Mathematics</span>
                    <span className="badge"> Course</span>
                </a>
                <a href="/document/560" className="card">
                    <span className="text-xl"> Web Design Fundamentals</span>
                    <span className="badge"> Course</span>
                </a>
        </div>
    );
};

export default Recent;
