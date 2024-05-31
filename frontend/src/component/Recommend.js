
const Recommend = () => {
    return (
    <div>
        <div className="grid lg:grid-cols-4 gap-x-42">
            <a href="/lecture/111" className="h-32 sm:h-52 w-40 sm:w-64">
                <img src="/images/folderImg.png" alt="" className=" hover:shadow-xl"/>
                <div>
                    <p className="card-title">Thermodynamics </p>
                    <span className="card-author"> nghia</span>
                </div>
            </a>
            <a href="/lecture/2" className="h-32 sm:h-52 w-40 sm:w-64">
                <img src="/images/folderImg.png" alt="" className=" hover:shadow-xl"/>
                <div>
                    <p className="card-title">Mastering IELTS Writing: Task 1 (General Training) </p>
                    <span className="card-author"> hanguyen</span>
                </div>
            </a>
            <a href="/lecture/35" className="h-32 sm:h-52 w-40 sm:w-64">
                <img src="/images/folderImg.png" alt="" className=" hover:shadow-xl"/>
                <div>
                    <p className="card-title">Limits And Continuity</p>
                    <span className="card-author"> khoa1</span>
                </div>
            </a>
            <a href="/lecture/100" className="h-32 sm:h-52 w-40 sm:w-64">
                <img src="/images/folderImg.png" alt="" className=" hover:shadow-xl"/>
                <div>
                    <p className="card-title">Database Management Systems</p>
                    <span className="card-author"> khoa1</span>
                </div>
            </a>
        </div>
    </div>
    );
};

export default Recommend;
